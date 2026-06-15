import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Newspaper } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const articles = [
  {
    title: "FIPHO 2026 Registration Now Open",
    date: "March 1, 2026",
    excerpt:
      "National teams from around the world are invited to register for the inaugural Fargʻoniy International Physics Olympiad.",
    featured: true,
  },
  {
    title: "Scientific Committee Announced",
    date: "February 15, 2026",
    excerpt:
      "Leading physicists and educators from 15 countries join the FIPHO 2026 Scientific Committee.",
    featured: false,
  },
  {
    title: "Preparatory Problems Released",
    date: "February 1, 2026",
    excerpt:
      "Official preparatory problems and solutions are now available for participating teams.",
    featured: false,
  },
];

export function NewsSection() {
  return (
    <section className="relative w-full bg-white py-20 overflow-hidden" id="news">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-fipho-blue/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-fipho-blue/20 bg-fipho-blue/5 text-fipho-blue"
          >
            Latest Updates
          </Badge>
          <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight text-fipho-navy sm:text-4xl">
            News &amp; Announcements
          </h2>
          <p className="text-fipho-slate/70">
            Stay informed with the latest official updates from FIPHO.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {articles.map((article) => (
            <Card
              key={article.title}
              className={`glass-card-light rounded-xl hover:shadow-lg transition-all duration-300 ${
                article.featured ? "ring-2 ring-fipho-gold/30 glow-gold" : ""
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-fipho-blue/10">
                    <Newspaper className="h-4 w-4 text-fipho-blue" />
                  </div>
                  <span className="text-xs text-fipho-slate/60">{article.date}</span>
                  {article.featured && (
                    <Badge className="ml-auto bg-fipho-gold/10 text-fipho-gold border-fipho-gold/30 text-xs">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardTitle className="font-heading text-lg text-fipho-navy">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-fipho-slate/70 leading-relaxed">
                  {article.excerpt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/news">
            <Button className="bg-fipho-blue text-white hover:bg-fipho-blue/90 cursor-pointer">
              View All News
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
