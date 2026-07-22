"use client";

/**
 * "La pelotita" — Francisco's words (Meet 16, 2026-07-21): a small floating
 * bubble on the Digital Twin page where a visitor can talk to the twin
 * directly, at "Nivel 2" access (general knowledge, no private specifics).
 *
 * Honesty constraint: there is no deployed backend for a live Digital Twin
 * chat yet. This is a real, polished chat UI, but every reply comes from
 * app/api/digital-twin-chat/route.ts, a clearly-marked stub that always
 * says plainly it isn't connected to a live model — never a fabricated
 * AI answer pretending otherwise.
 */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "twin" | "user";
  text: string;
}

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "twin",
  text: "Hi — this is Francisco's digital twin, Nivel 2 access (general knowledge, no private specifics). Ask me something.",
};

export default function TwinChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/digital-twin-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { id: `t-${Date.now()}`, role: "twin", text: data.reply ?? "Not connected yet." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { id: `t-${Date.now()}`, role: "twin", text: "Couldn't reach the chat stub — try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-5 z-40 w-[calc(100vw-2.5rem)] max-w-sm rounded-2xl border border-black/10 bg-white shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: "min(28rem, 70vh)" }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-black/5 bg-emerald-50/70 px-4 py-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-heading font-semibold text-foreground">Talk to the twin</span>
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 border border-emerald-200">
                    Nivel 2
                  </span>
                </div>
                <p className="text-xs text-secondary mt-0.5">General knowledge only — no private specifics.</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-secondary hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[200px]">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-emerald-600 text-white rounded-br-sm"
                        : "bg-slate-100 text-foreground rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 text-secondary rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm">
                    …
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-black/5 p-3 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                placeholder="Ask the twin something…"
                className="flex-1 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-foreground placeholder:text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="button"
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="shrink-0 rounded-xl bg-emerald-600 p-2.5 text-white disabled:opacity-40 hover:brightness-110 transition"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The bubble */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close twin chat" : "Open twin chat"}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-emerald-600 text-white shadow-xl flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "chat"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  );
}
