import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Medal,
  Globe2,
  GraduationCap,
  MapPin,
  Users,
  Atom,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { Countdown } from "@/components/countdown";

const equations = [
  { text: "E = mc²", top: "6%", left: "1%", size: "2.5rem", rotate: "-5deg", opacity: 0.055 },
  { text: "F = ma", top: "8%", left: "55%", size: "1.6rem", rotate: "6deg", opacity: 0.04 },
  { text: "∇ × B = μ₀J", top: "72%", left: "1%", size: "1rem", rotate: "-3deg", opacity: 0.045 },
  { text: "ΔxΔp ≥ ℏ/2", top: "80%", left: "60%", size: "0.9rem", rotate: "5deg", opacity: 0.04 },
  { text: "PV = nRT", top: "22%", left: "1%", size: "1.2rem", rotate: "4deg", opacity: 0.05 },
  { text: "E = hν", top: "88%", left: "30%", size: "1.1rem", rotate: "-4deg", opacity: 0.04 },
  { text: "λ = h/p", top: "14%", left: "42%", size: "0.85rem", rotate: "3deg", opacity: 0.035 },
  { text: "∮E·dA = Q/ε₀", top: "60%", left: "0.5%", size: "0.8rem", rotate: "6deg", opacity: 0.04 },
  { text: "τ = Iα", top: "93%", left: "2%", size: "1rem", rotate: "-6deg", opacity: 0.045 },
  { text: "n₁sinθ₁ = n₂sinθ₂", top: "95%", left: "52%", size: "0.75rem", rotate: "2deg", opacity: 0.035 },
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-fipho-navy">
      <div className="absolute inset-0 bg-gradient-to-br from-fipho-navy via-fipho-navy-light to-fipho-blue-deep/80" />

      {/* Floating physics equations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {equations.map((eq, i) => (
          <span
            key={i}
            className="absolute font-mono font-bold animate-pulse-glow"
            style={{
              top: eq.top,
              left: eq.left,
              fontSize: eq.size,
              transform: `rotate(${eq.rotate})`,
              opacity: eq.opacity,
              color: "white",
              whiteSpace: "nowrap",
            }}
          >
            {eq.text}
          </span>
        ))}
      </div>

      {/* Decorative rings */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-[10%] top-[20%] h-32 w-32 rounded-full border-2 border-fipho-gold" />
        <div className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full border border-fipho-gold/50" />
        <div className="absolute right-[15%] top-[30%] h-24 w-24 rounded-full border-2 border-fipho-blue" />
        <div className="absolute right-[13%] top-[28%] h-32 w-32 rounded-full border border-fipho-blue/50" />
        <div className="absolute bottom-[20%] left-[20%] h-36 w-36 rounded-full border-2 border-white/30" />
        <div className="absolute bottom-[18%] left-[18%] h-44 w-44 rounded-full border border-white/20" />
      </div>

      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-float absolute left-[10%] top-20 h-24 w-24 rounded-full border-2 border-fipho-gold/30 bg-fipho-gold/10 shadow-[0_0_30px_rgba(212,175,55,0.15)]" />
        <div className="animate-float-delayed absolute right-[15%] top-40 h-16 w-16 rounded-full border-2 border-fipho-blue/40 bg-fipho-blue/10 shadow-[0_0_30px_rgba(30,79,168,0.2)]" />
        <div className="animate-float absolute bottom-20 left-[20%] h-20 w-20 rounded-full border-2 border-white/20 bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.05)]" />
        <div className="animate-orbit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full border border-fipho-gold/5" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-16 lg:py-20 flex items-center min-h-[calc(90vh-72px)]">
        <div className="w-full lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Left content */}
          <div className="flex flex-col justify-center space-y-6 sm:space-y-7">
            <div className="space-y-4 sm:space-y-5">
              <Badge className="w-fit animate-fade-in bg-fipho-gold/10 text-fipho-gold border-fipho-gold/30 hover:bg-fipho-gold/20">
                <Atom className="mr-1.5 h-3.5 w-3.5" />
                International Physics Olympiad
              </Badge>
              <div>
                <h1 className="animate-fade-in font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  FIPHO 2026
                </h1>
                <p className="text-lg text-fipho-gold/90 font-medium mt-2">
                  Al-Ferghani International Physics Olympiad
                </p>
              </div>
            </div>

            {/* Countdown timer */}
            <Countdown />

            {/* Mobile image */}
            <div className="lg:hidden">
              <div className="relative mx-auto h-[250px] w-full max-w-[500px] overflow-hidden rounded-2xl bg-gradient-to-br from-fipho-blue/20 to-fipho-navy/40 backdrop-blur shadow-[0_0_40px_rgba(30,79,168,0.2)] sm:h-[350px]">
                <Image
                  src="/images/main-page.jpg"
                  alt="Students engaged in physics research"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fipho-navy/60 via-transparent to-transparent" />
              </div>
            </div>

            <p className="max-w-xl text-lg sm:text-xl text-white/80 leading-relaxed">
              {BRAND.tagline}
            </p>

            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
              {[
                { icon: CalendarDays, text: BRAND.dates },
                { icon: Globe2, text: `${BRAND.countries} Countries` },
                { icon: MapPin, text: BRAND.location },
                { icon: Users, text: BRAND.teamComposition },
                { icon: Medal, text: "Medals in a 1:2:3 ratio" },
                { icon: GraduationCap, text: "Secondary school students" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-white/90">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-fipho-gold/10">
                    <Icon className="h-4 w-4 text-fipho-gold" />
                  </div>
                  <span className="text-sm sm:text-base">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 pt-2">
              <Link href="/requirements" className="animate-slide-in">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-fipho-gold text-fipho-navy hover:bg-fipho-gold/90 font-semibold cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-transform hover:scale-105"
                >
                  Register Now
                </Button>
              </Link>
              <Link href="/about" className="animate-slide-in">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-fipho-gold/40 text-white hover:bg-fipho-gold/10 hover:text-fipho-gold cursor-pointer transition-transform hover:scale-105"
                >
                  Explore the Olympiad
                </Button>
              </Link>
              <Link href="/preparatory-problems" className="animate-slide-in">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white/20 text-white/90 hover:bg-white/10 hover:text-fipho-gold cursor-pointer transition-transform hover:scale-105"
                >
                  Preparatory Problems
                </Button>
              </Link>
            </div>
          </div>

          {/* Desktop image */}
          <div className="hidden items-center justify-center lg:flex">
            <div className="relative h-[500px] xl:h-[540px] w-full max-w-[520px] overflow-hidden rounded-2xl bg-gradient-to-br from-fipho-blue/20 to-fipho-navy/40 backdrop-blur shadow-[0_0_50px_rgba(30,79,168,0.25)] ring-1 ring-fipho-gold/20">
              <Image
                src="/images/main-page.jpg"
                alt="Students engaged in physics research"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fipho-navy/50 via-transparent to-fipho-blue/10" />

              {/* Floating formula overlay on image */}
              <div className="absolute top-4 right-4 bg-fipho-navy/70 backdrop-blur-sm border border-fipho-gold/20 rounded-xl px-3 py-2">
                <p className="font-mono text-sm text-fipho-gold font-bold">E = mc²</p>
              </div>
              <div className="absolute top-16 right-4 bg-fipho-navy/60 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2">
                <p className="font-mono text-xs text-white/70">F = −∇V</p>
              </div>
              <div className="absolute top-28 right-4 bg-fipho-navy/60 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2">
                <p className="font-mono text-xs text-white/70">ΔS ≥ 0</p>
              </div>

              <div className="absolute bottom-4 left-4 right-4 glass-card rounded-xl p-4">
                <p className="text-sm text-white/90 font-medium">Samarkand, Uzbekistan</p>
                <p className="text-xs text-fipho-gold mt-1">Host city of FIPHO 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
