"use client";

/**
 * Embedded chat panel for the Digital Twins section. Brand palette (Francisco
 * Brand Manual): the two speakers get two distinct brand tones — the visitor
 * writes in signal blue, the twin answers in ink navy with a warm accent. An
 * animated brand border-beam frames the whole panel; messages animate in.
 */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Send, Sparkles, Fingerprint } from "lucide-react";
import type { UseTwinChatReturn } from "./use-twin-chat";
import { BorderBeam } from "@/components/ui/border-beam";

const BLUE = "#2563eb";
const NAVY = "#0a1838";
const WARM = "#d4956a";

const LEVEL_LABELS: Record<number, string> = {
  0: "Public",
  1: "Shareable",
  2: "Private",
  3: "Sensitive",
  4: "Intimate",
};

export default function ChatPanel({ chat }: { chat: UseTwinChatReturn }) {
  const { messages, loading, send, maxLength, unlockedLevel } = chat;
  const [input, setInput] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [codeBoxOpen, setCodeBoxOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    send(input, undefined, accessCode || undefined);
    setInput("");
  };

  return (
    <div className="relative flex flex-col overflow-hidden rounded-3xl border border-black/8 bg-white shadow-xl shadow-blue-500/10" style={{ minHeight: 440 }}>
      {/* Animated brand light travelling the frame */}
      <BorderBeam size={230} duration={11} borderWidth={1.6} colorFrom={BLUE} colorTo={WARM} />

      {/* Header — twin identity + live pulse */}
      <div className="relative flex items-center gap-3 px-4 py-3 text-white overflow-hidden" style={{ background: `linear-gradient(110deg, ${NAVY}, #16224a 55%, ${BLUE})` }}>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 backdrop-blur-sm ring-1 ring-white/15">
          <Fingerprint className="h-5 w-5" strokeWidth={1.9} />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-semibold">Francisco&apos;s digital twin</div>
          <div className="flex items-center gap-1.5 text-[11px] text-white/70">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Live · grounded in his real notes
          </div>
        </div>
        <span
          className="ml-auto rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
          style={{ backgroundColor: unlockedLevel > 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.14)", color: unlockedLevel > 0 ? NAVY : "rgba(255,255,255,0.85)" }}
        >
          {LEVEL_LABELS[unlockedLevel] ?? "Public"}
        </span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[240px] max-h-[360px] bg-gradient-to-b from-[#fafaf7] to-white">
        {messages.length === 0 && (
          <div className="flex items-center gap-2 text-sm text-secondary">
            <Sparkles className="h-4 w-4" style={{ color: BLUE }} aria-hidden />
            Say hi — this is a real, working conversation with Francisco&apos;s digital twin.
          </div>
        )}
        <AnimatePresence initial={false}>
          {messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <span className="mb-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg text-white" style={{ backgroundColor: NAVY }}>
                    <Fingerprint className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                )}
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 text-sm leading-relaxed shadow-md ${
                    isUser ? "text-white rounded-2xl rounded-br-md" : "text-white rounded-2xl rounded-bl-md"
                  }`}
                  style={
                    isUser
                      ? { background: `linear-gradient(135deg, #3b82f6, ${BLUE})`, boxShadow: "0 10px 24px -14px rgba(37,99,235,0.7)" }
                      : { backgroundColor: NAVY, borderLeft: `3px solid ${WARM}`, boxShadow: "0 10px 24px -16px rgba(10,24,56,0.5)" }
                  }
                >
                  {m.text}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {loading && (
          <div className="flex items-end gap-2 justify-start">
            <span className="mb-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg text-white" style={{ backgroundColor: NAVY }}>
              <Fingerprint className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
            <div className="rounded-2xl rounded-bl-md px-3.5 py-2.5 text-sm flex items-center gap-1.5 text-white/90" style={{ backgroundColor: NAVY, borderLeft: `3px solid ${WARM}` }}>
              <TypingDot delay={0} />
              <TypingDot delay={0.15} />
              <TypingDot delay={0.3} />
              <span className="ml-1.5 text-white/60 text-xs">Thinking — checking the real vault…</span>
            </div>
          </div>
        )}
      </div>

      {/* Access code — unlocks a deeper level for this conversation */}
      <div className="px-3 pt-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCodeBoxOpen((v) => !v)}
            className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-secondary hover:text-accent transition-colors cursor-pointer"
          >
            <Lock className="h-3 w-3" aria-hidden />
            {codeBoxOpen ? "Hide access code ▲" : "Have an access code? ▼"}
          </button>
        </div>
        {codeBoxOpen && (
          <div className="mt-2 flex items-center gap-2">
            <input
              type="password"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="Access code"
              className="flex-1 rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-foreground placeholder:text-secondary/60 focus:outline-none focus:ring-2 min-h-[40px]"
              style={{ ["--tw-ring-color" as string]: BLUE }}
            />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-black/5 p-3 flex items-center gap-2 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, maxLength))}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Ask the twin something…"
          maxLength={maxLength}
          className="flex-1 rounded-xl border border-black/10 bg-[#fafaf7] px-3.5 py-2.5 text-sm text-foreground placeholder:text-secondary/60 focus:outline-none focus:ring-2 min-h-[44px]"
          style={{ ["--tw-ring-color" as string]: BLUE }}
        />
        <motion.button
          type="button"
          onClick={handleSend}
          disabled={loading || !input.trim()}
          aria-label="Send message"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="shrink-0 cursor-pointer rounded-xl p-3 text-white disabled:opacity-40 disabled:cursor-not-allowed transition min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ background: `linear-gradient(135deg, #3b82f6, ${BLUE})`, boxShadow: "0 8px 20px -8px rgba(37,99,235,0.7)" }}
        >
          <Send className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
}

function TypingDot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="inline-block h-1.5 w-1.5 rounded-full"
      style={{ backgroundColor: WARM }}
      animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
      transition={{ duration: 1.1, repeat: Infinity, delay }}
    />
  );
}
