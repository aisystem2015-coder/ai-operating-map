"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { TWIN } from "./palette";
import type { UsePublicTwinChatReturn } from "./use-public-twin-chat";

interface PublicTwinChatPanelProps {
  chat: UsePublicTwinChatReturn;
  /** "embedded" = always-open panel inside Section 7. "floating" = inside the bubble popup. */
  variant?: "embedded" | "floating";
  onClose?: () => void;
}

export default function PublicTwinChatPanel({ chat, variant = "embedded" }: PublicTwinChatPanelProps) {
  const { messages, loading, send, maxLength } = chat;
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    send(input);
    setInput("");
  };

  const isEmbedded = variant === "embedded";

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl border ${
        isEmbedded ? "border-white/15 bg-[#12123a]/70 backdrop-blur-xl" : "border-black/10 bg-white"
      }`}
      style={isEmbedded ? { minHeight: 420 } : undefined}
    >
      {/* Messages */}
      <div
        ref={scrollRef}
        className={`flex-1 overflow-y-auto px-4 py-4 space-y-3 ${isEmbedded ? "min-h-[280px] max-h-[420px]" : "min-h-[220px] max-h-[320px]"}`}
      >
        {messages.length === 0 && (
          <div
            className={`flex items-center gap-2 text-sm ${isEmbedded ? "text-white/60" : "text-[#475569]"}`}
          >
            <Sparkles className="h-4 w-4" style={{ color: TWIN.amber }} aria-hidden />
            Say hi — this is a real, working conversation with Francisco&apos;s digital twin.
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "text-white rounded-br-sm"
                  : isEmbedded
                    ? "bg-white/10 text-white rounded-bl-sm border border-white/10"
                    : "bg-slate-100 text-[#0F172A] rounded-bl-sm"
              }`}
              style={m.role === "user" ? { backgroundColor: TWIN.indigo } : undefined}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div
              className={`rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm flex items-center gap-1.5 ${
                isEmbedded ? "bg-white/10 text-white/70 border border-white/10" : "bg-slate-100 text-[#475569]"
              }`}
            >
              <TypingDot delay={0} color={isEmbedded ? "#fff" : TWIN.indigo} />
              <TypingDot delay={0.15} color={isEmbedded ? "#fff" : TWIN.indigo} />
              <TypingDot delay={0.3} color={isEmbedded ? "#fff" : TWIN.indigo} />
              <span className="ml-1.5">
                Thinking — this checks the real vault, so it can take up to ~2 minutes
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className={`border-t p-3 flex items-center gap-2 ${isEmbedded ? "border-white/10" : "border-black/5"}`}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, maxLength))}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Ask the twin something…"
          maxLength={maxLength}
          className={`flex-1 rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 min-h-[44px] ${
            isEmbedded
              ? "border-white/15 bg-white/5 text-white placeholder:text-white/40 focus:ring-[#0EA5E9]"
              : "border-black/10 bg-white text-[#0F172A] placeholder:text-[#475569]/60 focus:ring-[#6366F1]"
          }`}
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={loading || !input.trim()}
          aria-label="Send message"
          className="shrink-0 cursor-pointer rounded-xl p-3 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ backgroundColor: TWIN.amber }}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function TypingDot({ delay, color }: { delay: number; color: string }) {
  return (
    <motion.span
      className="inline-block h-1.5 w-1.5 rounded-full"
      style={{ backgroundColor: color }}
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.1, repeat: Infinity, delay }}
    />
  );
}
