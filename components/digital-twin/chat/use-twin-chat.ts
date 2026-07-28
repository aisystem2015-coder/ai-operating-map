"use client";

/**
 * Chat state for the Digital Twin section's live chat, ported from
 * digital_twin_site/components/chat/use-twin-chat.ts (2026-07-27 merge)
 * and extended with:
 *  - a QA `debugAccessLevel` param, wired to the access-level selector
 *    (job 2) — sent with the `x-dt-qa` header so the API knows it's a
 *    deliberate preview, not a real elevated-privilege request.
 *  - `isReturning`, wired to the cookie-based visit memory (job 3) — a
 *    returning browser gets a shorter greeting that skips the 101
 *    explanation instead of repeating it.
 *
 * Backend: app/api/twin-chat/route.ts, which shells out to the local
 * `claude` CLI against Francisco's Obsidian vault. HARD LIMITATION,
 * repeated here on purpose: this only works while this site runs locally
 * via `npm run dev` on Francisco's Mac — see the route file.
 */
import { useCallback, useRef, useState } from "react";

export interface TwinChatMessage {
  id: string;
  role: "twin" | "user" | "system";
  text: string;
}

const MAX_MESSAGE_LENGTH = 500;
const GEO_TIMEOUT_MS = 2000;

const FIRST_VISIT_GREETING =
  "Hey there! I'm Francisco's digital twin — a working proof-of-concept, not a demo. " +
  "Ask me something about Francisco, his work, or how this whole \"digital twin\" idea works. " +
  "I only answer from what's actually written in his notes, so if I don't know something, I'll say so " +
  "instead of guessing.";

const RETURNING_VISIT_GREETING =
  "Welcome back — this browser's been here before, so I'll skip the intro. " +
  "(That's all this remembers: a returning browser, not who you are.) Pick up where you left off, " +
  "or ask something new.";

/**
 * IP geolocation gives city / region / country (sometimes ISP) — never a
 * person's real name. There is no "detect the visitor's name" feature
 * here. A future version could greet a visitor by name only AFTER they've
 * typed it into the chat themselves — that is not built, and this
 * greeting never claims to know who you are.
 */
async function fetchGeoGreeting(baseGreeting: string): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GEO_TIMEOUT_MS);
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
    if (!res.ok) return null;
    const data = await res.json();
    const city: string | undefined = data?.city;
    const country: string | undefined = data?.country_name;
    if (city && country) {
      return `Hey! Looks like you're checking this out from ${city}, ${country} — welcome. ${baseGreeting}`;
    }
    if (country) {
      return `Hey! Welcome from ${country}. ${baseGreeting}`;
    }
    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export function useTwinChat(options?: { isReturning?: boolean }) {
  const [messages, setMessages] = useState<TwinChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const hasOpenedRef = useRef(false);
  const isReturning = options?.isReturning ?? false;

  /** Fires once, the first time the chat is actually opened/reached — not on page load. */
  const openChat = useCallback(() => {
    if (hasOpenedRef.current) return;
    hasOpenedRef.current = true;
    const baseGreeting = isReturning ? RETURNING_VISIT_GREETING : FIRST_VISIT_GREETING;
    setMessages([{ id: "welcome-pending", role: "twin", text: baseGreeting }]);
    fetchGeoGreeting(baseGreeting).then((greeting) => {
      if (!greeting) return;
      setMessages((prev) => {
        // Only replace the greeting if the visitor hasn't started chatting yet.
        if (prev.length !== 1 || prev[0].id !== "welcome-pending") return prev;
        return [{ id: "welcome", role: "twin", text: greeting }];
      });
    });
  }, [isReturning]);

  const [unlockedLevel, setUnlockedLevel] = useState(0);

  const send = useCallback(
    async (rawText: string, debugAccessLevel?: number, accessCode?: string) => {
      const text = rawText.trim().slice(0, MAX_MESSAGE_LENGTH);
      if (!text || loading) return;

      const userMsg: TwinChatMessage = { id: `u-${Date.now()}`, role: "user", text };
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);

      try {
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (typeof debugAccessLevel === "number") headers["x-dt-qa"] = "1";

        const res = await fetch("/api/twin-chat", {
          method: "POST",
          headers,
          body: JSON.stringify({ message: text, debugAccessLevel, accessCode }),
        });
        const data = await res.json().catch(() => null);
        const reply: string =
          data?.reply ??
          "Something went wrong reaching the twin just now — mind trying again in a moment?";
        if (typeof data?.effectiveLevel === "number") setUnlockedLevel(data.effectiveLevel);
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
    },
    [loading],
  );

  return { messages, loading, openChat, send, maxLength: MAX_MESSAGE_LENGTH, unlockedLevel };
}

export type UseTwinChatReturn = ReturnType<typeof useTwinChat>;
