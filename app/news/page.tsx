import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper } from "lucide-react";
import { Metadata } from "next";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `News & Announcements | ${BRAND.fullName}`,
  description: "Latest news, updates, and official announcements from FIPHO.",
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
    title: "Venue Confirmed: Fergana, Uzbekistan",
    date: "January 20, 2026",
    category: "Announcement",
    content:
      "FIPHO 2026 will be hosted in Fergana, Uzbekistan — the historic homeland of Ahmad al-Fargʻoniy. Accommodation and local transportation will be provided for all participating teams.",
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
    <section className="relative w-full bg-fipho-light min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-fipho-blue/20 bg-fipho-blue/5 text-fipho-blue"
          >
            Official Updates
          </Badge>
          <h1 className="font-heading mb-4 text-3xl font-bold tracking-tight text-fipho-navy sm:text-5xl">
            News &amp; Announcements
          </h1>
          <p className="text-fipho-slate/70">
            The latest official news and important updates from FIPHO.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-6">
          {articles.map((article) => (
            <Card key={article.title} className="border-white bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Newspaper className="h-4 w-4 text-fipho-blue" />
                  <span className="text-xs text-fipho-slate/60">{article.date}</span>
                  <Badge className="ml-auto bg-fipho-blue/5 text-fipho-blue border-fipho-blue/20 text-xs">
                    {article.category}
                  </Badge>
                </div>
                <CardTitle className="font-heading text-xl text-fipho-navy">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-fipho-slate/70 leading-relaxed">
                  {article.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
