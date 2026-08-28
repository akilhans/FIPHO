import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Medal,
  ScrollText,
  Lightbulb,
  Users,
  User,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About | Al-Fergani International Physics Olympiad",
  description:
    "Learn about the Al-Fergani International Physics Olympiad (FIPHO), its mission, vision, and commitment to fostering young scientific talent worldwide.",
};

const eventDetails = [
  { label: "Date", value: "October 10 to 17, 2026" },
  { label: "Location", value: "Samarkand, Uzbekistan" },
  {
    label: "Participants",
    value: "Participants must be under 20 years of age as of October 10, 2026.",
  },
  { label: "Field", value: "Physics" },
];

const objectives = [
  {
    label: "Identify & Support",
    description: "Identifying and supporting students with exceptional physics skills",
  },
  {
    label: "Global Platform",
    description: "Providing a global platform for participants to compete and learn from one another",
  },
  {
    label: "Scientific Excellence",
    description: "Promoting Uzbekistan as a hub for scientific excellence and education",
  },
  {
    label: "Collaboration",
    description: "Encouraging collaboration between students, educators, and academic institutions worldwide",
  },
];

const medals = [
  {
    name: "Gold Medal",
    iconBg: "bg-fipho-gold/15",
    iconColor: "text-fipho-gold",
    textColor: "text-fipho-gold",
    description: "Awarded to students demonstrating outstanding excellence",
  },
  {
    name: "Silver Medal",
    iconBg: "bg-fipho-silver/15",
    iconColor: "text-fipho-silver",
    textColor: "text-fipho-silver",
    description: "Given to participants with high achievements",
  },
  {
    name: "Bronze Medal",
    iconBg: "bg-fipho-bronze/15",
    iconColor: "text-fipho-bronze",
    textColor: "text-fipho-bronze",
    description: "Recognizing commendable performances",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative pt-36 pb-20 px-6 text-center bg-background overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(224,181,85,0.08), transparent 70%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <p className="font-mono-ui text-xs tracking-[0.3em] uppercase mb-5 text-accent">
            About FIPHO
          </p>
          <h1 className="font-heading font-semibold text-4xl md:text-6xl leading-tight mb-6">
            Al-Fergani International Physics Olympiad
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A prestigious global competition identifying and nurturing young
            talents in the field of physics
          </p>
        </div>
      </section>

      {/* EVENT DETAILS — dot list */}
      <section className="px-6 py-16 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-semibold text-2xl mb-8 text-center">
            Event details
          </h2>
          <div>
            {eventDetails.map((d, i) => (
              <div
                key={d.label}
                className={`flex gap-6 py-6 border-t border-border hover:border-accent/30 transition-colors px-2 -mx-2 rounded-lg ${
                  i === eventDetails.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="text-accent text-lg leading-none pt-0.5 flex-shrink-0">
                  •
                </span>
                <div>
                  <h3 className="font-medium text-sm mb-1">{d.label}</h3>
                  <p className="text-sm text-muted-foreground">{d.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OBJECTIVES — arrow list */}
      <section className="px-6 py-20 bg-background-raised border-y border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-semibold text-2xl md:text-3xl text-center mb-12">
            Objectives
          </h2>
          <div>
            {objectives.map((o, i) => (
              <div
                key={o.label}
                className={`flex gap-6 py-6 border-t border-border hover:border-accent/30 transition-colors px-2 -mx-2 rounded-lg ${
                  i === objectives.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="font-mono-ui text-accent pt-0.5 flex-shrink-0">
                  →
                </span>
                <div>
                  <h3 className="font-heading font-semibold mb-1">{o.label}</h3>
                  <p className="text-sm text-muted-foreground">{o.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM COMPOSITION */}
      <section className="px-6 py-20 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-semibold text-2xl md:text-3xl text-center mb-10">
            Team Composition
          </h2>
          <div className="p-8 rounded-2xl border border-border bg-background-raised">
            <h3 className="font-medium mb-4">Delegation Structure</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <Users className="h-4 w-4 text-accent" />
                </span>
                5 participants for the competition
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <User className="h-4 w-4 text-accent" />
                </span>
                2 team leaders to accompany and support the participants
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* AWARDS & RECOGNITION */}
      <section className="px-6 py-20 bg-background-raised border-y border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-semibold text-2xl md:text-3xl text-center mb-8">
            Awards & Recognition
          </h2>
          <p className="text-center text-sm text-muted-foreground max-w-xl mx-auto mb-12">
            FIPHO follows a well-structured awards system to honor
            top-performing students based on their final scores. The
            distribution of medals follows a 1:2:3 ratio, ensuring fair
            recognition of outstanding performances.
          </p>

          <h3 className="font-medium text-sm mb-5 text-muted-foreground">
            Medal Categories
          </h3>
          <div className="grid gap-5 sm:grid-cols-3 mb-14">
            {medals.map((medal) => (
              <div
                key={medal.name}
                className="p-6 rounded-xl border border-border text-center"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${medal.iconBg}`}
                >
                  <Medal className={`h-6 w-6 ${medal.iconColor}`} />
                </div>
                <h4 className={`font-heading font-semibold mb-2 ${medal.textColor}`}>
                  {medal.name}
                </h4>
                <p className="text-sm text-muted-foreground">{medal.description}</p>
              </div>
            ))}
          </div>

          <h3 className="font-medium text-sm mb-5 text-muted-foreground">
            Additional Awards
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg border border-border">
                <ScrollText className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Certificates & Diplomas</h4>
                <p className="text-sm text-muted-foreground">
                  All medalists and distinguished participants receive
                  official certificates
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg border border-border">
                <Lightbulb className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Special Awards</h4>
                <p className="text-sm text-muted-foreground">
                  Granted for exceptional creativity and innovative
                  problem-solving approaches
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CULTURAL EXPERIENCE */}
      <section className="px-6 py-20 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-semibold text-2xl md:text-3xl text-center mb-10">
            Cultural Experience
          </h2>
          <div className="rounded-2xl border border-border overflow-hidden">
            <div className="relative h-56 w-full">
              <Image
                src="/images/samarkand.png"
                alt="Samarkand"
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
            </div>
            <div className="p-8">
              <p className="text-sm text-muted-foreground mb-6">
                Participants will have the opportunity to visit Samarkand,
                experiencing Uzbekistan&apos;s rich cultural heritage. This
                excursion combines scientific excellence with cultural
                exploration, making FIPHO a truly unique international
                experience.
              </p>
              <Link
                href="https://uzbekistan.travel/en/i/samarkand/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2.5 rounded-full text-sm font-medium border border-accent/50 text-accent hover:bg-accent/10 transition-colors"
              >
                Learn more about Samarkand
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center bg-background">
        <p className="mb-6 text-lg text-muted-foreground">
          Ready to be part of this prestigious international competition?
        </p>
        <Link
          href="/contact"
          className="inline-block px-7 py-3.5 rounded-full font-medium text-sm bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
        >
          Contact Us
        </Link>
      </section>
    </main>
  );
}
