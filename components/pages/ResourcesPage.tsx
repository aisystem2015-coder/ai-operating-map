"use client";

import { motion } from "framer-motion";
import { Building2, Database, Bot, LayoutDashboard, FileText, ArrowUpRight } from "lucide-react";
import Navigation from "../Navigation";
import InteractiveGlow from "../ui/interactive-glow";
import { CATEGORICAL } from "../charts/tokens";

type Resource = { name: string; by: string; note: string; url?: string };

const categories: Array<{ title: string; icon: typeof Building2; items: Resource[] }> = [
  {
    title: "Enterprise Reports",
    icon: Building2,
    items: [
      {
        name: "The State of AI",
        by: "McKinsey · 2025",
        note: "88% of firms use AI, but only ~6% capture real EBIT impact — most are stuck in the “pilot loop.” The benchmark for where adoption actually pays off.",
        url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
      },
      {
        name: "AI Index Report 2025",
        by: "Stanford HAI",
        note: "The data backbone of the field: inference cost fell 280× in under three years, business adoption hit 78%, benchmark scores jumped sharply. Cite this, not vibes.",
        url: "https://hai.stanford.edu/ai-index/2025-ai-index-report",
      },
      {
        name: "Why 95% of GenAI pilots don’t scale",
        by: "This site · Market Reality",
        note: "The recurring blocker isn’t the model — it’s data readiness and mindset. The thesis the whole map is built on.",
        url: "/market-reality",
      },
    ],
  },
  {
    title: "Data & Governance",
    icon: Database,
    items: [
      {
        name: "AI Risk Management Framework (AI RMF 1.0)",
        by: "NIST",
        note: "The four functions — Govern, Map, Measure, Manage. The closest thing to a standard for deploying AI responsibly. Voluntary, sector-agnostic, practical.",
        url: "https://www.nist.gov/itl/ai-risk-management-framework",
      },
      {
        name: "Data contracts",
        by: "Practice",
        note: "Treat the handoff between data producers and consumers like an API contract — schema, ownership, SLAs. The biggest single lever for trustworthy AI inputs.",
      },
      {
        name: "Vector databases & retrieval",
        by: "Practice",
        note: "How grounding actually works: embed your knowledge, retrieve the relevant slice, feed it to the model. The layer that turns a generic LLM into one that knows your business.",
      },
    ],
  },
  {
    title: "Agentic Systems",
    icon: Bot,
    items: [
      {
        name: "Building Effective Agents",
        by: "Anthropic",
        note: "The canonical guide: use agents only when the path can’t be hardcoded, keep the design simple, and prefer plain workflows over agents when you can. Start here.",
        url: "https://www.anthropic.com/engineering/building-effective-agents",
      },
      {
        name: "Effective Context Engineering for AI Agents",
        by: "Anthropic",
        note: "Find the smallest set of high-signal tokens that gets the outcome you want. Context is a budget, not a dumping ground.",
        url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
      },
      {
        name: "Guardrails for autonomous systems",
        by: "Practice",
        note: "Agents compound errors and cost. Sandbox them, test extensively, and put hard limits on scope before you trust them in production.",
      },
    ],
  },
  {
    title: "UX for Decision-Making",
    icon: LayoutDashboard,
    items: [
      {
        name: "Embed AI in existing workflows",
        by: "Practice",
        note: "The AI that gets used is the one that shows up where people already work — not a separate tab they have to remember. Cut the distance to zero.",
      },
      {
        name: "Design for trust through transparency",
        by: "Practice",
        note: "Show the sources, show the reasoning, let people verify. Cited answers beat confident answers — especially for executives making real calls.",
      },
      {
        name: "Interfaces for executive decisions",
        by: "Practice",
        note: "Decision-makers need the “so what,” not raw output. Surface the recommendation first, the evidence second, the detail on demand.",
      },
    ],
  },
];

export default function ResourcesPage() {
  const total = categories.reduce((n, c) => n + c.items.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="relative isolate overflow-hidden rounded-3xl mb-16 py-10 px-2">
            <InteractiveGlow />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-[0.14em] mb-6">
                <FileText size={14} />
                {total} curated resources
              </div>
              <h1 className="text-6xl md:text-7xl font-heading font-bold text-foreground mb-6 leading-tight">
                Resources
              </h1>
              <p className="text-xl text-secondary max-w-2xl">
                The reports, frameworks, and practices that actually hold up — each with
                why it matters and where to read it. No filler.
              </p>
            </div>
          </div>

          {/* Category grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category, i) => {
              const color = CATEGORICAL[i % CATEGORICAL.length];
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="hover-glow rounded-2xl border border-black/5 bg-white shadow-sm overflow-hidden"
                >
                  <div className="h-1.5 w-full" style={{ backgroundColor: color }} />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="h-10 w-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${color}1A`, color }}
                      >
                        <Icon size={20} />
                      </div>
                      <h2 className="text-lg font-heading font-semibold text-foreground">
                        {category.title}
                      </h2>
                      <span className="ml-auto text-xs font-semibold text-secondary/60 tabular-nums">
                        {category.items.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {category.items.map((item) => {
                        const external = item.url?.startsWith("http");
                        const inner = (
                          <>
                            <div className="flex items-start justify-between gap-3">
                              <span className="text-sm font-semibold text-foreground leading-snug">
                                {item.name}
                              </span>
                              {item.url && (
                                <ArrowUpRight
                                  size={15}
                                  className="mt-0.5 shrink-0 text-secondary/50 group-hover/item:text-accent transition-colors"
                                />
                              )}
                            </div>
                            <div
                              className="text-[11px] font-semibold uppercase tracking-wide mt-1"
                              style={{ color }}
                            >
                              {item.by}
                            </div>
                            <p className="text-sm text-secondary leading-relaxed mt-1.5">
                              {item.note}
                            </p>
                          </>
                        );
                        const cls =
                          "group/item block rounded-xl px-4 py-3 -mx-1 border border-transparent transition-colors";
                        return item.url ? (
                          <a
                            key={item.name}
                            href={item.url}
                            {...(external
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className={`${cls} hover:bg-black/[0.03] hover:border-black/5 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1`}
                          >
                            {inner}
                          </a>
                        ) : (
                          <div key={item.name} className={cls}>
                            {inner}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-16 pt-8 border-t border-black/10">
            <p className="text-sm text-secondary">
              This list evolves. Only resources that hold up in practice make it in.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
