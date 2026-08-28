import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/footer";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.domain),
  keywords: [
    "FIPHO",
    "Fergani International Physics Olympiad",
    "Ahmad al-Fergani",
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
    images: [
      {
        url: "/images/fergani.jpg",
        width: 1280,
        height: 720,
        alt: "Al-Fergani International Physics Olympiad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/fergani.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
