import { NextRequest, NextResponse } from "next/server";

// Password-gate the Health of the Business control base (/hotb.html + its data)
// with HTTP Basic Auth. Everything else on the site stays public.
// Password comes from HOTB_PASSWORD env var on Vercel; falls back to a default
// Francisco should change. User can be anything; password is what matters.
const HOTB_PASSWORD = process.env.HOTB_PASSWORD || "fgailab2026";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/hotb.html" || pathname === "/ops_state.json") {
    const auth = req.headers.get("authorization");
    if (auth) {
      const [, encoded] = auth.split(" ");
      try {
        const [, pass] = atob(encoded).split(":");
        if (pass === HOTB_PASSWORD) return NextResponse.next();
      } catch {
        /* fall through to challenge */
      }
    }
    return new NextResponse("Authentication required — Health of the Business", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Health of the Business", charset="UTF-8"' },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/hotb.html", "/ops_state.json"],
};
