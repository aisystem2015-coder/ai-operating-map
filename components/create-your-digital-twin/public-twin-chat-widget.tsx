"use client";

/**
 * The floating "talk to the twin" bubble — visible from anywhere on
 * /create-your-digital-twin, sharing the exact same conversation as the
 * embedded panel in Section 7 (both are fed by the single
 * usePublicTwinChat() instance created once in the page component).
 *
 * Unlike /digital-twin's TwinChatWidget (an honest stub — see that file),
 * this one is wired to a REAL backend. See use-public-twin-chat.ts and
 * app/api/twin-public-chat/route.ts for the working implementation and
 * its local-dev-only limitation.
 */
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { TWIN } from "./palette";
import PublicTwinChatPanel from "./public-twin-chat-panel";
import type { UsePublicTwinChatReturn } from "./use-public-twin-chat";

export default function PublicTwinChatWidget({ chat }: { chat: UsePublicTwinChatReturn }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleToggle = () => {
    const next = !open;
    setOpen(next);
    if (next) chat.openChat();
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-5 z-40 w-[calc(100vw-2.5rem)] max-w-sm shadow-2xl rounded-2xl"
          >
            <div
              className="flex items-center justify-between gap-3 rounded-t-2xl px-4 py-3"
              style={{ background: `linear-gradient(120deg, ${TWIN.indigo}, ${TWIN.sky})` }}
            >
              <div>
                <span className="block text-sm font-semibold text-white">Talk to the twin</span>
                <span className="block text-xs text-white/80">Live, grounded in the real vault</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="cursor-pointer text-white/90 hover:text-white transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <PublicTwinChatPanel chat={chat} variant="floating" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleToggle}
        aria-label={open ? "Close twin chat" : "Open twin chat"}
        whileHover={reduceMotion ? undefined : { scale: 1.06 }}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        className="fixed bottom-5 right-5 z-40 h-14 w-14 cursor-pointer rounded-full text-white shadow-xl flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{ background: `linear-gradient(135deg, ${TWIN.indigo}, ${TWIN.amber})`, boxShadow: "0 8px 30px rgba(99,102,241,0.4)" }}
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
