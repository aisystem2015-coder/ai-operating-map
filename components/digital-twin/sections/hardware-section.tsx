"use client";

/**
 * "Hardware & Infrastructure" — the physical compute layer underneath
 * every digital twin (and every other AI system on this site). NVIDIA
 * content ported from digital_twin_site's /hardware page (2026-07-27
 * merge), re-skinned to emerald. AMD content is new — added from
 * Francisco's own notes at AMD's "Advancing AI 2026" keynote (Lisa Su,
 * San Francisco, Jul 2026), additive alongside the existing NVIDIA
 * material, not a replacement for it. Figures as briefed — nothing
 * invented here.
 */
import { motion, useReducedMotion } from "framer-motion";
import { Cpu, Zap, Flame, TrendingUp, Server, Layers, Rocket, Gauge, Laptop, Compass, Scale } from "lucide-react";
import SectionReveal from "@/components/learning/SectionReveal";
import StatTile from "@/components/charts/StatTile";
import ChartSource from "@/components/charts/ChartSource";
import { CATEGORICAL } from "@/components/charts/tokens";

function InfoCard({
  icon: Icon,
  title,
  children,
  source,
  color = CATEGORICAL[0],
}: {
  icon: typeof Cpu;
  title: string;
  children: React.ReactNode;
  source?: string;
  color?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className="rounded-2xl bg-white p-6 space-y-3 border border-black/5 shadow-sm"
      whileHover={reduceMotion ? undefined : { y: -4, boxShadow: "0 14px 28px -10px rgba(15,23,42,0.16)" }}
    >
      <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}1A` }}>
        <Icon className="h-5 w-5" style={{ color }} />
      </div>
      <h4 className="text-base font-semibold text-foreground">{title}</h4>
      <div className="text-sm leading-relaxed text-secondary">{children}</div>
      {source && <p className="text-xs text-secondary/70 pt-1">Source: {source}</p>}
    </motion.div>
  );
}

export default function HardwareSection() {
  return (
    <section className="scroll-mt-32 space-y-16">
      <SectionReveal>
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">The physical layer</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
            A digital twin has to run somewhere
          </h2>
          <p className="text-secondary leading-relaxed">
            Every question a digital twin answers is, underneath, a request that lands on a physical chip,
            in a physical rack, drawing physical power, in a physical building. This section covers that
            layer — the chips, racks, and data centers that make any of this possible at all.
          </p>
        </div>
      </SectionReveal>

      {/* Why this is everywhere */}
      <SectionReveal>
        <div className="rounded-3xl bg-gradient-to-br from-amber-50 to-emerald-50 border border-amber-200/50 p-8 lg:p-12 space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-900 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
            <Flame className="h-3.5 w-3.5" />
            Why this is everywhere right now
          </span>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight">
            Chips and racks stopped being a back-office topic
          </h3>
          <p className="text-base leading-relaxed text-foreground">
            Three data points explain why hardware infrastructure has become one of the most-discussed
            topics in AI and tech media this year, not just an engineering footnote: NVIDIA&apos;s B200 and
            GB200 hardware is reportedly sold out through mid-2026 with a backlog of roughly{" "}
            <strong>3.6 million units</strong>. The four largest US tech companies are on track to spend a
            combined <strong>$325 billion</strong> on AI infrastructure in 2026 alone. And a single
            rack&apos;s power draw jumped from about <strong>120kW to as much as 370kW within one
            year</strong> — a nearly 3x increase in twelve months.
          </p>
        </div>
      </SectionReveal>

      {/* NVIDIA — chips & racks */}
      <SectionReveal>
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">NVIDIA — the chips</p>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Chips &amp; racks</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <InfoCard icon={Cpu} title="Two live NVIDIA generations in production" color={CATEGORICAL[1]}>
              <strong>Hopper</strong> (H100, H200) and <strong>Blackwell</strong> (B200, and the GB200 NVL72
              rack) are both running in data centers today. A GB200 NVL72 cabinet packs 72 B200 GPUs and 36
              Grace CPUs into one liquid-cooled unit — an entire supercomputer in a single rack.
            </InfoCard>
            <InfoCard icon={Server} title="Sold out through mid-2026" color={CATEGORICAL[4]} source="Silicon Analysts / IntuitionLabs pricing index, July 2026">
              B200/GB200 hardware is reportedly sold out through mid-2026, with a backlog of roughly 3.6
              million units — demand running well ahead of what can physically be manufactured and shipped.
            </InfoCard>
          </div>
          <InfoCard icon={Rocket} title="Next up: Vera Rubin, H2 2026" color={CATEGORICAL[2]} source="Singularity Moments / IntuitionLabs, 2026">
            Built on TSMC 3nm, with HBM4 memory at 288GB per GPU and 13 TB/s of bandwidth. The Rubin NVL144
            rack is designed to deliver 3.6 ExaFLOPS of dense FP4 compute — one more generational jump on
            top of hardware that is already sold out.
          </InfoCard>
        </div>
      </SectionReveal>

      {/* NVIDIA — power & cooling, market scale */}
      <SectionReveal>
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">What it takes to run</p>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Power, cooling &amp; market scale</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            <StatTile label="Rack power, GB200 today vs. next-gen 2026" value="120kW → 370kW" accentColor={CATEGORICAL[1]} />
            <StatTile label="Liquid cooling market, 2026 vs. 2033" value="26–32% CAGR" detail="$4–6B → $27–30B" accentColor={CATEGORICAL[2]} />
            <StatTile label="Global data center electricity demand by 2026" value="1,000+ TWh" accentColor={CATEGORICAL[0]} />
          </div>
          <ChartSource label="DC&T Global (rack power); Persistence Market Research / MarketsandMarkets (cooling); Gartner (electricity demand), 2026" />
          <div className="grid sm:grid-cols-3 gap-5 pt-4">
            <StatTile label="Rack-scale GPU market, 2026 → 2031" value="34% CAGR" detail="~$9.6B → ~$41B" accentColor={CATEGORICAL[4]} />
            <StatTile label="Combined 2026 AI infra capex — Amazon, Microsoft, Google, Meta" value="$325B" accentColor={CATEGORICAL[1]} />
            <StatTile label="Digital twin market itself, 2026" value="31–48% CAGR" detail="$34–54B, range across research houses" accentColor={CATEGORICAL[2]} />
          </div>
          <ChartSource label="Mordor Intelligence; 2026 industry capex tracking; multiple 2026 market estimates" />
        </div>
      </SectionReveal>

      {/* AMD — new, additive */}
      <SectionReveal>
        <div className="rounded-3xl bg-emerald-950 text-white p-8 lg:p-12 space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
            <Gauge className="h-3.5 w-3.5" />
            The second major player
          </span>
          <h3 className="text-2xl md:text-3xl font-heading font-bold leading-tight">AMD Helios — a rival full-rack platform</h3>
          <p className="text-white/80 leading-relaxed max-w-3xl">
            Francisco attended AMD&apos;s &ldquo;Advancing AI 2026&rdquo; keynote in San Francisco (Lisa Su
            presenting) — this section is what he brought back, additive to the NVIDIA material above, not
            a replacement for it.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-5">
            <InfoCard icon={Server} title="AMD's first full AI rack — training and inference" color={CATEGORICAL[0]}>
              Shipping this quarter (Q3 2026), rolling out through 2027. Anthropic committed{" "}
              <strong>2 gigawatts</strong> of Helios capacity — roughly the electricity draw of 2 million
              homes — specifically to use Claude to help build AMD&apos;s own software faster. OpenAI: first
              phase of a 6 gigawatt Helios deal. Meta: co-designing at gigawatt scale.
            </InfoCard>
            <InfoCard icon={Zap} title="30% more tokens per dollar" color={CATEGORICAL[1]}>
              AMD claims 30% more tokens per dollar than the competition, and up to <strong>34x</strong> the
              token throughput of the new MI455X GPU vs. the prior-generation MI355X on the DeepSeek-V4
              benchmark.
            </InfoCard>
          </div>
          <InfoCard icon={TrendingUp} title="The framing shift: inference, not training, dominates" color={CATEGORICAL[2]}>
            Lisa Su called this out on stage: in 2026, roughly <strong>60% of global AI compute</strong> now
            goes to inference (running trained models), not training them — a few years ago it was mostly
            training. Cost-per-token keeps dropping as a result.
          </InfoCard>
          <InfoCard icon={Rocket} title='"Days, not months"' color={CATEGORICAL[4]}>
            A concrete anecdote from Anthropic on stage: one engineer, given a Helios rack and Claude,
            produced a meaningfully better model in a single weekend.
          </InfoCard>
          <ChartSource label="Francisco Guevara, AMD Advancing AI 2026, San Francisco (Jul 2026)" />
        </div>
      </SectionReveal>

      {/* Agent productivity tiers */}
      <SectionReveal>
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">AMD&apos;s own framing</p>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Agent productivity tiers</h3>
            <p className="text-secondary leading-relaxed">
              AMD said explicitly they&apos;re building hardware for the top of this ramp, not the bottom —
              the same argument this site makes elsewhere about why agentic systems matter.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            <StatTile label="Personal agent" value="2x" detail="One person, one assistant" accentColor={CATEGORICAL[0]} />
            <StatTile label="Team of agents, one workflow" value="10x" accentColor={CATEGORICAL[1]} />
            <StatTile label="Multi-capability agents (reasoning + tools)" value="100x" accentColor={CATEGORICAL[4]} />
          </div>
          <ChartSource label="Francisco Guevara, AMD Advancing AI 2026, San Francisco (Jul 2026)" />
        </div>
      </SectionReveal>

      {/* Personal AI hardware */}
      <SectionReveal>
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Ties directly into this section</p>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Personal AI hardware</h3>
            <p className="text-secondary leading-relaxed">
              This is the hardware layer a personal digital twin like the one on this page could eventually
              run on entirely locally.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <InfoCard icon={Laptop} title='AMD Ryzen AI Halo ("Gorgon Halo")' color={CATEGORICAL[0]}>
              A <strong>$3,999</strong> desktop AI computer with 128–192GB of unified memory — roughly 10x
              the memory of a normal work laptop. Can run 200–300 billion parameter models{" "}
              <strong>locally</strong>: no cloud API calls, no API cost, all local inference.
            </InfoCard>
            <InfoCard icon={Compass} title="Not frontier-scale yet, but closing fast" color={CATEGORICAL[2]}>
              Halo can&apos;t fully run frontier models like Claude locally today, but open-source models at
              a similar parameter scale are closing the gap quickly.
            </InfoCard>
          </div>
          <InfoCard icon={Gauge} title={'AMD’s "Day in a Life" comparison'} color={CATEGORICAL[1]}>
            A worker with an AI PC finishes routine tasks in roughly half the time of a non-AI PC, freeing
            the rest of the day for work that actually needs a human.
          </InfoCard>
          <ChartSource label="Francisco Guevara, AMD Advancing AI 2026, San Francisco (Jul 2026)" />
        </div>
      </SectionReveal>

      {/* LLM vs SLM */}
      <SectionReveal>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="rounded-2xl bg-white p-6 space-y-2 border border-black/5 shadow-sm">
            <h4 className="text-base font-semibold text-foreground">LLM — large language model</h4>
            <p className="text-sm leading-relaxed text-secondary">
              Frontier-scale, e.g. Claude or GPT — expensive to train, general-purpose by design.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 space-y-2 border border-black/5 shadow-sm">
            <h4 className="text-base font-semibold text-foreground">SLM — small language model</h4>
            <p className="text-sm leading-relaxed text-secondary">
              Far cheaper to train, increasingly sharp when tuned on one company&apos;s own private data.
            </p>
          </div>
        </div>
      </SectionReveal>

      {/* Where this is heading — Francisco's own read, clearly attributed */}
      <SectionReveal>
        <div className="rounded-3xl border border-black/5 bg-white p-8 lg:p-12 space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-800 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
            <Compass className="h-3.5 w-3.5" />
            Francisco&apos;s own read — not established fact
          </span>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Where this is heading</h3>
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="shrink-0 h-7 w-7 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold flex items-center justify-center">1</span>
              <p className="text-sm leading-relaxed text-secondary">
                Compute becomes distributed — desk-side supercomputers like Halo, possibly evolving into a
                home-hosted-compute business model.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 h-7 w-7 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold flex items-center justify-center">2</span>
              <p className="text-sm leading-relaxed text-secondary">
                Frontier models drift toward open source, or a &ldquo;subscription-for-patents&rdquo; model —
                pay for the model license and separately for the compute it runs on.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 h-7 w-7 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold flex items-center justify-center">3</span>
              <p className="text-sm leading-relaxed text-secondary">
                New services emerge specifically around training and running small language models (SLMs) on
                a company&apos;s own private data.
              </p>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 h-7 w-7 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold flex items-center justify-center">4</span>
              <p className="text-sm leading-relaxed text-secondary">
                <Scale className="inline h-3.5 w-3.5 mb-0.5 mr-1" />
                Regulation gets real — AMD, OpenAI, and others sent a joint letter to the White House the
                same week, pushing back on regulating local/on-device models. A fight worth watching, not a
                resolved issue.
              </p>
            </li>
          </ol>
          <ChartSource label="Francisco Guevara, AMD Advancing AI 2026, San Francisco (Jul 2026)" />
        </div>
      </SectionReveal>
    </section>
  );
}
