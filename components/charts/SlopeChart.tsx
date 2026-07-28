"use client";

import { motion } from "framer-motion";
import { COMPARISON } from "./tokens";

export interface SlopeRow {
  label: string;
  before: string;
  after: string;
  /** true if the after-state is the better outcome (colors the after-dot emerald vs. rose) */
  improved?: boolean;
}

export default function SlopeChart({
  rows,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  rows: SlopeRow[];
  beforeLabel?: string;
  afterLabel?: string;
}) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-1 mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-secondary/70">
        <span>{beforeLabel}</span>
        <span>{afterLabel}</span>
      </div>
      <div className="space-y-4">
        {rows.map((row, i) => {
          const afterColor = row.improved === false ? "#E11D48" : COMPARISON.actual;
          return (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="hover-glow-flat rounded-xl border border-black/5 bg-white shadow-sm px-5 py-4"
            >
              <div className="text-sm font-semibold text-foreground mb-2">{row.label}</div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: COMPARISON.baseline }}
                  />
                  <span className="text-sm text-secondary">{row.before}</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-black/15 to-black/5 relative">
                  <div
                    className="absolute inset-y-0 -translate-y-1/2 top-1/2 right-0 h-0 w-0 border-y-4 border-y-transparent border-l-[6px]"
                    style={{ borderLeftColor: afterColor }}
                  />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: afterColor }}
                  />
                  <span className="text-sm font-semibold text-foreground">{row.after}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
