"use client";

import Link from "next/link";
import FGMark from "./FGMark";

const sections = [
  {
    title: "The Map",
    links: [
      { href: "/origins", label: "The Tech" },
      { href: "/market-reality", label: "Market Reality" },
      { href: "/what-works", label: "What Works Today" },
      { href: "/what-works/digital-twins", label: "Digital Twins" },
      { href: "/ai-mindset", label: "AI Mindset" },
    ],
  },
  {
    title: "Build",
    links: [
      { href: "/execution-checklist", label: "Execution Checklist" },
      { href: "/how-to-prompt", label: "How to Prompt" },
    ],
  },
  {
    title: "Context",
    links: [
      { href: "/ai-now-2026", label: "AI Now — 2026" },
      { href: "/resources", label: "Resources" },
      { href: "/ai-map", label: "Interactive Map" },
    ],
  },
  {
    title: "Francisco",
    links: [
      { href: "/profile", label: "Profile" },
      { href: "/book", label: "Book office hours" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/8 bg-white mt-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <FGMark size={22} />
              <span className="text-sm font-semibold text-foreground">AI Operating Map</span>
            </Link>
            <p className="text-xs text-secondary leading-relaxed">
              A reference for operations professionals navigating AI in 2026.
            </p>
            <p className="text-xs text-secondary/60">
              Built by <a href="https://www.linkedin.com/in/franciscoguevaraai/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Francisco Guevara</a>
              {" "}with Claude Code
            </p>
          </div>

          {/* Link columns */}
          {sections.map((s) => (
            <div key={s.title} className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary/60">{s.title}</h3>
              <ul className="space-y-2">
                {s.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-secondary/50">© 2026 Francisco Guevara · AI Operating Map</p>
          <div className="flex items-center gap-1.5 text-xs text-secondary/40">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Updated August 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
