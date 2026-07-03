"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import FGMark from "./FGMark";

const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/origins", label: "The Tech" },
  { href: "/market-reality", label: "Market Reality" },
  { href: "/what-works", label: "What Works" },
  { href: "/ai-mindset", label: "AI Mindset" },
  { href: "/execution-checklist", label: "Execution" },
];

const moreNav = [
  { href: "/agent-architecture", label: "Agent Architecture" },
  { href: "/vertical-ai", label: "Vertical AI" },
  { href: "/why-pilots-fail", label: "Why Pilots Fail" },
  { href: "/ai-now-2026", label: "AI Now — 2026" },
  { href: "/timeline", label: "Timeline" },
  { href: "/examples", label: "Examples" },
  { href: "/resources", label: "Resources" },
  { href: "/sprint", label: "Sprint Report" },
];

const allNav = [...primaryNav, ...moreNav];

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  const isMoreActive = moreNav.some((item) => item.href === pathname);

  return (
    <>
      <nav
        className="fixed top-10 left-0 right-0 z-50 transition-all duration-300 border-b border-white/[0.07]"
        style={{ background: isScrolled ? "rgba(8,13,26,0.97)" : "rgba(10,16,30,0.75)", backdropFilter: "blur(16px)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-75 transition-opacity focus:outline-none rounded"
            >
              <FGMark size={24} />
              <span className="text-sm font-medium text-white">AI Operating Map</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    pathname === item.href
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-slate-200 hover:text-white hover:bg-white/[0.09]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* More dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMoreOpen((v) => !v)}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isMoreActive
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-slate-200 hover:text-white hover:bg-white/[0.09]"
                  }`}
                >
                  More
                  <ChevronDown size={14} className={`transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
                </button>
                {moreOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setMoreOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 z-20 w-52 rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden" style={{ background:"rgba(12,18,32,0.96)", backdropFilter:"blur(20px)" }}>
                      {moreNav.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-4 py-2.5 text-sm transition-colors ${
                            pathname === item.href
                              ? "text-emerald-400 bg-emerald-500/10 font-medium"
                              : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
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
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.07] transition-colors"
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
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-[4.5rem] left-4 right-4 rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden" style={{ background:"rgba(12,18,32,0.97)", backdropFilter:"blur(20px)" }}>
            <div className="px-2 py-3 space-y-0.5 max-h-[70vh] overflow-y-auto">
              {allNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.07]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
