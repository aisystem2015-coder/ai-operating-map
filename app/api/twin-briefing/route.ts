import { NextRequest, NextResponse } from "next/server";

// Cloud twin briefing — runs on a Vercel Cron once a day (see vercel.json),
// independent of the Mac. The Mac's scripts/twin_briefing.py stays as-is for
// Mac-service health (it inherently checks local processes); this is the part
// that must keep working when the Mac is asleep: twin activity + cloud health.
//
// It does NOT send anything to Francisco — an unsolicited daily message is a
// human's decision (same reason twin_briefing.py's --send is off). It writes a
// row to twin_briefings; read it from HOTB or query directly.
//
// Auth: Vercel injects `Authorization: Bearer ${CRON_SECRET}` on cron calls if
// CRON_SECRET is set. A manual GET without it still works (the output is just
// aggregate counts), but a set secret is checked when present.
export const runtime = "edge";
export const dynamic = "force-dynamic";

const SUPABASE_URL = "https://zgznqcopbgkfphubucpw.supabase.co";
const SUPABASE_ANON = "sb_publishable_bbSN-nNr0_t4bK-YP6QOCg_uNEsfOfe";
const SUPABASE_SECRET = process.env.SUPABASE_SECRET_KEY;

async function q(table: string, params: string, key = SUPABASE_ANON) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, {
    headers: { apikey: key, authorization: `Bearer ${key}` },
    cache: "no-store",
  });
  if (!r.ok) return [];
  return r.json().catch(() => []);
}

function isoHoursAgo(h: number) {
  return new Date(Date.now() - h * 3600_000).toISOString();
}

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization") || "";
    const manual = new URL(req.url).searchParams.get("key");
    if (auth !== `Bearer ${cronSecret}` && manual !== cronSecret) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  const since24 = isoHoursAgo(24);
  const readKey = SUPABASE_SECRET || SUPABASE_ANON;

  const [q24, qRecent, notesCount, notesFresh, healthRes] = await Promise.all([
    q("twin_questions", `select=level&ts=gte.${since24}`, readKey),
    q("twin_questions", `select=ts,question,level,surface&order=ts.desc&limit=15`, readKey),
    q("vault_notes", `select=path&limit=100000`, readKey),
    q("vault_notes", `select=updated_at&order=updated_at.desc&limit=1`, readKey),
    fetch(new URL("/api/twin-cloud?health=1", req.url).toString(), { cache: "no-store" })
      .then((r) => r.json())
      .catch(() => ({ health: false, degraded: true, reason: "health check unreachable" })),
  ]);

  const levels: Record<string, number> = {};
  for (const row of Array.isArray(q24) ? q24 : []) {
    const k = String(row?.level ?? 0);
    levels[k] = (levels[k] || 0) + 1;
  }
  const questions24h = Array.isArray(q24) ? q24.length : 0;
  const vaultNotes = Array.isArray(notesCount) ? notesCount.length : 0;
  const freshIso = Array.isArray(notesFresh) && notesFresh[0]?.updated_at
    ? notesFresh[0].updated_at
    : null;
  const vaultFreshMin = freshIso
    ? Math.round((Date.now() - new Date(freshIso).getTime()) / 60000)
    : null;

  const degraded = Boolean(healthRes?.degraded);
  const summary = [
    `${questions24h} preguntas al twin en 24h`,
    Object.keys(levels).length ? `(niveles: ${JSON.stringify(levels)})` : "",
    `· ${vaultNotes} notas en el cerebro`,
    vaultFreshMin != null ? `· última actualización hace ${vaultFreshMin} min` : "· sin dato de frescura",
    `· twin ${degraded ? "DEGRADADO: " + (healthRes?.reason || "?") : "OK"}`,
  ].filter(Boolean).join(" ");

  const row = {
    questions_24h: questions24h,
    levels,
    vault_notes: vaultNotes,
    vault_fresh_min: vaultFreshMin,
    health: healthRes,
    summary,
  };

  // Persist. Needs the service key to write past RLS; if it's missing we still
  // return the briefing (useful) but flag that it wasn't stored.
  let stored = false;
  if (SUPABASE_SECRET) {
    const w = await fetch(`${SUPABASE_URL}/rest/v1/twin_briefings`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SECRET,
        authorization: `Bearer ${SUPABASE_SECRET}`,
        "content-type": "application/json",
        prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    }).catch(() => null);
    stored = Boolean(w && w.ok);
  }

  return NextResponse.json({ ...row, stored, recent: qRecent });
}
