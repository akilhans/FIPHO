import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";
import Image from "next/image";

const sponsorTiers = [
  {
    name: "Our Sponsors and Partners",
    sponsors: [
      { name: "Olympic Center", logo: "/organizers/olympic.png" },
      { name: "Ministry of Education", logo: "/organizers/maktabgacha.png" },
      { name: "Innovation Agency", logo: "/organizers/agentlik.png" },
      { name: "Central Asian University", logo: "/organizers/cau.jpg" },
    ],
  },
];

export function SponsorsSection() {
  return (
    <section className="relative w-full bg-fipho-light py-20" id="sponsors">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-fipho-blue/20 bg-fipho-blue/5 text-fipho-blue"
          >
            Our Supporters
          </Badge>
          <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight text-fipho-navy sm:text-4xl">
            Sponsors &amp; Partners
          </h2>
          <p className="text-fipho-slate/70">
            We are proud to collaborate with leading organizations and
            institutions that share our commitment to advancing physics
            education and scientific excellence.
          </p>
        </div>

        <div className="space-y-16">
          {sponsorTiers.map((tier) => (
            <div key={tier.name} className="space-y-8">
              <div className="flex items-center justify-center gap-2">
                <Award className="h-5 w-5 text-fipho-gold" />
                <h3 className="font-heading text-xl font-semibold text-fipho-navy">
                  {tier.name}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {tier.sponsors.map((sponsor) => (
                  <Card
                    key={sponsor.name}
                    className="border-white bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
                      <div className="relative h-20 w-full">
                        <Image
                          src={sponsor.logo}
                          alt={sponsor.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <p className="text-sm text-center text-fipho-slate/70">
                        {sponsor.name}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
