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

async function retrieve(q: string) {
  // public-safe: access_level null/0/1 only. This endpoint must never touch N2-4.
  const pub = "or(access_level.is.null,access_level.lte.1)";
  // Skip mega-notes (activity logs, full meeting transcripts of 200k+ chars):
  // they contain every keyword yet describe nothing, so ordering by size used
  // to surface pure noise. Focused notes are where the actual answers live.
  const cap = "char_count.lt.40000";
  const sel = `${SUPABASE_URL}/rest/v1/vault_notes?select=title,folder,content,access_level,updated_at,char_count`;
  const ts = terms(q);
  // FOCUSED notes first (char_count ascending), not the biggest dump.
  const order = wantsRecency(q) ? "updated_at.desc" : "char_count.asc";

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
    for (const r of [...byTitle, ...byContent]) {
      if (r && r.title && !seen.has(r.title)) { seen.add(r.title); merged.push(r); }
    }
    if (merged.length) return render(merged.slice(0, 5), ts);
  }
  // Nothing matched (or a pure "what's the latest" question): newest focused
  // public notes beat an empty context, which is what made the twin improvise.
  const recent = await get(`${sel}&and=(${pub},${cap})&order=updated_at.desc&limit=3`);
  return recent && recent.length ? render(recent, ts) : "";
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

  // log the question (same table the HOTB reads)
  fetch(`${SUPABASE_URL}/rest/v1/twin_questions`, {
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

  const context = await retrieve(message);
  const system = `You are the public-facing digital twin of Francisco Guevara, answering ON BEHALF OF him for a website visitor. Speak about Francisco in the third person, warm and concise (a few sentences). Only use the CONTEXT below — never invent facts. If it isn't there, say so plainly and offer a public topic.\n\nCONTEXT:\n${context || "(no public notes matched)"}\n`;

  // gpt-oss spends reasoning tokens SEPARATELY from content — with too small a
  // budget the reasoning eats it all and content comes back EMPTY (the old
  // "I didn't get a clear answer" bug, which was intermittent per question).
  // Fix: a generous budget AND one retry with an even larger budget, so an
  // occasional over-long reasoning pass can't take the twin down.
  const dbg: Record<string, unknown>[] = [];
  async function ask(maxTokens: number): Promise<string> {
    const r = await fetch(GROQ_URL, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: system }, { role: "user", content: message }],
        max_tokens: maxTokens, temperature: 0.4,
      }),
    });
    const d = await r.json();
    const choice = d?.choices?.[0];
    dbg.push({
      maxTokens, status: r.status, finish: choice?.finish_reason,
      contentLen: (choice?.message?.content || "").length,
      reasoningTok: d?.usage?.completion_tokens_details?.reasoning_tokens,
      err: d?.error?.message,
    });
    return choice?.message?.content?.trim() || "";
  }

  try {
    let reply = await ask(2000);
    if (!reply) reply = await ask(4000); // retry once with more headroom
    const body: Record<string, unknown> = {
      reply: reply || "I'm Francisco's digital twin — ask me about his work, background, or what he's building right now.",
      connected: true,
    };
    if (new URL(req.url).searchParams.get("debug") === "1") body.debug = { dbg, ctxLen: context.length };
    return NextResponse.json(body);
  } catch {
    return NextResponse.json({ reply: "Something went wrong reaching the cloud twin — try again.", connected: false });
  }
}
