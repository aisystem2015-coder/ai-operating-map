"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CATEGORICAL } from "./tokens";

export interface FlowStep {
  id: string;
  title: string;
  subtitle?: string;
  detail?: string;
  examples?: string[];
}

export default function FlowSteps({
  steps,
  caption,
  showDetailPanel = true,
  colorByIndex = false,
  className = "",
}: {
  steps: FlowStep[];
  caption?: string;
  showDetailPanel?: boolean;
  /** Tint each node with its own categorical color instead of the uniform emerald accent bar */
  colorByIndex?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState<string>(steps[0]?.id ?? "");
  const activeStep = steps.find((s) => s.id === active) ?? steps[0];

  return (
    <div className={`rounded-3xl border border-black/5 bg-white shadow-sm p-6 ${className}`}>
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
      >
        {steps.map((step, i) => {
          const color = colorByIndex ? CATEGORICAL[i % CATEGORICAL.length] : "#1BC4A6";
          const isActive = active === step.id;
          return (
            <div
              key={step.id}
              className="hover-glow group relative flex flex-col justify-between rounded-2xl border border-black/5 bg-gradient-to-b from-slate-50 to-white p-4 shadow-sm transition-all duration-200 cursor-pointer"
              tabIndex={0}
              onMouseEnter={() => setActive(step.id)}
              onFocus={() => setActive(step.id)}
              onClick={() => setActive(step.id)}
            >
              <div className="flex-1 space-y-1">
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-secondary">
                  {step.title}
                </div>
                {step.subtitle && (
                  <div className="text-sm text-foreground leading-snug min-h-[42px]">
                    {step.subtitle}
                  </div>
                )}
              </div>
              {i !== steps.length - 1 && (
                <div className="absolute inset-y-0 -right-2 hidden sm:flex items-center justify-center z-10">
                  <div className="h-10 w-px bg-gradient-to-b from-transparent via-black/10 to-transparent" />
                </div>
              )}
              <motion.div
                className="mt-3 h-1 rounded-full"
                animate={{ backgroundColor: isActive ? color : `${color}33` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          );
        })}
      </div>

      {caption && (
        <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-secondary">
          {caption}
        </div>
      )}

      {showDetailPanel && activeStep?.detail && (
        <div className="mt-4 rounded-2xl border border-black/5 bg-white/90 px-5 py-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
                {activeStep.title}
              </div>
              <div className="text-sm text-foreground leading-relaxed max-w-3xl">
                {activeStep.detail}
              </div>
            </div>
            {activeStep.examples && (
              <div className="flex flex-wrap gap-2 sm:max-w-xs">
                {activeStep.examples.map((ex) => (
                  <span
                    key={ex}
                    className="rounded-full border border-black/5 bg-slate-50 px-3 py-1 text-xs font-medium text-secondary"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
