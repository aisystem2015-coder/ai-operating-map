import type { Metadata } from "next";
import "./globals.css";
import { Inter, Manrope } from "next/font/google";
import MayaBanner from "@/components/MayaBanner";
import Footer from "@/components/Footer";
import ParticleField from "@/components/ui/particle-field";
import { Analytics } from "@vercel/analytics/next";
import VisitTracker from "@/components/VisitTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aioperatingmappackage.vercel.app"),
  title: {
    default: "AI Operating Map · 2026",
    template: "%s · AI Operating Map",
  },
  description: "A complete reference for operations professionals navigating AI in 2026 — model landscape, agent architecture, and what actually works in production.",
  openGraph: {
    title: "AI Operating Map · 2026",
    description: "From model landscape to agent architecture to production results. Built for operators, not engineers.",
    type: "website",
    siteName: "AI Operating Map",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} pt-10`}>
        <ParticleField />
        <MayaBanner />
        {children}
        <Footer />
        <VisitTracker />
        <Analytics />
      </body>
    </html>
  );
}
