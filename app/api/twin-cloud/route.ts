import { NextRequest, NextResponse } from "next/server";

// Fully-CLOUD twin chat: retrieves from the Supabase brain and generates the
// answer with Groq (Llama 3.3 70B) — ZERO dependency on the Mac mini. This is
// the reliability move (Francisco, 13 aug 2026: "deploy everything, use local
// as little as possible"). The brain data already lives in Supabase, so if the
// Mac is off, this still answers.
//
// Only public-safe content (access_level 0-1, or notes with no level that are
// general) is ever retrieved here — this is a public endpoint, so it never
// touches N2-4. Deeper levels stay on the password/connector paths.
//
// Needs GROQ_API_KEY as a Vercel env var (the Groq key from .env). Until it's
// set, this returns a clear message and the site keeps using the Mac-backed
// /api/twin-chat.
export const runtime = "edge";
export const dynamic = "force-dynamic";

const SUPABASE_URL = "https://zgznqcopbgkfphubucpw.supabase.co";
const SUPABASE_ANON = "sb_publishable_bbSN-nNr0_t4bK-YP6QOCg_uNEsfOfe";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
// 17 aug 2026: Groq decommissioned llama-3.3-70b-versatile ("model does not
// exist"), which silently broke every cloud-twin answer. gpt-oss-120b is the
// current strongest general chat model on Groq. NOTE: gpt-oss models spend
// reasoning tokens separately, so max_tokens must be generous or content comes
// back empty.
const MODEL = "openai/gpt-oss-120b";
// Second model on a different Groq capacity bucket — used if the primary
// rate-limits or returns empty, so the public twin never goes dark under load.
const FALLBACK_MODEL = "openai/gpt-oss-20b";
const MAX = 500;

// Same bug as scripts/brain_retrieve.py had, found 14 aug 2026: this used to
// match the FIRST 40 CHARACTERS OF THE QUESTION as one literal substring
// (`content.ilike.*cuál es la última entrada de mi diar*`). No note on earth
// contains that, so retrieval returned nothing for every real question and the
// model answered from its own prompt. Now: OR across the meaningful words.
const STOP = new Set(("a al algo como con cual cuales cuando de del desde donde el ella ellos en entre "
  + "era es esa ese eso esta este esto fue ha hace hasta hay la las le les lo los mas me mi mis mucho muy "
  + "para pero por porque que quien se ser si sin sobre solo son su sus tambien te tiene todo tu tus un una "
  + "uno unos ya about all and any are as at be been but by can did do does for from get give had has have "
  + "how its just like me most my not of on or our out show some tell that the their them then there these "
  + "they this to up us was we what when where which who why will with you your").split(" "));
const RECENCY = new Set(["ultimo", "ultima", "ultimos", "ultimas", "reciente", "recientes", "hoy", "ayer",
  "nuevo", "nueva", "latest", "last", "recent", "today", "yesterday", "newest"]);
const fold = (w: string) => w.normalize("NFD").replace(/[̀-ͯ]/g, "");

function terms(q: string) {
  const out: string[] = [];
  for (const w of (q.toLowerCase().match(/[0-9a-zà-ÿñ]{3,}/g) || [])) {
    const f = fold(w);
    if (STOP.has(f) || RECENCY.has(f)) continue;
    for (const form of f !== w ? [w, f] : [w]) if (!out.includes(form)) out.push(form);
  }
  return out.slice(0, 6);
}
const wantsRecency = (q: string) =>
  (q.toLowerCase().match(/[0-9a-zà-ÿñ]{3,}/g) || []).some((w) => RECENCY.has(fold(w)));

async function get(url: string) {
  try {
    const r = await fetch(url, { headers: { apikey: SUPABASE_ANON, authorization: `Bearer ${SUPABASE_ANON}` }, cache: "no-store" });
    return r.ok ? await r.json() : null;
  } catch { return null; }
}

// Extract the RELEVANT window of a note around the first matching term, instead
// of always the first 1600 chars — a huge log's opening is never the answer.
function snippet(content: string, ts: string[]) {
  const body = (content || "").replace(/^---\n[\s\S]*?\n---\n/, "").trim();
  const low = body.toLowerCase();
  let pos = -1;
  for (const t of ts) { const i = low.indexOf(t); if (i >= 0 && (pos < 0 || i < pos)) pos = i; }
  if (pos < 0) return body.slice(0, 1200);
  const start = Math.max(0, pos - 200);
  return (start > 0 ? "…" : "") + body.slice(start, start + 1400);
}

function render(rows: { title: string; content: string; updated_at?: string }[], ts: string[]) {
  return (rows || []).map((n) =>
    `### ${n.title}${n.updated_at ? ` (${n.updated_at.slice(0, 10)})` : ""}\n` + snippet(n.content, ts)
  ).join("\n\n").slice(0, 9000);
}

// SECURITY (21 aug 2026, in two steps — see publicFilter() below for the full
// story). Step 1: the original filter treated ANY untagged note as public-safe,
// and 261 of 286 vault notes are untagged, including raw Drive-mirror dumps.
// Step 2, same day: the replacement still allowlisted three untagged identity
// notes, which turned out to expose personal life and financial goals. Both are
// closed now. The rule that survived: public means access_level <= 1, marked
// deliberately by a person. If one of those identity notes should be public,
// tag it in the vault after reading what's actually in it — don't re-add an
// allowlist here.

// "What is true NOW", as opposed to the rest of the vault, which is historical
// synthesis true at the time it was written. Added 21 aug 2026 after the twin
// was found describing Francisco in the present tense as working at Logitech,
// with no mention that his contract ends this month — to a public audience,
// while he is job-hunting. This note is ALWAYS retrieved and always placed
// first, rather than left to compete on keyword match: a question phrased
// "what's he up to these days" shares no keywords with the note that answers it.
const CURRENT_STATE_TITLE = "Estado Actual";

// ─── curated answers for when generation is unavailable ─────────────────────
// Added 24 aug 2026, after the public twin was found returning the same generic
// non-answer to every question: Groq's free tier caps at 200k tokens/day and the
// account had used 199,978. Both models 429 — the daily cap is per ACCOUNT, not
// per model, so the model-level fallback added on 21 aug does nothing here
// (it protects against a decommissioned or empty-returning model, not a quota).
//
// The questions people actually ask are few and repeat constantly: the analytics
// table shows "Who is Francisco", "What are his skills", "What is a digital
// twin", "What is the AI Operating Map" and "Tell me about his time at Logitech"
// over and over. So a handful of accurate written answers covers most real
// traffic when the model is down.
//
// WHY NOT A CACHE TABLE: this repository is public and the anon Supabase key is
// in this file, so granting anon INSERT would let anyone write what Francisco's
// twin says about him. A read-only constant has no such hole.
//
// These are drawn from the public (access_level <= 1) notes. Keep them short and
// keep them true; a stale fact here is exactly the failure the Estado Actual
// note exists to prevent.
const FALLBACK_ANSWERS: { match: RegExp; reply: string }[] = [
  {
    match: /\b(who is|quien es|qui[eé]n es|about francisco|sobre francisco)\b/i,
    reply:
      "Francisco Guevara is a Bolivian professional based in the San Francisco Bay Area, " +
      "working in global operations at Logitech on a fixed-term contract that runs to the " +
      "end of August 2026. He works as a generalist — the internal \"Swiss army knife\" — " +
      "and outside that role he's building an AI Operating Map and a personal Digital Twin, " +
      "both about how operations teams actually adopt AI.",
  },
  {
    match: /\b(skills?|habilidades|what can he do|qu[eé] sabe hacer)\b/i,
    reply:
      "Francisco works at the seam between operations and AI: business architecture, " +
      "stakeholder management, and translating technical systems into something a " +
      "non-technical team will actually use. He's a deliberate generalist rather than a " +
      "specialist, and he builds the systems he talks about — the Digital Twin and the " +
      "AI Operating Map are his own work, not case studies.",
  },
  {
    match: /\b(digital twin|gemelo digital)\b/i,
    reply:
      "A digital twin, here, means a person's own knowledge captured as structured data " +
      "they own — so any AI model can be connected to it and answer as them, from their " +
      "material rather than from guesswork. Francisco built one for himself: his notes, " +
      "history and decisions live in a database he controls, with access tiers deciding " +
      "what's public and what never leaves his machine. This chat is that system running.",
  },
  {
    match: /\b(ai operating map|operating map)\b/i,
    reply:
      "The AI Operating Map is Francisco's written work on how AI actually lands inside " +
      "operations teams — what works, where pilots stall, and why the blockers are usually " +
      "data and mindset rather than the model. It came out of the World Summit AI in " +
      "Amsterdam and has been updated since with 2026 data.",
  },
  {
    match: /\b(logitech)\b/i,
    reply:
      "Francisco works in Logitech's global operations, crossing time zones daily, and was " +
      "picked for an internal AI-impact programme before AI became an enterprise priority " +
      "there. His contract is fixed-term and tied to his visa, and it ends at the end of " +
      "August 2026 — that's a contract expiring, not a resignation.",
  },
  {
    match: /\b(vision|visi[oó]n|opinion|opini[oó]n|think about ai|piensa de la ia)\b/i,
    reply:
      "Francisco's line is that AI isn't a product, it's the reasoning layer inside a " +
      "system — and that value compounds from what you build around the model, not from " +
      "the model alone. In practice he argues most AI efforts stall on data and mindset " +
      "long before they stall on technology.",
  },
];

function fallbackAnswer(message: string): string | null {
  const hit = FALLBACK_ANSWERS.find((f) => f.match.test(message));
  return hit ? hit.reply : null;
}

// Notes that exist but are navigation/meta, not things a visitor would want
// offered as a conversation topic.
const NOT_A_TOPIC = ["README", "Índice", "Indice", "Adjuntos"];

/**
 * The topics this twin can genuinely talk about, derived from what is actually
 * public right now rather than hardcoded — so it stays true as content grows
 * and never offers something that has since been made private.
 *
 * Why this exists: the hardest unsolved problem in every personal-twin project
 * surveyed is that a visitor cannot tell when they've exhausted the real
 * content, so they keep asking and the model keeps obliging with plausible
 * invention. A refusal that names two things Francisco HAS covered ends that
 * loop honestly, and is far more useful to a recruiter than "I don't have that".
 */
async function offerableTopics(sel: string, pub: string): Promise<string[]> {
  const rows = (await get(
    `${sel}&and=(${pub})&order=char_count.desc&limit=20`)) || [];
  return rows
    .map((r: { title: string }) => r.title)
    .filter((t: string) => t && !NOT_A_TOPIC.some((bad) => t.includes(bad)))
    .slice(0, 6);
}

// TIGHTENED, same day it was introduced. Earlier today this filter also
// allowlisted three UNTAGGED notes (Personal — Fran Guevara, Negocio —
// Logitech, Estrategia — Going Bullish) so the public twin wouldn't lose its
// basic "who is Francisco" answer. Then I asked the deployed twin to list what
// it could discuss and it volunteered his personal life goals — "$500M by 30",
// "mínimo 3 hijos, idealmente 5", financial independence — plus Logitech
// internal system names. On a public site, under his name, while he is job
// hunting and recruiters are the expected visitors.
//
// Nobody ever marked those three notes public; I allowlisted them to avoid
// breaking an answer. That reason is gone: "Estado Actual" (access_level 1,
// written deliberately for public consumption) and the curated level-1
// "Perfil de Persona — Consolidado" now cover identity, and neither contains
// the personal material. So public means what someone actually marked public.
// 3a (Francisco, 31 aug 2026): the twin is Francisco-the-person, not the project
// record. Retrieval is hard-scoped to his persona folder — never the raw
// Drive-mirror ("09 - Drive Sync" = meeting transcripts + sprint docs), which is
// what used to make the twin cite "meet 21" / Maya.
const PERSONA_FOLDER = "05 - Contexto Fran";

function publicFilter() {
  return `access_level.lte.1,folder.eq.${encodeURIComponent(PERSONA_FOLDER)}`;
}

const SELECT_COLS =
  `${SUPABASE_URL}/rest/v1/vault_notes?select=title,folder,content,access_level,updated_at,char_count`;

async function retrieve(q: string) {
  // public-safe: explicit access_level 0/1, or the curated identity allowlist above.
  const pub = publicFilter();
  // Skip mega-notes (activity logs, full meeting transcripts of 200k+ chars):
  // they contain every keyword yet describe nothing, so ordering by size used
  // to surface pure noise. Focused notes are where the actual answers live.
  const cap = "char_count.lt.40000";
  const sel = SELECT_COLS;
  const ts = terms(q);
  // FOCUSED notes first (char_count ascending), not the biggest dump.
  const order = wantsRecency(q) ? "updated_at.desc" : "char_count.asc";

  // Unconditional, before anything else.
  const currentState = (await get(
    `${sel}&title=eq.${encodeURIComponent(CURRENT_STATE_TITLE)}&limit=1`)) || [];

  if (ts.length) {
    // Title matches are the most specific — take them first (no size cap: a
    // title match is on-topic even if the note is long).
    const titleAny = ts.map((t) => `title.ilike.*${t}*`).join(",");
    const byTitle = (await get(`${sel}&and=(${pub},or(${titleAny}))&order=${order}&limit=4`)) || [];
    // Then content matches from focused notes only.
    const anyMatch = ts.flatMap((t) => [`content.ilike.*${t}*`, `title.ilike.*${t}*`]).join(",");
    const byContent = (await get(`${sel}&and=(${pub},${cap},or(${anyMatch}))&order=${order}&limit=6`)) || [];
    const seen = new Set<string>();
    const merged: { title: string; content: string; updated_at?: string }[] = [];
    // currentState first so it survives the slice(0, 5) below — a truncation
    // that drops the "what's true now" note is exactly the failure this fixes.
    for (const r of [...currentState, ...byTitle, ...byContent]) {
      if (r && r.title && !seen.has(r.title)) { seen.add(r.title); merged.push(r); }
    }
    if (merged.length) return render(merged.slice(0, 5), ts);
  }
  // Nothing matched (or a pure "what's the latest" question): newest focused
  // public notes beat an empty context, which is what made the twin improvise.
  const recent = await get(`${sel}&and=(${pub},${cap})&order=updated_at.desc&limit=3`);
  const tail = [...currentState, ...(recent || [])];
  return tail.length ? render(tail.slice(0, 4), ts) : "";
}

/** Groq's daily token cap was hit. Distinct from "empty content" because it
 *  cannot be retried away — the budget is gone until the window resets. */
class QuotaExhausted extends Error {}

/**
 * Second generation provider, for when Groq's daily cap is gone.
 *
 * Groq's 200k-tokens/day cap is per ACCOUNT, so the existing gpt-oss-120b ->
 * 20b fallback buys nothing against it: one key, one budget, both models dead
 * at the same instant. Real redundancy needs a different company.
 *
 * Gemini is the pick because its free tier is separately metered, generous, and
 * Francisco already has a Google account — no new vendor relationship. It is
 * only ever reached when Groq is exhausted, so its own quota stays untouched on
 * a normal day and is full precisely when it's needed.
 *
 * With GEMINI_API_KEY unset this returns null and everything behaves exactly as
 * before: the curated fallback answers and the response says the quota is gone.
 * Adding the variable in Vercel is the whole install.
 */
/**
 * Model chain, newest first. More than one name because Google decommissions
 * these on its own schedule and answers a dead one with a 404, not a warning:
 * gemini-2.0-flash and gemini-2.5-flash were BOTH already dead when this key was
 * issued on 25 aug — and ListModels still advertised 2.5-flash as available, so
 * asking the API which models exist is not a reliable check.
 *
 * Groq taught the same lesson when llama-3.3-70b disappeared and took the twin
 * with it. A backup provider that 404s is worse than none: it looks configured.
 * `-latest` sits last as a catch-all for the day every pinned name above dies.
 */
const GEMINI_MODELS = ["gemini-3.6-flash", "gemini-3-flash-preview", "gemini-flash-latest"];

async function askGemini(system: string, message: string): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return "";
  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: system }] },
    contents: [{ role: "user", parts: [{ text: message }] }],
    generationConfig: { temperature: 0.4, maxOutputTokens: 900 },
  });
  for (const model of GEMINI_MODELS) {
    try {
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/` +
        `${model}:generateContent?key=${encodeURIComponent(key)}`,
        { method: "POST", headers: { "content-type": "application/json" }, body },
      );
      if (!r.ok) continue; // 404 = decommissioned; try the next name
      const d = await r.json();
      const text = (d?.candidates?.[0]?.content?.parts ?? [])
        .map((p: { text?: string }) => p?.text || "").join("").trim();
      if (text) return text;
    } catch { /* red o modelo caído: seguir con el siguiente */ }
  }
  return "";
}

/**
 * Cheap liveness for the watchdog: proves the twin COULD answer, without
 * spending the budget that lets it actually answer.
 *
 * Checks the two links that can independently break:
 *   brain  — retrieval really reads Supabase and gets notes back
 *   model  — Groq accepts the key and has budget left (1-token ping)
 *
 * `degraded` stays in the response because the watchdog keys off it. What
 * changed is that it can now be true for a NAMED reason instead of "the answer
 * looked short", which is what a rate-limited generation used to look like.
 */
async function healthCheck(key?: string) {
  const out: Record<string, unknown> = { health: true, degraded: false };

  // ── brain ──
  try {
    const ctx = await retrieve("¿quién es Francisco Guevara?");
    const chars = (ctx || "").length;
    out.brain = { ok: chars > 500, chars };
    if (chars <= 500) {
      out.degraded = true;
      out.reason = `retrieval devolvió ${chars} chars — Supabase vacío o filtrado de más`;
    }
  } catch (e) {
    out.brain = { ok: false, error: String(e).slice(0, 120) };
    out.degraded = true;
    out.reason = "no se pudo leer Supabase";
  }

  // ── model ──
  if (!key) {
    out.model = { ok: false, error: "sin GROQ_API_KEY" };
    out.degraded = true;
    out.reason = out.reason || "falta GROQ_API_KEY en Vercel";
  } else {
    try {
      const r = await fetch(GROQ_URL, {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: "user", content: "ok" }],
          max_tokens: 1,
        }),
      });
      if (r.ok) {
        out.model = { ok: true, model: MODEL };
      } else {
        // The 429 body is the ONLY place Groq states the daily budget. Carry the
        // message through verbatim so the alert says "199,285/200,000, resets in
        // 40m" instead of a bare "the twin is down".
        const body = await r.text();
        const msg = (() => {
          try { return JSON.parse(body)?.error?.message || body; } catch { return body; }
        })();
        // Groq is down, but the twin is only DOWN if the backup is down too —
        // so check before reporting. Calling it degraded while Gemini answers
        // fine would page Francisco about a working twin, and an alert that
        // cries wolf gets ignored exactly when it matters.
        const backup = process.env.GEMINI_API_KEY ? await askGemini("ok", "ok") : "";
        out.model = {
          ok: Boolean(backup), status: r.status,
          error: String(msg).slice(0, 300),
          ...(backup ? { servedBy: "gemini (respaldo)" } : {}),
        };
        if (backup) {
          out.note = "Groq caído; responde el respaldo. El twin sigue en pie.";
        } else {
          out.degraded = true;
          out.reason = r.status === 429
            ? `cuota de Groq agotada y sin respaldo — ${String(msg).slice(0, 160)}`
            : `Groq devolvió ${r.status} y no hay respaldo`;
        }
      }
    } catch (e) {
      out.model = { ok: false, error: String(e).slice(0, 120) };
      out.degraded = true;
      out.reason = out.reason || "no se pudo alcanzar Groq";
    }
  }

  out.connected = !out.degraded;
  // The old canary judged health by answer length. Keep a long-enough string so
  // an un-updated watchdog doesn't read a healthy twin as broken.
  out.reply = out.degraded
    ? `TWIN DEGRADADO: ${out.reason}`
    : "Health check OK — retrieval lee Supabase y el modelo responde. " +
      "Esta respuesta no consume presupuesto de generación.";
  return NextResponse.json(out);
}

export async function POST(req: NextRequest) {
  const key = process.env.GROQ_API_KEY;
  let message = "";
  try {
    message = (await req.json())?.message?.toString().trim().slice(0, MAX) || "";
  } catch {
    return NextResponse.json({ reply: "Couldn't read that." }, { status: 400 });
  }
  if (!message) return NextResponse.json({ reply: "Say something and I'll take a look." });

  // ?health=1 is the watchdog canary. It used to answer normally (just without
  // logging). That made the canary the single biggest consumer of the twin's
  // own budget: a full generation costs ~6,000 tokens, it ran every 30 minutes
  // = 48/day = ~288,000 tokens against Groq's 200,000/day free cap. The health
  // check alone could not fit inside the daily quota, so the monitor was what
  // took the twin down — on 25 aug the account sat at 199,285/200,000 and every
  // question needing real context failed while short ones still squeaked through.
  //
  // Now it verifies the same chain WITHOUT generating: retrieval really reads
  // Supabase, and the model is really reachable via a 1-token ping. ~10 tokens
  // instead of ~6,000. A 429 on that ping is more informative than a generation
  // anyway — it's the only place Groq states the DAILY budget, which never
  // appears in the x-ratelimit headers (those are per-minute).
  const isHealth = new URL(req.url).searchParams.get("health") === "1";
  if (isHealth) return healthCheck(key);

  // log the question (same table the HOTB reads)
  if (!isHealth) fetch(`${SUPABASE_URL}/rest/v1/twin_questions`, {
    method: "POST",
    headers: { "content-type": "application/json", apikey: SUPABASE_ANON, authorization: `Bearer ${SUPABASE_ANON}`, prefer: "return=minimal" },
    body: JSON.stringify({ question: message, level: 0, surface: "website-cloud" }),
  }).catch(() => {});

  if (!key) {
    return NextResponse.json({
      reply: "The cloud twin isn't fully configured yet (needs GROQ_API_KEY on Vercel). Try the main chat.",
      connected: false, needsKey: true,
    });
  }

  const [context, topics] = await Promise.all([
    retrieve(message),
    offerableTopics(SELECT_COLS, publicFilter()),
  ]);
  const system = `You are the public-facing digital twin of Francisco Guevara, answering ON BEHALF OF him for a website visitor. Speak about Francisco in the third person, warm and concise — one or two natural sentences, the way a colleague who admires him would introduce him. No dates, no figures, no family names, no private detail; for any sensitive topic give only its most surface version (e.g. "he has had past relationships" — nothing more). Only use the CONTEXT below — never invent facts. If it isn't there, say so plainly and offer a public topic.

This is Francisco as a person, not a project log: NEVER mention meetings, transcripts, "meet N", a collaborator named Maya, note titles, or how any of this was captured — speak as if you simply know him.

CURRENCY RULE: if a note titled "Estado Actual" appears in the CONTEXT, it describes what is true NOW and OVERRIDES every other note on any point where they disagree. The others are historical syntheses — true when written, not necessarily now. Never state something in the present tense that "Estado Actual" marks as ended, changed, or unconfirmed. Where it says a fact is unconfirmed, say it is unconfirmed rather than picking one version.

WHEN YOU DON'T HAVE THE ANSWER: say so in one plain sentence, then name TWO specific things from the AVAILABLE TOPICS list you could talk about instead. Never pad a thin answer to sound complete, and never offer a topic that isn't on that list — the point is to let the visitor see where the real content ends, not to keep the conversation going at the cost of accuracy.

AVAILABLE TOPICS (the only things you may offer):
${topics.length ? topics.map((t) => `- ${t}`).join("\n") : "- (none loaded)"}

CONTEXT:
${context || "(no public notes matched)"}
`;

  // gpt-oss spends reasoning tokens SEPARATELY from content — with too small a
  // budget the reasoning eats it all and content comes back EMPTY (the old
  // "I didn't get a clear answer" bug, which was intermittent per question).
  // Fix: a generous budget AND one retry with an even larger budget, so an
  // occasional over-long reasoning pass can't take the twin down.
  // Why `lastError` exists: this used to read `d?.choices?.[0]?...` and return ""
  // on anything unexpected. A 429 has no `choices`, so a quota wall and an
  // over-long reasoning pass produced the identical empty string, and all three
  // retries then burned against a quota that was already gone. The caller could
  // only report "temporarily unavailable" — true, useless, and it cost 40
  // minutes of guessing on 25 aug to find out the account was at 199,285/200,000.
  let lastError = "";
  async function ask(model: string, maxTokens: number): Promise<string> {
    const r = await fetch(GROQ_URL, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: system }, { role: "user", content: message }],
        max_tokens: maxTokens, temperature: 0.4,
      }),
    });
    if (!r.ok) {
      const body = await r.text();
      try { lastError = JSON.parse(body)?.error?.message || body; }
      catch { lastError = body; }
      lastError = `${r.status}: ${String(lastError).slice(0, 300)}`;
      // A daily-quota 429 will not clear on retry — retrying just makes the log
      // noisier and the recovery time longer. Signal "stop" to the caller.
      if (r.status === 429) throw new QuotaExhausted(lastError);
      return "";
    }
    const d = await r.json();
    return d?.choices?.[0]?.message?.content?.trim() || "";
  }

  try {
    // Model-level redundancy for the EMPTY-CONTENT failure only: gpt-oss spends
    // reasoning tokens separately, so a too-tight budget returns no content, and
    // a second model on a different capacity bucket usually answers.
    //
    // It does NOT protect against the daily quota — that cap is per ACCOUNT, and
    // both models share one key, so a 429 on the primary means the fallback is
    // already gone too. `ask` throws QuotaExhausted rather than returning "" so
    // these lines stop instead of firing two more doomed requests.
    // 900, no 2500. Groq cobra `max_tokens` RESERVADOS contra la cuota diaria,
    // se usen o no, y este twin responde en pocas frases: las respuestas reales
    // medidas el 25 ago iban de 278 a 1.400 caracteres, o sea 80-400 tokens.
    // Reservar 2500 pagaba ~2000 tokens de aire en cada pregunta.
    //
    // Con 200.000 tokens/día eso era la diferencia entre ~33 y ~50 preguntas
    // diarias — y a 33 el twin se caía solo, sin que nadie hiciera nada raro.
    let reply = await ask(MODEL, 900);
    if (!reply) reply = await ask(FALLBACK_MODEL, 900);
    // El tercer intento subía a 5000 y podía costar 10.000 tokens en una sola
    // pregunta fallida. 1400 da margen real al modelo que gasta tokens razonando
    // sin convertir un fallo en el 5% del presupuesto del día.
    if (!reply) reply = await ask(MODEL, 1400);
    if (reply) return NextResponse.json({ reply, connected: true });

    // Generation unavailable. Answer from the curated set if the question is one
    // of the common ones, and say plainly that the live twin is down rather than
    // returning a cheerful non-answer — which is what a visitor saw for every
    // single question while the quota was exhausted, with connected:true, so
    // nothing anywhere reported a problem.
    const canned = fallbackAnswer(message);
    return NextResponse.json({
      reply: canned
        ? canned + "\n\n_(Answering from a written summary — the live twin is " +
          "temporarily unavailable, so I can't go deeper than this right now.)_"
        : "The live twin is temporarily unavailable, so I can't answer that one " +
          "right now. I can still tell you about Francisco's background, his " +
          "skills, his time at Logitech, the AI Operating Map, or what a digital " +
          "twin is — or try again shortly.",
      connected: false,
      degraded: true,
      reason: lastError || "el modelo devolvió contenido vacío tres veces",
    });
  } catch (e) {
    if (e instanceof QuotaExhausted) {
      // Groq is out for the day. Try the other company before giving up — this
      // is the only path that reaches Gemini, so its free tier is still intact
      // exactly when Groq's isn't.
      try {
        const viaGemini = await askGemini(system, message);
        if (viaGemini) {
          return NextResponse.json({
            reply: viaGemini, connected: true, provider: "gemini",
            note: "Groq agotó su cuota diaria; respondió el proveedor secundario.",
          });
        }
      } catch { /* cae al resumen curado, abajo */ }

      // Name the wall. A visitor still gets the curated answer; whoever is
      // debugging gets the number and the reset time instead of a shrug.
      const canned = fallbackAnswer(message);
      return NextResponse.json({
        reply: canned
          ? canned + "\n\n_(Respuesta desde un resumen escrito — el twin en vivo " +
            "agotó su cuota diaria de generación y vuelve en unos minutos.)_"
          : "El twin en vivo agotó su cuota diaria de generación. Puedo contarte " +
            "sobre su experiencia, sus skills, su paso por Logitech o el AI " +
            "Operating Map — o probá de nuevo más tarde.",
        connected: false, degraded: true, quotaExhausted: true, reason: e.message,
      });
    }
    return NextResponse.json({
      reply: "Something went wrong reaching the cloud twin — try again.",
      connected: false, degraded: true, reason: String(e).slice(0, 200),
    });
  }
}
