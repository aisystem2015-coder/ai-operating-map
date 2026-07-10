"use client";

import { COMPARISON, CHROME } from "./tokens";
import ChartSource from "./ChartSource";

export default function ProportionBar({
  title,
  baseline,
  actual,
  baselineLabel = "Expected",
  actualLabel = "Actual",
  baselineValueLabel,
  actualValueLabel,
  description,
  sourceLabel,
  sourceHref,
}: {
  title?: string;
  baseline: number; // 0-100
  actual: number; // 0-100
  baselineLabel?: string;
  actualLabel?: string;
  baselineValueLabel?: string;
  actualValueLabel?: string;
  description?: string;
  sourceLabel?: string;
  sourceHref?: string;
}) {
  const background = `linear-gradient(to right,
    ${COMPARISON.actual} 0%,
    ${COMPARISON.actual} ${actual}%,
    ${COMPARISON.baseline} ${actual}%,
    ${COMPARISON.baseline} ${baseline}%,
    ${CHROME.gridline} ${baseline}%,
    ${CHROME.gridline} 100%)`;

  const actualPos = actual / 2;
  const baselinePos = actual + (baseline - actual) / 2;
  const labelsCollide = baseline - actual < 12;

  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      {title && (
        <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground text-center">
          {title}
        </h3>
      )}

      <div className="flex items-center justify-center gap-6 text-sm text-foreground/80">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: COMPARISON.baseline }}
          />
          <span>{baselineLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: COMPARISON.actual }}
          />
          <span>{actualLabel}</span>
        </div>
      </div>

      <div
        className="relative h-10 rounded-md overflow-hidden shadow-sm"
        style={{ background }}
        role="img"
        aria-label={`${actualLabel} ${actualValueLabel ?? `${actual}%`}, ${baselineLabel} ${baselineValueLabel ?? `${baseline}%`}`}
      >
        <span
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-xs font-semibold text-white drop-shadow-sm"
          style={{ left: `${actualPos}%` }}
        >
          {actualValueLabel ?? `${actual}%`}
        </span>
        {!labelsCollide && (
          <span
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-xs font-semibold text-white drop-shadow-sm"
            style={{ left: `${baselinePos}%` }}
          >
            {baselineValueLabel ?? `${baseline}%`}
          </span>
        )}
      </div>
      {labelsCollide && (
        <div className="text-center text-xs font-semibold text-secondary">
          {baselineLabel} {baselineValueLabel ?? `${baseline}%`}
        </div>
      )}

      {description && (
        <p className="text-base leading-relaxed text-foreground/80 text-center">
          {description}
        </p>
      )}

      {sourceLabel && (
        <div className="text-center">
          <ChartSource label={sourceLabel} href={sourceHref} />
        </div>
      )}
    </div>
  );
}
