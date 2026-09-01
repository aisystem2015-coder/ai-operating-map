/**
 * Daily Journal webhook — capture from Telegram WITHOUT the Mac mini.
 *
 * WHY IT EXISTS
 * The whole capture chain used to live on the Mac: a process long-polling
 * (`getUpdates`), classification via the local Claude CLI, and a write to an
 * Obsidian .md file. Supabase only saw the result 20 minutes later, via sync.
 * With the Mac off, nothing is captured — and Francisco is moving.
 *
 * Here Telegram hits this URL, transcription and classification are API calls,
 * and the entry is written straight to Supabase. Obsidian becomes a downstream
 * mirror, not the source.
 *
 * CONVERSATIONAL FLOW (Maya, 1 sep 2026 — "like it worked at the start")
 *   you: hi  ->  bot: "What's going on today? Tell me and I'll file it."
 *   you: <tell it what happened>
 *   bot: "What level should I save this at? 1-4, or say 'you decide'."
 *   you: 3            -> saved at level 3, LOCKED (no softer version below it)
 *   you: you decide   -> the model picks the level per topic
 *   bot: "✅ Saved: • Salud — level 3 (locked) • Trabajo — level 2"
 * State is held in journal_sessions (the webhook itself is stateless).
 *
 * TOPIC, NOT LEVEL, DECIDES WHERE IT GOES
 * An entry is filed under one or more Temas/ folders. One message can produce
 * several rows — the same voice note can be a health entry AND a work entry, at
 * different levels. The level only controls how much detail the twin later
 * surfaces, never where it's stored.
 *
 * SECURITY — two gates
 * 1. `X-Telegram-Bot-Api-Secret-Token` must match (derived from the bot token).
 * 2. `chat_id` on the whitelist. Two locks for two different failures.
 *
 * DEFAULT LEVEL 2, NEVER 1
 * A classification failure saves as private. The August bug was treating
 * unmarked content as public, and a mis-classified journal entry at level 1 is
 * served by the site's public chat.
 */
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SUPA = "https://zgznqcopbgkfphubucpw.supabase.co";
const GROQ = "https://api.groq.com/openai/v1";
const BUCKET = "journal-media";

/** Only Francisco. */
const ALLOWED_CHATS = [8785492560];

/** Thematic folders under Digital Twin/Temas/ in the vault, + a catch-all for
 *  ordinary daily stuff that isn't a real theme. */
const TOPICS = [
  "Salud", "Salud Mental y Energia", "Trabajo", "Filosofia",
  "Finanzas", "Objetivos", "Legal y Migracion", "Aprendizaje", "Habitos y Diario",
];

/** How long a half-finished exchange stays live before the next message is
 *  treated as a fresh start. */
const SESSION_TTL_MS = 45 * 60 * 1000;

const SPLIT_PROMPT = `You split one journal entry from Francisco Guevara into topic slices.

Return ONLY a JSON array, nothing around it:
[{"topic":"<one of the list>","level":<1-4>,"text":"<the part of the entry that belongs to this topic, lightly cleaned>"}]

TOPICS: ${TOPICS.join(", ")}
- Salud = physical health, injuries, doctors, the body
- Salud Mental y Energia = stress, sleep, mood, energy, burnout
- Trabajo = work, projects, career, how he thinks about his work
- Filosofia = beliefs, worldview, principles, how he sees things
- Finanzas = money, income, expenses, crypto, financial goals
- Objetivos = life goals, long-term plans, what he's aiming at
- Legal y Migracion = visa, contracts, legal, immigration, location
- Aprendizaje = things he's learning, studying, reading
- Habitos y Diario = ordinary day-to-day, routines, how the day went — the catch-all

LEVEL (only used when the caller did NOT give an explicit level):
1 = fine to say publicly
2 = personal daily life
3 = health, finances, legal/immigration
4 = family, partner, deep fears, therapy, account numbers
When unsure, go UP a level, never down.

One entry can produce 2-4 slices in different topics at different levels. Keep each
"text" to the part that matters for that topic — don't repeat the whole entry in
every slice. If it's all one topic, return a single-element array.`;

type Slice = { topic: string; level: number; text: string };

function env(name: string): string | undefined {
  return process.env[name];
}

async function derivedSecret(botToken: string): Promise<string> {
  const data = new TextEncoder().encode(`twin-journal-webhook:${botToken}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
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

// ─── session state ─────────────────────────────────────────────────────────

type Pending = { text?: string; kind?: string; media_id?: number | null };
type Session = { state: string; pending: Pending; last_update_id?: number };

async function getSession(chat: number): Promise<Session> {
  const r = await supa(`/rest/v1/journal_sessions?chat_id=eq.${chat}&select=*`);
  const row = r.ok ? (await r.json())?.[0] : null;
  if (!row) return { state: "idle", pending: {} };
  const age = Date.now() - new Date(row.updated_at).getTime();
  if (age > SESSION_TTL_MS && row.state !== "idle") return { state: "idle", pending: {} };
  return { state: row.state, pending: row.pending || {}, last_update_id: row.last_update_id };
}

async function setSession(chat: number, state: string, pending: Pending, updateId?: number) {
  await supa(`/rest/v1/journal_sessions?on_conflict=chat_id`, {
    method: "POST",
    headers: { prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({
      chat_id: chat, state, pending,
      last_update_id: updateId ?? null, updated_at: new Date().toISOString(),
    }),
  });
}

const clearSession = (chat: number) => setSession(chat, "idle", {});

// ─── telegram helpers ──────────────────────────────────────────────────────

async function tgFile(token: string, fileId: string) {
  const info = await fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`).then((r) => r.json());
  if (!info?.ok) throw new Error(`getFile: ${JSON.stringify(info).slice(0, 120)}`);
  const p = info.result.file_path as string;
  const r = await fetch(`https://api.telegram.org/file/bot${token}/${p}`);
  if (!r.ok) throw new Error(`download: ${r.status}`);
  return { bytes: new Uint8Array(await r.arrayBuffer()), name: p.split("/").pop() || "file" };
}

async function transcribe(bytes: Uint8Array, filename: string): Promise<string> {
  const key = env("WHISPER_API_KEY") || env("GROQ_API_KEY");
  if (!key) throw new Error("no key to transcribe");
  const fd = new FormData();
  fd.append("file", new Blob([bytes as BlobPart]), filename);
  fd.append("model", env("WHISPER_MODEL") || "whisper-large-v3");
  const r = await fetch(`${GROQ}/audio/transcriptions`, {
    method: "POST", headers: { authorization: `Bearer ${key}` }, body: fd,
  });
  if (!r.ok) throw new Error(`whisper ${r.status}: ${(await r.text()).slice(0, 120)}`);
  return ((await r.json())?.text || "").trim();
}

async function say(token: string, chat: number, text: string) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chat, text, parse_mode: "Markdown" }),
  }).catch(() => {});
}

// ─── classification ────────────────────────────────────────────────────────

/** Split an entry into topic slices. `forcedLevel` (from an explicit user
 *  answer) overrides every slice's level and marks them locked. Total failure
 *  never loses the note: it falls back to one catch-all slice at level 2. */
async function splitEntry(text: string, forcedLevel: number | null): Promise<{ slices: Slice[]; by: string }> {
  const clamp = (n: unknown) => Math.min(4, Math.max(1, Math.round(Number(n) || 2)));
  const norm = (t: string) => TOPICS.find((x) => x.toLowerCase() === String(t).toLowerCase()) || "Habitos y Diario";
  const parseArr = (raw: string): Slice[] | null => {
    const m = raw.match(/\[[\s\S]*\]/);
    if (!m) return null;
    try {
      const arr = JSON.parse(m[0]);
      if (!Array.isArray(arr) || !arr.length) return null;
      return arr.slice(0, 5).map((s: { topic?: string; level?: number; text?: string }) => ({
        topic: norm(s.topic || ""),
        level: forcedLevel ?? clamp(s.level),
        text: (typeof s.text === "string" && s.text.trim()) ? s.text.trim() : text,
      }));
    } catch { return null; }
  };

  const body = (model: string) => JSON.stringify({
    model, max_tokens: 1200, temperature: 0,
    messages: [{ role: "system", content: SPLIT_PROMPT }, { role: "user", content: text }],
  });

  const groqKey = env("GROQ_API_KEY");
  if (groqKey) {
    try {
      const r = await fetch(`${GROQ}/chat/completions`, {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${groqKey}` },
        body: body("openai/gpt-oss-120b"),
      });
      if (r.ok) {
        const out = parseArr((await r.json())?.choices?.[0]?.message?.content || "");
        if (out) return { slices: out, by: "groq" };
      }
    } catch { /* fall through to Gemini */ }
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
              systemInstruction: { parts: [{ text: SPLIT_PROMPT }] },
              contents: [{ role: "user", parts: [{ text }] }],
              generationConfig: { temperature: 0, maxOutputTokens: 1200 },
            }),
          });
        if (!r.ok) continue;
        const d = await r.json();
        const raw = (d?.candidates?.[0]?.content?.parts ?? []).map((p: { text?: string }) => p?.text || "").join("");
        const out = parseArr(raw);
        if (out) return { slices: out, by: "gemini" };
      } catch { /* next model */ }
    }
  }

  return { slices: [{ topic: "Habitos y Diario", level: forcedLevel ?? 2, text }], by: "fallback" };
}

// ─── level parsing from the user's reply ───────────────────────────────────

const WORD_LEVEL: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, uno: 1, dos: 2, tres: 3, cuatro: 4,
};
/** Returns {level} for an explicit number, {auto:true} for "you decide", or
 *  null if the message isn't a level answer at all (they kept talking). */
function parseLevelReply(text: string): { level?: number; auto?: boolean } | null {
  const t = text.trim().toLowerCase();
  if (/^(you decide|up to you|decide|your call|classify( it)?|clasific|vos deci|tu deci|lo que veas|no s[eé])/i.test(t))
    return { auto: true };
  const num = t.match(/\b(?:level\s*|nivel\s*|n)?([1-4])\b/) || t.match(/^([1-4])$/);
  if (num) return { level: Number(num[1]) };
  for (const [w, n] of Object.entries(WORD_LEVEL)) if (new RegExp(`\\b${w}\\b`).test(t)) return { level: n };
  return null;
}

const GREETING = /^\s*[/]?(hi|hey|hello|hola|buenas|start|journal|diary|diario)\b/i;
const isSubstantive = (t: string) => t.trim().replace(/[^\p{L}\p{N}]/gu, "").length >= 6 && !GREETING.test(t);

const LEVEL_LABEL = ["public", "shareable", "personal", "sensitive", "intimate"];

// ─── main ──────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const token = env("TELEGRAM_DIARIO_BOT_TOKEN");
  if (!token || !env("SUPABASE_SECRET_KEY")) {
    return NextResponse.json({ ok: false, error: "not configured" }, { status: 500 });
  }

  const sent = req.headers.get("x-telegram-bot-api-secret-token") || "";
  const explicit = env("TELEGRAM_WEBHOOK_SECRET");
  const authOk = sent === await derivedSecret(token) || (explicit ? sent === explicit : false);
  if (!authOk) return new NextResponse("no", { status: 401 });

  const update = await req.json().catch(() => null);
  const msg = update?.message;
  const chat = msg?.chat?.id;
  if (!msg || !ALLOWED_CHATS.includes(chat)) return NextResponse.json({ ok: true, ignored: true });

  try {
    const session = await getSession(chat);
    // Telegram retries anything slow — ignore an update we already processed.
    if (session.last_update_id && update.update_id === session.last_update_id) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    // ── gather this message's content (text / voice / photo) ──
    let kind = "text";
    let text = (msg.text || msg.caption || "").trim();
    let mediaId: number | null = null;

    if (msg.voice || msg.audio) {
      kind = "voice";
      const f = await tgFile(token, (msg.voice || msg.audio).file_id);
      text = await transcribe(f.bytes, f.name.endsWith(".oga") ? "audio.ogg" : f.name);
    }

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

    const isCommand = /^\/(start|journal|diary|diario)\b/i.test(text);

    // ── state: awaiting_level — is this message the level answer? ──
    if (session.state === "awaiting_level" && kind === "text" && !isCommand) {
      const ans = parseLevelReply(text);
      if (ans) {
        const entry = (session.pending.text || "").trim();
        if (!entry) { await clearSession(chat); await say(token, chat, "Lost the thread there — tell me again what happened."); return NextResponse.json({ ok: true }); }
        const forced = ans.level ?? null;
        const { slices, by } = await splitEntry(entry, forced);
        const rows = slices.map((s) => ({
          update_id: update.update_id, chat_id: chat,
          kind: session.pending.kind || "text",
          raw_text: entry, entry_text: s.text,
          topic: s.topic, note_title: s.topic, access_level: s.level,
          locked: forced !== null, media_id: session.pending.media_id ?? null,
          classified_by: by,
        }));
        const ins = await supa("/rest/v1/journal_entries", {
          method: "POST", headers: { prefer: "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify(rows),
        });
        await setSession(chat, "idle", {}, update.update_id);
        if (!ins.ok && ins.status !== 409) throw new Error(`supabase ${ins.status}: ${(await ins.text()).slice(0, 160)}`);
        const lines = slices.map((s) =>
          `• *${s.topic}* — level ${s.level} (${LEVEL_LABEL[s.level]})${forced !== null ? " · locked" : ""}`);
        await say(token, chat,
          `✅ Saved:\n${lines.join("\n")}` +
          (by === "fallback" ? "\n_(auto-filed — no classifier responded)_" : "") +
          (forced !== null ? "\n_Locked to this level — no softer version exists below it._" : ""));
        return NextResponse.json({ ok: true, slices: slices.length, by });
      }
      // not a level answer — they kept talking; fold it into the pending entry.
      const merged = [(session.pending.text || "").trim(), text].filter(Boolean).join("\n");
      await setSession(chat, "awaiting_level", { ...session.pending, text: merged }, update.update_id);
      await say(token, chat, "Got it, added that. What level should I save this at? 1-4, or say _you decide_.");
      return NextResponse.json({ ok: true, appended: true });
    }

    // ── greeting / command / empty -> prompt and wait for the entry ──
    if (!text && !mediaId) {
      await setSession(chat, "awaiting_entry", {}, update.update_id);
      await say(token, chat, "What's going on today? Tell me what happened or what you need, and I'll file it.");
      return NextResponse.json({ ok: true, greeted: true });
    }
    if (kind === "text" && !isSubstantive(text) && session.state !== "awaiting_entry") {
      await setSession(chat, "awaiting_entry", {}, update.update_id);
      await say(token, chat, "What's going on today? Tell me what happened or what you need, and I'll file it.");
      return NextResponse.json({ ok: true, greeted: true });
    }

    // ── we have real content -> stash it and ask for the level ──
    const pendingText = [
      (session.state === "awaiting_entry" ? (session.pending.text || "") : ""),
      text,
    ].filter(Boolean).join("\n").trim() || (mediaId ? `[${kind}]` : "");
    await setSession(chat, "awaiting_level",
      { text: pendingText, kind, media_id: mediaId ?? session.pending.media_id ?? null },
      update.update_id);
    await say(token, chat,
      "What level should I save this at? *1-4*, or say _you decide_ and I'll classify it." +
      "\n_(1 public · 2 personal · 3 health/finances/legal · 4 family/intimate)_");
    return NextResponse.json({ ok: true, asked_level: true });
  } catch (e) {
    await say(token, chat, `⚠️ Couldn't handle that: ${String(e).slice(0, 180)}`);
    return NextResponse.json({ ok: false, error: String(e).slice(0, 200) });
  }
}

/** GET to verify deployment without sending a real message. */
export async function GET() {
  return NextResponse.json({
    endpoint: "telegram-journal",
    flow: "conversational (ask -> tell -> level -> save), topic-split, explicit-level lock",
    topics: TOPICS,
    configured: {
      secretMode: env("TELEGRAM_WEBHOOK_SECRET") ? "variable" : "derived",
      botToken: Boolean(env("TELEGRAM_DIARIO_BOT_TOKEN")),
      supabase: Boolean(env("SUPABASE_SECRET_KEY")),
      groq: Boolean(env("GROQ_API_KEY")),
      gemini: Boolean(env("GEMINI_API_KEY")),
      whisper: Boolean(env("WHISPER_API_KEY") || env("GROQ_API_KEY")),
    },
  });
}
