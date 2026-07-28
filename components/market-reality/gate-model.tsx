"use client";

import SectionReveal from "../learning/SectionReveal";

const ACTUAL_COLOR = "#1bc4a6"; // soft green from the actuals

export default function GateModel() {
  return (
    <section className="py-32 px-6 lg:px-8 bg-white/30">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          {/* One Strong Headline */}
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-16 text-center leading-tight">
            The GATE Model
          </h2>
        </SectionReveal>

        {/* Big Number - Primary Visual */}
        <SectionReveal delay={0.1}>
          <div className="text-center mb-20">
            <div
              className="text-[10rem] md:text-[12rem] font-heading font-bold leading-none mb-6 tracking-tighter"
              style={{ color: ACTUAL_COLOR }}
            >
              GATE
            </div>
            <p className="text-xl md:text-2xl text-secondary max-w-2xl mx-auto">
              AI capability is gated by data maturity
            </p>
          </div>
        </SectionReveal>

        {/* Simplified Gate Sequence */}
        <SectionReveal delay={0.2}>
          <div className="max-w-3xl mx-auto mb-12">
            <div className="space-y-6">
              {[
                {
                  letter: "G",
                  title: "Governance & Data",
                  question: "Do we have the data quality and governance?",
                },
                {
                  letter: "A",
                  title: "Agility & Scale",
                  question:
                    "Can this solution adapt to change and integrate seamlessly with our existing systems and workflows?",
                },
                {
                  letter: "T",
                  title: "Talent & Support",
                  question: "Do we have the skills to build and support this AI solution?",
                },
                {
                  letter: "E",
                  title: "Evaluation & Trust",
                  question: "Do users trust outputs and decisions?",
                },
              ].map((gate, index) => (
                <div
                  key={gate.letter}
                  className="hover-glow-flat flex items-start gap-6 rounded-2xl border border-transparent px-3 py-2 -mx-3"
                >
                  <div
                    className="w-20 h-20 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: ACTUAL_COLOR }}
                  >
                    <span className="text-4xl font-bold text-white">{gate.letter}</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-2xl font-heading font-semibold text-foreground">
                      {gate.title}
                    </h3>
                    <p className="text-base leading-relaxed text-foreground/80">{gate.question}</p>
                  </div>
                  {index < 3 && (
                    <div className="text-3xl" style={{ color: `${ACTUAL_COLOR}66` }}>
                      ↓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Minimal Caption */}
        <SectionReveal delay={0.3}>
          <p className="text-xl text-foreground text-center max-w-2xl mx-auto">
            You cannot skip stages
          </p>
          <p className="text-sm text-secondary/70 text-center mt-4">Source: Snowflake</p>
        </SectionReveal>

        {/* Placeholder AI interaction UI */}
        <SectionReveal delay={0.35}>
          <div className="mt-16 max-w-4xl mx-auto bg-white shadow-xl shadow-foreground/5 border border-foreground/5 rounded-2xl overflow-hidden">
            <div
              className="px-6 py-5 sm:px-8"
              style={{ background: "linear-gradient(135deg, #f4fdfb, #e7f7f2)" }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-foreground/70">
                Coming soon
              </p>
              <h3 className="mt-2 text-2xl font-heading font-semibold text-foreground">
                Test your business case with the GATE advisor
              </h3>
              <p className="mt-1 text-sm text-foreground/70">
                Paste your charter, add context, and upload a file. The GATE model will return tailored guidance
                across Governance, Agility, Talent, and Evaluation. (UI only for now)
              </p>
            </div>

            <div className="px-6 py-6 sm:px-8 space-y-4 bg-white">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-foreground/80">Project / use case</span>
                  <input
                    type="text"
                    placeholder="e.g., Finance forecasting copilot"
                    className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-foreground/30 focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-foreground/80">Target domain</span>
                  <input
                    type="text"
                    placeholder="e.g., FP&A, Customer Support, Supply Chain"
                    className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-foreground/30 focus:outline-none"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-foreground/80">Problem statement / charter</span>
                <textarea
                  rows={4}
                  placeholder="Describe the business objective, success criteria, and stakeholders..."
                  className="w-full rounded-lg border border-foreground/10 bg-background px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-foreground/30 focus:outline-none"
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-dashed border-foreground/15 bg-background px-4 py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                    <span
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white font-heading text-lg"
                      style={{ backgroundColor: ACTUAL_COLOR }}
                    >
                      ↥
                    </span>
                    <span>Upload supporting files (charter, brief, deck)</span>
                  </div>
                  <p className="text-xs text-foreground/60">
                    PDF, DOCX, or TXT — optional. Multiple files supported.
                  </p>
                </div>
                <label className="inline-flex items-center gap-2 cursor-pointer rounded-lg px-4 py-2 font-medium text-white text-sm shadow-sm"
                  style={{ backgroundColor: ACTUAL_COLOR }}
                >
                  <input type="file" className="hidden" multiple />
                  <span>Choose files</span>
                </label>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-foreground/70">
                  The GATE advisor will score readiness, surface risks, and propose next steps per stage.
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-sm hover:brightness-95 transition"
                  style={{ backgroundColor: ACTUAL_COLOR }}
                >
                  Get GATE feedback (UI only)
                </button>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
