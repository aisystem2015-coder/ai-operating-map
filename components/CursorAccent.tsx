"use client";

import { useEffect } from "react";

// Site-wide, mouse-reactive brand glow (Meet 23: "que los colores se muevan con
// el mouse"). A soft signal-blue radial follows the cursor, painted behind all
// content. Cheap: one fixed layer, updated on a rAF from pointer moves, disabled
// for reduced-motion and coarse (touch) pointers.
export default function CursorAccent() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const el = document.createElement("div");
    el.setAttribute("aria-hidden", "true");
    el.style.cssText = [
      "position:fixed",
      "left:0",
      "top:0",
      "width:100vw",
      "height:100vh",
      "pointer-events:none",
      "z-index:0",
      "opacity:0",
      "transition:opacity .6s ease",
      "mix-blend-mode:multiply",
    ].join(";");
    document.body.appendChild(el);

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight * 0.3;
    let cx = tx;
    let cy = ty;
    let raf = 0;

    const paint = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      // signal blue → warm, both from Francisco's palette, very soft
      el.style.background = `radial-gradient(720px circle at ${cx}px ${cy}px, rgba(37,99,235,0.16), rgba(212,149,106,0.08) 38%, transparent 64%)`;
      raf = requestAnimationFrame(paint);
    };
    let spotEl: HTMLElement | null = null;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (el.style.opacity === "0") el.style.opacity = "1";
      // Per-card spotlight: brighten the exact spot under the cursor.
      const target = e.target as HTMLElement | null;
      const card = target?.closest?.(".hover-glow, .tab-glow") as HTMLElement | null;
      if (card !== spotEl) {
        if (spotEl) { spotEl.style.removeProperty("--mx"); spotEl.style.removeProperty("--my"); }
        spotEl = card;
      }
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };
    // dark mode reads better with a screen blend + brighter blue
    const applyBlend = () => {
      const dark = document.documentElement.getAttribute("data-theme") === "dark"
        || (window.matchMedia("(prefers-color-scheme: dark)").matches
            && document.documentElement.getAttribute("data-theme") !== "light");
      el.style.mixBlendMode = dark ? "screen" : "multiply";
    };
    applyBlend();

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(paint);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      el.remove();
    };
  }, []);

  return null;
}
