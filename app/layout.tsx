import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/footer";
import { BRAND } from "@/lib/brand";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.domain),
  keywords: [
    "FIPHO",
    "Fargʻoniy International Physics Olympiad",
    "Ahmad al-Fargʻoniy",
    "Physics Olympiad",
    "International Physics Competition",
    "Science Olympiad",
    "Young Physicists",
    "STEM Olympiad",
    "Physics Contest",
    "Scientific Excellence",
    "International Science Olympiad",
    "High School Physics Competition",
    "Physics Talent Recognition",
    "Global Physics Contest",
    "Future Scientists",
    "Physics Students",
    "Olympiad Preparation",
    "Fergana Physics Olympiad",
    "Uzbekistan Olympiad",
  ],
  title: `${BRAND.fullName} | International Physics Competition`,
  description: BRAND.tagline,
  openGraph: {
    title: BRAND.fullName,
    description: BRAND.tagline,
    type: "website",
    locale: "en_US",
    siteName: BRAND.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <Header />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
