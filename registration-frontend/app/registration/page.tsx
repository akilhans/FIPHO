import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";

import SecondStepRegistration from "@/components/second-step-registration";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-detailed-registration-display",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-detailed-registration-sans",
});

export const metadata: Metadata = {
  title: "FIPHO Detailed Registration",
  description: "Detailed delegation registration for FIPHO.",
};

export default function RegistrationPage() {
  return (
    <SecondStepRegistration
      displayClassName={display.className}
      sansClassName={sans.className}
    />
  );
}
