/**
 * Color tokens for /create-your-digital-twin ONLY.
 *
 * This page is a deliberate, one-off exception to the main site's
 * emerald-only rule (see the project CLAUDE.md) — a separate, richly
 * colored product-marketing page. Do not import these into any other
 * page; do not add them to tailwind.config.ts as global tokens.
 *
 * Exact hex values as briefed. Note: Tailwind's default `indigo-500` /
 * `sky-500` / `amber-500` happen to match indigo/sky/amber exactly, but
 * the briefed "rose" value (#EC4899) is actually Tailwind's `pink-500`,
 * not `rose-500` (#F43F5E) — so every color on this page is applied via
 * arbitrary-value hex, never a Tailwind color name, to avoid that
 * mismatch silently drifting the palette.
 */
export const TWIN = {
  indigo: "#6366F1", // primary
  sky: "#0EA5E9", // secondary / trust
  amber: "#F59E0B", // CTA / energy
  rose: "#EC4899", // accent / highlight — use sparingly
  bg: "#FAFAFF",
  text: "#0F172A", // slate-900
  muted: "#475569", // slate-600 — minimum for muted text, never lighter
} as const;

// Escalating indigo -> sky -> amber progression for the 5-step "how to
// build your own" journey (Section 5) — reads as a path, not five random
// swatches.
export const STEP_GRADIENT = [
  TWIN.indigo,
  "#4C6EF5",
  "#2F97F0",
  TWIN.sky,
  TWIN.amber,
] as const;
