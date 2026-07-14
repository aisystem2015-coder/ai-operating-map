"use client";

import Navigation from "../Navigation";
import MarketRealityHero from "../market-reality/market-reality-hero";
import WhyThisMatters from "../market-reality/why-this-matters";
import CredibilityStory from "../market-reality/credibility-story";
import ExpectationMismatch from "../market-reality/expectation-mismatch";
import WeakDataFoundations from "../market-reality/weak-data-foundations";
import GateModel from "../market-reality/gate-model";
import MaturityTimeline from "../market-reality/maturity-timeline";

export default function MarketRealityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* A) Hook: the 95% hero (single) */}
        <MarketRealityHero />

        {/* B) One short "why this matters" explanation: demo vs production ("can vs does") */}
        <WhyThisMatters />

        {/* C) Short credibility/story paragraph with logos - moved below WHY */}
        <CredibilityStory />

        {/* D) Expectation Mismatch (moved up, before root causes) */}
        <ExpectationMismatch />

        {/* F) Root Cause #1 */}
        <WeakDataFoundations />

        {/* G) Vertical AI now lives on /what-works (Agentic Systems stage) —
            merged there to remove the duplicate treatment Francisco flagged. */}

        {/* H) GATE */}
        <GateModel />

        {/* I) Timeline */}
        <MaturityTimeline />
      </main>
    </div>
  );
}

