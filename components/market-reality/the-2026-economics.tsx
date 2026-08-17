"use client";

import { motion } from "framer-motion";
import SectionReveal from "../learning/SectionReveal";
import { StatGrid, BarList, Comparison, BigStat } from "../ui/data-blocks";

// New section (Aug 2026) — the current economics of AI agents, in beautiful data
// blocks. Fresh, sourced 2026 numbers so the page reads current, not last year.
export default function The2026Economics() {
  return (
    <section className="py-24 px-6 lg:px-10 bg-background scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-10">
        <SectionReveal>
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">The 2026 economics</p>
            <h2 className="title-hover text-3xl md:text-5xl font-heading font-bold tracking-tight text-foreground leading-tight">
              The floor collapsed. The bar moved to execution.
            </h2>
            <p className="text-lg text-secondary leading-relaxed">
              Running frontier-quality AI is almost free now — so the advantage is no longer
              the model. It&apos;s whether an organization can put an agent into production and
              keep it there. The numbers below are where 2026 actually landed.
            </p>
          </div>
        </SectionReveal>

        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-5 items-stretch">
          <BigStat
            value="214×"
            label="cheaper to run frontier-quality AI than 40 months ago"
            sub="A GPT-4-class answer cost $30–60 per million tokens at launch (Mar 2023). By Jul 2026 the cheapest API matching that quality is $0.14 per million input — a deflation curve with no precedent in enterprise software."
          />
          <BarList
            caption="Share of enterprises with at least one AI agent in production, 2026. Regulated, data-mature sectors lead; the gap is readiness, not access."
            items={[
              { label: "Banking / Insurance", value: 47, display: "47%" },
              { label: "All enterprises", value: 31, display: "31%", accent: "#0a1838" },
              { label: "Healthcare", value: 18, display: "18%" },
              { label: "Government", value: 14, display: "14%" },
            ]}
          />
        </div>

        <StatGrid
          columns={3}
          items={[
            { value: "40%", label: "of enterprise apps ship an AI agent by end-2026", hint: "up from < 5% in 2025 (Gartner)" },
            { value: "23%", label: "are actually scaling an agentic system", hint: "88% use AI somewhere (McKinsey)" },
            { value: "$37B", label: "enterprise GenAI spend in 2025", hint: "3× the prior year · ~$19B apps / $18B infra" },
            { value: "5.1 mo", label: "median time-to-value on an agent", hint: "SDR agents 3.4mo · finance/ops 8.9mo" },
            { value: "171%", label: "ROI enterprises expect from agents", hint: "yet only 39% can show EBIT impact yet" },
            { value: "$1.3T", label: "projected agentic-AI IT spend by 2029", hint: ">25% of worldwide IT spend (IDC)" },
          ]}
        />

        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45 }} className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Where agent projects actually land</p>
          <Comparison
            versus="vs"
            left={{
              title: "The expectation",
              tone: "muted",
              rows: [
                "171% ROI, modeled before deployment",
                "Agents everywhere within a year",
                "The model is the hard part",
              ],
            }}
            right={{
              title: "The 2026 reality",
              tone: "brand",
              rows: [
                "Only 41% clear positive ROI within 12 months",
                "19% never reach payback at all",
                "40%+ of agentic projects canceled by 2027 — unclear ROI + weak governance",
                "The hard part is data, orchestration, and ownership",
              ],
            }}
          />
        </motion.div>

        <p className="text-xs text-secondary/70">
          Sources — Gartner &amp; McKinsey enterprise AI (2026), Deloitte / IDC agentic-AI market sizing,
          BenchLM API pricing (Jul 2026), Sinch &amp; KPMG agent-rollback studies. Figures are the midpoints of cited ranges.
        </p>
      </div>
    </section>
  );
}
