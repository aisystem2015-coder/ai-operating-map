/**
 * Plain-text dump of the twin's PUBLIC layer, read live from Supabase.
 *
 * WHY: Francisco wants his twin reachable from the Gemini app on his phone.
 * Gemini has no MCP connector without Spark, and Gemini CLI's config lives on
 * one machine's disk. Its app can only reach what it has a connector for —
 * Google products — or a URL it can fetch. This is that URL.
 *
 * His point, and it's correct: everything already lives in Supabase, so a copy
 * sitting in a Drive doc is a second source that can drift. This reads Supabase
 * on every request, so there is no copy and nothing to go stale. The Drive doc
 * stays as a fallback for the case where Gemini won't fetch a URL at all.
 *
 * WHAT IT EXPOSES: access_level <= 1 only — the same public layer the website
 * chat serves. `access_level IS NOT NULL` is load-bearing, not defensive
 * decoration: 261 of the vault's notes carry no level at all, including
 * personal material nobody ever classified, and this endpoint is unauthenticated
 * by design. Untagged is NOT public.
 */
import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const SUPABASE_URL = "https://zgznqcopbgkfphubucpw.supabase.co";
const SUPABASE_ANON = "sb_publishable_bbSN-nNr0_t4bK-YP6QOCg_uNEsfOfe";

const SKIP = ["README", "Adjuntos", "Índice", "Indice"];

/** Curated order: identity and current truth first, so a model that truncates
 *  the document keeps the part that matters most. */
const ORDER = [
  "Estado Actual",
  "Cómo Piensa Francisco",
  "Perfil de Persona — Consolidado",
  "Live CV",
  "Wins",
  "Qué es el Digital Twin — Industria y Síntesis para Francisco",
];

const PREAMBLE = `# Digital Twin de Francisco Guevara — capa pública

Leído en vivo desde su base de conocimiento. Solo material Nivel 0-1
(público / compartible). Nada privado.

## Si sos un modelo de IA leyendo esto

- Respondé SOLO con lo que está acá. Si algo no está, decilo — no lo completes
  con una suposición razonable.
- Hablá SOBRE Francisco en tercera persona, no como si fueras él.
- La sección "Estado Actual" GANA sobre cualquier otra si se contradicen. El
  resto son síntesis históricas: eran verdad cuando se escribieron.
- Si preguntan por su salud, finanzas, familia o temas íntimos: no está acá, y
  no se especula.

---
`;

export async function GET() {
  try {
    const url = `${SUPABASE_URL}/rest/v1/vault_notes` +
      `?select=title,content,access_level` +
      `&access_level=not.is.null&access_level=lte.1`;
    const r = await fetch(url, {
      headers: { apikey: SUPABASE_ANON, authorization: `Bearer ${SUPABASE_ANON}` },
      cache: "no-store",
    });
    if (!r.ok) throw new Error(`supabase ${r.status}`);
    const rows: { title: string; content: string }[] = await r.json();

    const notes = new Map<string, string>();
    for (const n of rows) {
      if (SKIP.some((s) => n.title.includes(s))) continue;
      notes.set(n.title, (n.content || "").replace(/^---\n[\s\S]*?\n---\n/, "").trim());
    }

    const ordered = [
      ...ORDER.filter((t) => notes.has(t)),
      ...[...notes.keys()].filter((t) => !ORDER.includes(t)).sort(),
    ];

    const body = PREAMBLE +
      `\nGenerado: ${new Date().toISOString().slice(0, 10)}\n` +
      ordered.map((t) => `\n\n# ${t}\n\n${notes.get(t)}\n`).join("\n");

    return new NextResponse(body, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        // No caching: the whole point over a Drive copy is that it can't go stale.
        "cache-control": "no-store, max-age=0",
      },
    });
  } catch {
    // Never emit a half-document that reads as complete — a model would answer
    // confidently from a truncated twin with no way to know it was truncated.
    return new NextResponse(
      "No se pudo leer la base de conocimiento de Francisco en este momento. " +
      "No respondas por él ni improvises: decí que su twin no está accesible ahora.",
      { status: 503, headers: { "content-type": "text/plain; charset=utf-8" } },
    );
  }
}
