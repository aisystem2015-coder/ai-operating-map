/**
 * Webhook del Daily Journal — captura desde Telegram SIN la Mac mini.
 *
 * POR QUÉ EXISTE
 * Hasta hoy la cadena de captura vivía entera en la Mac: un proceso haciendo
 * long-polling (`getUpdates`), la clasificación con el CLI de Claude local, y la
 * escritura a un archivo .md de Obsidian. Supabase sólo veía el resultado 20
 * minutos después, vía sync. Apagada la Mac, no se captura nada — y Francisco se
 * muda a fin de mes.
 *
 * Su regla: "debe funcionar sin la Mac mini, y Obsidian está en la Mac mini".
 * Acá Telegram le pega a esta URL, la transcripción y la clasificación son
 * llamadas a APIs, y la entrada se escribe directo en Supabase. Obsidian pasa a
 * ser un espejo que baja, no la fuente.
 *
 * SEGURIDAD — las dos puertas
 * 1. `X-Telegram-Bot-Api-Secret-Token` debe coincidir. Sin esto, este endpoint
 *    es un formulario público para escribir en el diario personal de Francisco:
 *    cualquiera que adivine la URL inyecta entradas que el twin después lee como
 *    si fueran suyas.
 * 2. `chat_id` en la lista blanca. El token del bot podría filtrarse; el chat no
 *    cambia. Dos cerrojos distintos para dos fallas distintas.
 *
 * NIVEL POR DEFECTO 2, NUNCA 1
 * Un fallo de clasificación guarda como privado. El error de agosto fue tratar
 * como público lo que nadie marcó, y una entrada de diario mal clasificada como
 * nivel 1 la sirve el chat público del sitio.
 */
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SUPA = "https://zgznqcopbgkfphubucpw.supabase.co";
const GROQ = "https://api.groq.com/openai/v1";
const BUCKET = "journal-media";

/** Sólo Francisco. Cambiar acá si suma otro chat a propósito. */
const ALLOWED_CHATS = [8785492560];

/** Notas destino, las mismas que usa el bot de la Mac. */
const NOTES = ["Habitos y Diario", "Trabajo", "Personal", "Filosofia", "Objetivos", "Salud y Legal"];

const CLASSIFY_PROMPT = `Clasificás una entrada del diario personal de Francisco Guevara.

Devolvé SOLO un JSON, sin texto alrededor:
{"nivel": <0-4>, "nota": "<una de la lista>", "resumen": "<una frase>"}

NIVELES:
1 = habla de su trabajo, proyectos, cómo piensa, sus objetivos profesionales
2 = su vida personal cotidiana: hábitos, rutinas, cómo le fue el día
3 = su salud, sus finanzas, su situación legal o migratoria
4 = familia, pareja, miedos profundos, terapia

NOTAS: ${NOTES.join(", ")}

Ante la duda subí el nivel, nunca lo bajes.`;

type Classified = { nivel: number; nota: string; resumen?: string; by: string };

function env(name: string): string | undefined {
  return process.env[name];
}

/** SHA-256 del token del bot con un prefijo fijo. Determinístico: el script que
 *  llama a setWebhook calcula exactamente lo mismo, sin que nadie copie nada. */
async function derivedSecret(botToken: string): Promise<string> {
  const data = new TextEncoder().encode(`twin-journal-webhook:${botToken}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function supa(path: string, init: RequestInit = {}) {
  const key = env("SUPABASE_SECRET_KEY")!;
  return fetch(`${SUPA}${path}`, {
    ...init,
    headers: {
      apikey: key, authorization: `Bearer ${key}`,
      "content-type": "application/json", ...(init.headers || {}),
    },
  });
}

/** Descarga un archivo de Telegram (voz, foto, documento). */
async function tgFile(token: string, fileId: string) {
  const info = await fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`)
    .then((r) => r.json());
  if (!info?.ok) throw new Error(`getFile: ${JSON.stringify(info).slice(0, 120)}`);
  const p = info.result.file_path as string;
  const r = await fetch(`https://api.telegram.org/file/bot${token}/${p}`);
  if (!r.ok) throw new Error(`download: ${r.status}`);
  return { bytes: new Uint8Array(await r.arrayBuffer()), name: p.split("/").pop() || "file" };
}

async function transcribe(bytes: Uint8Array, filename: string): Promise<string> {
  const key = env("WHISPER_API_KEY") || env("GROQ_API_KEY");
  if (!key) throw new Error("sin key para transcribir");
  const fd = new FormData();
  fd.append("file", new Blob([bytes as BlobPart]), filename);
  fd.append("model", env("WHISPER_MODEL") || "whisper-large-v3");
  fd.append("language", "es");
  const r = await fetch(`${GROQ}/audio/transcriptions`, {
    method: "POST", headers: { authorization: `Bearer ${key}` }, body: fd,
  });
  if (!r.ok) throw new Error(`whisper ${r.status}: ${(await r.text()).slice(0, 120)}`);
  return ((await r.json())?.text || "").trim();
}

/** Clasifica con Groq y, si su cuota diaria se agotó, con Gemini.
 *  Un fallo total NO bloquea la captura: guarda en nivel 2 y lo dice. Perder la
 *  nota de Francisco porque un clasificador no respondió sería peor que
 *  guardarla en el nivel conservador. */
async function classify(text: string): Promise<Classified> {
  const body = (model: string) => JSON.stringify({
    model, max_tokens: 200, temperature: 0,
    messages: [{ role: "system", content: CLASSIFY_PROMPT }, { role: "user", content: text }],
  });
  const parse = (raw: string, by: string): Classified | null => {
    const m = raw.match(/\{[\s\S]*\}/);
    if (!m) return null;
    try {
      const j = JSON.parse(m[0]);
      const nivel = Math.min(4, Math.max(0, Number(j.nivel)));
      if (!Number.isFinite(nivel)) return null;
      return {
        nivel, by,
        nota: NOTES.includes(j.nota) ? j.nota : "Habitos y Diario",
        resumen: typeof j.resumen === "string" ? j.resumen : undefined,
      };
    } catch { return null; }
  };

  const groqKey = env("GROQ_API_KEY");
  if (groqKey) {
    try {
      const r = await fetch(`${GROQ}/chat/completions`, {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${groqKey}` },
        body: body("openai/gpt-oss-120b"),
      });
      if (r.ok) {
        const out = parse((await r.json())?.choices?.[0]?.message?.content || "", "groq");
        if (out) return out;
      }
    } catch { /* cae a Gemini */ }
  }

  const gem = env("GEMINI_API_KEY");
  if (gem) {
    for (const model of ["gemini-3.6-flash", "gemini-flash-latest"]) {
      try {
        const r = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(gem)}`,
          {
            method: "POST", headers: { "content-type": "application/json" },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: CLASSIFY_PROMPT }] },
              contents: [{ role: "user", parts: [{ text }] }],
              generationConfig: { temperature: 0, maxOutputTokens: 200 },
            }),
          });
        if (!r.ok) continue;
        const d = await r.json();
        const raw = (d?.candidates?.[0]?.content?.parts ?? [])
          .map((p: { text?: string }) => p?.text || "").join("");
        const out = parse(raw, "gemini");
        if (out) return out;
      } catch { /* siguiente modelo */ }
    }
  }

  return { nivel: 2, nota: "Habitos y Diario", by: "fallback" };
}

async function say(token: string, chat: number, text: string) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chat, text, parse_mode: "Markdown" }),
  }).catch(() => {});
}

export async function POST(req: NextRequest) {
  const token = env("TELEGRAM_DIARIO_BOT_TOKEN");
  if (!token || !env("SUPABASE_SECRET_KEY")) {
    return NextResponse.json({ ok: false, error: "sin configurar" }, { status: 500 });
  }

  // ── puerta 1: el secreto que sólo Telegram conoce ──
  //
  // Se DERIVA del token del bot en vez de guardarse como variable aparte.
  // Motivo: una variable más es una oportunidad más de copiarla mal, y eso pasó
  // — el valor cargado en Vercel no coincidió con el del servidor, Telegram
  // devolvió 401 durante media hora, y como la variable es `Sensitive` no se
  // puede leer para compararla. El único arreglo posible era que una persona la
  // volviera a pegar a ciegas.
  //
  // Derivarla elimina esa clase de error entera: los dos lados calculan el mismo
  // valor a partir de algo que ya comparten. No es menos seguro — el token del
  // bot es secreto, así que su SHA-256 es igual de imposible de adivinar.
  //
  // Acepta CUALQUIERA de los dos, no uno con prioridad sobre el otro. Si la
  // variable explícita ganara, un valor mal cargado seguiría bloqueando todo —
  // que es exactamente la situación que este cambio viene a resolver. Así, una
  // variable vieja o mal pegada queda inofensiva en vez de ser el problema.
  const sent = req.headers.get("x-telegram-bot-api-secret-token") || "";
  const explicit = env("TELEGRAM_WEBHOOK_SECRET");
  const ok = sent === await derivedSecret(token) || (explicit ? sent === explicit : false);
  if (!ok) {
    // 401 sin detalle: a un escáner no se le explica qué le faltó.
    return new NextResponse("no", { status: 401 });
  }

  const update = await req.json().catch(() => null);
  const msg = update?.message;
  const chat = msg?.chat?.id;
  // ── puerta 2: sólo su chat ──
  if (!msg || !ALLOWED_CHATS.includes(chat)) {
    // 200 a propósito: Telegram reintenta lo que no sea 2xx, y no queremos que
    // insista con mensajes que jamás vamos a aceptar.
    return NextResponse.json({ ok: true, ignored: true });
  }

  try {
    let kind = "text";
    let raw = (msg.text || msg.caption || "").trim();
    let mediaId: number | null = null;

    // ── voz -> transcripción ──
    if (msg.voice || msg.audio) {
      kind = "voice";
      const f = await tgFile(token, (msg.voice || msg.audio).file_id);
      raw = await transcribe(f.bytes, f.name.endsWith(".oga") ? "audio.ogg" : f.name);
    }

    // ── foto/documento -> Storage ──
    const photo = msg.photo?.[msg.photo.length - 1];
    const doc = msg.document;
    if (photo || doc) {
      kind = photo ? "photo" : "document";
      const fileId = (photo || doc).file_id;
      const f = await tgFile(token, fileId);
      const name = doc?.file_name || f.name;
      const objectPath = `${new Date().toISOString().slice(0, 7).replace("-", "/")}/tg_${fileId.slice(0, 12)}_${name}`;
      const key = env("SUPABASE_SECRET_KEY")!;
      await fetch(`${SUPA}/storage/v1/object/${BUCKET}/${objectPath}`, {
        method: "POST",
        headers: {
          apikey: key, authorization: `Bearer ${key}`,
          "content-type": doc?.mime_type || "image/jpeg", "x-upsert": "true",
        },
        body: f.bytes as BodyInit,
      });
      const ins = await supa("/rest/v1/journal_media", {
        method: "POST", headers: { prefer: "return=representation" },
        body: JSON.stringify({
          file_id: fileId, filename: name, mime: doc?.mime_type || "image/jpeg",
          byte_size: f.bytes.length, storage_path: objectPath,
          caption: msg.caption || null, access_level: 2,
        }),
      });
      if (ins.ok) mediaId = (await ins.json())?.[0]?.id ?? null;
    }

    if (!raw && !mediaId) return NextResponse.json({ ok: true, empty: true });

    const c = raw ? await classify(raw) : { nivel: 2, nota: "Habitos y Diario", by: "media" };

    const ins = await supa("/rest/v1/journal_entries", {
      method: "POST", headers: { prefer: "return=representation" },
      body: JSON.stringify({
        update_id: update.update_id, chat_id: chat, kind,
        raw_text: raw || null, entry_text: raw || `[${kind}]`,
        note_title: c.nota, access_level: c.nivel,
        media_id: mediaId, classified_by: c.by,
      }),
    });

    if (!ins.ok) {
      const body = await ins.text();
      // 409 = update_id repetido. Telegram reintenta lo que tarda; esto NO es
      // un error, es la idempotencia haciendo su trabajo.
      if (ins.status === 409) return NextResponse.json({ ok: true, duplicate: true });
      throw new Error(`supabase ${ins.status}: ${body.slice(0, 160)}`);
    }

    const label = ["público", "compartible", "personal", "sensible", "íntimo"][c.nivel];
    await say(token, chat,
      `✅ Guardado en *${c.nota}* — nivel ${c.nivel} (${label})` +
      (c.by === "fallback" ? "\n_(clasificado por defecto: ningún modelo respondió)_" : "") +
      (kind === "voice" ? `\n\n_"${raw.slice(0, 140)}${raw.length > 140 ? "…" : ""}"_` : ""));

    return NextResponse.json({ ok: true, nivel: c.nivel, nota: c.nota, by: c.by });
  } catch (e) {
    // Decirle al usuario que falló. El bot de la Mac fallaba callado y una nota
    // perdida sólo se descubría al buscarla semanas después.
    await say(token, chat, `⚠️ No pude guardar eso: ${String(e).slice(0, 180)}`);
    // 200 igual: un 500 hace que Telegram reintente el mismo mensaje en bucle.
    return NextResponse.json({ ok: false, error: String(e).slice(0, 200) });
  }
}

/** GET para verificar despliegue sin mandar un mensaje real. */
export async function GET() {
  return NextResponse.json({
    endpoint: "telegram-journal",
    configured: {
      secret: true, // derivado del token del bot; ya no hace falta cargarlo
      secretMode: env("TELEGRAM_WEBHOOK_SECRET") ? "variable" : "derivado",
      botToken: Boolean(env("TELEGRAM_DIARIO_BOT_TOKEN")),
      supabase: Boolean(env("SUPABASE_SECRET_KEY")),
      groq: Boolean(env("GROQ_API_KEY")),
      gemini: Boolean(env("GEMINI_API_KEY")),
      whisper: Boolean(env("WHISPER_API_KEY") || env("GROQ_API_KEY")),
    },
  });
}
