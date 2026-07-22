"use client";

/**
 * /create-your-digital-twin — a NEW, separate, beginner-facing,
 * product-marketing page. The seed of a future "build your own Digital
 * Twin" product. Written for a total non-technical visitor who has never
 * touched a dev tool.
 *
 * This is deliberately NOT the /digital-twin page (components/pages/
 * DigitalTwinPage.tsx) — that one stays untouched, aimed at the site's
 * existing ops-professional audience, with its own stub chat widget. This
 * page has its own palette (indigo/sky/amber/rose — see
 * components/create-your-digital-twin/palette.ts), its own font (DM
 * Sans), and a REAL, working chat backed by app/api/twin-public-chat —
 * see that route for the honest local-dev-only limitation.
 */

import { useCallback } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  NotebookPen,
  Mic,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  ArrowRight,
  ArrowDown,
  Lock,
  Smartphone,
  GitCompare,
  Headphones,
  BookOpen,
  Brain,
  RefreshCw,
  Users,
  Quote,
} from "lucide-react";
import Navigation from "../Navigation";
import InteractiveGlow from "../ui/interactive-glow";
import { NeuroNoise } from "@/components/ui/neuro-noise";
import { TWIN, STEP_GRADIENT } from "../create-your-digital-twin/palette";
import TwinOrbitalVisual from "../create-your-digital-twin/twin-orbital-visual";
import PublicTwinChatPanel from "../create-your-digital-twin/public-twin-chat-panel";
import PublicTwinChatWidget from "../create-your-digital-twin/public-twin-chat-widget";
import TwinWaitlistForm from "../create-your-digital-twin/twin-waitlist-form";
import { usePublicTwinChat } from "../create-your-digital-twin/use-public-twin-chat";

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
};

// ── Section content ─────────────────────────────────────────────────────

const benefits = [
  {
    icon: RefreshCw,
    title: "Never re-explain your own history",
    desc: "You've already told an AI chatbot who you are, what you're working on, and what you decided last time — and it forgot the second the conversation ended. A digital twin remembers, permanently, so you stop repeating yourself.",
  },
  {
    icon: Users,
    title: "\"What did I tell my team last month?\"",
    desc: "Ask it. If you wrote it down or said it out loud and it got captured, your twin can find it and answer — instead of you scrolling through old messages trying to remember.",
  },
  {
    icon: Brain,
    title: "A second brain that actually reasons",
    desc: "Not just a search box. It can connect a decision you made in March to a question you're asking in July, because it has both in its notes — the same way a person who's known you for years connects dots you've forgotten about.",
  },
  {
    icon: ShieldCheck,
    title: "Built to be honest, not impressive",
    desc: "If the answer isn't in your notes, it says so — it doesn't make something up to sound smart. That's the whole design, not an accident.",
  },
];

const ingredients = [
  {
    icon: NotebookPen,
    title: "A place to keep your notes",
    subtitle: "\"The vault\"",
    desc: "Think of it like a personal notebook — except every page is searchable instantly, and it never gets lost. In tech terms this is called a \"vault,\" but it's really just a folder of notes on your own computer.",
  },
  {
    icon: Mic,
    title: "A way to feed it, over time",
    subtitle: "Voice or text, little and often",
    desc: "A quick voice memo in the car, a few typed lines after a meeting, a thought you don't want to lose. The habit matters more than the tool — five minutes a day beats one huge dump once a year.",
  },
  {
    icon: ShieldCheck,
    title: "A model that only tells the truth about you",
    subtitle: "\"Grounding,\" explained simply",
    desc: "Most AI chatbots are like a very confident stranger — if they don't know something, they'll often guess anyway, smoothly, and you might not notice. \"Grounding\" means the AI is only allowed to answer using your actual notes, like an open-book exam instead of a guess. If your notes don't have it, it has to say \"I don't know\" instead of making something up.",
  },
];

const buildSteps = [
  {
    title: "Start a note-taking habit",
    detail: "Pick one place to keep your notes — a notebook app, a document, anything you'll actually open again. The tool matters less than doing it at all.",
  },
  {
    title: "Capture consistently — voice or text",
    detail: "A minute of talking or typing after something happens beats a perfect essay you never write. Little and often is what makes a twin useful later.",
  },
  {
    title: "Connect an AI that only answers from your notes",
    detail: "This is the \"grounding\" step from above, made real — wire an AI assistant to search your notes before it answers anything about you, instead of guessing from the internet.",
  },
  {
    title: "Set access levels so some things stay private",
    detail: "Not everything you write should be visible to everyone who talks to your twin. Mark what's shareable, what's personal, and what should never come up — before you ever open it to anyone else.",
  },
  {
    title: "Grow it over time",
    detail: "A twin gets better the more real context it has. Keep capturing, keep reviewing what it gets wrong, and it keeps compounding — this is a habit, not a one-time setup.",
  },
];

const roadmap = [
  {
    icon: GitCompare,
    title: "Compare AI models side by side",
    desc: "Different AI models have different strengths. A future version lets you ask the same question to a few of them at once and see how the answers differ.",
  },
  {
    icon: Smartphone,
    title: "A mobile-friendly, always-available version",
    desc: "Right now this lives on a computer. The idea is a version that works from your phone, anywhere, so capturing a thought never has to wait.",
  },
  {
    icon: Lock,
    title: "Encrypted, password-protected private entries",
    desc: "Some things deserve a lock, not just a setting. A future version adds real encryption for your most private entries, on top of the access-level system.",
  },
  {
    icon: Headphones,
    title: "A voice-journal habit-building companion",
    desc: "A gentle daily nudge to capture a thought out loud — designed to make the habit in step one actually stick, instead of relying on willpower alone.",
  },
];

export default function CreateYourDigitalTwinPage() {
  const chat = usePublicTwinChat();
  const reduceMotion = useReducedMotion();

  const scrollToChat = useCallback(() => {
    document.getElementById("talk-to-a-real-one")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [reduceMotion]);

  const scrollToSteps = useCallback(() => {
    document.getElementById("how-to-build-one")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [reduceMotion]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: TWIN.bg, color: TWIN.text, fontFamily: "var(--font-dm-sans, sans-serif)" }}>
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative isolate overflow-hidden pt-32 lg:pt-40 pb-20">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: `linear-gradient(160deg, #0F0F2E 0%, #1A1650 45%, #0B1E3A 100%)` }}
          aria-hidden
        />
        <div className="relative isolate z-0">
          <InteractiveGlow colors={[TWIN.indigo, TWIN.sky, TWIN.amber]} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeIn} className="space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
              <Sparkles className="h-3.5 w-3.5" style={{ color: TWIN.amber }} />
              A real, working proof of concept
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-white">
              An AI that actually knows{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(90deg, ${TWIN.sky}, ${TWIN.amber})` }}
              >
                you
              </span>
              — not a stranger guessing.
            </h1>
            <p className="text-lg text-white/75 leading-relaxed max-w-xl mx-auto lg:mx-0">
              A digital twin is a private AI you feed your own notes and voice over time, so it can answer
              questions and help you out — grounded only in what you actually told it, never making things
              up. Don&apos;t just read about it. Talk to a real one, right now.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start pt-2">
              <button
                type="button"
                onClick={scrollToChat}
                className="min-h-[44px] cursor-pointer inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F0F2E]"
                style={{ backgroundColor: TWIN.amber }}
              >
                <MessageCircle className="h-4 w-4" />
                Talk to a real digital twin
              </button>
              <button
                type="button"
                onClick={scrollToSteps}
                className="min-h-[44px] cursor-pointer inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/5 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F0F2E]"
              >
                See how to build your own
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <TwinOrbitalVisual />
          </motion.div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 lg:px-8 space-y-28 py-24">
        {/* ── WHAT IS A DIGITAL TWIN ── */}
        <motion.section {...fadeIn} className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: TWIN.indigo }}>
              In plain English
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">What is a &ldquo;digital twin,&rdquo; really?</h2>
          </div>
          <div
            className="rounded-3xl p-8 lg:p-12 space-y-5"
            style={{ background: "linear-gradient(135deg, #EEF0FE 0%, #E6F6FE 100%)", border: "1px solid rgba(99,102,241,0.15)" }}
          >
            <Quote className="h-8 w-8" style={{ color: TWIN.indigo }} />
            <p className="text-lg leading-relaxed" style={{ color: TWIN.text }}>
              Imagine buying a new fridge. It comes with an instruction manual — how the temperature
              settings work, how to fix the ice maker, what that one blinking light means. Now imagine two
              repair technicians. One has read your fridge&apos;s manual. The other has never seen it and is
              just guessing from general fridge knowledge. Both sound confident. Only one is actually right.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: TWIN.text }}>
              A <strong>digital twin</strong> is that instruction manual, but for you — built from your own
              notes, voice memos, and history — handed to an AI so it stops guessing and starts actually
              knowing your situation. Not a robot copy of you, not science fiction. Just an AI that&apos;s
              done its homework on your life instead of a stranger&apos;s.
            </p>
          </div>
        </motion.section>

        {/* ── BENEFITS ── */}
        <motion.section {...fadeIn} className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: TWIN.sky }}>
              Real, not abstract
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">What it&apos;s actually good for</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="rounded-2xl bg-white p-6 space-y-3 shadow-sm"
                style={{ border: "1px solid rgba(15,23,42,0.06)" }}
              >
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${TWIN.indigo}1A` }}
                >
                  <b.icon className="h-5 w-5" style={{ color: TWIN.indigo }} />
                </div>
                <h3 className="text-base font-semibold" style={{ color: TWIN.text }}>{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: TWIN.muted }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── WHAT YOU NEED ── */}
        <motion.section {...fadeIn} className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: TWIN.amber }}>
              The real ingredients
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">What you actually need to build one</h2>
            <p className="text-base leading-relaxed" style={{ color: TWIN.muted }}>
              Three things. None of them require you to know how to code.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {ingredients.map((ing) => (
              <div
                key={ing.title}
                className="rounded-2xl p-6 space-y-3"
                style={{ backgroundColor: "#fff", border: "1px solid rgba(15,23,42,0.06)" }}
              >
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${TWIN.amber}1A` }}
                >
                  <ing.icon className="h-5 w-5" style={{ color: TWIN.amber }} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: TWIN.muted }}>
                  {ing.subtitle}
                </p>
                <h3 className="text-base font-semibold" style={{ color: TWIN.text }}>{ing.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: TWIN.muted }}>{ing.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── HOW TO BUILD YOUR OWN — step by step ── */}
        <motion.section {...fadeIn} id="how-to-build-one" className="scroll-mt-28 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: TWIN.indigo }}>
              The actual product pitch
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">How to build your own — step by step</h2>
            <p className="text-base leading-relaxed" style={{ color: TWIN.muted }}>
              No code, no engineering degree. Just a habit, a tool, and some patience — in that order.
            </p>
          </div>

          <div className="relative">
            <div
              className="hidden lg:block absolute left-0 right-0 top-8 h-1 rounded-full"
              style={{ background: `linear-gradient(90deg, ${TWIN.indigo}, ${TWIN.sky}, ${TWIN.amber})` }}
              aria-hidden
            />
            <div className="grid lg:grid-cols-5 gap-6">
              {buildSteps.map((step, i) => {
                const color = STEP_GRADIENT[i];
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="relative space-y-3"
                  >
                    <div
                      className="relative z-10 h-16 w-16 mx-auto lg:mx-0 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-lg"
                      style={{ backgroundColor: color }}
                    >
                      {i + 1}
                    </div>
                    <div className="rounded-2xl bg-white p-5 space-y-2 h-full" style={{ border: `1px solid ${color}33` }}>
                      <h3 className="text-sm font-semibold leading-snug" style={{ color: TWIN.text }}>{step.title}</h3>
                      <p className="text-xs leading-relaxed" style={{ color: TWIN.muted }}>{step.detail}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* ── ROADMAP ── */}
        <motion.section {...fadeIn} className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: TWIN.rose }}>
              Where this is going
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">Future extensions — ideas, not commitments</h2>
            <p className="text-base leading-relaxed" style={{ color: TWIN.muted }}>
              None of this is built yet or promised on a date. It&apos;s the direction the project is
              already exploring.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {roadmap.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-6 flex gap-4"
                style={{ backgroundColor: "#fff", border: "1px solid rgba(15,23,42,0.06)" }}
              >
                <div
                  className="h-10 w-10 shrink-0 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${TWIN.rose}1A` }}
                >
                  <item.icon className="h-5 w-5" style={{ color: TWIN.rose }} />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-semibold" style={{ color: TWIN.text }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: TWIN.muted }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── TALK TO A REAL ONE — the money section ── */}
        <motion.section {...fadeIn} id="talk-to-a-real-one" className="scroll-mt-28">
          <div
            className="relative isolate overflow-hidden rounded-3xl p-8 lg:p-12 space-y-8"
            style={{ background: "linear-gradient(160deg, #10102E 0%, #191259 55%, #072033 100%)" }}
          >
            <NeuroNoise
              className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-60"
              colorFront={TWIN.indigo}
              colorMid={TWIN.sky}
              colorBack="#0B1030"
              brightness={0.35}
              contrast={0.3}
              speed={0.3}
              scale={1.3}
            />
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                <MessageCircle className="h-3.5 w-3.5" style={{ color: TWIN.amber }} />
                Live and working right now
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Talk to Francisco&apos;s actual digital twin
              </h2>
              <p className="text-base text-white/70 leading-relaxed">
                This isn&apos;t a mockup or a scripted demo — it&apos;s a real chat, grounded in Francisco&apos;s
                real notes, answering live. Ask it something.
              </p>
            </div>

            <div className="max-w-xl mx-auto w-full">
              <PublicTwinChatPanel chat={chat} variant="embedded" />
            </div>

            <p className="text-center text-xs text-white/45 max-w-lg mx-auto leading-relaxed">
              Runs only while this site is live on Francisco&apos;s own computer — this feature does not
              work on the publicly deployed version of this site. Replies can take up to about two minutes,
              since it searches the real vault for every answer.
            </p>
          </div>
        </motion.section>

        {/* ── CTA / WAITLIST ── */}
        <motion.section {...fadeIn} className="space-y-6">
          <div
            className="relative isolate overflow-hidden rounded-3xl p-8 lg:p-12 text-center space-y-6"
            style={{ background: `linear-gradient(120deg, ${TWIN.indigo}, #4338CA 55%, ${TWIN.rose})` }}
          >
            <BookOpen className="h-8 w-8 mx-auto text-white/80" aria-hidden />
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight max-w-2xl mx-auto">
              Want your own digital twin?
            </h2>
            <p className="text-base text-white/85 max-w-xl mx-auto leading-relaxed">
              This is the seed of a real product. Leave your name and email and we&apos;ll let you know when
              there&apos;s something you can actually try.
            </p>
            <div className="max-w-lg mx-auto">
              <TwinWaitlistForm />
            </div>
          </div>
        </motion.section>

        {/* ── Bridge back to the more technical page ── */}
        <motion.section {...fadeIn}>
          <div
            className="rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ backgroundColor: "#fff", border: "1px solid rgba(15,23,42,0.06)" }}
          >
            <p className="text-sm leading-relaxed" style={{ color: TWIN.muted }}>
              Want the more technical version — market data, storage trade-offs, and the underlying system
              model?
            </p>
            <Link
              href="/digital-twin"
              className="min-h-[44px] shrink-0 cursor-pointer inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ backgroundColor: TWIN.indigo }}
            >
              Read the deep-dive <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.section>
      </main>

      <PublicTwinChatWidget chat={chat} />
    </div>
  );
}
