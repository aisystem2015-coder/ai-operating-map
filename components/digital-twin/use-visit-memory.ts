"use client";

/**
 * First-party, browser-scoped memory for the Digital Twins section (job 3,
 * Meet 17 ask). Deliberately narrow: one cookie, no third-party tracking,
 * no analytics pixel, nothing sent anywhere until the visitor opens the
 * chat. It identifies a *browser*, not a *person* — same honesty bar the
 * existing IP-based "Hey, talking to us from X?" greeting already holds
 * itself to (see components/digital-twin/chat/use-twin-chat.ts). Never
 * present this as "we know who you are."
 *
 * What it remembers: only whether this browser has already seen the
 * "What is a Digital Twin" 101 explainer on this page. That's enough to
 * make a second visit feel less repetitive (skip the beginner framing,
 * offer to jump somewhere more advanced) without fabricating any deeper
 * personalization we don't actually have.
 */
import { useEffect, useState } from "react";

const COOKIE_NAME = "dt_seen_intro";
const MAX_AGE_DAYS = 180;

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string, maxAgeDays: number) {
  if (typeof document === "undefined") return;
  const maxAgeSeconds = maxAgeDays * 24 * 60 * 60;
  // No `domain` attribute (host-only), SameSite=Lax, no third party involved.
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

export function useVisitMemory() {
  // Start "unknown" (false) to match server-rendered markup, then flip
  // after mount once we can actually read the cookie — avoids a hydration
  // mismatch between server and client output.
  const [isReturning, setIsReturning] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const existing = readCookie(COOKIE_NAME);
    if (existing === "1") {
      setIsReturning(true);
    } else {
      writeCookie(COOKIE_NAME, "1", MAX_AGE_DAYS);
      setIsReturning(false);
    }
    setReady(true);
  }, []);

  return { isReturning, ready };
}
