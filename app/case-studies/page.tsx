import CaseStudiesPage from "@/components/pages/CaseStudiesPage";

export const metadata = {
  title: "Case Studies",
  description: "Living proof of the AI Operating Map — domain experts putting AI to work inside their own craft. First: Maya, architecture.",
  openGraph: {
    title: "Case Studies · AI Operating Map",
    description: "Real people putting AI to work inside real work. First case: Maya, an architecture graduate generating a full site analysis in one afternoon.",
  },
};

export default function Page() {
  return <CaseStudiesPage />;
}
