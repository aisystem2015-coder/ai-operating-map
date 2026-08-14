"use client";

/**
 * The "rainbow" diagram (Meet 16, 2026-07-21): LLMs at the core, wrapped by
 * Assistants, then Agents, then Agentic Systems, then Digital Twins —
 * drawn as a half circle (a rainbow arc) that fills in, layer by layer, as
 * you click through it. Meet 22 (2026-08-14): it must STAY a half circle at
 * every step and never close into a full circle — and it lives on the
 * What Works Today page, not the Digital Twins page.
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
 * - Assistants has to read as the smallest / least prominent of the
 *   layers ("Assistants tienen que ser más pequeño, porque asistentes son
 *   la puta mierda") — its ring is the thinnest band on the diagram and it
 *   uses the neutral/muted token instead of a bright categorical color,
 *   on purpose, both choices reinforcing the same call.
 * - Background changes on click ("me gusta que cambie el background...
 *   muy bien, muy bien").
 *
 * FIXED 31-07-2026 (Maya, live bug report — was rendering as a full circle,
 * not the half-circle the spec calls for): the old implementation tried to
 * fake the half-circle by cropping a square-aspect SVG (`w-full h-auto`)
 * inside a container whose CSS `aspect-ratio` toggled between `2/1` and
 * `1/1` via a Tailwind arbitrary value + `transition-[aspect-ratio]` — a
 * chain with several fragile links (arbitrary-value JIT generation, actual
 * `aspect-ratio` transition support, `h-auto` deriving correctly from the
 * viewBox) any one of which failing quietly falls back to a plain square,
 * i.e. a full circle. Replaced with two battle-tested primitives instead:
 * a padding-bottom aspect box (works in every browser, no reliance on the
 * `aspect-ratio` property) and `preserveAspectRatio="xMidYMin slice"` on
 * the SVG itself, which fills the box width and crops the excess height
 * from the bottom — exactly a clean cut at the circle's own center line,
 * deterministically, with no pixel-alignment guesswork.
 *
 * Also added the 5th layer, Digital Twins, to match the sibling explorer
 * (components/what-works/what-works-explorer.tsx) which already has it —
 * the two diagrams were drifting out of sync on the site's own taxonomy.
 *
 * This is a separate component from what-works-explorer.tsx (which stays
 * untouched) — a half-circle/radial rainbow specifically, not a duplicate
 * of that full-circle scroll-driven explorer.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORICAL, NEUTRAL } from "../charts/tokens";

type LayerId = "llm" | "assistant" | "agent" | "agentic" | "digital-twin";

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
    blurb: "A coordinated team of agents working together — one layer short of the ceiling.",
    color: CATEGORICAL[3], // violet
    radius: 150,
    strokeWidth: 44,
    wash: "rgba(124, 58, 237, 0.07)",
  },
  {
    id: "digital-twin",
    name: "Digital Twins",
    blurb: "A private model of one person — your own notes, judgment, and voice, accessible from any AI you use.",
    color: "#065F46", // deep emerald — matches the Digital Twins card on the What Works explorer
    radius: 195,
    strokeWidth: 42,
    wash: "rgba(6, 95, 70, 0.08)",
  },
];

export default function RainbowLayers() {
  const [activeIndex, setActiveIndex] = useState(0);
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
          LLMs → Assistants → Agents → Agentic Systems → Digital Twins
        </h3>
        <p className="text-secondary leading-relaxed">
          Click the core to build up the stack, layer by layer — a rainbow that fills in, arc by arc.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Diagram — ALWAYS a true half circle / rainbow arc (cropped via
            preserveAspectRatio="slice", not a CSS aspect-ratio guess). Meet 22:
            Francisco does NOT want it to close into a full circle on the last
            layer ("el arco iris... se vuelve un círculo entero. Hay que
            mantenerlo como un arco iris"). It stays a rainbow at every step —
            the layers just fill in, arc by arc. */}
        <div className="relative w-full max-w-md mx-auto lg:mx-0">
          <motion.div
            style={{ paddingBottom: "50%" }}
            className="relative w-full overflow-hidden"
          >
            <button
              type="button"
              onClick={advance}
              aria-label={`Reveal the next layer of the stack. Currently showing up to ${activeLayer.name}. Click to continue.`}
              className="absolute inset-0 w-full h-full focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-4"
            >
              <svg
                viewBox="0 0 480 480"
                preserveAspectRatio="xMidYMin slice"
                className="absolute inset-0 w-full h-full"
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
          </motion.div>
        </div>

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
