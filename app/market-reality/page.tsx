import MarketRealityPage from "@/components/pages/MarketRealityPage";

// Description deliberately no longer asserts the 95% figure: the page itself now
// corrects it (see components/market-reality/ai4-2026-update.tsx). Metadata is what
// search and social render, so leaving the old claim here contradicted the body.
const DESCRIPTION =
  "What the 2026 data says about scaling AI — why pilots stall, why live agents get rolled back, and what separates the deployments that survive.";

export const metadata = {
  title: "Market Reality",
  description: DESCRIPTION,
  openGraph: { title: "Market Reality · AI Operating Map", description: DESCRIPTION },
};

export default function Page() {
  return <MarketRealityPage />;
}



