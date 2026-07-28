"use client";

import { motion } from "framer-motion";
import { Building2, Database, Bot, LayoutDashboard, FileText } from "lucide-react";
import Navigation from "../Navigation";
import InteractiveGlow from "../ui/interactive-glow";
import { CATEGORICAL } from "../charts/tokens";

const categories = [
  {
    title: "Enterprise Reports",
    icon: Building2,
    items: [
      "BCG: The State of AI in 2024",
      "EY: AI Transformation Roadmap",
      "McKinsey: The Economic Potential of Generative AI",
    ],
  },
  {
    title: "Data and Governance",
    icon: Database,
    items: [
      "Data Contracts: Building Trust in Data",
      "AI Governance Framework: Practical Guide",
      "Vector Database Best Practices",
    ],
  },
  {
    title: "Agentic Systems",
    icon: Bot,
    items: [
      "Building Production-Ready Agents",
      "Multi-Agent Orchestration Patterns",
      "Safety and Guardrails for Autonomous Systems",
    ],
  },
  {
    title: "UX for Decision Making",
    icon: LayoutDashboard,
    items: [
      "Designing AI Interfaces for Executives",
      "Embedding AI in Existing Workflows",
      "Building Trust Through Transparency",
    ],
  },
];

export default function ResourcesPage() {
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
                {categories.reduce((n, c) => n + c.items.length, 0)} curated resources
              </div>
              <h1 className="text-6xl md:text-7xl font-heading font-bold text-foreground mb-6 leading-tight">
                Resources
              </h1>
              <p className="text-xl text-secondary max-w-2xl">
                Curated frameworks and guides that hold up in practice.
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
                    <div className="space-y-1">
                      {category.items.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-lg px-3 py-2.5 -mx-3 hover:bg-black/[0.03] transition-colors"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-sm text-secondary leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-16 pt-8 border-t border-black/10">
            <p className="text-sm text-secondary">
              This list evolves. Only resources that hold up in practice are included.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
