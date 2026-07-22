import { NextRequest, NextResponse } from "next/server";

/**
 * TODO(Meet 16, 2026-07-21): stub only — there is no deployed backend this
 * app can call for a live, Obsidian-grounded Digital Twin chat yet. The
 * real thing currently only exists locally (Obsidian Copilot plugin) and
 * via two private Telegram bots — none of them expose a public API this
 * Next.js app can hit. Deploying the knowledge bank via MCP to the cloud
 * is still an open, undecided idea from the same meeting.
 *
 * Wire this route up to that endpoint once it exists. Until then it
 * returns an honest "not connected yet" reply — never a fabricated AI
 * answer — so the chat widget on /digital-twin stays truthful about what
 * is and isn't live.
 */
export async function POST(request: NextRequest) {
  let question = "";
  try {
    const body = await request.json();
    question = typeof body?.message === "string" ? body.message.trim() : "";
  } catch {
    // Malformed body — still return the honest stub reply below.
  }

  const quoted = question ? ` about "${question.slice(0, 140)}"` : "";

  return NextResponse.json({
    connected: false,
    reply:
      `Thanks for asking${quoted}. This chat isn't wired up to a live model yet — ` +
      "there's no deployed backend behind it. The real, Obsidian-grounded version of " +
      "this twin currently only runs locally and through two private Telegram bots, " +
      "nothing public-facing. Making that public is the next build, not a finished feature.",
  });
}
