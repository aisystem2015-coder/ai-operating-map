"use client";

import { motion } from "framer-motion";
import { Network, MessagesSquare, Building2, Cpu, Globe2 } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";

// The positioning, made unmissable (Meet 23: "que impacte, que se quede en
// quienes lo ven"). Grounded verbatim in Francisco's Brand Manual — the
// category, the essence, and the five pillars.

const NOT = ["a coder", "a data scientist", "a consultant"];

const PILLARS = [
  { icon: Network, title: "Systems thinking", body: "Sees work as interconnected parts, and designs how everything should flow." },
  { icon: MessagesSquare, title: "Communication & storytelling", body: "Turns data and operations into narratives people can actually act on." },
  { icon: Building2, title: "Operational awareness", body: "Real command of supply chain, stakeholders, constraints, dashboards." },
  { icon: Cpu, title: "AI fluency", body: "Agentic thinking, workflow logic, applied tools — integration where it matters." },
  { icon: Globe2, title: "Multicultural judgment", body: "Built across Bolivia, Spain, Portugal, the Netherlands, the US. Reads people well." },
];

const rise = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function PositioningManifesto() {
  return (
    <section className="relative">
      <div className="rounded-3xl border border-black/5 bg-white shadow-sm overflow-hidden">
        {/* The statement */}
        <div className="relative px-8 py-14 lg:px-14 lg:py-16 text-white overflow-hidden" style={{ background: "linear-gradient(135deg, #0a1838 0%, #16224a 55%, #1e3a8a 100%)" }}>
          <BorderBeam size={260} duration={13} borderWidth={1.5} colorFrom="#2563eb" colorTo="#d4956a" />
          <motion.div {...rise} transition={{ duration: 0.5 }} className="relative space-y-6 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">The positioning</p>
            <h2 className="text-4xl md:text-6xl font-heading font-bold leading-[1.05] tracking-tight">
              Business Architect<br />for the AI Era.
            </h2>
            <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
              The market is starting to call it <span className="font-semibold text-white">AI Ops</span>. It&apos;s a new category —
              and it&apos;s his.
            </p>

            {/* Not / not / not → but */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {NOT.map((n) => (
                <span key={n} className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-sm text-white/55 line-through decoration-white/40">
                  Not {n}
                </span>
              ))}
              <span className="text-white/40">→</span>
              <span className="rounded-full px-4 py-1.5 text-sm font-semibold text-white shadow-lg" style={{ background: "linear-gradient(135deg,#3b82f6,#2563eb)", boxShadow: "0 10px 26px -12px rgba(37,99,235,0.8)" }}>
                The one who connects all three
              </span>
            </div>

            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl border-l-2 pl-4" style={{ borderColor: "#d4956a" }}>
              Someone who understands how organizations work, how people decide, and how AI supports
              real work — and designs the clear systems that connect them. <span className="text-white/90">Clear systems that help people do better work, with less noise and more intention.</span>
            </p>
          </motion.div>
        </div>

        {/* The five pillars */}
        <div className="px-8 py-12 lg:px-14 lg:py-14">
          <motion.p {...rise} transition={{ duration: 0.4 }} className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary mb-6">
            Five pillars, one operator
          </motion.p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  {...rise}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                  className="hover-glow relative overflow-hidden rounded-2xl border border-black/8 bg-[#fafaf7] p-5"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent mb-3">
                    <Icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <div className="text-base font-heading font-semibold text-foreground">{p.title}</div>
                  <p className="mt-1 text-sm text-secondary leading-snug">{p.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
