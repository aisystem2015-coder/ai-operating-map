"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionReveal from "../learning/SectionReveal";
import { MATURITY_TIMELINE } from "@/data/timeline";

export default function MaturityTimeline() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="timeline" className="py-32 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <div className="mb-4 text-center space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
              2017 → Now
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight">
              AI Maturity Timeline
            </h2>
            <p className="text-base text-secondary max-w-2xl mx-auto">
              What changed each era, what to do, and what not to chase. Click any era to expand it.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="mt-12 rounded-3xl border border-black/5 bg-white shadow-sm overflow-hidden divide-y divide-black/5">
            {MATURITY_TIMELINE.map((node, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={node.period}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50/60 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="flex-shrink-0 text-xs font-semibold uppercase tracking-wide text-accent bg-accent/10 rounded-full px-3 py-1.5">
                        {node.period}
                      </span>
                      <span className="text-lg md:text-xl font-heading font-semibold text-foreground truncate">
                        {node.title}
                      </span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`flex-shrink-0 text-secondary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-7 grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">
                          What changed
                        </h4>
                        <p className="text-sm text-secondary leading-relaxed">{node.whatChanged}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-2">
                          Do this
                        </h4>
                        <p className="text-sm text-secondary leading-relaxed">{node.whatCompaniesShouldDo}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-rose-600 uppercase tracking-wide mb-2">
                          Don&apos;t chase
                        </h4>
                        <p className="text-sm text-secondary leading-relaxed">{node.whatNotToChase}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
