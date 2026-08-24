/**
 * OAuth handlers for the cloud MCP connector, shared by the real path routes
 * (/api/twin-mcp/authorize, /token, /register) and the legacy ?p= forms.
 *
 * WHY REAL PATHS EXIST AT ALL — the bug that forced this:
 * The endpoints were originally only reachable as query params on the MCP URL
 * (`/api/twin-mcp?p=authorize`). Grok builds its authorization URL by appending
 * its own parameters with a "?", assuming the endpoint has no query string, and
 * produced:
 *
 *   /api/twin-mcp?p=authorize?response_type=code&client_id=...
 *
 * Two question marks. `p` then parses as "authorize?response_type=code", misses
 * the authorize branch, falls through to the MCP endpoint, and answers 401 —
 * so Francisco saw "invalid token" on a flow that had never reached
 * authorization. Claude happened to append with "&" and worked, which is why
 * only one client broke.
 *
 * Appending "?" to a URL that already has a query is the client's bug, but
 * relying on clients to get that right is mine. Real paths remove the trap.
 * The ?p= forms stay working so the connectors already registered keep going.
 */
import { NextRequest, NextResponse } from "next/server";
import {
  registerClient, getClient, createCode, consumeCode, issueToken, verifyPkce,
} from "@/lib/twin-oauth";

export function baseUrl(req: NextRequest) {
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  return `${proto}://${host}`;
}

/** POST /register — dynamic client registration. */
export async function handleRegister(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const uris: string[] = body?.redirect_uris || [];
  if (!uris.length) {
    return NextResponse.json({ error: "invalid_client_metadata" }, { status: 400 });
  }
  const c = await registerClient(uris, body?.client_name);
  return NextResponse.json({
    client_id: c.client_id,
    client_secret: c.client_secret,
    redirect_uris: c.redirect_uris,
    client_name: c.client_name,
    token_endpoint_auth_method: "none",
  }, { status: 201 });
}

/** POST /token — authorization code exchange (PKCE). */
export async function handleToken(req: NextRequest) {
  // Accept form-encoded (the spec) and JSON, because clients differ and a
  // wrong content-type here is another silent "invalid_grant".
  let get: (k: string) => string | undefined;
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("json")) {
    const j = await req.json().catch(() => ({} as Record<string, string>));
    get = (k) => j?.[k];
  } else {
    const f = await req.formData().catch(() => null);
    get = (k) => (f?.get(k) as string | null) || undefined;
  }

  const code = get("code");
  if (!code) return NextResponse.json({ error: "invalid_request" }, { status: 400 });

  const row = await consumeCode(code);
  if (!row) return NextResponse.json({ error: "invalid_grant" }, { status: 400 });

  const clientId = get("client_id");
  if (clientId && row.client_id !== clientId) {
    return NextResponse.json({ error: "invalid_grant" }, { status: 400 });
  }
  if (!(await verifyPkce(row.code_challenge, get("code_verifier")))) {
    return NextResponse.json({ error: "invalid_grant" }, { status: 400 });
  }

  const { token, expiresIn } = await issueToken(row.client_id, row.scopes || [], row.resource);
  return NextResponse.json({
    access_token: token,
    token_type: "bearer",
    expires_in: expiresIn,
    scope: (row.scopes || []).join(" "),
  });
}

/** GET /authorize — auto-approves; a token grants level 1 only (see twin-oauth). */
export async function handleAuthorize(req: NextRequest) {
  const url = new URL(req.url);
  const p = url.searchParams;

  // Salvage a malformed URL rather than failing the user. A client that appends
  // with "?" leaves the real parameters glued to this one; parse them out
  // instead of rejecting a flow that is otherwise perfectly valid.
  let clientId = p.get("client_id") || "";
  let redirectUri = p.get("redirect_uri") || "";
  let challenge = p.get("code_challenge") || undefined;
  let state = p.get("state");
  let scope = p.get("scope") || "";
  let resource = p.get("resource") || undefined;

  const glued = p.get("p");
  if (glued && glued.includes("?")) {
    const extra = new URLSearchParams(glued.slice(glued.indexOf("?") + 1));
    clientId = clientId || extra.get("client_id") || "";
    redirectUri = redirectUri || extra.get("redirect_uri") || "";
    challenge = challenge || extra.get("code_challenge") || undefined;
    state = state ?? extra.get("state");
    scope = scope || extra.get("scope") || "";
    resource = resource || extra.get("resource") || undefined;
  }

  const client = await getClient(clientId);
  if (!client) return NextResponse.json({ error: "invalid_client" }, { status: 400 });
  if (!client.redirect_uris.includes(redirectUri)) {
    return NextResponse.json({
      error: "invalid_redirect_uri",
      hint: "redirect_uri does not match the one registered for this client",
    }, { status: 400 });
  }

  const code = await createCode({
    clientId, redirectUri, codeChallenge: challenge,
    scopes: scope.split(" ").filter(Boolean), resource,
  });
  const target = new URL(redirectUri);
  target.searchParams.set("code", code);
  if (state !== null) target.searchParams.set("state", state);
  return NextResponse.redirect(target.toString());
}

/** GET /protected-resource — RFC 9728 metadata, pointed at by WWW-Authenticate. */
export function handleProtectedResource(req: NextRequest) {
  const base = baseUrl(req);
  return NextResponse.json({
    resource: `${base}/api/twin-mcp`,
    authorization_servers: [base],
  });
}
