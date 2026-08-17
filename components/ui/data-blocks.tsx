"use client";

import { motion } from "framer-motion";
import { BorderBeam } from "./border-beam";

// ── Beautiful data blocks (Information-is-Beautiful style, Francisco brand) ──
// Reusable visual primitives to turn dense copy into scannable data. Text stays;
// these sit alongside it. Brand: signal blue #2563eb accent, warm #d4956a,
// ink #0a1838, on paper/card. All animate in on view, respect the palette.

const rise = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export type Stat = { value: string; label: string; hint?: string; accent?: string };

/** A row/grid of headline metrics, each in a card with a brand border-beam. */
export function StatGrid({ items, columns = 4 }: { items: Stat[]; columns?: number }) {
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${columns >= 4 ? 150 : 190}px, 1fr))` }}
    >
      {items.map((s, i) => (
        <motion.div
          key={s.label + i}
          {...rise}
          transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
          className="hover-glow relative overflow-hidden rounded-2xl border border-black/8 bg-white px-5 py-4 shadow-sm"
        >
          <div
            className="text-3xl font-heading font-bold tracking-tight tabular-nums"
            style={{ color: s.accent || "#2563eb" }}
          >
            {s.value}
          </div>
          <div className="mt-1 text-sm font-medium text-foreground leading-snug">{s.label}</div>
          {s.hint && <div className="mt-0.5 text-xs text-secondary/70 leading-snug">{s.hint}</div>}
          <BorderBeam size={70} duration={10} delay={i * 1.6} borderWidth={1.3} colorFrom="#2563eb" colorTo="#93b4fb" />
        </motion.div>
      ))}
    </div>
  );
}

export type BarItem = { label: string; value: number; display?: string; accent?: string };

/** Horizontal bar list — magnitudes at a glance (value is 0–100 of the track). */
export function BarList({ items, caption }: { items: BarItem[]; caption?: string }) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3.5">
        {items.map((it, i) => (
          <div key={it.label + i} className="grid grid-cols-[minmax(96px,34%)_1fr_auto] items-center gap-3 text-sm">
            <span className="truncate text-secondary" title={it.label}>{it.label}</span>
            <span className="h-2.5 rounded-full bg-black/[0.06] overflow-hidden">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: `${(it.value / max) * 100}%` }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                className="block h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${it.accent || "#2563eb"}, #93b4fb)` }}
              />
            </span>
            <span className="tabular-nums font-semibold text-foreground text-right min-w-[3ch]">
              {it.display ?? it.value}
            </span>
          </div>
        ))}
      </div>
      {caption && <p className="mt-4 text-xs text-secondary/70">{caption}</p>}
    </div>
  );
}

export type CompareCol = { title: string; tone: "muted" | "brand"; rows: string[] };

/** Two-sided comparison — "this vs that", the classic clarity block. */
export function Comparison({ left, right, versus = "vs" }: { left: CompareCol; right: CompareCol; versus?: string }) {
  const col = (c: CompareCol) => {
    const brand = c.tone === "brand";
    return (
      <div
        className={`relative overflow-hidden rounded-2xl border p-6 shadow-sm ${
          brand ? "border-accent/25 bg-accent/[0.04]" : "border-black/8 bg-white"
        }`}
      >
        <div className={`text-sm font-semibold uppercase tracking-[0.12em] ${brand ? "text-accent" : "text-secondary"}`}>
          {c.title}
        </div>
        <ul className="mt-4 space-y-2.5">
          {c.rows.map((r, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/90 leading-snug">
              <span
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: brand ? "#2563eb" : "#9aa3b5" }}
              />
              {r}
            </li>
          ))}
        </ul>
        {brand && <BorderBeam size={120} duration={12} borderWidth={1.4} colorFrom="#2563eb" colorTo="#d4956a" />}
      </div>
    );
  };
  return (
    <motion.div {...rise} transition={{ duration: 0.45 }} className="relative grid gap-4 md:grid-cols-2">
      {col(left)}
      {col(right)}
      <span className="pointer-events-none absolute left-1/2 top-1/2 hidden md:flex -translate-x-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-[11px] font-bold uppercase text-secondary shadow-sm">
        {versus}
      </span>
    </motion.div>
  );
}

/** A single big number with a supporting line — for a standout stat inline. */
export function BigStat({ value, label, sub, accent = "#2563eb" }: { value: string; label: string; sub?: string; accent?: string }) {
  return (
    <motion.div {...rise} transition={{ duration: 0.45 }} className="hover-glow relative overflow-hidden rounded-2xl border border-black/8 bg-white p-7 shadow-sm">
      <div className="text-5xl md:text-6xl font-heading font-black tracking-tight tabular-nums" style={{ color: accent }}>{value}</div>
      <div className="mt-2 text-base font-semibold text-foreground">{label}</div>
      {sub && <p className="mt-1 text-sm text-secondary leading-relaxed max-w-md">{sub}</p>}
      <BorderBeam size={140} duration={13} borderWidth={1.5} colorFrom="#2563eb" colorTo="#d4956a" />
    </motion.div>
  );
}
