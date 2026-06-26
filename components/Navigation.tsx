"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import FGMark from "./FGMark";

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/origins", label: "The Tech" },
    { href: "/market-reality", label: "Market Reality" },
    { href: "/what-works", label: "What Works" },
    { href: "/ai-mindset", label: "AI Mindset" },
    { href: "/execution-checklist", label: "Execution Checklist" },
    { href: "/sprint", label: "Sprint" },
  ];

  return (
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

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
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
    </nav>
  );
}
