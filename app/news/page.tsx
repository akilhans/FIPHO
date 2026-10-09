import { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `News & Announcements | ${BRAND.fullName}`,
  description: "Latest news, updates, and official announcements from FIPHO.",
};

export default function NewsPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative pt-36 pb-16 px-6 text-center bg-background overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(224,181,85,0.08), transparent 70%)",
          }}
        />
        <div className="relative max-w-2xl mx-auto">
          <p className="font-mono-ui text-xs tracking-[0.3em] uppercase mb-5 text-accent">
            Official Updates
          </p>
          <h1 className="font-heading font-semibold text-4xl md:text-6xl leading-tight mb-5">
            News &amp; Announcements
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            The latest official news and important updates from FIPHO.
          </p>
        </div>
      </section>

      {/* ANNOUNCEMENTS */}
      <section className="px-6 pb-32 bg-background">
        <div className="max-w-xl mx-auto p-8 rounded-xl border border-white/10 bg-white/[0.04] text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent mb-4">
            <Newspaper className="h-5 w-5" />
          </div>
          <p className="text-sm text-muted-foreground">
            There are no new announcements at the moment.
          </p>
        </div>
      </section>
    </main>
  );
}
