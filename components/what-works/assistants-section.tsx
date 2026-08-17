"use client";

import SectionReveal from "../learning/SectionReveal";
import Callout from "../learning/Callout";

const traits = [
  {
    title: "Conversational memory",
    desc: "Remembers what was said earlier in the session (and across sessions, in some products) so you don't re-explain context every message.",
  },
  {
    title: "A persistent interface",
    desc: "Lives in one place you return to — a chat app, a sidebar, a browser extension — instead of a raw API call you construct yourself.",
  },
  {
    title: "Light tool use, human-driven",
    desc: "Can search the web, read a file, or run a calculation when asked — but you are the one deciding what happens next, every time.",
  },
  {
    title: "No standing goal",
    desc: "It responds to what you ask. It does not wake up, check on something, or keep working after you close the tab.",
  },
];

const examples = ["ChatGPT", "Claude.ai", "Microsoft Copilot", "Gemini app"];

export default function AssistantsSection() {
  return (
    <section id="assistants-section" className="py-32 px-6 lg:px-8 bg-white/30">
      <div className="max-w-6xl mx-auto space-y-12">
        <div id="assistants" className="h-0" aria-hidden />

        <SectionReveal>
          <div className="space-y-6 text-center">
            <h2 className="text-5xl md:text-6xl font-heading font-bold text-foreground leading-tight">
              Assistants: A Model You Can Talk To
            </h2>
            <p className="text-lg md:text-xl text-secondary max-w-4xl mx-auto">
              An assistant wraps an LLM in a conversation: memory of the thread, a place to keep coming
              back to, and just enough tool access to look things up or draft something on request.
              It is the layer between &ldquo;a model that predicts text&rdquo; and &ldquo;a system that
              acts on its own.&rdquo;
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <div className="rounded-3xl border border-black/5 bg-white shadow-xl shadow-blue-100/50 p-10 space-y-5">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Assistant defined</p>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
              What turns a model into an assistant
            </h3>
            <p className="text-lg text-secondary leading-relaxed">
              Take the raw LLM, add a chat interface, a running memory of the conversation, and
              access to a handful of tools it can use when you ask it to — and you have an
              assistant. Every action still starts with you typing a request and ends with you
              reading and approving the answer. Nothing happens in between turns.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="grid sm:grid-cols-2 gap-5">
            {traits.map((t) => (
              <div key={t.title} className="hover-glow rounded-2xl border border-black/5 bg-white p-6 shadow-sm space-y-3">
                <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="h-3 w-3 rounded-full bg-blue-500" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{t.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              What most people already use
            </span>
            {examples.map((e) => (
              <span key={e} className="text-sm font-medium text-foreground bg-slate-100 px-3 py-1.5 rounded-full">
                {e}
              </span>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <Callout variant="insight" title="Where assistants stop and agents begin">
            An assistant is turn-based: it waits for you, responds, and waits again. The moment a
            system starts a task on its own, keeps working across multiple steps without you
            watching every one, and decides when it&apos;s done — it has crossed into agent
            territory. That&apos;s the next tab.
          </Callout>
        </SectionReveal>
      </div>
    </section>
  );
}
