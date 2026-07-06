import {
  MapPin,
  Calendar,
  Users,
  GraduationCap,
  FileText,
  ArrowRight,
  CheckCircle,
  Globe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const upcomingCompetitions = [
  {
    year: "2026",
    location: "Samarkand, Uzbekistan",
    dates: "October 10 to October 17, 2026",
    registrationDeadline: "September 25, 2026",
    theme: "Sustainable Physics for a Better Future",
    eligibility: [
      "Students born after September 1, 2008",
      "Currently enrolled in secondary education",
      "Not enrolled in university-level courses",
      "Maximum of 5 students per country",
    ],
    keyDates: [
      { date: "15 July, 2026", event: "Initial Registration Opens" },
      { date: "1 September, 2026", event: "Detailed Registration Phase Begins" },
      { date: "25 September, 2026", event: "Final Registration Deadline" },
      { date: "October 10, 2026", event: "Opening Ceremony · Samarkand" },
      { date: "October 11-15, 2026", event: "Competition Exam Rounds" },
      { date: "October 16, 2026", event: "Cultural Excursion Program" },
      { date: "October 17, 2026", event: "Closing Ceremony & Awards" },
    ],
    featuredImage: "/images/Samarkand1.jpg",
  },
  {
    year: "2027",
    location: "Planning soon...",
    dates: "(Exact dates TBA)",
    registrationDeadline: "February 2027",
    theme: "Physics at the Crossroads of Innovation",
    eligibility: [
      "Students born after September 1, 2009",
      "Currently enrolled in secondary education",
      "Not enrolled in university-level courses",
      "Maximum of 5 students per country",
    ],
    keyDates: [
      { date: "January 2027", event: "Registration Opens" },
      { date: "February 2027", event: "Registration Deadline" },
      { date: "March 2027", event: "Local Round Examinations" },
      { date: "April 2027", event: "National Round" },
      { date: "May 2027", event: "International Final Round" },
    ],
    featuredImage: "/placeholder.svg?height=400&width=800",
  },
];

const competitionFormat = [
  {
    title: "Theoretical Examination",
    icon: FileText,
    description:
      "A comprehensive 3-hour written examination covering mechanics, electromagnetism, thermodynamics, optics, and modern physics.",
  },
  {
    title: "Practical Laboratory",
    icon: GraduationCap,
    description:
      "A challenging 3-hour laboratory session testing experimental skills, data analysis, and problem-solving in a hands-on environment.",
  },
  {
    title: "Research Presentation",
    icon: Users,
    description:
      "Participants will prepare and present a short research proposal on a physics topic related to the competition theme.",
  },
];

export default function FutureFIPHOPage() {
  const featured = upcomingCompetitions[0];
  const lookingAhead = upcomingCompetitions[1];

  return (
    <main>
      {/* HERO */}
      <section className="relative pt-36 pb-16 px-6 text-center bg-background overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(224,181,85,0.08), transparent 70%)",
          }}
        />
        <div className="relative max-w-2xl mx-auto">
          <p className="font-mono-ui text-xs tracking-[0.3em] uppercase mb-5 text-accent">
            Upcoming Competitions
          </p>
          <h1 className="font-heading font-semibold text-4xl md:text-6xl leading-tight mb-5">
            Future FIPHO Competitions
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Discover upcoming FIPHO events and prepare for the next generation
            of physics excellence
          </p>
        </div>
      </section>

      {/* FEATURED COMPETITION */}
      <section className="px-6 pb-16 bg-background">
        <div className="max-w-4xl mx-auto rounded-2xl border border-border overflow-hidden bg-background-raised">
          
          <div className="w-full border-b border-border overflow-hidden">
            <Image
              src={featured.featuredImage}
              alt={`FIPHO ${featured.year}`}
              width={1200}
              height={600}
              className="w-full h-auto block"
              priority
            />
          </div>

          {/* HEADER BLOCK */}
          <div className="p-8 border-b border-border bg-background">
            <h2 className="font-heading font-semibold text-3xl mb-3 text-foreground">
              FIPHO {featured.year}
            </h2>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <p className="text-sm font-medium text-muted-foreground">{featured.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-accent" />
                <p className="text-sm font-medium text-muted-foreground">{featured.dates}</p>
              </div>
            </div>
          </div>

          {/* DETAILS PANELS */}
          <div className="p-8 space-y-8">
            <div>
              <h3 className="font-medium mb-2">Theme</h3>
              <p className="text-sm text-muted-foreground">{featured.theme}</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-medium mb-4">Eligibility Requirements</h3>
                <ul className="space-y-2.5">
                  {featured.eligibility.map((requirement) => (
                    <li key={requirement} className="flex items-start gap-2.5">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4">Important Dates</h3>
                <div className="relative pl-5">
                  <div className="absolute left-[3px] top-1 bottom-1 w-px bg-border" />
                  <ul className="space-y-4">
                    {featured.keyDates.map((kd) => (
                      <li key={kd.event} className="relative">
                        <span className="absolute -left-5 top-1 w-1.5 h-1.5 rounded-full bg-accent" />
                        <p className="font-mono-ui text-xs text-muted-foreground">{kd.date}</p>
                        <p className="text-sm">{kd.event}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPETITION FORMAT */}
      <section className="px-6 py-16 bg-background-raised border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading font-semibold text-2xl md:text-3xl mb-2">
              Competition Format
            </h2>
            <p className="text-sm text-muted-foreground">What to expect at FIPHO {featured.year}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {competitionFormat.map(({ title, icon: Icon, description }) => (
              <div
                key={title}
                className="p-6 rounded-xl border border-border hover:border-accent/40 transition-colors"
              >
                <Icon className="h-6 w-6 text-accent mb-4" />
                <h3 className="font-medium mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOST COUNTRY */}
      <section className="px-6 py-16 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading font-semibold text-2xl md:text-3xl mb-2">
              Host Country
            </h2>
            <p className="text-sm text-muted-foreground">
              Learn more about Uzbekistan, the host of FIPHO {featured.year}
            </p>
          </div>

          <div className="rounded-2xl border border-border overflow-hidden grid md:grid-cols-2">
            <div className="w-full bg-background-raised border-r border-border overflow-hidden flex items-center">
              <Image
                src="/images/Uzbekistan.jpg"
                alt="Uzbekistan"
                width={800}
                height={600}
                className="w-full h-auto block"
              />
            </div>
            <div className="p-8 space-y-4 bg-background-raised">
              <h3 className="font-heading font-semibold text-xl">Uzbekistan</h3>
              <p className="text-sm text-muted-foreground">
                Uzbekistan, located in Central Asia, is a country with a rich
                scientific heritage and a strong commitment to education. It
                is the birthplace of Ahmad al-Fargʻoniy, the renowned
                polymath after whom our competition is named.
              </p>
              <p className="text-sm text-muted-foreground">
                Participants will have the opportunity to experience
                Uzbekistan&apos;s unique culture, visit historical sites, and
                engage with local scientists and students.
              </p>
              <Link
                href="/uzbekistan"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-accent/50 text-accent hover:bg-accent/10 transition-colors"
              >
                <Globe className="h-4 w-4" />
                Discover Uzbekistan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LOOKING AHEAD */}
      <section className="px-6 py-16 bg-background-raised border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading font-semibold text-2xl md:text-3xl mb-2">
              Looking Ahead
            </h2>
            <p className="text-sm text-muted-foreground">Future FIPHO competitions</p>
          </div>

          <div className="p-8 rounded-2xl border border-border bg-background">
            <h3 className="font-heading font-semibold text-xl mb-4">
              FIPHO {lookingAhead.year}
            </h3>
            <div className="flex flex-wrap gap-6 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <p className="text-sm text-muted-foreground">{lookingAhead.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-accent" />
                <p className="text-sm text-muted-foreground">{lookingAhead.dates}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Planning is already underway for FIPHO {lookingAhead.year}. The
              competition will continue to evolve, introducing new elements
              while maintaining the core focus on physics excellence.
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              Theme: {lookingAhead.theme}
            </p>
            <p className="text-sm text-muted-foreground">
              More details will be announced following the conclusion of
              FIPHO {featured.year}.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center bg-background">
        <p className="mb-6 text-lg text-muted-foreground">
          Ready to be part of the next generation of physics excellence?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
          >
            Register for FIPHO {featured.year}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/past-fipho"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-medium text-sm border border-border hover:bg-muted transition-colors"
          >
            Explore Past Competitions
          </Link>
        </div>
      </section>
    </main>
  );
}