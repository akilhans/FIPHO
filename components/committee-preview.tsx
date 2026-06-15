import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const featuredMembers = [
  {
    name: "Prof. Vadim Eremin",
    role: "Scientific Committee",
    institution: "Moscow State University",
    country: "Russia",
    image: "/images/scientific/Vadim.jpg",
  },
  {
    name: "Andrei Shved",
    role: "Scientific Committee",
    institution: "ETH Zurich",
    country: "Switzerland",
    image: "/images/scientific/Andrei.jpg",
  },
  {
    name: "Bulat Garifullin",
    role: "Scientific Committee",
    institution: "Hospital No.13 Ufa",
    country: "Russia",
    image: "/images/scientific/Bulat.jpg",
  },
];

export function CommitteePreview() {
  return (
    <section className="relative w-full section-mid py-20 overflow-hidden" id="committee">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-fipho-gold/20 to-transparent" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-fipho-blue/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge className="mb-4 bg-fipho-gold/10 text-fipho-gold border-fipho-gold/30">
            Scientific Leadership
          </Badge>
          <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Scientific Committee
          </h2>
          <p className="text-white/70">
            Distinguished physicists and educators from around the world oversee
            problem development, examination standards, and fair grading.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredMembers.map((member) => (
            <Card
              key={member.name}
              className="glass-card rounded-xl hover:bg-white/10 transition-all duration-300 group"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-fipho-gold/30 ring-2 ring-fipho-gold/10">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback className="bg-fipho-navy text-fipho-gold">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-heading font-medium text-white group-hover:text-fipho-gold transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-fipho-gold/80">{member.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/70">{member.institution}</p>
                <p className="text-sm text-white/50">{member.country}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/scientific-committee">
            <Button
              variant="outline"
              className="border-fipho-gold/40 text-fipho-gold hover:bg-fipho-gold/10 cursor-pointer"
            >
              View Full Committee
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
