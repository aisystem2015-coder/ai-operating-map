/**
 * Single source of truth for chart color roles.
 * Categorical order validated (all 6 checks pass) against surface #F4F3F5
 * via the dataviz skill's validate_palette.js — never reorder these slots.
 */

export const CATEGORICAL = [
  "#1BC4A6", // 1 emerald — brand / primary series
  "#2563EB", // 2 blue
  "#D97706", // 3 amber
  "#7C3AED", // 4 violet
  "#E11D48", // 5 rose
] as const;

// De-emphasis / "other" bucket — never used as a named-series identity color.
export const NEUTRAL = "#94A3B8";

// Fixed, never reused as a series color.
export const STATUS = {
  good: "#1BC4A6",
  warning: "#D97706",
  critical: "#E11D48",
} as const;

// Single-hue emerald ramp, light -> dark, for magnitude/maturity scales.
export const SEQUENTIAL_EMERALD = [
  "#D9F5EF",
  "#9FE3D5",
  "#4FCBB4",
  "#1BC4A6",
  "#0E7A68",
] as const;

// Two-series comparison (expectation vs. actual, before vs. after).
export const COMPARISON = {
  baseline: "#2563EB", // expected / before
  actual: "#1BC4A6", // actual / after — brand color wins the "real" value
} as const;

export const CHROME = {
  surface: "#FFFFFF",
  page: "#F4F3F5",
  gridline: "#E4E2E0", // one step off the page background
  axis: "#C9C7C3",
  textPrimary: "#111111",
  textSecondary: "#4B4B4B",
  textMuted: "#8A8886",
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
