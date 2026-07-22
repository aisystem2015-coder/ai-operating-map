import CreateYourDigitalTwinPage from "@/components/pages/CreateYourDigitalTwinPage";

// New, separate, beginner-facing product-marketing page — the seed of a
// future "build your own Digital Twin" product. Distinct from
// /digital-twin (the more technical explainer for the site's existing
// ops-professional audience, which stays untouched). See
// components/pages/CreateYourDigitalTwinPage.tsx for the full page.
export const metadata = {
  title: "Create Your Digital Twin — a real, working proof",
  description:
    "Talk to a real digital twin right now, then learn how to build your own — a private AI that only ever answers from your own notes and voice, never invents.",
};

export default function Page() {
  return <CreateYourDigitalTwinPage />;
}
