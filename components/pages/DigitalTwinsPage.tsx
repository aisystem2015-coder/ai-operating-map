"use client";

/**
 * Digital Twins — merged in from the standalone digital_twin_site project
 * on 2026-07-27, per Francisco's reversal ("esto se va a volver a una
 * superpágina web que va a tener mega menus"). Lives under "What Works
 * Today" → Digital Twins (see Navigation.tsx mega-menu and
 * components/what-works/what-works-explorer.tsx's 5th ring/card), not as
 * its own top-level nav destination. All 5 of the former standalone
 * site's pages (home, what-is, examples & types, how it works, hardware)
 * are consolidated here as sections on one page, re-skinned from that
 * site's indigo/sky/amber/rose palette to this site's emerald-only
 * system, with the 4 flat PNG diagrams (which had Spanish text baked in)
 * rebuilt as real components.
 */
import Link from "next/link";
import Navigation from "../Navigation";
import DigitalTwinHeroSection from "../digital-twin/sections/hero-section";
import WhatIsSection from "../digital-twin/sections/what-is-section";
import ExamplesSection from "../digital-twin/sections/examples-section";
import HowItWorksSection from "../digital-twin/sections/how-it-works-section";
import HardwareSection from "../digital-twin/sections/hardware-section";
import ChatSection from "../digital-twin/sections/chat-section";
import RainbowLayers from "../rainbow/rainbow-layers";

const subNav = [
  { href: "#dt-explore", label: "What is it" },
  { href: "#dt-stack", label: "Where it fits" },
  { href: "#dt-examples", label: "Examples & types" },
  { href: "#dt-how", label: "How it works" },
  { href: "#dt-hardware", label: "Hardware" },
  { href: "#talk-to-a-real-one", label: "Talk to it" },
];

export default function DigitalTwinsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        <DigitalTwinHeroSection />

        {/* In-page sub-nav — this section carries 5 pages' worth of
            content, so a quick jump-nav keeps it navigable as one long
            page rather than needing separate routes. */}
        <div className="sticky top-[6.5rem] z-30 -mt-4 mb-4">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-1.5 rounded-full border border-black/5 bg-white/90 backdrop-blur-xl shadow-sm px-2 py-1.5">
              {subNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-secondary hover:text-foreground hover:bg-black/5 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-28 py-20">
          <WhatIsSection />
          <div id="dt-stack">
            <RainbowLayers />
          </div>
          <div id="dt-examples">
            <ExamplesSection />
          </div>
          <div id="dt-how">
            <HowItWorksSection />
          </div>
          <div id="dt-hardware">
            <HardwareSection />
          </div>
          <ChatSection />
        </div>
      </main>
    </div>
  );
}
