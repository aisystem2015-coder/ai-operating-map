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
  const [visits, questions] = await Promise.all([
    q("web_visits", "select=ts,path,country,city,region,ip&order=ts.desc&limit=100"),
    q("twin_questions", "select=ts,question,level,surface&order=ts.desc&limit=50"),
  ]);
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
  return NextResponse.json({
    updated: new Date().toISOString(),
    visits_total: visits.length,
    visits_recent: visits.slice(0, 25),
    by_country: byCountry, by_city: byCity, by_path: byPath, by_hour: byHour,
    questions_total: questions.length,
    questions_recent: questions,
  });
}
