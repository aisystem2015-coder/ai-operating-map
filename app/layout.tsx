import type { Metadata } from "next";
import "./globals.css";
import { Inter, Manrope, DM_Sans } from "next/font/google";
import MayaBanner from "@/components/MayaBanner";
import Footer from "@/components/Footer";

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

// Used ONLY by /create-your-digital-twin (applied via inline style on that
// page's root wrapper) — a deliberate one-off exception to the main
// site's Inter/Manrope pairing, see that page's CLAUDE.md note. Declaring
// the font variable here (global layout) is the only way next/font/google
// can load it, but no other page references --font-dm-sans.
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Operating Map · 2026",
  description: "A complete reference for operations professionals navigating AI in 2026 — model landscape, agent architecture, and what actually works in production.",
  openGraph: {
    title: "AI Operating Map · 2026",
    description: "From model landscape to agent architecture to production results. Built for operators, not engineers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} ${dmSans.variable} pt-10`}>
        <MayaBanner />
        {children}
        <Footer />
      </body>
    </html>
  );
}
