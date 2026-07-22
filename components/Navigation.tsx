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
  { href: "/what-works", label: "What Works Today" },
  { href: "/ai-mindset", label: "AI Mindset" },
  { href: "/execution-checklist", label: "Execution" },
];

const moreNav = [
  { href: "/digital-twin", label: "Digital Twin" },
  { href: "/ai-now-2026", label: "AI Now — 2026" },
  { href: "/resources", label: "Resources" },
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
              <span className="text-sm font-medium text-foreground">AI Operating Map</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                    pathname === item.href
                      ? "text-accent bg-accent/10"
                      : "text-secondary hover:text-foreground hover:bg-black/5"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* More dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMoreOpen((v) => !v)}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                    isMoreActive
                      ? "text-accent bg-accent/10"
                      : "text-secondary hover:text-foreground hover:bg-black/5"
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
                              : "text-secondary hover:text-foreground hover:bg-black/5"
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
              {allNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-accent bg-accent/10"
                      : "text-secondary hover:text-foreground hover:bg-black/5"
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
