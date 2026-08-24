/**
 * twin-oauth.ts — Supabase-backed OAuth store for the cloud MCP connector.
 *
 * Ports the store half of scripts/twin_mcp/server.mjs off the Mac mini's local
 * .oauth_store.json, which is the last local-file dependency in the connector
 * path.
 *
 * WHAT THIS IS AND ISN'T — read before hardening it.
 * The original provider auto-approves every authorization request: it never
 * asks a human anything, it just redirects with a code. Combined with open
 * dynamic client registration, that means anyone who knows the URL can obtain
 * a bearer token. That is not an oversight being carried over blindly — a token
 * grants **level 0 (public) only**, exactly what the website already serves to
 * anonymous visitors. The real access control is the per-request `accessCode`
 * that unlocks deeper levels, and that gate is enforced separately.
 *
 * So: these tables hold ceremony, not secrets. They are readable/writable by
 * the anon key because the endpoint runs with it, and nothing in them grants
 * access to anything private. If that ever stops being true — if a token starts
 * carrying a level — this needs a real authorization step first.
 */

const SUPABASE_URL = "https://zgznqcopbgkfphubucpw.supabase.co";
const SUPABASE_ANON = "sb_publishable_bbSN-nNr0_t4bK-YP6QOCg_uNEsfOfe";

export const TOKEN_LIFETIME_MS = 30 * 24 * 60 * 60 * 1000; // 30 days, as before

const H = {
  apikey: SUPABASE_ANON,
  authorization: `Bearer ${SUPABASE_ANON}`,
  "content-type": "application/json",
};

async function sb(path: string, init?: RequestInit) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: { ...H, ...(init?.headers || {}) },
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`supabase ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const text = await r.text();
  return text ? JSON.parse(text) : null;
}

export type Client = {
  client_id: string;
  client_secret?: string | null;
  redirect_uris: string[];
  client_name?: string | null;
};

export async function registerClient(
  redirectUris: string[], name?: string,
): Promise<Client> {
  const client: Client = {
    client_id: crypto.randomUUID(),
    client_secret: crypto.randomUUID(),
    redirect_uris: redirectUris,
    client_name: name || null,
  };
  await sb("mcp_oauth_clients", {
    method: "POST",
    headers: { prefer: "return=minimal" },
    body: JSON.stringify(client),
  });
  return client;
}

export async function getClient(clientId: string): Promise<Client | null> {
  const rows = await sb(
    `mcp_oauth_clients?client_id=eq.${encodeURIComponent(clientId)}&limit=1`);
  return rows?.[0] || null;
}

export async function createCode(args: {
  clientId: string; redirectUri: string;
  codeChallenge?: string; scopes?: string[]; resource?: string;
}): Promise<string> {
  const code = crypto.randomUUID();
  await sb("mcp_oauth_codes", {
    method: "POST",
    headers: { prefer: "return=minimal" },
    body: JSON.stringify({
      code, client_id: args.clientId, redirect_uri: args.redirectUri,
      code_challenge: args.codeChallenge || null,
      scopes: args.scopes || [], resource: args.resource || null,
    }),
  });
  return code;
}

/** Single-use by construction: the row is deleted as it is read. */
export async function consumeCode(code: string) {
  const rows = await sb(`mcp_oauth_codes?code=eq.${encodeURIComponent(code)}&limit=1`);
  const row = rows?.[0];
  if (!row) return null;
  await sb(`mcp_oauth_codes?code=eq.${encodeURIComponent(code)}`, { method: "DELETE" });
  return row;
}

export async function issueToken(clientId: string, scopes: string[], resource?: string) {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + TOKEN_LIFETIME_MS).toISOString();
  await sb("mcp_oauth_tokens", {
    method: "POST",
    headers: { prefer: "return=minimal" },
    body: JSON.stringify({
      token, client_id: clientId, scopes, resource: resource || null,
      expires_at: expiresAt,
    }),
  });
  return { token, expiresIn: Math.floor(TOKEN_LIFETIME_MS / 1000) };
}

/** True when the bearer is a known, unexpired token. */
export async function verifyToken(token: string): Promise<boolean> {
  if (!token) return false;
  try {
    const rows = await sb(
      `mcp_oauth_tokens?token=eq.${encodeURIComponent(token)}` +
      `&expires_at=gt.${encodeURIComponent(new Date().toISOString())}&limit=1`);
    return Boolean(rows?.length);
  } catch {
    // Fail CLOSED. An unreachable store must not become an open door.
    return false;
  }
}

/** PKCE S256 check. Skipped only when the client never sent a challenge. */
export async function verifyPkce(
  challenge: string | null, verifier: string | undefined,
): Promise<boolean> {
  if (!challenge) return true;
  if (!verifier) return false;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  const b64 = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return b64 === challenge;
}
