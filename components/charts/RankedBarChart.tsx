"use client";

import { motion } from "framer-motion";
import { CATEGORICAL, CHROME, MARK } from "./tokens";

export interface RankedBarSeries {
  label: string;
  value: number; // 0-max
  color?: string;
  valueLabel?: string;
}

export default function RankedBarChart({
  title,
  series,
  max,
  unit = "",
  legend,
}: {
  title?: string;
  series: RankedBarSeries[];
  max?: number;
  unit?: string;
  /** Optional legend override — e.g. two named series sharing one color scheme */
  legend?: { label: string; color: string }[];
}) {
  const computedMax = max ?? Math.max(...series.map((s) => s.value), 1);

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          {title}
        </h3>
      )}

      {legend && legend.length > 1 && (
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-secondary">
          {legend.map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <span
                aria-hidden
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: l.color }}
              />
              <span>{l.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {series.map((s, i) => {
          const pct = Math.min(100, (s.value / computedMax) * 100);
          const color = s.color ?? CATEGORICAL[i % CATEGORICAL.length];
          return (
            <div key={s.label} className="flex items-center gap-3">
              <div className="w-28 shrink-0 text-sm text-secondary text-right truncate">
                {s.label}
              </div>
              <div
                className="flex-1 relative rounded-full"
                style={{ height: MARK.barThickness, backgroundColor: CHROME.gridline }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ backgroundColor: color }}
                />
              </div>
              <div className="w-16 shrink-0 text-sm font-semibold text-foreground tabular-nums">
                {s.valueLabel ?? `${s.value}${unit}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
