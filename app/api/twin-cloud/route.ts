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
const MODEL = "llama-3.3-70b-versatile";
const MAX = 500;

async function retrieve(q: string) {
  // public-safe: access_level is null/0/1 only. keyword ILIKE over content.
  const url = `${SUPABASE_URL}/rest/v1/vault_notes?select=title,folder,content,access_level`
    + `&or=(access_level.is.null,access_level.lte.1)`
    + `&content=ilike.*${encodeURIComponent(q.slice(0, 40))}*&limit=5`;
  try {
    const r = await fetch(url, { headers: { apikey: SUPABASE_ANON, authorization: `Bearer ${SUPABASE_ANON}` }, cache: "no-store" });
    if (!r.ok) return "";
    const rows = await r.json();
    return (rows || []).map((n: { title: string; content: string }) =>
      `### ${n.title}\n${(n.content || "").replace(/^---\n[\s\S]*?\n---\n/, "").slice(0, 1600)}`).join("\n\n").slice(0, 9000);
  } catch {
    return "";
  }
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
  try {
    const r = await fetch(GROQ_URL, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: system }, { role: "user", content: message }],
        max_tokens: 500, temperature: 0.4,
      }),
    });
    const d = await r.json();
    const reply = d?.choices?.[0]?.message?.content?.trim();
    return NextResponse.json({ reply: reply || "I didn't get a clear answer — try rephrasing?", connected: true });
  } catch {
    return NextResponse.json({ reply: "Something went wrong reaching the cloud twin — try again.", connected: false });
  }
}
