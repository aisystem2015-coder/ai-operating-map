"use client";

import { motion } from "framer-motion";
import SectionReveal from "../learning/SectionReveal";
import { Comparison } from "../ui/data-blocks";

// Reuses the map's core thesis — "AI is the reasoning layer; the surrounding
// system is where value compounds" — rendered in the beautiful-data typology.
// No new claims, no fabricated numbers: same argument, sharper visual.
export default function CompoundValue() {
  return (
    <section className="py-16 px-6 lg:px-8 bg-white/40">
      <div className="max-w-5xl mx-auto space-y-8">
        <SectionReveal>
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Why it compounds</p>
            <h2 className="title-hover text-3xl md:text-4xl font-heading font-bold tracking-tight text-foreground leading-tight">
              A model answers. A system delivers.
            </h2>
            <p className="text-lg text-secondary leading-relaxed">
              The same model is a demo on its own and durable leverage inside a system.
              Every layer you wrap around the reasoning core is where the value actually stacks up.
            </p>
          </div>
        </SectionReveal>

        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45 }}>
          <Comparison
            versus="vs"
            left={{
              title: "An LLM on its own",
              tone: "muted",
              rows: [
                "Answers one prompt at a time",
                "Forgets the moment the tab closes",
                "No access to your real data or tools",
                "Impressive in the demo, stuck in production",
              ],
            }}
            right={{
              title: "An LLM inside a system",
              tone: "brand",
              rows: [
                "Inputs feed it the real context",
                "Orchestration lets it act, not just reply",
                "Tools & data ground it in your operation",
                "Outcomes are owned, measured, and repeatable",
              ],
            }}
          />
        </motion.div>

        <p className="text-base text-secondary leading-relaxed max-w-3xl border-l-2 border-accent/60 pl-4">
          This is the whole map in one line: the model is the reasoning layer, and everything you
          build around it — the layers below — is what turns a clever answer into compounding value.
        </p>
      </div>
    </section>
  );
}
