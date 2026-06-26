import { Badge } from "@/components/ui/badge";
import { Globe2, Users, Award, Medal } from "lucide-react";

const stats = [
  {
    icon: Globe2,
    value: "30+",
    label: "Participating Countries",
    sub: "across 6 continents",
  },
  {
    icon: Users,
    value: "200+",
    label: "Competing Students",
    sub: "4 per national team",
  },
  {
    icon: Award,
    value: "25+",
    label: "Scientific Committee",
    sub: "world-class physicists",
  },
  {
    icon: Medal,
    value: "120+",
    label: "Medal Recipients",
    sub: "gold, silver & bronze",
  },
];

export function StatsSection() {
  return (
    <section className="relative w-full bg-fipho-navy-light py-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-fipho-gold/30 to-transparent" />
        <div className="absolute bottom-0 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-fipho-gold/10 to-transparent" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-fipho-blue/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <Badge className="mb-4 bg-fipho-gold/10 text-fipho-gold border-fipho-gold/30">
            By the Numbers
          </Badge>
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            FIPHO at a Glance
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group glass-card rounded-2xl p-8 text-center space-y-2 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-fipho-gold/10 group-hover:bg-fipho-gold/20 transition-colors">
                <stat.icon className="h-7 w-7 text-fipho-gold" />
              </div>
              <p className="font-heading text-5xl font-bold text-white pt-1">
                {stat.value}
              </p>
              <p className="text-sm font-semibold text-white/80">{stat.label}</p>
              <p className="text-xs text-white/40">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
