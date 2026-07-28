import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * "Want your own?" interest capture, ported from digital_twin_site.
 * Client-side only, no real email send — hard rule in this workspace
 * (never send emails on Francisco's behalf). Appends an entry to a local
 * JSON file in the AI_Lab repo root so Francisco can see who's interested.
 *
 * process.cwd() for this Next.js app is projects/ai_operating_map_package,
 * not the AI_Lab repo root — resolve two directories up explicitly.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface WaitlistEntry {
  name: string;
  email: string;
  timestamp: string;
}

const WAITLIST_PATH = path.resolve(process.cwd(), "..", "..", "outputs", "digital_twin_waitlist.json");

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  let name = "";
  let email = "";
  try {
    const body = await request.json();
    name = typeof body?.name === "string" ? body.name.trim().slice(0, 200) : "";
    email = typeof body?.email === "string" ? body.email.trim().slice(0, 200) : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  if (!name || !email || !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Name and a valid email are required." }, { status: 400 });
  }

  const entry: WaitlistEntry = { name, email, timestamp: new Date().toISOString() };

  try {
    await fs.mkdir(path.dirname(WAITLIST_PATH), { recursive: true });

    let existing: WaitlistEntry[] = [];
    try {
      const raw = await fs.readFile(WAITLIST_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) existing = parsed;
    } catch {
      // File doesn't exist yet, or is malformed — start fresh rather than fail the request.
    }

    existing.push(entry);
    await fs.writeFile(WAITLIST_PATH, JSON.stringify(existing, null, 2), "utf-8");

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Write failed." },
      { status: 500 },
    );
  }
}
