"use client";

import SectionReveal from "../learning/SectionReveal";
import HorizontalTimeline from "../charts/HorizontalTimeline";
import { MATURITY_TIMELINE } from "@/data/timeline";

export default function MaturityTimeline() {
  const items = MATURITY_TIMELINE.map((node, i) => ({
    id: `${i}-${node.period}`,
    period: node.period,
    title: node.title,
    sections: [
      { label: "What changed", text: node.whatChanged, tone: "neutral" as const },
      { label: "Do this", text: node.whatCompaniesShouldDo, tone: "good" as const },
      { label: "Don't chase", text: node.whatNotToChase, tone: "avoid" as const },
    ],
  }));

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
          <div className="mt-12">
            <HorizontalTimeline items={items} />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
