"use client";

import { usePathname } from "next/navigation";
import MapSidebar from "./MapSidebar";

// Two-door structure (Meet 23): the "Francisco" side (home, profile, book) has
// no rail; the "AI Operating Map" side gets the SaaS left rail and its content
// shifts right on desktop. One shell, path-driven — no page moves required.
const MAP_PREFIXES = [
  "/origins",
  "/market-reality",
  "/ai-mindset",
  "/execution-checklist",
  "/how-to-prompt",
  "/ai-now-2026",
  "/resources",
  "/ai-map",
  "/what-works",
  "/vertical-ai",
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const isMap = MAP_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));

  if (!isMap) return <>{children}</>;

  return (
    <div className="lg:pl-[248px]">
      <MapSidebar />
      {children}
    </div>
  );
}
