import { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `News & Announcements | ${BRAND.fullName}`,
  description: "Latest news, updates, and official announcements from FIPHO.",
};

const categoryStyle: Record<string, string> = {
  Announcement: "border-l-accent",
  Update: "border-l-fipho-cyan",
  Resources: "border-l-fipho-silver",
};

const categoryBadge: Record<string, string> = {
  Announcement: "text-accent bg-accent/10",
  Update: "text-fipho-cyan bg-fipho-cyan/10",
  Resources: "text-fipho-silver bg-fipho-silver/10",
};

const articles = [
  {
    title: "FIPHO 2026 Registration Now Open",
    date: "March 1, 2026",
    category: "Announcement",
    content:
      "We are pleased to announce that registration for FIPHO 2026 is now open. National teams from invited countries may submit their applications through the official registration portal. The deadline for registration is August 15, 2026.",
  },
  {
    title: "Scientific Committee Announced",
    date: "February 15, 2026",
    category: "Update",
    content:
      "The FIPHO 2026 Scientific Committee has been formally announced, comprising distinguished physicists and educators from 15 countries. The committee will oversee problem development, examination standards, and grading procedures.",
  },
  {
    title: "Preparatory Problems Released",
    date: "February 1, 2026",
    category: "Resources",
    content:
      "Official preparatory problems and detailed solutions are now available for download. These materials cover mechanics, electromagnetism, thermodynamics, optics, and modern physics at the olympiad level.",
  },
  {
    title: "Venue Confirmed: Samarkand, Uzbekistan",
    date: "January 20, 2026",
    category: "Announcement",
    content:
      "FIPHO 2026 will be hosted in Samarkand, Uzbekistan. Accommodation and local transportation will be provided for all participating teams.",
  },
  {
    title: "Invitation Letters Sent to Participating Countries",
    date: "January 5, 2026",
    category: "Announcement",
    content:
      "Official invitation letters have been dispatched to national olympiad organizations in over 30 countries. Countries not yet invited may request participation by contacting the organizing committee.",
  },
];

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

      {/* NEWS FEED — standalone notice cards */}
      <section className="px-6 pb-24 bg-background">
        <div className="max-w-2xl mx-auto space-y-5">
          {articles.map((article) => (
            <div
              key={article.title}
              className={`p-6 rounded-xl border border-border border-l-4 bg-background-raised ${
                categoryStyle[article.category] ?? "border-l-accent"
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <span
                  className={`text-[10px] font-mono-ui px-2 py-0.5 rounded-full ${
                    categoryBadge[article.category] ?? "text-accent bg-accent/10"
                  }`}
                >
                  {article.category.toUpperCase()}
                </span>
                <span className="font-mono-ui text-xs text-muted-foreground">
                  {article.date}
                </span>
              </div>

              <div className="flex items-start gap-2 mb-2">
                <Newspaper className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                <h2 className="font-heading font-semibold text-xl">
                  {article.title}
                </h2>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {article.content}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}