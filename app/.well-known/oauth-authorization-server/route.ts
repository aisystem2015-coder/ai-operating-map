/**
 * OAuth discovery for the cloud MCP connector.
 *
 * MCP clients (Grok, Claude, ChatGPT) fetch this well-known path first to learn
 * where to register and where to get a token. Without it they stop at the 401
 * instead of starting the flow.
 *
 * Every URL is derived from the incoming request rather than hardcoded. That is
 * a direct lesson from the Mac connector, which broke because a hardcoded
 * default drifted from the address that actually reached it — and every health
 * check stayed green while clients failed mid-authorization.
 */
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(req: NextRequest) {
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  const base = `${proto}://${host}`;
  const mcp = `${base}/api/twin-mcp`;
  return NextResponse.json({
    issuer: base,
    authorization_endpoint: `${mcp}?p=authorize`,
    token_endpoint: `${mcp}?p=token`,
    registration_endpoint: `${mcp}?p=register`,
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code"],
    code_challenge_methods_supported: ["S256"],
    token_endpoint_auth_methods_supported: ["none", "client_secret_post"],
  });
}
