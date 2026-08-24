import { Metadata } from "next";
import { Calendar } from "lucide-react";
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

      {/* REGISTRATION ANNOUNCEMENT */}
      <section className="px-6 pb-32 bg-background">
        <div className="max-w-xl mx-auto">
          <div className="p-8 rounded-xl border border-[#e8e4d9] bg-[#f7f5f0] text-center shadow-sm">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#bc963e]/10 text-[#bc963e] mb-4">
              <Calendar className="h-5 w-5" />
            </div>
            <h2 className="font-heading font-semibold text-xl text-[#1a1d24] mb-2">
              Official Registration Opening
            </h2>
            <p className="font-mono-ui text-xs text-[#bc963e] font-semibold tracking-wider uppercase mb-3">
              October 10, 2026
            </p>
            <p className="text-sm text-[#555a66] max-w-sm mx-auto leading-relaxed font-light">
              The global registration portal for the Fergani International Physics Olympiad will officially open on October 10. Team leaders and individual participants should prepare their validation credentials in advance.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
