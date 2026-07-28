"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SEQUENTIAL_EMERALD } from "./tokens";

export interface TimelineDetailSection {
  label: string;
  text: string;
  tone?: "neutral" | "good" | "avoid";
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  sections?: TimelineDetailSection[];
}

const TONE_STYLES: Record<string, string> = {
  neutral: "border-l-blue-400 bg-blue-50/50",
  good: "border-l-green-500 bg-green-50/50",
  avoid: "border-l-red-400 bg-red-50/50",
};

export default function HorizontalTimeline({ items }: { items: TimelineItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const activeIndex = items.findIndex((i) => i.id === activeId);
  const active = items[activeIndex] ?? items[0];

  return (
    <div className="w-full">
      {/* Axis */}
      <div className="relative overflow-x-auto pb-2">
        <div
          className="grid gap-2 min-w-[640px] md:min-w-0"
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
          {items.map((item, i) => {
            const isActive = item.id === activeId;
            const rampColor =
              SEQUENTIAL_EMERALD[
                Math.min(SEQUENTIAL_EMERALD.length - 1, Math.floor((i / Math.max(items.length - 1, 1)) * (SEQUENTIAL_EMERALD.length - 1)))
              ];
            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className="group relative flex flex-col items-center pt-1 pb-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-lg"
              >
                {/* baseline segment */}
                <div className="absolute top-4 left-0 right-0 h-[2px] bg-black/10" />
                {i > 0 && (
                  <div className="absolute top-4 right-1/2 left-[-50%] h-[2px] bg-black/10" />
                )}
                <motion.div
                  animate={{
                    scale: isActive ? 1.3 : 1,
                    backgroundColor: isActive ? "#0E7A68" : rampColor,
                  }}
                  whileHover={{ scale: isActive ? 1.4 : 1.2 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 h-4 w-4 rounded-full ring-4 ring-white shadow group-hover:shadow-[0_0_0_5px_rgba(27,196,166,0.25)]"
                />
                <div
                  className={`mt-3 text-xs font-semibold tabular-nums ${
                    isActive ? "text-foreground" : "text-secondary"
                  }`}
                >
                  {item.period}
                </div>
                <div
                  className={`mt-1 text-xs text-center leading-snug px-1 ${
                    isActive ? "text-foreground font-medium" : "text-secondary/70"
                  }`}
                >
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-6 rounded-2xl border border-black/5 bg-white shadow-sm p-6 space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {active.period}
              </span>
              <h4 className="text-lg font-heading font-semibold text-foreground">
                {active.title}
              </h4>
            </div>
            {active.sections?.map((section) => (
              <div
                key={section.label}
                className={`border-l-4 rounded-r-lg p-4 ${TONE_STYLES[section.tone ?? "neutral"]}`}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.1em] text-secondary mb-1">
                  {section.label}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">{section.text}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
