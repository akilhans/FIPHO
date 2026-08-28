import { SponsorsSection } from "@/components/sponsors";
import { Metadata } from "next";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Sponsors & Partners | ${BRAND.fullName}`,
  description:
    "Meet the sponsors and partners supporting the Fergani International Physics Olympiad.",
};

export default function SponsorsPage() {
  return <SponsorsSection />;
}
