import { NextRequest, NextResponse } from "next/server";

// Saves Francisco's manual Action Tracker changes (status + notes) from the HOTB
// to Supabase `tracker_updates`, so they persist beyond his browser AND the Mac
// mini can reconcile them into Airtable (and Claude gains awareness of the edit).
// Password-gated by the same middleware as /hotb.html.
export const runtime = "edge";
export const dynamic = "force-dynamic";

const SUPABASE_URL = "https://zgznqcopbgkfphubucpw.supabase.co";
const SUPABASE_ANON = "sb_publishable_bbSN-nNr0_t4bK-YP6QOCg_uNEsfOfe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const changes = Array.isArray(body?.changes) ? body.changes : [];
    if (!changes.length) return NextResponse.json({ ok: true, saved: 0 });
    const rows = changes.slice(0, 500).map((c: { id: string; status?: string; note?: string }) => ({
      action_id: String(c.id || "").slice(0, 64),
      status: c.status ? String(c.status).slice(0, 20) : null,
      note: c.note ? String(c.note).slice(0, 2000) : null,
    }));
    const r = await fetch(`${SUPABASE_URL}/rest/v1/tracker_updates`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: SUPABASE_ANON,
        authorization: `Bearer ${SUPABASE_ANON}`,
        prefer: "return=minimal",
      },
      body: JSON.stringify(rows),
    });
    return NextResponse.json({ ok: r.ok, saved: r.ok ? rows.length : 0 });
  } catch {
    return NextResponse.json({ ok: false, saved: 0 }, { status: 400 });
  }
}
