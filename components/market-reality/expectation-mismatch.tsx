"use client";

import SectionReveal from "../learning/SectionReveal";
import ProportionBar from "../charts/ProportionBar";

export default function ExpectationMismatch() {
  return (
    <section className="py-24 px-6 lg:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-semibold text-foreground leading-tight">
              The ROI Gap - Enterprise AI
            </h2>
          </div>
        </SectionReveal>

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <SectionReveal delay={0.1}>
            <ProportionBar
              title="Revenue Growth"
              baseline={51}
              actual={19}
              description={
                <>
                  Many organizations expect AI to drive top-line growth, but only a
                  fraction have realized measurable revenue impact – mainly
                  because{" "}
                  <span className="font-semibold text-foreground">
                    most pilots remain isolated, lack integration with P&amp;L
                    metrics, and fail to reach production scale.
                  </span>
                </>
              }
              sourceLabel="McKinsey & Company"
              sourceHref="https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential-at-work"
            />
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <ProportionBar
              title="Cost Reduction next 18 months"
              baseline={90}
              actual={20}
              actualValueLabel="<20%"
              description={
                <>
                  While AI promises operational efficiency, most companies remain
                  in early stages of cost realization due to{" "}
                  <span className="font-semibold text-foreground">
                    fragmented data, weak governance, and low cross-functional
                    adoption.
                  </span>
                </>
              }
              sourceLabel="Boston Consulting Group"
              sourceHref="https://docs.google.com/presentation/d/1-UsPTZsk1XIge6l2k2ne3DZ_4ML1lj813R1WOa3UTgY/edit?slide=id.g39b343267ec_0_2460#slide=id.g39b343267ec_0_2460"
            />
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
