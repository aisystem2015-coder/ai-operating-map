"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Cpu, Bot, Network, Fingerprint } from "lucide-react";
import FGMark from "./FGMark";

const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/origins", label: "The Tech" },
  { href: "/market-reality", label: "Market Reality" },
  { href: "/ai-mindset", label: "AI Mindset" },
  { href: "/execution-checklist", label: "Execution" },
];

const moreNav = [
  { href: "/profile", label: "Profile" },
  { href: "/book", label: "Book office hours" },
  { href: "/how-to-prompt", label: "How to Prompt" },
  { href: "/ai-now-2026", label: "AI Now — 2026" },
  { href: "/resources", label: "Resources" },
];

// "What Works Today" mega-menu — reference model: Logitech.com's mega
// menu (Meet 17, Francisco: "esto se va a volver a una superpágina web
// que va a tener mega menus"). Digital Twins joined this group
// 2026-07-27 (merged in from the former standalone digital_twin_site) as
// its 4th entry, explicitly NOT as its own top-level nav item.
const whatWorksMegaMenu = [
  { href: "/what-works#llm", label: "LLMs", icon: Cpu, desc: "The reasoning core — predicts the next token." },
  { href: "/what-works#agent", label: "Agents", icon: Bot, desc: "Reasons, then acts on its own." },
  { href: "/what-works#agentic", label: "Multi-Agents", icon: Network, desc: "A coordinated team of agents." },
  { href: "/what-works/digital-twins", label: "Digital Twins", icon: Fingerprint, desc: "A private model of one person." },
];

const allNav = [
  ...primaryNav.slice(0, 3),
  { href: "/what-works", label: "What Works Today" },
  { href: "/what-works/digital-twins", label: "Digital Twin" },
  ...primaryNav.slice(3),
  ...moreNav,
];

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [whatWorksOpen, setWhatWorksOpen] = useState(false);
  const [mobileWhatWorksOpen, setMobileWhatWorksOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
    setWhatWorksOpen(false);
  }, [pathname]);

  const isMoreActive = moreNav.some((item) => item.href === pathname);
  const isWhatWorksActive = pathname === "/what-works" || pathname.startsWith("/what-works/");
  // Two-door model (Meet 23): are we on the "AI Operating Map" side or the
  // "Francisco" side? Drives which top tab reads as active.
  const MAP_PREFIXES = ["/origins", "/market-reality", "/ai-mindset", "/execution-checklist", "/how-to-prompt", "/ai-now-2026", "/resources", "/ai-map", "/what-works", "/vertical-ai", "/case-studies"];
  const isMapActive = MAP_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));

  return (
    <>
      <nav
        className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
            >
              <FGMark size={24} />
              <span className="text-sm font-semibold text-foreground">Francisco Guevara</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {/* Two doors (Meet 23): Francisco | AI Operating Map. */}
              <Link
                href="/"
                className={`tab-glow px-3.5 py-2 text-sm font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                  !isMapActive ? "text-accent bg-accent/10" : "text-secondary"
                }`}
              >
                Francisco
              </Link>

              {/* "What Works Today" mega-menu — Logitech.com reference
                  model. Hover (desktop) or click opens a 4-card panel:
                  LLMs, Agents, Multi-Agents, Digital Twins. */}
              <div
                className="relative"
                onMouseEnter={() => setWhatWorksOpen(true)}
                onMouseLeave={() => setWhatWorksOpen(false)}
              >
                <Link
                  href="/what-works"
                  onClick={() => setWhatWorksOpen(false)}
                  className={`tab-glow flex items-center gap-1 px-3.5 py-2 text-sm font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                    isMapActive
                      ? "text-accent bg-accent/10"
                      : "text-secondary"
                  }`}
                >
                  AI Operating Map
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${whatWorksOpen ? "rotate-180" : ""}`}
                  />
                </Link>
                {whatWorksOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-20">
                    <div className="w-[36rem] rounded-2xl border border-black/8 bg-white shadow-xl overflow-hidden p-3 grid grid-cols-2 gap-2">
                      {whatWorksMegaMenu.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="hover-glow-flat group flex items-start gap-3 rounded-xl border border-transparent p-3"
                        >
                          <div className="h-9 w-9 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                            <item.icon size={18} className="text-accent" strokeWidth={1.75} />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-foreground">{item.label}</div>
                            <div className="text-xs text-secondary mt-0.5 leading-snug">{item.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* The digital twin — the flagship. Kept prominent as an accent
                  entry so it's always one click away (Meet 22/23). */}
              <Link
                href="/what-works/digital-twins"
                className="tab-glow flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                <Fingerprint size={14} strokeWidth={2} />
                Digital Twin
              </Link>

              {/* More dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMoreOpen((v) => !v)}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                    isMoreActive
                      ? "text-accent bg-accent/10"
                      : "text-secondary hover:text-foreground hover:bg-black/5 hover:shadow-[0_0_0_1px_rgba(27,196,166,0.25)]"
                  }`}
                >
                  More
                  <ChevronDown size={14} className={`transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
                </button>
                {moreOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setMoreOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 z-20 w-52 rounded-2xl border border-black/8 bg-white shadow-xl overflow-hidden">
                      {moreNav.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-4 py-2.5 text-sm transition-colors ${
                            pathname === item.href
                              ? "text-accent bg-accent/10 font-medium"
                              : "text-secondary hover:text-foreground hover:bg-black/5 hover:shadow-[0_0_0_1px_rgba(27,196,166,0.25)]"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-secondary hover:text-foreground hover:bg-black/5 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-[5.5rem] left-4 right-4 rounded-2xl bg-white shadow-2xl border border-black/8 overflow-hidden">
            <div className="px-2 py-3 space-y-0.5 max-h-[70vh] overflow-y-auto">
              {allNav.map((item) => {
                if (item.label === "What Works Today") {
                  return (
                    <div key={item.href}>
                      <button
                        onClick={() => setMobileWhatWorksOpen((v) => !v)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          isWhatWorksActive
                            ? "text-accent bg-accent/10"
                            : "text-secondary hover:text-foreground hover:bg-black/5 hover:shadow-[0_0_0_1px_rgba(27,196,166,0.25)]"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${mobileWhatWorksOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {mobileWhatWorksOpen && (
                        <div className="pl-4 pr-2 py-1 space-y-0.5">
                          {whatWorksMegaMenu.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-secondary hover:text-foreground hover:bg-black/5 transition-colors"
                            >
                              <sub.icon size={15} strokeWidth={1.75} />
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? "text-accent bg-accent/10"
                        : "text-secondary hover:text-foreground hover:bg-black/5 hover:shadow-[0_0_0_1px_rgba(27,196,166,0.25)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
