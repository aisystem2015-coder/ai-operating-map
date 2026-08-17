/**
 * Single source of truth for chart color roles.
 * Categorical order validated (all 6 checks pass) against surface #F4F3F5
 * via the dataviz skill's validate_palette.js — never reorder these slots.
 */

// Francisco brand palette (2026-08-14): signal blue is the brand/primary color;
// retired the old emerald #1BC4A6. Slots kept distinct + legible on the paper ground.
export const CATEGORICAL = [
  "#2563EB", // 1 signal blue — brand / primary series
  "#0a1838", // 2 ink navy
  "#D4956A", // 3 warm (editorial accent)
  "#7C3AED", // 4 violet
  "#E11D48", // 5 rose
] as const;

// De-emphasis / "other" bucket — never used as a named-series identity color.
export const NEUTRAL = "#94A3B8";

// Fixed, never reused as a series color.
export const STATUS = {
  good: "#22C55E",
  warning: "#F59E0B",
  critical: "#F87171",
} as const;

// Single-hue blue ramp, light -> dark, for magnitude/maturity scales.
export const SEQUENTIAL_EMERALD = [
  "#dbeafe",
  "#93b4fb",
  "#3b82f6",
  "#2563eb",
  "#1e3a8a",
] as const;

// Two-series comparison (expectation vs. actual, before vs. after).
export const COMPARISON = {
  baseline: "#0a1838", // expected / before — ink navy
  actual: "#2563EB", // actual / after — brand signal blue wins the "real" value
} as const;

export const CHROME = {
  surface: "#FFFFFF",
  page: "#fafaf7",
  gridline: "#e5e7eb", // one step off the page background
  axis: "#c9c7c3",
  textPrimary: "#0a1838",
  textSecondary: "#2a3654",
  textMuted: "#6b7280",
} as const;

// Mark specs shared by every chart in this folder.
export const MARK = {
  barThickness: 22, // px, <= 24
  barRadius: 4,
  gap: 2, // surface gap between adjacent/stacked bars
  ringWidth: 2, // surface ring around dots/markers
  lineWidth: 2,
  minMarker: 8,
} as const;
