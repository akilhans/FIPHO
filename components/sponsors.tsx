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
},
{
  name: "Central Asian University",
  logo: "/organizers/cau.jpg",
  description: "Advancing higher education through research, innovation, and academic excellence."
},
    ],
  },
];

export function SponsorsSection() {
  return (
    <section className="relative w-full bg-background py-20" id="sponsors">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-mono-ui tracking-wide border border-amber-500/30 text-amber-500 bg-amber-500/10">
            Our Supporters
          </span>
          <h2 className="font-heading mb-4 text-3xl font-semibold tracking-tight sm:text-4xl text-slate-100">
            Sponsors &amp; Partners
          </h2>
          <p className="text-slate-400">
            We are proud to collaborate with leading organizations and
            institutions that share our commitment to advancing physics
            education and scientific excellence.
          </p>
        </div>

        <div className="space-y-16 max-w-6xl mx-auto">
          {sponsorTiers.map((tier) => (
            <div key={tier.name} className="space-y-8">
              
              <div className="flex items-center justify-center gap-2 mb-8">
                <Award className="h-5 w-5 text-amber-500" />
                <h3 className="font-heading text-xl font-semibold text-slate-200">
                  {tier.name}
                </h3>
              </div>
              
              {/* 2x2 Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tier.sponsors.map((sponsor) => (
                  <div
                    key={sponsor.name}
                    className="rounded-xl bg-amber-50 p-8 flex flex-col items-center border border-amber-200 shadow-md hover:shadow-lg hover:border-amber-300 transition-all duration-300 text-center"
                  >
                    {/* 1. BIG LOGO CONTAINER (Centered, taller, and wider) */}
                    <div className="relative h-28 w-full max-w-[240px] bg-neutral-900 rounded-xl p-4 border border-amber-900/10 shadow-md flex items-center justify-center mb-6">
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    
                    {/* 2. SPONSOR NAME (Right under the logo) */}
                    <h4 className="font-heading text-xl font-bold text-amber-950 tracking-tight mb-3">
                      {sponsor.name}
                    </h4>
                    
                    {/* 3. LOGO INFORMATION / DESCRIPTION */}
                    <p className="text-sm leading-relaxed text-slate-800 font-medium max-w-md">
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