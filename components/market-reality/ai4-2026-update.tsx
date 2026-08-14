"use client";

import SectionReveal from "../learning/SectionReveal";

// The 2026 refresh of this page's numbers, gathered at Ai4 (Las Vegas, Aug 4-6 2026).
// The rest of Market Reality is built on World Summit AI 2025 data. This section is
// deliberately separate rather than merged into it: the 2025 framing is still the
// argument, and this is what a year of production experience did to the evidence.

type Stat = {
  value: string;
  label: string;
  detail: string;
  source: string;
  href?: string;
};

const STATS: Stat[] = [
  {
    value: "75%",
    label: "have rolled back a live AI agent",
    detail:
      "Enterprises that shut down or reversed a deployed, customer-facing agent after go-live. Among organisations with mature governance it rises to 81% - the strongest teams are not failing less, they are seeing failures sooner.",
    source: "Sinch, 'The AI Production Paradox', May 2026 - 2,500+ senior decision-makers, 10 countries",
  },
  {
    value: "49%",
    label: "scaled back on cost, not capability",
    detail:
      "Leaders who pulled back agent deployments because operating costs outweighed the benefits. Yet AI stayed a top investment priority for 79%, up from 74% the prior quarter. This is repricing, not retreat.",
    source: "KPMG Global AI Pulse Q2 2026 - 2,145 senior leaders, 20 countries",
  },
  {
    value: "47% → 9%",
    label: "the single strongest predictor",
    detail:
      "Rollback rate for agents without automated evaluations, against agents with full eval coverage. Nothing else in the 2026 data separates outcomes this cleanly.",
    source: "Forrester, 2026",
  },
  {
    value: "17%",
    label: "have actually deployed agents",
    detail:
      "Against more than 60% who expect to within two years - the most aggressive adoption curve Gartner measures. The gap between intent and deployment is where the cancellations come from.",
    source: "Gartner 2026 CIO and Technology Executive Survey (n=2,501)",
  },
];

export default function Ai4Update2026() {
  return (
    <section
      id="ai4-2026-update"
      className="py-24 px-6 lg:px-10 bg-background scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <p className="text-xs font-semibold tracking-[0.2em] text-emerald-600 uppercase mb-4">
            The 2026 update · Ai4, Las Vegas
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold text-foreground leading-tight max-w-3xl">
            The failure moved. It is no longer in the pilot.
          </h2>
          <p className="mt-6 text-lg text-secondary max-w-3xl leading-relaxed">
            A year on, the pilots scaled. Then a lot of them were pulled back out of
            production. The largest cluster of tracks at Ai4 2026 was not capability -
            it was governance, failure modes, and accountability.
          </p>
        </SectionReveal>

        {/* The correction. Worth stating plainly, because the number below is the
            one this page led with for a year - and the one everyone still quotes. */}
        <SectionReveal delay={0.1}>
          <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50/60 p-7 md:p-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-amber-700 uppercase mb-3">
              A correction worth making
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              The famous &ldquo;95% of AI pilots fail&rdquo; figure was misreported.
              In the source study&rsquo;s own funnel, 60% of organisations investigated,
              20% reached a pilot, and 5% implemented successfully - so roughly a
              quarter of those who actually piloted cleared the bar. That is about 75%
              of pilots missing a deliberately hard six-month ROI test, not 95% failing.
              In the same report, general-purpose tools converted from pilot to
              implementation at over 80%.
            </p>
            <p className="mt-4 text-base text-secondary leading-relaxed">
              The number made the problem sound technical. It never was.
            </p>
            <p className="mt-5 text-sm text-secondary">
              Source: MIT NANDA, &ldquo;The GenAI Divide: State of AI in Business&rdquo;
              (2025), and subsequent methodology reviews.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {STATS.map((s, i) => (
            <SectionReveal key={s.label} delay={0.15 + i * 0.05}>
              <div className="h-full rounded-2xl border border-neutral-200 bg-white p-7 md:p-8">
                <div className="text-5xl md:text-6xl font-heading font-bold text-foreground leading-none">
                  {s.value}
                </div>
                <p className="mt-3 text-lg font-semibold text-foreground">
                  {s.label}
                </p>
                <p className="mt-4 text-base text-secondary leading-relaxed">
                  {s.detail}
                </p>
                <p className="mt-6 pt-4 border-t border-neutral-100 text-xs text-secondary leading-relaxed">
                  {s.source}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Why this matters for the reader, not just the analyst. */}
        <SectionReveal delay={0.4}>
          <div className="mt-14 rounded-2xl bg-foreground text-white p-8 md:p-10">
            <h3 className="text-2xl md:text-3xl font-heading font-semibold leading-snug max-w-3xl">
              Governance built after deployment is not governance. It is incident
              response.
            </h3>
            <p className="mt-5 text-base md:text-lg text-white/70 max-w-3xl leading-relaxed">
              Forrester attributes negative-ROI agent deployments to unclear success
              criteria (41%), insufficient tool or data access (33%), and evaluation
              drift (26%). None of those is a model-quality problem. Every one of them
              is decided before a line of code is written - which means every one of
              them is inside your control.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
