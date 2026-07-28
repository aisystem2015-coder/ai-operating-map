"use client";

/**
 * Embedded chat panel for the Digital Twins section, ported from
 * digital_twin_site/components/chat/chat-panel.tsx and re-skinned from
 * the standalone site's indigo/sky/amber palette to this site's
 * emerald-only system (components/charts/tokens.ts CATEGORICAL[0] /
 * #1BC4A6) per the merge brief. Adds the access-level QA selector
 * (job 2) inline above the input.
 */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import AccessLevelSelector from "../access-level-selector";
import type { UseTwinChatReturn } from "./use-twin-chat";

const EMERALD = "#1BC4A6";
const EMERALD_DARK = "#0E7A68";

export default function ChatPanel({ chat }: { chat: UseTwinChatReturn }) {
  const { messages, loading, send, maxLength } = chat;
  const [input, setInput] = useState("");
  const [qaLevel, setQaLevel] = useState(1);
  const [qaEnabled, setQaEnabled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    send(input, qaEnabled ? qaLevel : undefined);
    setInput("");
  };

  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl border border-black/8 bg-white shadow-sm"
      style={{ minHeight: 420 }}
    >
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[260px] max-h-[380px]">
        {messages.length === 0 && (
          <div className="flex items-center gap-2 text-sm text-secondary">
            <Sparkles className="h-4 w-4" style={{ color: EMERALD }} aria-hidden />
            Say hi — this is a real, working conversation with Francisco&apos;s digital twin.
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === "user" ? "text-white rounded-br-sm" : "bg-slate-100 text-foreground rounded-bl-sm"
              }`}
              style={m.role === "user" ? { backgroundColor: EMERALD_DARK } : undefined}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm flex items-center gap-1.5 bg-slate-100 text-secondary">
              <TypingDot delay={0} />
              <TypingDot delay={0.15} />
              <TypingDot delay={0.3} />
              <span className="ml-1.5">Thinking — this checks the real vault, so it can take up to ~2 minutes</span>
            </div>
          </div>
        )}
      </div>

      {/* QA access-level selector */}
      <div className="px-3 pt-3">
        <button
          type="button"
          onClick={() => setQaEnabled((v) => !v)}
          className="text-[11px] font-semibold uppercase tracking-wide text-secondary hover:text-foreground transition-colors cursor-pointer"
        >
          {qaEnabled ? "Hide QA access-level preview ▲" : "QA: preview a different access level ▼"}
        </button>
        {qaEnabled && (
          <div className="mt-2">
            <AccessLevelSelector value={qaLevel} onChange={setQaLevel} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-black/5 p-3 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, maxLength))}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Ask the twin something…"
          maxLength={maxLength}
          className="flex-1 rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-secondary/60 focus:outline-none focus:ring-2 min-h-[44px]"
          style={{ ["--tw-ring-color" as string]: EMERALD }}
        />
        <motion.button
          type="button"
          onClick={handleSend}
          disabled={loading || !input.trim()}
          aria-label="Send message"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="shrink-0 cursor-pointer rounded-xl p-3 text-white disabled:opacity-40 disabled:cursor-not-allowed transition min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ backgroundColor: EMERALD }}
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
      style={{ backgroundColor: EMERALD }}
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.1, repeat: Infinity, delay }}
    />
  );
}
