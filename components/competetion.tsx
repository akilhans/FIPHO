import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ClipboardCheck, FlaskConical, BookOpen, Trophy } from "lucide-react";

const rounds = [
  {
    number: 1,
    title: "Theoretical Round",
    icon: BookOpen,
    description:
      "Students solve challenging physics problems covering mechanics, electromagnetism, thermodynamics, optics, and modern physics.",
    details: [
      "Format: Written examination with multi-part problems",
      "Scoring: Maximum 60 points",
      "Duration: 5 hours (300 minutes)",
    ],
    side: "left" as const,
  },
  {
    number: 2,
    title: "Experimental Round",
    icon: FlaskConical,
    description:
      "Participants conduct laboratory experiments, collect data, perform analysis, and present scientific conclusions.",
    details: [
      "Format: Hands-on laboratory experiment",
      "Scoring: Maximum 40 points",
      "Duration: 5 hours (300 minutes)",
    ],
    side: "right" as const,
  },
];

export function CompetitionSection() {
  return (
    <section
      className="relative w-full bg-gradient-to-b from-fipho-navy to-fipho-navy-light py-20 overflow-hidden"
      id="competition"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-0 -translate-x-1/2 translate-y-1/2 h-96 w-96 rounded-full bg-fipho-blue/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-fipho-gold/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge className="mb-4 bg-fipho-gold/10 text-fipho-gold border-fipho-gold/30">
            Competition Format
          </Badge>
          <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Olympiad Rounds
          </h2>
          <p className="text-white/70">
            A rigorous two-round competition designed to test theoretical knowledge
            and experimental skills at the highest international standard.
          </p>
        </div>

        {/* Timeline layout */}
        <div className="relative mb-16">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-fipho-gold/20 md:left-1/2" />
          <div className="space-y-12">
            {rounds.map((round) => (
              <div key={round.title} className="relative">
                <div className="flex items-center md:justify-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-fipho-gold bg-fipho-navy text-fipho-gold font-bold z-10 ml-3 md:ml-0">
                    {round.number}
                  </div>
                </div>
                <div
                  className={`ml-16 md:ml-0 ${
                    round.side === "left"
                      ? "md:mr-[50%] md:pr-10"
                      : "md:ml-[50%] md:pl-10"
                  }`}
                >
                  <Card className="glass-card rounded-xl hover:bg-white/10 transition-all">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-1">
                        <round.icon className="h-5 w-5 text-fipho-gold" />
                        <span className="text-sm font-medium text-fipho-gold">
                          Round {round.number}
                        </span>
                      </div>
                      <CardTitle className="font-heading text-xl text-white">
                        {round.title}
                      </CardTitle>
                      <CardDescription className="text-white/65">
                        {round.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc space-y-2 pl-4 text-sm text-white/70">
                        {round.details.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card className="glass-card rounded-xl mb-12 glow-blue">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading text-white">
              <Trophy className="h-5 w-5 text-fipho-gold" />
              Awards Ceremony
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white/70">
            <p>
              The top 60% of participants receive medals in a 1:2:3 (gold:silver:bronze)
              ratio. Honorable mentions and certificates of participation are also
              awarded at a formal closing ceremony celebrating international scientific
              collaboration.
            </p>
          </CardContent>
        </Card>

        <div id="scoring">
          <h3 className="font-heading mb-8 text-2xl font-semibold text-white">
            Scoring System
          </h3>
          <Card className="glass-card rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <ClipboardCheck className="h-5 w-5 text-fipho-gold" />
                Evaluation Criteria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    title: "Theoretical Round",
                    items: ["Multi-part written problems", "Maximum score: 60 points", "Duration: 5 hours"],
                  },
                  {
                    title: "Experimental Round",
                    items: ["Laboratory experiment and analysis", "Maximum score: 40 points", "Duration: 5 hours"],
                  },
                  {
                    title: "Overall Scoring",
                    items: ["Total maximum score: 100 points", "Theoretical: 60 points", "Experimental: 40 points"],
                  },
                ].map((block) => (
                  <div key={block.title} className="space-y-2">
                    <h4 className="font-medium text-fipho-gold">{block.title}</h4>
                    <ul className="list-disc space-y-1 pl-4 text-sm text-white/70">
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <a href="/docs/rules.pdf" download>
            <Button className="bg-fipho-gold text-fipho-navy hover:bg-fipho-gold/90 font-semibold cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              Download Detailed Guidelines
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
