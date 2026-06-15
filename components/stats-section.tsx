import { Badge } from "@/components/ui/badge";
import { Globe2, Users, Award, Medal } from "lucide-react";

const stats = [
  { icon: Globe2, value: "30+", label: "Participating Countries" },
  { icon: Users, value: "200+", label: "Students" },
  { icon: Award, value: "25+", label: "Scientific Committee Members" },
  { icon: Medal, value: "120+", label: "Medalists" },
];

export function StatsSection() {
  return (
    <section className="relative w-full bg-gradient-to-b from-fipho-navy-light to-fipho-navy py-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-fipho-gold/30 to-transparent" />
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-8 text-center space-y-3 hover:bg-white/10 transition-all duration-300 glow-gold"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-fipho-gold/10">
                <stat.icon className="h-7 w-7 text-fipho-gold" />
              </div>
              <p className="font-heading text-4xl font-bold text-white">
                {stat.value}
              </p>
              <p className="text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
