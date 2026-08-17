"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cpu, LineChart, Layers, Fingerprint, Brain, CheckSquare, MessageSquareText, Newspaper, BookMarked } from "lucide-react";

// The AI Operating Map's own left rail — SaaS-style, the way Francisco framed it
// in Meet 23 ("menu on the left, content in the middle, like Claude/enterprise
// software"). Appears only on map routes (see AppShell); the top bar carries the
// two tabs, this carries the map's sections.
const GROUPS: { label: string; items: { href: string; label: string; icon: typeof Cpu }[] }[] = [
  {
    label: "The map",
    items: [
      { href: "/origins", label: "The Tech", icon: Cpu },
      { href: "/market-reality", label: "Market Reality", icon: LineChart },
      { href: "/what-works", label: "What Works Today", icon: Layers },
      { href: "/what-works/digital-twins", label: "Digital Twin", icon: Fingerprint },
      { href: "/ai-mindset", label: "AI Mindset", icon: Brain },
    ],
  },
  {
    label: "Build",
    items: [
      { href: "/execution-checklist", label: "Execution Checklist", icon: CheckSquare },
      { href: "/how-to-prompt", label: "How to Prompt", icon: MessageSquareText },
    ],
  },
  {
    label: "Context",
    items: [
      { href: "/ai-now-2026", label: "AI Now — 2026", icon: Newspaper },
      { href: "/resources", label: "Resources", icon: BookMarked },
    ],
  },
];

export default function MapSidebar() {
  const pathname = usePathname();
  return (
    <aside
      aria-label="AI Operating Map sections"
      className="hidden lg:flex fixed left-0 top-[6.5rem] bottom-0 w-[248px] flex-col gap-6 overflow-y-auto border-r border-black/8 bg-white/70 backdrop-blur-xl px-4 py-7 z-40"
    >
      <div className="px-3">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary/60">Currently viewing</div>
        <div className="mt-1 text-sm font-semibold text-foreground">AI Operating Map</div>
      </div>
      {GROUPS.map((g) => (
        <nav key={g.label} className="flex flex-col gap-1">
          <div className="px-3 pb-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-secondary/50">{g.label}</div>
          {g.items.map((it) => {
            const active = pathname === it.href || (it.href !== "/what-works" && pathname.startsWith(it.href + "/"));
            const Icon = it.icon;
            return (
              <Link
                key={it.href}
                href={it.href}
                aria-current={active ? "page" : undefined}
                className={`tab-glow group flex items-center gap-3 rounded-lg px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  active
                    ? "bg-accent/10 text-accent font-semibold"
                    : "text-secondary"
                }`}
              >
                <Icon size={16} strokeWidth={1.9} className={active ? "text-accent" : "text-secondary/70 group-hover:text-foreground"} />
                {it.label}
              </Link>
            );
          })}
        </nav>
      ))}
      <Link
        href="/"
        className="mt-auto flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-secondary hover:text-accent transition-colors"
      >
        ← Back to Francisco
      </Link>
    </aside>
  );
}
