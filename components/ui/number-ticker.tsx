"use client";

/**
 * Magic UI-style animated number counter (reference:
 * magicui.design/docs/components/number-ticker) — adapted for this project's
 * emerald/white palette and framer-motion (already a dependency, no new
 * package needed). Counts up from 0 to `value` once it scrolls into view.
 */
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function NumberTicker({
  value,
  decimalPlaces = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  decimalPlaces?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [motionValue, isInView, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest.toFixed(decimalPlaces)}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix, decimalPlaces]);

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}
      {(0).toFixed(decimalPlaces)}
      {suffix}
    </span>
  );
}
