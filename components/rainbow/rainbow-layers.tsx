"use client";

/**
 * The "rainbow" diagram (Meet 16, 2026-07-21): LLMs at the core, wrapped by
 * Assistants, then Agents, then Agentic Systems — drawn as a half circle
 * that completes into a full circle as you click through it.
 *
 * Rules taken directly from the transcript:
 * - Click only. No scroll wiring, at all. The What Works page's concentric
 *   rings diagram (components/what-works/what-works-explorer.tsx) advances
 *   its active layer on scroll, and Francisco called that a bug: "cuando
 *   hago un scroll, le cambia... es un problema de goteo." This component
 *   never reads scroll position — every state change is a click.
 * - One diagram, not two side by side ("no me gusta tener dos diagramas,
 *   lado a lado") — a single, large half circle, "cortado a la mitad, en
 *   grande."
 * - Assistants has to read as the smallest / least prominent of the 4
 *   layers ("Assistants tienen que ser más pequeño, porque asistentes son
 *   la puta mierda") — its ring is the thinnest band on the diagram and it
 *   uses the neutral/muted token instead of a bright categorical color,
 *   on purpose, both choices reinforcing the same call.
 * - Background changes on click ("me gusta que cambie el background...
 *   muy bien, muy bien").
 *
 * This is a new, separate component from what-works-explorer.tsx (which
 * stays untouched) — a half-circle/radial rainbow specifically, not a
 * duplicate of that full-circle scroll-driven explorer.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORICAL, NEUTRAL } from "../charts/tokens";

type LayerId = "llm" | "assistant" | "agent" | "agentic";

interface Layer {
  id: LayerId;
  name: string;
  blurb: string;
  color: string;
  /** Ring centerline radius in the 480x480 viewBox. */
  radius: number;
  /** 0 for the LLM core, which renders as a filled disc instead of a ring. */
  strokeWidth: number;
  wash: string;
}

const LAYERS: Layer[] = [
  {
    id: "llm",
    name: "LLMs",
    blurb: "The reasoning core. Predicts the next token — everything else here is built on top of it.",
    color: CATEGORICAL[0], // emerald — brand
    radius: 56,
    strokeWidth: 0,
    wash: "rgba(27, 196, 166, 0.07)",
  },
  {
    id: "assistant",
    name: "Assistants",
    blurb: "A model you can talk to. Useful, but shallow without your own context — kept the thinnest band here on purpose.",
    color: NEUTRAL, // deliberately muted, not a bright categorical color
    radius: 66,
    strokeWidth: 16,
    wash: "rgba(148, 163, 184, 0.12)",
  },
  {
    id: "agent",
    name: "Agents",
    blurb: "Reasons, then acts — takes real steps on your behalf inside a scope you define.",
    color: CATEGORICAL[1], // blue
    radius: 101,
    strokeWidth: 50,
    wash: "rgba(37, 99, 235, 0.06)",
  },
  {
    id: "agentic",
    name: "Agentic Systems",
    blurb: "A coordinated team of agents working together — the ceiling for what a system like this can become.",
    color: CATEGORICAL[3], // violet
    radius: 157,
    strokeWidth: 58,
    wash: "rgba(124, 58, 237, 0.07)",
  },
];

export default function RainbowLayers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isFull = activeIndex === LAYERS.length - 1;
  const activeLayer = LAYERS[activeIndex];

  const advance = () => setActiveIndex((i) => (i + 1) % LAYERS.length);

  return (
    <motion.div
      animate={{ backgroundColor: activeLayer.wash }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-black/5 p-6 md:p-10 space-y-8"
    >
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
          The stack underneath
        </p>
        <h3 className="text-2xl md:text-3xl font-heading font-semibold text-foreground leading-tight">
          LLMs → Assistants → Agents → Agentic Systems
        </h3>
        <p className="text-secondary leading-relaxed">
          Click the core to build up the stack, layer by layer, until it completes into a full circle.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Diagram — half circle by default, completes into a full circle
            once every layer has been clicked through. */}
        <button
          type="button"
          onClick={advance}
          aria-label={`Reveal the next layer of the stack. Currently showing up to ${activeLayer.name}. Click to continue.`}
          className={`relative w-full max-w-md mx-auto lg:mx-0 overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-4 transition-[aspect-ratio] duration-700 ease-out ${
            isFull ? "aspect-square" : "aspect-[2/1]"
          }`}
        >
          <svg
            viewBox="0 0 480 480"
            className="absolute inset-x-0 top-0 w-full h-auto"
            role="img"
            aria-hidden="true"
          >
            {[...LAYERS].reverse().map((layer, revIdx) => {
              const idx = LAYERS.length - 1 - revIdx;
              const visible = idx <= activeIndex;
              const isLLM = layer.id === "llm";
              return (
                <motion.circle
                  key={layer.id}
                  cx={240}
                  cy={240}
                  r={layer.radius}
                  fill={isLLM ? layer.color : "none"}
                  stroke={isLLM ? "none" : layer.color}
                  strokeWidth={layer.strokeWidth}
                  initial={false}
                  animate={{
                    opacity: visible ? 1 : 0,
                    scale: idx === activeIndex ? 1.03 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  style={{ transformOrigin: "240px 240px" }}
                />
              );
            })}
            {/* Invite-to-click pulse — only before the first click. */}
            {activeIndex === 0 && (
              <motion.circle
                cx={240}
                cy={240}
                r={56}
                fill="none"
                stroke={LAYERS[0].color}
                strokeWidth={3}
                animate={{ r: [56, 82, 56], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              />
            )}
          </svg>
        </button>

        {/* Legend — also clickable, jumps straight to that layer. */}
        <div className="flex flex-col gap-2 w-full lg:max-w-xs">
          {LAYERS.map((layer, i) => {
            const isActive = i === activeIndex;
            const isAssistant = layer.id === "assistant";
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-pressed={isActive}
                className={`group flex items-center gap-3 rounded-xl border text-left transition-colors focus:outline-none focus:ring-2 focus:ring-accent ${
                  isAssistant ? "px-3 py-2" : "px-4 py-3"
                } ${
                  isActive ? "border-black/10 bg-white shadow-sm" : "border-transparent hover:bg-white/60"
                }`}
              >
                <span
                  className={`shrink-0 rounded-full ${isAssistant ? "h-2.5 w-2.5" : "h-3.5 w-3.5"}`}
                  style={{ backgroundColor: layer.color }}
                />
                <span className="min-w-0">
                  <span
                    className={`block font-heading font-semibold text-foreground ${
                      isAssistant ? "text-sm" : "text-base"
                    }`}
                  >
                    {layer.name}
                  </span>
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.span
                        key={layer.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="block text-xs text-secondary leading-snug mt-0.5 overflow-hidden"
                      >
                        {layer.blurb}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </button>
            );
          })}
          <div className="flex items-center gap-1.5 pt-1">
            {LAYERS.map((layer, i) => (
              <span
                key={layer.id}
                className="h-1 flex-1 rounded-full transition-colors duration-300"
                style={{ backgroundColor: i <= activeIndex ? layer.color : "#E4E2E0" }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
