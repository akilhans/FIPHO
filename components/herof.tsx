import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Globe2,
  MapPin,
  Users,
  Medal,
  GraduationCap,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { Countdown } from "@/components/countdowncircular";

const facts = [
  { icon: CalendarDays, text: BRAND.dates },
  { icon: Globe2, text: `${BRAND.countries} Countries` },
  { icon: MapPin, text: BRAND.location },
  { icon: Users, text: BRAND.teamComposition },
  { icon: Medal, text: "Medals in a 1:2:3 ratio" },
  { icon: GraduationCap, text: "Secondary school students" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-6 overflow-hidden bg-background">
      
      {/* Al-Fergani blended graphic backdrop */}
      <div className="absolute inset-0 w-full h-full opacity-25 pointer-events-none select-none z-0">
        <Image
          src="/images/fergani.jpg"
          alt="Al-Fergani and Satellite Cosmos"
          fill
          priority
          className="object-cover object-center mix-blend-screen"
        />
      </div>

      {/* Radial gradient overlay matching the canvas background token */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 0%, var(--color-background, #030712) 85%)",
        }}
      />

      {/* Hero foreground content */}
      <div className="relative max-w-5xl mx-auto text-center w-full z-20 flex flex-col items-center">
        
        <p className="font-mono-ui text-xs tracking-[0.3em] uppercase mb-6 text-accent animate-fade-in [animation-delay:.05s]">
          Al-Fergani International Physics Olympiad · 2026
        </p>
        
        {/* Adjusted tracking, leading, and spacing for structural layout elegance */}
        <h1 className="font-heading font-semibold text-4xl md:text-5xl lg:text-6xl leading-[1.15] mb-6 text-white tracking-tight animate-fade-in [animation-delay:.15s] text-balance max-w-3xl mx-auto">
    Step onto the global stage at{" "}
    <span className="font-serif italic font-normal text-fipho-gold drop-shadow-[0_2px_10px_rgba(212,163,89,0.2)]">
      FIPHO
    </span>
    <br />
    <span className="text-2xl md:text-3xl lg:text-4xl font-normal text-white/80 block mt-4">
      Challenge your understanding and unlock your ultimate potential
    </span>
  </h1>
  
  

        {/* Countdown wrapper */}
        <div className="mb-12 animate-fade-in [animation-delay:.32s] w-full flex justify-center">
          <Countdown />
        </div>

        {/* Clean, beautifully separated fact infrastructure */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 max-w-4xl mx-auto mb-12 animate-fade-in [animation-delay:.38s] border-y border-border/40 py-4 w-full">
          {facts.map((fact) => (
            <div key={fact.text} className="flex items-center gap-2">
              <fact.icon className="h-4 w-4 text-accent flex-shrink-0" />
              <span className="font-mono-ui text-xs tracking-wide text-muted-foreground whitespace-nowrap">
                {fact.text}
              </span>
            </div>
          ))}
        </div>

        {/* Action Call To Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in [animation-delay:.45s]">
          <Link
            href="https://register-fipho.olympcenter.uz/registration"
            className="px-8 py-3.5 rounded-full font-medium text-sm border border-accent bg-accent text-accent-foreground hover:opacity-90 transition-opacity shadow-sm"
          >
            Registration is open
          </Link>
          <Link
            href="/about"
            className="px-8 py-3.5 rounded-full font-medium text-sm border border-border bg-white text-background hover:bg-white/90 transition-colors shadow-sm"
          >
            Explore the Olympiad
          </Link>
          <Link
            href="/results"
            className="px-8 py-3.5 rounded-full font-medium text-sm border border-border bg-background/40 backdrop-blur-sm text-white hover:bg-muted transition-colors"
          >
            Preparatory Problems
          </Link>
        </div>

      </div>
    </section>
  );
}
