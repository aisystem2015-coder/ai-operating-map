import DigitalTwinsPage from "@/components/pages/DigitalTwinsPage";

export const metadata = {
  title: "Digital Twins",
  description: "A private, grounded model of one person — single source of truth, cited answers, tiered access.",
  openGraph: { title: "Digital Twins · AI Operating Map", description: "A private, grounded model of one person — single source of truth, cited answers, tiered access." },
};

export default function Page() {
  return <DigitalTwinsPage />;
}
