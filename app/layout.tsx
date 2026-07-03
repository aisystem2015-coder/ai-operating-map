import type { Metadata } from "next";
import "./globals.css";
import { Inter, Manrope } from "next/font/google";
import MayaBanner from "@/components/MayaBanner";

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
  title: "AI Operating Map",
  description: "Executive clarity on AI systems, data foundations, and what actually works",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} pt-10`}>
        <MayaBanner />
        {children}
      </body>
    </html>
  );
}
