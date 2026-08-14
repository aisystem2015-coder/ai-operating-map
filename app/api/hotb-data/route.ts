import { NextRequest, NextResponse } from "next/server";

// Returns the live data the Health of the Business dashboard needs from Supabase:
// recent web visits (country/city/hour by IP) and recent twin questions.
// Password-gated by the same middleware as /hotb.html. Reads with the Supabase
// key server-side so nothing sensitive reaches the client bundle.
export const runtime = "edge";
export const dynamic = "force-dynamic";

const SUPABASE_URL = "https://zgznqcopbgkfphubucpw.supabase.co";
const SUPABASE_ANON = "sb_publishable_bbSN-nNr0_t4bK-YP6QOCg_uNEsfOfe";

async function q(table: string, params: string) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, {
    headers: { apikey: SUPABASE_ANON, authorization: `Bearer ${SUPABASE_ANON}` },
    cache: "no-store",
  });
  if (!r.ok) return [];
  return r.json().catch(() => []);
}

export async function GET(_req: NextRequest) {
  const [visits, questions, opsRows, trackerRows] = await Promise.all([
    q("web_visits", "select=ts,path,country,city,region,ip&order=ts.desc&limit=100"),
    q("twin_questions", "select=ts,question,level,surface&order=ts.desc&limit=50"),
    q("ops_state", "select=updated,state&id=eq.1"),
    // The Action Tracker's shared state. Every HOTB "Save" appends a row to
    // tracker_updates; the current status/note for an action is simply its
    // newest row. Resolve latest-per-action_id here so the dashboard shows the
    // same saved state on EVERY device / incognito session — not just the
    // browser that made the edit. (Meet 22: Francisco's persistence bug.)
    q("tracker_updates", "select=action_id,status,note,id&order=id.desc&limit=5000"),
  ]);
  const ops = Array.isArray(opsRows) && opsRows[0] ? opsRows[0].state : null;
  // dedupe: rows arrive newest-first, so the first time we see an action_id is
  // its latest state. Skip anything already superseded by a newer row.
  const tracker: Record<string, { status: string | null; note: string | null }> = {};
  for (const r of Array.isArray(trackerRows) ? trackerRows : []) {
    const aid = r && r.action_id;
    if (!aid || tracker[aid]) continue;
    tracker[aid] = { status: r.status ?? null, note: r.note ?? null };
  }
  // aggregate for the dashboard
  const byCountry: Record<string, number> = {};
  const byCity: Record<string, number> = {};
  const byPath: Record<string, number> = {};
  const byHour: Record<string, number> = {};
  for (const v of visits) {
    if (v.country) byCountry[v.country] = (byCountry[v.country] || 0) + 1;
    if (v.city) byCity[v.city] = (byCity[v.city] || 0) + 1;
    if (v.path) byPath[v.path] = (byPath[v.path] || 0) + 1;
    const hr = (v.ts || "").slice(11, 13);
    if (hr) byHour[hr] = (byHour[hr] || 0) + 1;
  }
  // question frequency by day + by surface (Meet 21: Francisco wants a
  // question-frequency analytics view on twin usage)
  const qByDay: Record<string, number> = {};
  const qBySurface: Record<string, number> = {};
  const visitsByDay: Record<string, number> = {};
  for (const x of questions) {
    const d = (x.ts || "").slice(0, 10);
    if (d) qByDay[d] = (qByDay[d] || 0) + 1;
    if (x.surface) qBySurface[x.surface] = (qBySurface[x.surface] || 0) + 1;
  }
  for (const v of visits) {
    const d = (v.ts || "").slice(0, 10);
    if (d) visitsByDay[d] = (visitsByDay[d] || 0) + 1;
  }
  return NextResponse.json({
    updated: new Date().toISOString(),
    visits_total: visits.length,
    visits_recent: visits.slice(0, 25),
    by_country: byCountry, by_city: byCity, by_path: byPath, by_hour: byHour,
    visits_by_day: visitsByDay,
    questions_total: questions.length,
    questions_recent: questions,
    q_by_day: qByDay, q_by_surface: qBySurface,
    tracker, // {action_id: {status, note}} — shared Action Tracker state for all devices
    ops, // live systems/devices/connections state, pushed by the Mac mini every ~2 min
  });
}
