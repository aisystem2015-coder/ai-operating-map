"use client";

/**
 * Hero visual: "you" at the center, with layers of captured memory
 * orbiting around you — the same layered-ring visual language as
 * components/rainbow/rainbow-layers.tsx (SVG + framer-motion), recolored
 * to this page's indigo/sky/amber palette instead of rebuilding from
 * scratch. Purely decorative (aria-hidden) — the copy around it carries
 * the meaning.
 */
import { motion, useReducedMotion } from "framer-motion";
import { TWIN } from "./palette";

const RINGS = [
  { r: 60, color: TWIN.indigo, dur: 18 },
  { r: 92, color: TWIN.sky, dur: 26 },
  { r: 128, color: TWIN.amber, dur: 34 },
];

export default function TwinOrbitalVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <svg viewBox="0 0 320 320" className="w-full h-auto max-w-sm mx-auto" role="img" aria-hidden="true">
      {/* Orbit rings */}
      {RINGS.map((ring) => (
        <circle
          key={ring.r}
          cx={160}
          cy={160}
          r={ring.r}
          fill="none"
          stroke={ring.color}
          strokeOpacity={0.35}
          strokeWidth={1.5}
          strokeDasharray="3 7"
        />
      ))}

      {/* Center — "you" */}
      <motion.circle
        cx={160}
        cy={160}
        r={28}
        fill={`url(#twinCoreGradient)`}
        animate={reduceMotion ? undefined : { scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "160px 160px" }}
      />

      <defs>
        <radialGradient id="twinCoreGradient">
          <stop offset="0%" stopColor={TWIN.sky} />
          <stop offset="100%" stopColor={TWIN.indigo} />
        </radialGradient>
      </defs>

      {/* Orbiting "memory" nodes — one per ring, each a captured note/voice/chat moment */}
      {RINGS.map((ring, i) => (
        <motion.g
          key={`node-${ring.r}`}
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={reduceMotion ? undefined : { duration: ring.dur, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "160px 160px" }}
        >
          <circle cx={160 + ring.r} cy={160} r={6} fill={ring.color} />
          <circle cx={160 - ring.r * 0.5} cy={160 + ring.r * 0.87} r={4} fill={ring.color} fillOpacity={0.7} />
          {i < 2 && (
            <circle cx={160 - ring.r * 0.5} cy={160 - ring.r * 0.87} r={3.5} fill={ring.color} fillOpacity={0.5} />
          )}
        </motion.g>
      ))}
    </svg>
  );
}
