"use client";

/**
 * "Talk to a real one" + waitlist — content ported from
 * digital_twin_site's home page money-section (2026-07-27 merge),
 * re-skinned to emerald. Wires the cookie-based visit memory (job 3) into
 * the chat greeting, and opens the chat automatically once this section
 * scrolls into view so a first-time visitor sees the personalization
 * without needing to click anything first.
 */
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MessageCircle, BookOpen, History } from "lucide-react";
import SectionReveal from "@/components/learning/SectionReveal";
import ChatPanel from "../chat/chat-panel";
import { useTwinChat } from "../chat/use-twin-chat";
import { useVisitMemory } from "../use-visit-memory";
import WaitlistForm from "../waitlist-form";

export default function ChatSection() {
  const { isReturning, ready } = useVisitMemory();
  const chat = useTwinChat({ isReturning });
  const hasOpenedRef = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready || hasOpenedRef.current) return;
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasOpenedRef.current) {
          hasOpenedRef.current = true;
          chat.openChat();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ready, chat]);

  return (
    <div ref={sectionRef} className="space-y-16">
      {/* Chat */}
      <SectionReveal>
        <div
          id="talk-to-a-real-one"
          className="scroll-mt-32 relative isolate overflow-hidden rounded-3xl p-8 lg:p-12 space-y-6"
          style={{ background: "linear-gradient(160deg, #022c22 0%, #064e3b 55%, #052e27 100%)" }}
        >
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
              <MessageCircle className="h-3.5 w-3.5 text-indigo-300" />
              Live and working right now
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white leading-tight">
              Talk to Francisco&apos;s actual digital twin
            </h2>
            <p className="text-base text-white/70 leading-relaxed">
              This isn&apos;t a mockup or a scripted demo — it&apos;s a real chat, grounded in Francisco&apos;s
              real notes, answering live. Ask it something.
            </p>

            {ready && isReturning && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 text-xs text-indigo-200"
              >
                <History className="h-3.5 w-3.5" />
                This browser has been here before — skipping the intro. (That&apos;s all this remembers: a
                returning browser, not who you are.)
              </motion.p>
            )}
          </div>

          <div className="max-w-xl mx-auto w-full">
            <ChatPanel chat={chat} />
          </div>

          <p className="text-center text-xs text-white/45 max-w-lg mx-auto leading-relaxed">
            Runs only while this site is live on Francisco&apos;s own computer — this feature does not work
            on the deployed version of this site. Replies can take up to about two minutes, since it
            searches the real vault for every answer.
          </p>
        </div>
      </SectionReveal>

      {/* Waitlist */}
      <SectionReveal>
        <div
          id="waitlist"
          className="scroll-mt-32 relative isolate overflow-hidden rounded-3xl p-8 lg:p-12 text-center space-y-6"
          style={{ background: "linear-gradient(120deg, #059669, #047857 55%, #022c22)" }}
        >
          <BookOpen className="h-8 w-8 mx-auto text-white/80" aria-hidden />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white leading-tight max-w-2xl mx-auto">
            Want your own digital twin?
          </h2>
          <p className="text-base text-white/85 max-w-xl mx-auto leading-relaxed">
            This is the seed of a real product. Leave a name and email and we&apos;ll share it when
            there&apos;s something real to try.
          </p>
          <div className="max-w-lg mx-auto">
            <WaitlistForm />
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}
