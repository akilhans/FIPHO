import { Award } from "lucide-react";
import Image from "next/image";

const sponsorTiers = [
  {
    name: "Our Sponsors and Partners",
    sponsors: [
      {
        name: "Science Olympiad Center",
        logo: "/organizers/olympic.png",
        description: "Organizer of national science Olympiads and supporter of gifted students."
      },
      {
        name: "Ministry of Education",
        logo: "/images/educationMinistry.png",
        description: "Leading educational development and supporting excellence in learning."
      },
      {
        name: "Innovation Agency",
        logo: "/images/agentlik.png",
        description: "Promoting innovation, research, and technology-driven development."
      }
    ],
  },
];

export function SponsorsSection() {
  return (
    <section className="relative w-full bg-background py-20" id="sponsors">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-mono-ui tracking-wide border border-accent/30 text-accent bg-accent/10">
            Our Supporters
          </span>
          <h2 className="font-heading mb-4 text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
            Sponsors &amp; Partners
          </h2>
          <p className="text-muted-foreground font-light text-sm sm:text-base">
            We are proud to collaborate with leading organizations and
            institutions that share our commitment to advancing physics
            education and scientific excellence.
          </p>
        </div>

        {/* Sponsors Container */}
        <div className="space-y-16 max-w-6xl mx-auto">
          {sponsorTiers.map((tier) => (
            <div key={tier.name} className="space-y-8">
              
              <div className="flex items-center justify-center gap-2 mb-8">
                <Award className="h-5 w-5 text-accent" />
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {tier.name}
                </h3>
              </div>
              
              {/* Responsive 3-column layout to sit side-by-side on screens md and up */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tier.sponsors.map((sponsor) => (
                  <div
                    key={sponsor.name}
                    className="rounded-xl bg-background-raised p-6 flex flex-col items-center border border-border hover:border-accent/30 shadow-sm hover:shadow-md transition-all duration-300 text-center group"
                  >
                    {/* Logo Wrapper */}
                    <div className="relative h-24 w-full max-w-[200px] bg-neutral-900 rounded-xl p-4 border border-border/40 shadow-sm flex items-center justify-center mb-5 group-hover:scale-[1.02] transition-transform duration-300">
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    
                    {/* Sponsor Identity */}
                    <h4 className="font-heading text-base font-semibold text-foreground tracking-tight mb-2">
                      {sponsor.name}
                    </h4>
                    
                    {/* Description Paragraph */}
                    <p className="text-xs leading-relaxed text-muted-foreground font-light">
                      {sponsor.description}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}