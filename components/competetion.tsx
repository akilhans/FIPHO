import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, FlaskConical, Trophy } from "lucide-react";

const rounds = [
  {
    number: 1,
    title: "Theoretical Round",
    icon: BookOpen,
    description:
      "Students solve challenging multi-part physics problems spanning all major disciplines—mechanics, electromagnetism, thermodynamics, optics, and modern physics.",
    details: [
      "Written examination — multi-part problems",
      "Maximum score: 60 points",
      "Duration: 5 hours (300 minutes)",
    ],
    score: 60,
    color: "border-fipho-blue/30 bg-fipho-blue/5",
    iconColor: "text-fipho-blue",
    barColor: "bg-fipho-blue",
  },
  {
    number: 2,
    title: "Experimental Round",
    icon: FlaskConical,
    description:
      "Participants design and conduct laboratory experiments, collect and analyse data, quantify measurement uncertainties, and present scientific conclusions.",
    details: [
      "Hands-on laboratory experiment",
      "Maximum score: 40 points",
      "Duration: 5 hours (300 minutes)",
    ],
    score: 40,
    color: "border-fipho-gold/30 bg-fipho-gold/5",
    iconColor: "text-fipho-gold",
    barColor: "bg-fipho-gold",
  },
];

const medals = [
  { type: "Gold", emoji: "🥇", fraction: "1/6", ratio: "1", color: "bg-yellow-400", flex: 1 },
  { type: "Silver", emoji: "🥈", fraction: "2/6", ratio: "2", color: "bg-slate-300", flex: 2 },
  { type: "Bronze", emoji: "🥉", fraction: "3/6", ratio: "3", color: "bg-amber-600", flex: 3 },
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
            Two rounds designed to test theoretical mastery and experimental
            skill at the highest international standard.
          </p>
        </div>

        {/* Score overview bar */}
        <Card className="glass-card rounded-2xl mb-12">
          <CardContent className="p-6 sm:p-8">
            <p className="text-xs uppercase tracking-widest text-white/40 font-mono mb-5">
              Score Distribution — 100 points total
            </p>
            <div className="space-y-4">
              {rounds.map((r) => (
                <div key={r.title}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-white/80 flex items-center gap-2">
                      <r.icon className={`h-4 w-4 ${r.iconColor}`} />
                      {r.title}
                    </span>
                    <span className={`font-mono font-bold text-sm ${r.iconColor}`}>
                      {r.score} pts
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${r.barColor} opacity-70`}
                      style={{ width: `${r.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Round cards */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {rounds.map((round) => (
            <Card
              key={round.title}
              className={`glass-card rounded-2xl border hover:bg-white/10 transition-all duration-300 ${round.color}`}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-current bg-fipho-navy/60 font-bold text-fipho-gold">
                    {round.number}
                  </div>
                  <round.icon className={`h-5 w-5 ${round.iconColor}`} />
                  <span className={`text-sm font-medium ${round.iconColor}`}>
                    Round {round.number}
                  </span>
                </div>
                <CardTitle className="font-heading text-xl text-white">
                  {round.title}
                </CardTitle>
                <CardDescription className="text-white/65 leading-relaxed">
                  {round.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {round.details.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-white/70">
                      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${round.barColor}`} />
                      {d}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Awards */}
        <Card className="glass-card rounded-2xl mb-8 glow-gold">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading text-white">
              <Trophy className="h-5 w-5 text-fipho-gold" />
              Awards &amp; Medal Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-white/70 text-sm leading-relaxed">
              The top <strong className="text-white">60%</strong> of participants receive medals
              in a <strong className="text-white">1 : 2 : 3</strong> gold : silver : bronze ratio.
              Certificates of participation are awarded to all competitors.
            </p>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/40 font-mono mb-3">
                Medal ratio among medalists
              </p>
              <div className="flex h-8 rounded-full overflow-hidden gap-0.5">
                {medals.map((m) => (
                  <div
                    key={m.type}
                    className={`${m.color} flex items-center justify-center text-xs font-bold text-white/90 gap-1`}
                    style={{ flex: m.flex }}
                  >
                    <span>{m.emoji}</span>
                    <span className="hidden sm:inline">{m.ratio}×</span>
                  </div>
                ))}
              </div>
              <div className="flex mt-2 gap-0.5">
                {medals.map((m) => (
                  <div
                    key={m.type}
                    className="text-center"
                    style={{ flex: m.flex }}
                  >
                    <span className="text-xs text-white/50">{m.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-10 text-center">
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
