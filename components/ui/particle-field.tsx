"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide ambient particle background. Small emerald/white dots drift
 * slowly on their own and gently get pushed away from the cursor, with a
 * soft glow trail following the pointer. Mounted once in app/layout.tsx so
 * every page gets the same "puntitos moviéndose con el mouse" texture
 * without per-page wiring.
 *
 * Deliberately canvas-based rather than N framer-motion DOM nodes — a
 * couple dozen to ~90 particles redrawn on one <canvas> is far cheaper than
 * the same count as animated DOM elements, which matters given how tall
 * some pages on this site are (Home alone is 17k+ px).
 *
 * The canvas is fixed to the viewport (not the full scrollable document),
 * position: fixed + pointer-events-none, so it never affects scroll height,
 * never intercepts clicks/hover on real content, and its cost never scales
 * with page length.
 *
 * prefers-reduced-motion: the animation loop simply never starts (and stops
 * immediately if the user flips the OS setting mid-session) — no drift, no
 * cursor reaction, canvas stays blank. That's the "disable the effect"
 * option called out in the task, chosen over a static-dots fallback to keep
 * this component simple and unambiguous under code review.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true }) ?? null;
    if (!canvas || !ctx) return;

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      rgb: string;
      alpha: number;
    };

    const EMERALD = "27,196,166";
    const WHITE = "255,255,255";
    const DENSITY = 16000; // px^2 of viewport per particle
    const MAX_PARTICLES = 90;
    const MIN_PARTICLES = 22;
    const REPEL_RADIUS = 130;
    const REPEL_STRENGTH = 0.6;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let rafId = 0;
    let loopActive = false;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    // Mouse position lives on a plain object, not React state — mousemove
    // fires far more often than a frame renders, so writing straight to a
    // ref-like object (no re-render, no setState) and letting the rAF loop
    // read it once per frame is the throttle: the loop never runs faster
    // than the display refresh rate no matter how chatty the pointer is.
    const pointer = { x: -9999, y: -9999, active: false };

    function makeParticle(): Particle {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: 1 + Math.random() * 1.5,
        rgb: Math.random() < 0.7 ? EMERALD : WHITE,
        alpha: 0.16 + Math.random() * 0.26,
      };
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.round((width * height) / DENSITY);
      const count = Math.max(MIN_PARTICLES, Math.min(MAX_PARTICLES, target));
      particles = Array.from({ length: count }, makeParticle);
    }

    function handlePointerMove(e: PointerEvent) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    }

    function handlePointerLeave() {
      pointer.active = false;
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_RADIUS && dist > 0.01) {
            const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.rgb},${p.alpha})`;
        ctx!.fill();
      }

      if (pointer.active) {
        const glow = ctx!.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 90);
        glow.addColorStop(0, "rgba(27,196,166,0.10)");
        glow.addColorStop(1, "rgba(27,196,166,0)");
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(pointer.x, pointer.y, 90, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function loop() {
      if (!loopActive) return;
      draw();
      rafId = requestAnimationFrame(loop);
    }

    function startLoop() {
      if (loopActive) return;
      loopActive = true;
      resize();
      rafId = requestAnimationFrame(loop);
    }

    function stopLoop() {
      loopActive = false;
      cancelAnimationFrame(rafId);
      if (width && height) ctx!.clearRect(0, 0, width, height);
    }

    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (loopActive) resize();
      }, 150);
    }

    function handleVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else if (loopActive) {
        rafId = requestAnimationFrame(loop);
      }
    }

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    function syncToReducedMotion() {
      if (reduceMotionQuery.matches) stopLoop();
      else startLoop();
    }

    syncToReducedMotion();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);
    reduceMotionQuery.addEventListener("change", syncToReducedMotion);

    return () => {
      stopLoop();
      clearTimeout(resizeTimer);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      reduceMotionQuery.removeEventListener("change", syncToReducedMotion);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[15]"
    />
  );
}
