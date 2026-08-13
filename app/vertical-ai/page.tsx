import { redirect } from "next/navigation";

export const metadata = {
  title: "Vertical AI",
  description: "Vertical vs. horizontal AI — where domain-specific systems win.",
  openGraph: { title: "Vertical AI · AI Operating Map", description: "Vertical vs. horizontal AI — where domain-specific systems win." },
};

export default function Page() {
  redirect("/what-works");
}
