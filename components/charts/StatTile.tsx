"use client";

import { motion } from "framer-motion";

export default function StatTile({
  label,
  value,
  detail,
  delta,
  deltaDirectionIsGood = true,
  accentColor = "#1BC4A6",
  size = "md",
}: {
  label: string;
  value: string;
  detail?: string;
  delta?: string;
  deltaDirectionIsGood?: boolean;
  accentColor?: string;
  size?: "md" | "lg";
}) {
  const isNegative = delta?.trim().startsWith("-");
  const deltaIsGood = isNegative ? !deltaDirectionIsGood : deltaDirectionIsGood;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-black/5 bg-white shadow-sm px-6 py-5"
    >
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary/70 mb-2">
        {label}
      </div>
      <div className="flex items-baseline gap-3 flex-wrap">
        <div
          className={`font-heading font-bold leading-none ${
            size === "lg" ? "text-6xl md:text-7xl" : "text-4xl md:text-5xl"
          }`}
          style={{ color: accentColor }}
        >
          {value}
        </div>
        {delta && (
          <span
            className="text-sm font-semibold"
            style={{ color: deltaIsGood ? "#0E7A68" : "#E11D48" }}
          >
            {delta}
          </span>
        )}
      </div>
      {detail && (
        <div className="text-sm text-secondary mt-2 leading-relaxed">{detail}</div>
      )}
    </motion.div>
  );
}
