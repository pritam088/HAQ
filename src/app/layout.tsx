import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HaqSaathiChat } from "@/components/HaqSaathiChat";

export const metadata: Metadata = {
  title: "HAQ — आपका अधिकार | Know the Rule. Check the Reality. Take Action.",
  description:
    "HAQ helps citizens understand applicable government service rules, compare application evidence against verified timelines, and discover actionable next steps — with sources you can inspect.",
  keywords: [
    "government services",
    "citizen rights",
    "rule verification",
    "Rajasthan",
    "eMitra",
    "civic technology",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <HaqSaathiChat />
      </body>
    </html>
  );
}
