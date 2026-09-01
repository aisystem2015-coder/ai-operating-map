/**
 * twin-retrieval.ts — the twin's brain lookup, running in the cloud.
 *
 * A TypeScript port of the retrieval half of scripts/brain_retrieve.py, so the
 * MCP connector no longer needs a Python subprocess on Francisco's Mac mini.
 * That subprocess was the whole reason the connector died whenever the Mac was
 * off — and he leaves the machine behind at the end of August.
 *
 * SCOPE, deliberately: levels 0-2 only. Levels 3-4 are encrypted at rest with
 * PBKDF2-480k, which is far too slow for an edge function and is a separate
 * decision about where the passphrase lives. Callers asking for 3-4 get a clear
 * "not available here" rather than silence — see MAX_CLOUD_LEVEL.
 *
 * Kept faithful to the Python on the parts that are load-bearing:
 *   - the access-level clause, including "untagged is NOT public"
 *   - Estado Actual first, always, with the currency rule
 *   - persona-first ordering so identity answers come from his own words
 *   - OR across meaningful terms, never AND (the 14 aug bug)
 */

const SUPABASE_URL = "https://zgznqcopbgkfphubucpw.supabase.co";
const SUPABASE_ANON = "sb_publishable_bbSN-nNr0_t4bK-YP6QOCg_uNEsfOfe";

/** Above this, content is encrypted at rest and only the Mac can read it. */
export const MAX_CLOUD_LEVEL = 2;

/**
 * Untagged notes are NOT public. 261 of ~324 vault notes carry no access_level,
 * including raw Drive dumps and personal material nobody ever classified.
 * Mirrors UNCLASSIFIED_MIN_LEVEL in brain_retrieve.py — keep the two in step.
 */
const UNCLASSIFIED_MIN_LEVEL = 2;

/**
 * 3a (Francisco, 31 aug 2026, "back to basics"): the twin is Francisco-the-
 * person, not the project record. Retrieval is hard-scoped to his persona
 * folder — never the raw Drive mirror ("09 - Drive Sync" = meeting transcripts
 * + sprint docs), which is what used to make the twin answer "según Maya en el
 * meet 21". Mirrors PERSONA_FOLDER in brain_retrieve.py.
 */
const PERSONA_FOLDER = "05 - Contexto Fran";

const MAX_NOTE_CHARS = 2200;
const MAX_TOTAL_CHARS = 24000; // measured optimum, see brain_retrieve.py
const CORE_MAX_PER_NOTE = 2600;

/** Always present, in this order, so identity never depends on a search hit. */
const CORE_TITLES = [
  "Estado Actual", // what is true NOW — overrides the rest on conflict
  "Perfil de Persona — Consolidado",
  "Personal — Fran Guevara",
  "Objetivos",
  "Negocio — Logitech",
  "Estrategia — Going Bullish",
];

const STOP = new Set(
  ("a al algo alguna algunas alguno algunos ante antes como con contra cual cuales cuando " +
   "cuanto de del desde donde dos el ella ellas ellos en entre era eres es esa esas ese eso " +
   "esos esta estas este esto estos fue fui ha hace hacia han hasta hay la las le les lo los " +
   "mas me mi mis mucho muy nos otra otro para pero poco por porque que quien se ser si sin " +
   "sobre solo son soy su sus tambien tan te tiene todo todos tu tus un una uno unos ya yo " +
   "about all and any are as at be been but by can dame did do does for from get give had " +
   "has have how its just like me most my not of on or our out please show some tell that " +
   "the their them then there these they this to under up us was we what when where which " +
   "who why will with you your").split(" "),
);

const RECENCY = new Set([
  "ultimo", "ultima", "ultimos", "ultimas", "reciente", "recientes", "hoy", "ayer",
  "anoche", "nuevo", "nueva", "latest", "last", "recent", "today", "yesterday", "newest",
]);

const fold = (w: string) => w.normalize("NFD").replace(/[̀-ͯ]/g, "");

export function searchTerms(q: string): string[] {
  const out: string[] = [];
  for (const w of (q || "").toLowerCase().match(/[0-9a-zà-ÿñ]{3,}/g) || []) {
    const f = fold(w);
    if (STOP.has(f) || RECENCY.has(f)) continue;
    // Postgres 'simple' does no accent folding, so a note written "escribí"
    // is missed by a search for "escribi". Search both forms when they differ.
    for (const form of f !== w ? [w, f] : [w]) if (!out.includes(form)) out.push(form);
  }
  return out.slice(0, 8);
}

export const wantsRecency = (q: string) =>
  ((q || "").toLowerCase().match(/[0-9a-zà-ÿñ]{3,}/g) || []).some((w) => RECENCY.has(fold(w)));

/**
 * PostgREST equivalent of level_clause() + the persona-folder scope in
 * brain_retrieve.py. Always ANDs `folder = PERSONA_FOLDER`, so nothing outside
 * the Digital Twin folder is ever retrievable by the twin.
 */
function levelFilter(maxLevel: number): string {
  const lvl = maxLevel >= UNCLASSIFIED_MIN_LEVEL
    ? `or(access_level.lte.${maxLevel},access_level.is.null)`
    : `access_level.lte.${maxLevel}`;
  return `${lvl},folder.eq.${encodeURIComponent(PERSONA_FOLDER)}`;
}

type Note = {
  title: string; folder: string | null; content: string;
  access_level: number | null; updated_at?: string; char_count?: number;
};

async function q(url: string): Promise<Note[]> {
  try {
    const r = await fetch(url, {
      headers: { apikey: SUPABASE_ANON, authorization: `Bearer ${SUPABASE_ANON}` },
      cache: "no-store",
    });
    return r.ok ? ((await r.json()) as Note[]) : [];
  } catch {
    return [];
  }
}

const SELECT = `${SUPABASE_URL}/rest/v1/vault_notes` +
  `?select=title,folder,content,access_level,updated_at,char_count`;

function stripFrontmatter(s: string) {
  return (s || "").replace(/^---\n[\s\S]*?\n---\n/, "").trim();
}

/** Identity block, shipped in full before any search runs. */
async function coreBlock(maxLevel: number): Promise<string> {
  const titles = CORE_TITLES.map((t) => `"${t}"`).join(",");
  const rows = await q(`${SELECT}&title=in.(${encodeURIComponent(titles)})` +
    `&and=(${levelFilter(maxLevel)})`);
  const byTitle = new Map(rows.map((r) => [r.title, r]));
  const out: string[] = [];
  for (const t of CORE_TITLES) {           // curated order, not DB order
    const n = byTitle.get(t);
    if (!n) continue;
    const body = stripFrontmatter(n.content);
    if (!body) continue;
    out.push(`### ${t}  (nivel ${n.access_level ?? "—"})\n${body.slice(0, CORE_MAX_PER_NOTE)}\n`);
  }
  return out.join("\n");
}

/**
 * Returns a prompt-ready context block, or null when the backend itself failed.
 * null is meaningful: the caller must say the backend is broken rather than
 * answering for Francisco from nothing — the 14 aug failure mode.
 */
export async function retrieve(question: string, maxLevel: number): Promise<string | null> {
  const level = Math.min(maxLevel, MAX_CLOUD_LEVEL);
  const terms = searchTerms(question);
  const lf = levelFilter(level);
  const recent = wantsRecency(question);

  let core: string;
  try {
    core = await coreBlock(level);
  } catch {
    return null;
  }

  // Skip mega-notes: activity logs and full transcripts contain every keyword
  // and describe nothing.
  const cap = "char_count.lt.40000";
  const order = recent ? "updated_at.desc" : "char_count.asc";

  let hits: Note[] = [];
  if (terms.length) {
    // OR across terms — never AND. plainto_tsquery ANDing every word returned
    // zero rows for every real question (fixed 14 aug 2026).
    const ors = terms.flatMap((t) => [`title.ilike.*${t}*`, `content.ilike.*${t}*`]).join(",");
    const byTitle = await q(`${SELECT}&and=(${lf},or(${terms.map((t) => `title.ilike.*${t}*`).join(",")}))&order=${order}&limit=4`);
    const byContent = await q(`${SELECT}&and=(${lf},${cap},or(${ors}))&order=${order}&limit=6`);
    const seen = new Set<string>();
    for (const r of [...byTitle, ...byContent]) {
      if (r?.title && !seen.has(r.title)) { seen.add(r.title); hits.push(r); }
    }
  }
  if (!hits.length) {
    hits = await q(`${SELECT}&and=(${lf},${cap})&order=updated_at.desc&limit=3`);
  }

  const parts: string[] = [];
  if (core) {
    parts.push("## PERFIL BASE DE FRANCISCO (siempre presente, no depende de la búsqueda)\n");
    parts.push(
      "> **REGLA DE VIGENCIA:** si la nota `Estado Actual` contradice a cualquier otra, " +
      "gana `Estado Actual`. Las demás son síntesis históricas — describen lo que era " +
      "verdad cuando se escribieron. No afirmes en presente algo que `Estado Actual` " +
      "marca como terminado, cambiado o no confirmado.\n");
    parts.push(core);
    parts.push("\n## NOTAS RELEVANTES A LA PREGUNTA\n");
  }

  if (!hits.length) {
    parts.push(
      `(sin coincidencias para: ${terms.join(", ") || "(sin términos útiles)"} — la base ` +
      `respondió pero no hay nada escrito sobre eso. Decilo así, no inventes. Respondé con ` +
      `el perfil base de arriba si alcanza.)`);
    return parts.join("\n");
  }

  let total = 0;
  const seenTitles = new Set<string>();
  for (const n of hits) {
    if (seenTitles.has(n.title)) continue;
    seenTitles.add(n.title);
    const body = stripFrontmatter(n.content).slice(0, MAX_NOTE_CHARS);
    if (!body) continue;
    const when = n.updated_at ? n.updated_at.slice(0, 10) : "sin fecha";
    const block = `### ${n.title}  (nivel ${n.access_level ?? "—"} · ${when})\n${body}\n`;
    // `continue`, not `break`: one oversized note must not discard the smaller,
    // more relevant ones behind it.
    if (total + block.length > MAX_TOTAL_CHARS) continue;
    parts.push(block);
    total += block.length;
  }
  return parts.join("\n");
}
