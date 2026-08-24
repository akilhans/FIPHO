"use client";

import { useState } from "react";
import { Trophy, Users, MapPin, Calendar, ArrowRight, Medal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const pastCompetitions = [
  {
    year: "FIPHO 2021",
    location: "Khiva, Uzbekistan",
    dates: "November 8 to November 13, 2021",
    participants: "112 students from 16 countries",
    highlights: [
      "Record number of participating countries",
      "First hybrid format with both in-person and virtual components",
      "Special symposium on sustainable physics",
    ],
    topCountries: [
      { name: "Vietnam", gold: 4, silver: 4, bronze: 0, total: 8 },
      { name: "Uzbekistan", gold: 3, silver: 4, bronze: 1, total: 8 },
      { name: "Russia", gold: 1, silver: 2, bronze: 3, total: 6 },
      { name: "Belarus", gold: 0, silver: 3, bronze: 3, total: 6 },
      { name: "Kazakhstan", gold: 0, silver: 3, bronze: 5, total: 8 },
      { name: "Azerbaijan", gold: 0, silver: 0, bronze: 4, total: 4 },
      { name: "Brazil", gold: 0, silver: 0, bronze: 3, total: 3 },
      { name: "Tajikistan", gold: 0, silver: 0, bronze: 1, total: 1 },
      { name: "Turkmenistan", gold: 0, silver: 0, bronze: 0, total: 0 },
    ],
    featuredImage: "/images/xiva.jpg",
  },
];

const statistics = [
  { label: "Total Competitions", value: "1", icon: Trophy },
  { label: "Countries Participated", value: "16", icon: MapPin },
  { label: "Total Participants", value: "112", icon: Users },
  { label: "Gold Medals Awarded", value: "8", icon: Medal },
];

export default function PastFIPHOPage() {
  const [activeYear, setActiveYear] = useState(pastCompetitions[0].year);
  const competition = pastCompetitions.find((c) => c.year === activeYear)!;

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
            Competition History
          </p>
          <h1 className="font-heading font-semibold text-4xl md:text-6xl leading-tight mb-5">
            Past FIPHO Competitions
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Explore the rich history of the Ahmad al-Fergani International
            Physics Olympiad and its impact on young scientists worldwide
          </p>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="px-6 pb-16 bg-background">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {statistics.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="p-6 rounded-xl border border-border text-center"
            >
              <Icon className="h-5 w-5 text-accent mx-auto mb-3" />
              <p className="font-heading font-semibold text-3xl mb-1">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PAST COMPETITIONS */}
      <section className="px-6 pb-16 bg-background">
        <div className="max-w-4xl mx-auto">
          {/* Year tabs — ready to scale once more years are added */}
          {pastCompetitions.length > 1 && (
            <div className="flex justify-center gap-2 mb-8">
              {pastCompetitions.map((comp) => (
                <button
                  key={comp.year}
                  onClick={() => setActiveYear(comp.year)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeYear === comp.year
                      ? "bg-accent text-accent-foreground"
                      : "border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {comp.year}
                </button>
              ))}
            </div>
          )}

          {/* Overview */}
          <div className="rounded-2xl border border-border overflow-hidden mb-8">
            <div className="relative h-[300px] w-full">
              <Image
                src={competition.featuredImage}
                alt={`FIPHO ${competition.year}`}
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, var(--color-background) 0%, transparent 60%)",
                }}
              />
              <div className="absolute bottom-0 left-0 p-6">
                <h2 className="font-heading font-semibold text-3xl text-white">
                  {competition.year}
                </h2>
                <p className="text-white/70">{competition.location}</p>
              </div>
            </div>
            <div className="p-8 bg-background-raised">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="h-4 w-4 text-accent" />
                    <p className="text-sm text-muted-foreground">{competition.dates}</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Users className="h-4 w-4 text-accent" />
                    <p className="text-sm text-muted-foreground">{competition.participants}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Highlights</h3>
                  <ul className="space-y-1.5">
                    {competition.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Medal table */}
          {competition.topCountries.length > 0 && (
            <div className="rounded-2xl border border-border p-8 bg-background-raised">
              <h3 className="font-heading font-semibold text-xl mb-6">
                Top Performing Countries
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-3 font-mono-ui text-xs text-muted-foreground">RANK</th>
                      <th className="text-left py-3 px-3 font-mono-ui text-xs text-muted-foreground">COUNTRY</th>
                      <th className="text-center py-3 px-3 font-mono-ui text-xs text-fipho-gold">GOLD</th>
                      <th className="text-center py-3 px-3 font-mono-ui text-xs text-fipho-silver">SILVER</th>
                      <th className="text-center py-3 px-3 font-mono-ui text-xs text-fipho-bronze">BRONZE</th>
                      <th className="text-center py-3 px-3 font-mono-ui text-xs text-muted-foreground">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competition.topCountries.map((country, index) => (
                      <tr key={country.name} className="border-b border-border/50">
                        <td className="py-3 px-3">{index + 1}</td>
                        <td className="py-3 px-3">{country.name}</td>
                        <td className="py-3 px-3 text-center text-muted-foreground">{country.gold}</td>
                        <td className="py-3 px-3 text-center text-muted-foreground">{country.silver}</td>
                        <td className="py-3 px-3 text-center text-muted-foreground">{country.bronze}</td>
                        <td className="py-3 px-3 text-center font-medium">{country.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center bg-background">
        <p className="mb-6 text-lg text-muted-foreground">
          Interested in learning more about upcoming FIPHO competitions?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/future-fipho"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
          >
            Explore Future FIPHO
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-medium text-sm border border-border hover:bg-muted transition-colors"
          >
            View Photo Gallery
          </Link>
        </div>
      </section>
    </main>
  );
}
