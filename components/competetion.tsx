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
    title: "Experimental Round",
    icon: FlaskConical,
    description:
      "Participants design and conduct laboratory experiments, collect and analyse data, quantify measurement uncertainties, and present scientific conclusions.",
    details: [
      "One laboratory examination setup",
      "Maximum score: 40 points",
      "Duration: 5 hours (300 minutes)",
    ],
    score: 40,
    color: "border-fipho-blue/30 bg-fipho-blue/5",
    iconColor: "text-fipho-blue",
    /* CHANGED HERE: switched from 'bg-fipho-blue' to 'bg-slate-400' */
    barColor: "bg-slate-400",
  },
  {
    number: 2,
    title: "Theoretical Round",
    icon: BookOpen,
    description:
      "Students solve challenging multi-part physics problems spanning all major disciplines—mechanics, electromagnetism, thermodynamics, optics, and modern physics.",
    details: [
      "Written examination — consists of three questions",
      "Maximum score: 60 points",
      "Duration: 5 hours (300 minutes)",
    ],
    score: 60,
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
        <Card className="glass-card rounded-2xl mb-8 glow-gold border border-fipho-gold/20 overflow-hidden">  
          <CardHeader className="border-b border-white/5 pb-4">
            <CardTitle className="flex items-center gap-2 font-heading text-white text-xl">
              <Trophy className="h-5 w-5 text-fipho-gold" />
              Awards &amp; Medal Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-12 md:divide-x md:divide-white/5">
              
              {/* Left Column: Big Highlight Stat */}
              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-center bg-fipho-gold/[0.02]">
                <div className="space-y-2">
                  <span className="text-5xl font-black text-fipho-gold tracking-tight font-mono">
                    50%
                  </span>
                  <h4 className="text-white font-medium text-base tracking-tight">
                    Medal Threshold
                  </h4>
                  <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed">
                    The top half of all individual competitors are guaranteed to receive official medals based on their combined scores.
                  </p>
                </div>
              </div>

              {/* Right Column: Clean Structural Row Items */}
              <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
                <p className="text-xs uppercase tracking-widest text-white/40 font-mono">
                  Proportion Breakdown (1 : 2 : 3 Ratio)
                </p>
                
                <div className="space-y-3">
                  {medals.map((m, idx) => (
                    <div 
                      key={m.type} 
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{m.emoji}</span>
                        <div>
                          <p className="text-sm font-semibold text-white">{m.type} Medal</p>
                          <p className="text-xs text-white/40 font-mono">Weight tier: {idx + 1}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 rounded-md text-xs font-mono font-bold bg-fipho-navy border border-white/10 text-fipho-gold">
                          {m.ratio}× Share
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-white/50 italic leading-relaxed pt-2">
                  * Honorable mentions and participation certificates are proudly extended to all attending global delegates.
                </p>
              </div>

            </div>
          </CardContent>
        </Card>

      
      </div>
    </section>
  );
}