import { Badge } from "@/components/ui/badge";
import { Gauge, Zap, Flame, Sun, Atom, Activity } from "lucide-react";

const disciplines = [
  {
    icon: Gauge,
    title: "Mechanics",
    topics: ["Kinematics & Dynamics", "Energy & Momentum", "Rotational Motion", "Gravitation"],
    accent: "text-sky-400",
    dot: "bg-sky-400",
    cardBorder: "border-sky-500/20",
    cardBg: "bg-sky-500/5",
    iconBg: "bg-sky-500/10",
  },
  {
    icon: Zap,
    title: "Electromagnetism",
    topics: ["Electric Fields & Potential", "Magnetic Forces", "Maxwell's Equations", "Electromagnetic Induction"],
    accent: "text-yellow-400",
    dot: "bg-yellow-400",
    cardBorder: "border-yellow-500/20",
    cardBg: "bg-yellow-500/5",
    iconBg: "bg-yellow-500/10",
  },
  {
    icon: Flame,
    title: "Thermodynamics",
    topics: ["Laws of Thermodynamics", "Heat Transfer", "Thermodynamic Cycles", "Statistical Physics"],
    accent: "text-orange-400",
    dot: "bg-orange-400",
    cardBorder: "border-orange-500/20",
    cardBg: "bg-orange-500/5",
    iconBg: "bg-orange-500/10",
  },
  {
    icon: Sun,
    title: "Optics",
    topics: ["Geometric Optics", "Wave Optics", "Interference & Diffraction", "Polarization"],
    accent: "text-green-400",
    dot: "bg-green-400",
    cardBorder: "border-green-500/20",
    cardBg: "bg-green-500/5",
    iconBg: "bg-green-500/10",
  },
  {
    icon: Atom,
    title: "Modern Physics",
    topics: ["Quantum Mechanics", "Special Relativity", "Nuclear Physics", "Particle Physics"],
    accent: "text-purple-400",
    dot: "bg-purple-400",
    cardBorder: "border-purple-500/20",
    cardBg: "bg-purple-500/5",
    iconBg: "bg-purple-500/10",
  },
  {
    icon: Activity,
    title: "Waves & Oscillations",
    topics: ["Simple Harmonic Motion", "Wave Propagation", "Resonance & Standing Waves", "Sound & Acoustics"],
    accent: "text-cyan-400",
    dot: "bg-cyan-400",
    cardBorder: "border-cyan-500/20",
    cardBg: "bg-cyan-500/5",
    iconBg: "bg-cyan-500/10",
  },
];

export function PhysicsDisciplines() {
  return (
    <section
      className="relative w-full bg-gradient-to-b from-fipho-navy-light to-fipho-navy py-20 overflow-hidden"
      id="disciplines"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-0 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-fipho-blue/8 blur-3xl" />
        <div className="absolute right-0 bottom-0 translate-x-1/2 h-[500px] w-[500px] rounded-full bg-fipho-gold/5 blur-3xl" />
        <div className="absolute top-0 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-fipho-gold/20 to-transparent" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge className="mb-4 bg-fipho-gold/10 text-fipho-gold border-fipho-gold/30">
            Examination Scope
          </Badge>
          <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Physics Disciplines
          </h2>
          <p className="text-white/70 leading-relaxed">
            FIPHO examinations cover the full breadth of classical and modern
            physics, testing both theoretical understanding and experimental
            mastery across six core disciplines.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {disciplines.map((d) => (
            <div
              key={d.title}
              className={`group glass-card rounded-2xl border p-6 hover:scale-[1.02] transition-all duration-300 ${d.cardBorder} ${d.cardBg}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${d.iconBg}`}>
                  <d.icon className={`h-5 w-5 ${d.accent}`} />
                </div>
                <h3 className={`font-heading text-xl font-semibold mt-1.5 ${d.accent}`}>
                  {d.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {d.topics.map((topic) => (
                  <li key={topic} className="flex items-center gap-2 text-sm text-white/60">
                    <span className={`h-1 w-1 rounded-full shrink-0 ${d.dot}`} />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-white/40 text-sm mt-10">
          Both the Theoretical and Experimental rounds draw from all six disciplines.
        </p>
      </div>
    </section>
  );
}
