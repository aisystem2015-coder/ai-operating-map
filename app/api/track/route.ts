import { NextRequest, NextResponse } from "next/server";

// Visitor tracking (11 aug 2026): logs each page view with Vercel's geo headers
// (country, city, region) + IP + path into Supabase `web_visits`. The Health of
// the Business control base reads this for real visitor analytics (who, from
// where, when). Uses the Supabase publishable key (safe to expose) — the table's
// RLS only allows INSERT from anon, never read.
export const runtime = "edge";

const SUPABASE_URL = "https://zgznqcopbgkfphubucpw.supabase.co";
const SUPABASE_ANON = "sb_publishable_bbSN-nNr0_t4bK-YP6QOCg_uNEsfOfe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const h = req.headers;
    const row = {
      path: (body?.path || "/").slice(0, 200),
      country: h.get("x-vercel-ip-country") || "",
      city: decodeURIComponent(h.get("x-vercel-ip-city") || ""),
      region: h.get("x-vercel-ip-country-region") || "",
      ip: (h.get("x-real-ip") || h.get("x-forwarded-for") || "").split(",")[0],
      ua: (h.get("user-agent") || "").slice(0, 300),
      referrer: (body?.referrer || "").slice(0, 200),
    };
    // fire-and-forget insert
    await fetch(`${SUPABASE_URL}/rest/v1/web_visits`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: SUPABASE_ANON,
        authorization: `Bearer ${SUPABASE_ANON}`,
        prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
  } catch {
    /* tracking must never break navigation */
  }
  return new NextResponse(null, { status: 204 });
}
