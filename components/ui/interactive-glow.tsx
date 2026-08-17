"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const DEFAULT_COLORS = ["#2563eb", "#2563EB", "#7C3AED"];

/**
 * Full-bleed, mouse-reactive background. Renders 3 soft blurred blobs that
 * drift slowly on their own and lean toward the cursor. Drop as the first
 * child of a `relative overflow-hidden` section — it fills that ancestor.
 */
export default function InteractiveGlow({
  colors = DEFAULT_COLORS,
  className = "",
}: {
  colors?: string[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 40, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 40, damping: 20, mass: 0.6 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      mx.set((e.clientX - rect.left) / rect.width);
      my.set((e.clientY - rect.top) / rect.height);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mx, my]);

  const blob1X = useTransform(sx, (v) => `${v * 30 + 10}%`);
  const blob1Y = useTransform(sy, (v) => `${v * 20 + 5}%`);
  const blob2X = useTransform(sx, (v) => `${100 - v * 30 - 10}%`);
  const blob2Y = useTransform(sy, (v) => `${v * 25 + 40}%`);
  const blob3X = useTransform(sx, (v) => `${v * 15 + 40}%`);
  const blob3Y = useTransform(sy, (v) => `${100 - v * 20 - 10}%`);

  return (
    <div ref={ref} className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ left: blob1X, top: blob1Y, backgroundColor: colors[0], opacity: 0.32 }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-[360px] w-[360px] rounded-full blur-3xl"
        style={{ left: blob2X, top: blob2Y, backgroundColor: colors[1], opacity: 0.26 }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-[300px] w-[300px] rounded-full blur-3xl"
        style={{ left: blob3X, top: blob3Y, backgroundColor: colors[2], opacity: 0.22 }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
