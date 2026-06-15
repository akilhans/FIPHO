import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Globe2, Lightbulb, BookOpen, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    icon: Target,
    title: "Mission",
    description:
      "To identify, inspire, and nurture exceptional young physicists from around the world through rigorous international competition and scientific collaboration.",
  },
  {
    icon: Eye,
    title: "Vision",
    description:
      "To become a leading international physics olympiad that advances scientific education and honors the intellectual legacy of Ahmad al-Fargʻoniy.",
  },
  {
    icon: Globe2,
    title: "International Collaboration",
    description:
      "FIPHO brings together students, educators, and researchers from diverse nations to exchange knowledge and foster cross-cultural scientific dialogue.",
  },
  {
    icon: Lightbulb,
    title: "Why Participate",
    description:
      "Gain recognition on a global stage, challenge your problem-solving abilities, and connect with peers who share your passion for physics.",
  },
  {
    icon: BookOpen,
    title: "Legacy of Ahmad al-Fargʻoniy",
    description:
      "Named in honor of the renowned 10th-century scholar from Fergana, whose pioneering work in astronomy, mathematics, and natural sciences continues to inspire.",
  },
  {
    icon: Users,
    title: "Objectives",
    description:
      "Promote physics education, encourage scientific research among youth, and strengthen international ties in the global scientific community.",
  },
];

export function AboutSection() {
  return (
    <section className="relative w-full section-dark py-20 overflow-hidden" id="about">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-0 -translate-x-1/2 translate-y-1/2 h-96 w-96 rounded-full bg-fipho-blue/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-fipho-gold/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge className="mb-4 bg-fipho-gold/10 text-fipho-gold border-fipho-gold/30">
            About FIPHO
          </Badge>
          <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            A Prestigious International Physics Olympiad
          </h2>
          <p className="text-white/70 leading-relaxed">
            FIPHO — the Fargʻoniy International Physics Olympiad — is a
            world-class competition for talented secondary school students
            passionate about physics, discovery, and scientific excellence.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <Card
              key={pillar.title}
              className="glass-card rounded-xl hover:bg-white/10 transition-all duration-300 group"
            >
              <CardContent className="p-6 space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-fipho-gold/10 group-hover:bg-fipho-gold/20 transition-colors">
                  <pillar.icon className="h-6 w-6 text-fipho-gold" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="text-sm text-white/65 leading-relaxed">
                  {pillar.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/about">
            <Button className="bg-fipho-gold text-fipho-navy hover:bg-fipho-gold/90 font-semibold cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              Learn More About FIPHO
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
