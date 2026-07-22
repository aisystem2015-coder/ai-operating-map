"use client";

/**
 * Shared chat state for /create-your-digital-twin's REAL chat widget.
 *
 * Called ONCE in components/pages/CreateYourDigitalTwinPage.tsx and passed
 * into both the embedded panel (Section 7, always visible) and the
 * floating bubble (accessible from anywhere on the page) so they show the
 * exact same conversation instead of two disconnected chats.
 *
 * Backend: app/api/twin-public-chat/route.ts, which shells out to the
 * local `claude` CLI against Francisco's Obsidian vault. HARD LIMITATION,
 * repeated here on purpose: this only works while the site runs locally
 * via `npm run dev` on Francisco's Mac. Once deployed to Vercel, this
 * route cannot reach the local `claude` CLI or the local Obsidian vault —
 * Vercel serverless functions have no access to either. See the route
 * file for the full explanation.
 */
import { useCallback, useRef, useState } from "react";

export interface TwinChatMessage {
  id: string;
  role: "twin" | "user" | "system";
  text: string;
}

const MAX_MESSAGE_LENGTH = 500;
const GEO_TIMEOUT_MS = 2000;

const GENERIC_GREETING =
  "Hey there! I'm Francisco's digital twin — a working proof-of-concept, not a demo. " +
  "Ask me something about Francisco, his work, or how this whole \"digital twin\" idea works. " +
  "I only answer from what's actually written in his notes, so if I don't know something, I'll say so " +
  "instead of guessing.";

/**
 * IP geolocation gives city / region / country (sometimes ISP) — never a
 * person's real name. There is no "detect the visitor's name" feature
 * here, and there never will be from an IP address alone. A future
 * version could greet a visitor by name only AFTER they've typed it into
 * the chat themselves (e.g. "Hola Claudia" as a hypothetical, once a
 * visitor has actually introduced themselves) — that is not built, and
 * this greeting never claims to know who you are.
 */
async function fetchGeoGreeting(): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GEO_TIMEOUT_MS);
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
    if (!res.ok) return null;
    const data = await res.json();
    const city: string | undefined = data?.city;
    const country: string | undefined = data?.country_name;
    if (city && country) {
      return `Hey! Looks like you're checking this out from ${city}, ${country} — welcome. ${GENERIC_GREETING}`;
    }
    if (country) {
      return `Hey! Welcome from ${country}. ${GENERIC_GREETING}`;
    }
    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export function usePublicTwinChat() {
  const [messages, setMessages] = useState<TwinChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const hasOpenedRef = useRef(false);

  /** Fires once, the first time the chat is actually opened/reached — not on page load. */
  const openChat = useCallback(() => {
    if (hasOpenedRef.current) return;
    hasOpenedRef.current = true;
    setMessages([{ id: "welcome-pending", role: "twin", text: GENERIC_GREETING }]);
    fetchGeoGreeting().then((greeting) => {
      if (!greeting) return;
      setMessages((prev) => {
        // Only replace the greeting if the visitor hasn't started chatting yet.
        if (prev.length !== 1 || prev[0].id !== "welcome-pending") return prev;
        return [{ id: "welcome", role: "twin", text: greeting }];
      });
    });
  }, []);

  const send = useCallback(async (rawText: string) => {
    const text = rawText.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!text || loading) return;

    const userMsg: TwinChatMessage = { id: `u-${Date.now()}`, role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/twin-public-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json().catch(() => null);
      const reply: string =
        data?.reply ??
        "Something went wrong reaching the twin just now — mind trying again in a moment?";
      setMessages((prev) => [...prev, { id: `t-${Date.now()}`, role: "twin", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `t-${Date.now()}`,
          role: "twin",
          text: "Couldn't reach the twin's backend — this chat only runs while the site is live on Francisco's local dev server. Try again shortly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return { messages, loading, openChat, send, maxLength: MAX_MESSAGE_LENGTH };
}

export type UsePublicTwinChatReturn = ReturnType<typeof usePublicTwinChat>;
