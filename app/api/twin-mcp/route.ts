/**
 * Cloud MCP connector for Francisco's Digital Twin.
 *
 * WHY THIS EXISTS: the original connector (scripts/twin_mcp/server.mjs) runs on
 * the Mac mini and shells out to a local Python script. Every part of that chain
 * — machine powered on, Tailscale funnel up, local process alive, correct
 * advertised URL — is a way for the connector to die, and Francisco leaves the
 * machine behind at the end of August. This serves the same tool from Vercel +
 * Supabase, the way the public website chat already does.
 *
 * SCOPE: levels 0-2. Levels 3-4 are encrypted at rest with PBKDF2-480k; that is
 * both too slow for a serverless request and a separate decision about where the
 * passphrase lives. Requests for 3-4 get an explicit "use the Mac connector for
 * that" instead of a confusing empty answer.
 *
 * Node runtime, not edge: PBKDF2 verification and the OAuth crypto need more CPU
 * headroom than edge allows.
 */
import { NextRequest, NextResponse } from "next/server";
import { retrieve, MAX_CLOUD_LEVEL } from "@/lib/twin-retrieval";
import {
  registerClient, getClient, createCode, consumeCode,
  issueToken, verifyToken, verifyPkce,
} from "@/lib/twin-oauth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = "https://zgznqcopbgkfphubucpw.supabase.co";
const SUPABASE_ANON = "sb_publishable_bbSN-nNr0_t4bK-YP6QOCg_uNEsfOfe";

/** Public base URL of THIS deployment — what OAuth clients are told to return to. */
function baseUrl(req: NextRequest) {
  // Derived from the request rather than hardcoded. The Mac connector broke
  // precisely because a hardcoded default drifted from the address that
  // actually reaches it, and every health check stayed green while connectors
  // failed mid-authorization.
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  return `${proto}://${host}`;
}

const LEVEL_PASSWORDS: Record<number, string | undefined> = {
  1: process.env.TWIN_LEVEL_1_PASSWORD,
  2: process.env.TWIN_LEVEL_2_PASSWORD,
  3: process.env.TWIN_LEVEL_3_PASSWORD,
  4: process.env.TWIN_LEVEL_4_PASSWORD,
};

/**
 * 1, not 0 — and this is a correctness fix, not a loosening.
 *
 * NOTHING in the vault is tagged access_level 0. Every genuinely public note
 * (Estado Actual, Perfil de Persona, Live CV, Wins, Qué es el Digital Twin) is
 * tagged 1, and the deployed website has always served `<= 1` to anonymous
 * visitors. So level 0 selects the empty set: an unauthenticated connector got
 * a payload with no notes and no core profile at all — the twin appearing to
 * know nothing about Francisco. Exactly the bug found in
 * twin_public_backend.mjs on 24 aug, reproduced here on the first end-to-end
 * test of this endpoint.
 */
const DEFAULT_LEVEL = 1;

function levelForCode(code?: string): number {
  if (!code) return DEFAULT_LEVEL;
  for (const [lvl, pw] of Object.entries(LEVEL_PASSWORDS)) {
    // Compare against configured passwords only. An unset env var must never
    // match an empty/undefined accessCode into granting a level.
    if (pw && code === pw) return Number(lvl);
  }
  // A WRONG code lands here. It must not be treated as "no code given": falling
  // back to DEFAULT_LEVEL would silently hand public access to someone who just
  // guessed at a password, and they'd get a plausible answer with no sign the
  // code was rejected. Same clamp the Mac connector uses.
  return 0;
}

const LEVEL_LABELS: Record<number, string> = {
  0: "Public", 1: "Shareable", 2: "Private / personal",
  3: "Sensitive / operational", 4: "Intimate",
};

function buildContextPayload(question: string, level: number, context: string) {
  const allowed = [0, 1, 2, 3, 4].filter((l) => l <= level);
  const voice = level > 0
    ? `Un código de acceso válido desbloqueó el nivel ${level} (${LEVEL_LABELS[level]}). ` +
      `Tratá a quien pregunta como Francisco mismo, o alguien en quien él confió este código.`
    : `Estás respondiendo para alguien que NO se identificó. Hablá SOBRE Francisco en ` +
      `tercera persona, nunca como si fueras él.`;
  return `${voice}

Esto NO es una respuesta terminada: son las NOTAS FUENTE de Francisco. Escribí vos la
respuesta a partir de esto, y decí claramente cuando algo no está acá — nunca lo inventes.

FILTRO DE PRIVACIDAD (no negociable):
- Solo podés usar contenido de niveles: ${allowed.join(", ")} (${allowed.map((l) => LEVEL_LABELS[l]).join(" / ")}).
- Si te piden algo de un nivel superior, decilo abiertamente y no parafrasees alrededor.

===== MATERIAL DE FRANCISCO (nivel ${level}) =====
${context}
===== FIN DEL MATERIAL =====`;
}

/** Fire-and-forget analytics, same table the HOTB reads. Never blocks a reply. */
function logQuestion(question: string, level: number) {
  fetch(`${SUPABASE_URL}/rest/v1/twin_questions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      apikey: SUPABASE_ANON, authorization: `Bearer ${SUPABASE_ANON}`,
      prefer: "return=minimal",
    },
    body: JSON.stringify({
      question: String(question || "").slice(0, 500),
      level, surface: "twin-mcp-cloud",
    }),
  }).catch(() => {});
}

const TOOL = {
  name: "ask_digital_twin",
  description:
    "Look up Francisco Guevara's own material about himself — his work, projects, " +
    "opinions, history, goals and journal — from his personal knowledge base. Returns " +
    "HIS SOURCE NOTES plus a core profile of who he is, NOT a finished answer: you write " +
    "the answer from what comes back, and you say so plainly when it isn't there. Use " +
    "this instead of guessing whenever the user is Francisco asking about himself, or " +
    "asks you to check 'my digital twin' / 'my notes'. If he gives an access code, pass " +
    "it as accessCode to unlock deeper levels.",
  inputSchema: {
    type: "object",
    properties: {
      question: { type: "string", description: "The question to ask the digital twin" },
      accessCode: { type: "string", description: "Optional access-level password, if Francisco provides one" },
    },
    required: ["question"],
  },
};

/**
 * Pull the token out of an Authorization header, tolerantly.
 *
 * Clients differ in what they do with a header a user typed by hand. Grok's
 * connector form takes raw headers, so if Francisco enters "Bearer <token>" and
 * the client also prepends its own scheme, the server sees
 * "Bearer Bearer <token>" — and a single-strip regex leaves "Bearer <token>" as
 * the token, which fails with an unhelpful "invalid token" while the token
 * itself is perfectly valid. Same for stray quotes or whitespace from a paste.
 *
 * Being permissive about the WRAPPER costs nothing: the token still has to
 * match a live row. This forgives formatting, not authentication.
 */
function extractBearer(header: string | null): string {
  let v = (header || "").trim();
  // Repeated scheme prefixes, any casing.
  while (/^Bearer\s+/i.test(v)) v = v.replace(/^Bearer\s+/i, "").trim();
  // Quotes some UIs add around a pasted value.
  v = v.replace(/^["']|["']$/g, "").trim();
  return v;
}

const jsonrpc = (id: unknown, result: unknown) =>
  NextResponse.json({ jsonrpc: "2.0", id, result });
const rpcError = (id: unknown, code: number, message: string) =>
  NextResponse.json({ jsonrpc: "2.0", id, error: { code, message } });

async function callTool(args: { question?: string; accessCode?: string }) {
  const question = String(args?.question || "").trim();
  if (!question) {
    return { content: [{ type: "text", text: "Falta la pregunta." }], isError: true };
  }
  const level = levelForCode(args?.accessCode);
  logQuestion(question, level);

  if (level > MAX_CLOUD_LEVEL) {
    // Say exactly what happened. A silent downgrade to public would look like
    // the twin "forgetting" his private material, which is worse than a refusal.
    return {
      content: [{ type: "text", text:
        `Ese código desbloquea el nivel ${level} (${LEVEL_LABELS[level]}), pero este ` +
        `conector en la nube solo sirve hasta el nivel ${MAX_CLOUD_LEVEL}. Los niveles 3 y 4 ` +
        `están cifrados en reposo y sólo se leen desde el conector de la Mac mini. ` +
        `Decíselo así a Francisco: no es que no exista la información, es que este ` +
        `canal no puede descifrarla.` }],
    };
  }

  const context = await retrieve(question, level);
  if (context === null) {
    return {
      content: [{ type: "text", text:
        "No pude leer la base de Francisco (la consulta a Supabase falló). Esto es una " +
        "falla del servidor, no una falta de información: no respondas por él ni " +
        "improvises, decile que el backend del twin está fallando." }],
      isError: true,
    };
  }
  return { content: [{ type: "text", text: buildContextPayload(question, level, context) }] };
}

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const path = url.searchParams.get("p") || "mcp";

  // ── OAuth: dynamic client registration ──
  if (path === "register") {
    const body = await req.json().catch(() => ({}));
    const uris: string[] = body?.redirect_uris || [];
    if (!uris.length) {
      return NextResponse.json({ error: "invalid_client_metadata" }, { status: 400 });
    }
    const c = await registerClient(uris, body?.client_name);
    return NextResponse.json({
      client_id: c.client_id, client_secret: c.client_secret,
      redirect_uris: c.redirect_uris, client_name: c.client_name,
      token_endpoint_auth_method: "none",
    }, { status: 201 });
  }

  // ── OAuth: code → token ──
  if (path === "token") {
    const form = await req.formData().catch(() => null);
    const get = (k: string) => (form?.get(k) as string | null) || undefined;
    const code = get("code");
    const verifier = get("code_verifier");
    const clientId = get("client_id");
    if (!code) return NextResponse.json({ error: "invalid_request" }, { status: 400 });

    const row = await consumeCode(code);
    if (!row) return NextResponse.json({ error: "invalid_grant" }, { status: 400 });
    if (clientId && row.client_id !== clientId) {
      return NextResponse.json({ error: "invalid_grant" }, { status: 400 });
    }
    if (!(await verifyPkce(row.code_challenge, verifier))) {
      return NextResponse.json({ error: "invalid_grant" }, { status: 400 });
    }
    const { token, expiresIn } = await issueToken(
      row.client_id, row.scopes || [], row.resource);
    return NextResponse.json({
      access_token: token, token_type: "bearer",
      expires_in: expiresIn, scope: (row.scopes || []).join(" "),
    });
  }

  // ── MCP JSON-RPC ──
  const bearer = extractBearer(req.headers.get("authorization"));
  if (!(await verifyToken(bearer))) {
    // The 401 + WWW-Authenticate challenge is what starts the OAuth dance in
    // every MCP client. Without the header they give up instead of registering.
    return new NextResponse(
      JSON.stringify({ error: "invalid_token" }),
      { status: 401, headers: {
          "content-type": "application/json",
          "WWW-Authenticate":
            `Bearer resource_metadata="${baseUrl(req)}/api/twin-mcp?p=protected-resource"`,
        } });
  }

  const body = await req.json().catch(() => null);
  if (!body || body.jsonrpc !== "2.0") return rpcError(null, -32600, "Invalid Request");
  const { id, method, params } = body;

  switch (method) {
    case "initialize":
      return jsonrpc(id, {
        protocolVersion: "2025-06-18",
        capabilities: { tools: {} },
        serverInfo: { name: "francisco-digital-twin", version: "2.0.0-cloud" },
      });
    case "notifications/initialized":
      return new NextResponse(null, { status: 202 });
    case "tools/list":
      return jsonrpc(id, { tools: [TOOL] });
    case "tools/call": {
      if (params?.name !== TOOL.name) return rpcError(id, -32602, `Unknown tool: ${params?.name}`);
      try {
        return jsonrpc(id, await callTool(params?.arguments || {}));
      } catch (e) {
        // Never leak a stack trace to a connector — it can carry note content.
        console.error("[twin-mcp-cloud] tool error:", e);
        return jsonrpc(id, {
          content: [{ type: "text", text:
            "El backend del twin falló. No respondas por Francisco ni inventes — " +
            "reportá que el conector está fallando." }],
          isError: true,
        });
      }
    }
    case "ping":
      return jsonrpc(id, {});
    default:
      return rpcError(id, -32601, `Method not found: ${method}`);
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const base = baseUrl(req);
  const self = `${base}/api/twin-mcp`;
  switch (url.searchParams.get("p")) {
    case "authorize": {
      // Auto-approve, matching the Mac connector exactly. A token grants level 0
      // (public) only — the real gate is the per-request accessCode — so there is
      // nothing here for a human to approve. See lib/twin-oauth.ts.
      const clientId = url.searchParams.get("client_id") || "";
      const redirectUri = url.searchParams.get("redirect_uri") || "";
      const client = await getClient(clientId);
      if (!client) return NextResponse.json({ error: "invalid_client" }, { status: 400 });
      if (!client.redirect_uris.includes(redirectUri)) {
        return NextResponse.json({ error: "invalid_redirect_uri" }, { status: 400 });
      }
      const code = await createCode({
        clientId, redirectUri,
        codeChallenge: url.searchParams.get("code_challenge") || undefined,
        scopes: (url.searchParams.get("scope") || "").split(" ").filter(Boolean),
        resource: url.searchParams.get("resource") || undefined,
      });
      const target = new URL(redirectUri);
      target.searchParams.set("code", code);
      const state = url.searchParams.get("state");
      if (state !== null) target.searchParams.set("state", state);
      return NextResponse.redirect(target.toString());
    }
    case "protected-resource":
      return NextResponse.json({
        resource: self,
        authorization_servers: [base],
      });
    default: {
      // AUTH CHALLENGE FIRST on a bare GET, matching the Mac connector, which
      // demonstrably works with real clients. Evidence, not guesswork: the Mac
      // server answers an unauthenticated GET with 401 + WWW-Authenticate,
      // while this one answered 405 — and Claude connected while Grok never
      // got past its connector screen.
      //
      // A client that probes with GET and receives 405 can reasonably conclude
      // the endpoint isn't usable and stop. Receiving 401 tells it exactly what
      // to do next: go read the discovery document and start OAuth. Only once
      // authenticated does the honest "no SSE here" answer make sense.
      const auth = extractBearer(req.headers.get("authorization"));
      if (!(await verifyToken(auth))) {
        return new NextResponse(
          JSON.stringify({ error: "invalid_token" }),
          { status: 401, headers: {
              "content-type": "application/json",
              "WWW-Authenticate":
                `Bearer resource_metadata="${base}/api/twin-mcp?p=protected-resource"`,
            } });
      }
      // Authenticated, but this transport has no server-push stream: JSON-RPC
      // over POST only. 405 is the correct answer per Streamable HTTP.
      return new NextResponse(
        JSON.stringify({
          error: "method_not_allowed",
          hint: "MCP endpoint: JSON-RPC over POST. SSE streaming is not supported.",
          maxLevel: MAX_CLOUD_LEVEL,
        }),
        { status: 405, headers: { "content-type": "application/json", allow: "POST" } },
      );
    }
  }
}
