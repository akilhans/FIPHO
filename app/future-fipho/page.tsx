"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Calendar,
  Users,
  GraduationCap,
  FileText,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Globe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Future competition data
const upcomingCompetitions = [
  {
    year: "2026",
    location: "Karakalpakistan, Uzbekistan",
    dates: "Dates to be announced soon...",
    registrationDeadline: "February 15, 2025",
    theme: "Sustainable Physics for a Better Future",
    eligibility: [
      "Students born after January 1, 2006",
      "Currently enrolled in secondary education",
      "Not enrolled in university-level courses",
      "Maximum of 4 students per country",
    ],
    keyDates: [
      {
        date: "January 15, 2025",
        event: "Registration Opens",
        status: "upcoming",
      },
      {
        date: "February 15, 2025",
        event: "Registration Deadline",
        status: "upcoming",
      },
      {
        date: "March 15, 2025",
        event: "Local Round Examinations",
        status: "upcoming",
      },
      { date: "April 20, 2025", event: "National Round", status: "upcoming" },
      { date: "June 1, 2025", event: "Opening Ceremony", status: "upcoming" },
      {
        date: "June 2-5, 2025",
        event: "Competition Rounds",
        status: "upcoming",
      },
      { date: "June 6-7, 2025", event: "Cultural Program", status: "upcoming" },
      {
        date: "June 8, 2025",
        event: "Closing Ceremony & Awards",
        status: "upcoming",
      },
    ],
    featuredImage: "/placeholder.svg?height=400&width=800",
  },
  {
    year: "2027",
    location: "Planning soon...",
    dates: " (Exact dates TBA)",
    registrationDeadline: "February 2026",
    theme: "Physics at the Crossroads of Innovation",
    eligibility: [
      "Students born after January 1, 2007",
      "Currently enrolled in secondary education",
      "Not enrolled in university-level courses",
      "Maximum of 4 students per country",
    ],
    keyDates: [
      { date: "January 2026", event: "Registration Opens", status: "future" },
      {
        date: "February 2026",
        event: "Registration Deadline",
        status: "future",
      },
      {
        date: "March 2026",
        event: "Local Round Examinations",
        status: "future",
      },
      { date: "April 2026", event: "National Round", status: "future" },
      {
        date: "May 2026",
        event: "International Final Round",
        status: "future",
      },
    ],
    featuredImage: "/placeholder.svg?height=400&width=800",
  },
];

export default function FutureFIPHOPage() {
  return (
    <section className="relative w-full bg-gradient-to-b from-fipho-navy to-fipho-navy-light">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 -translate-x-1/2 translate-y-1/2 h-96 w-96 rounded-full bg-fipho-blue/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-fipho-blue/20 bg-fipho-blue/10 text-fipho-gold hover:bg-fipho-blue/20"
          >
            Upcoming Competitions
          </Badge>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Future FIPHO Competitions
          </h1>
          <p className="text-white mb-6">
            Discover upcoming FIPHO events and prepare for the next generation
            of physics excellence
          </p>
        </div>

        {/* Featured Competition */}
        <div className="mx-auto max-w-5xl mb-16">
          <Card className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur overflow-hidden">
            <div className="relative h-[300px] w-full">
              <Image
                src={
                  upcomingCompetitions[0].featuredImage || "/placeholder.svg"
                }
                alt={`FIPHO ${upcomingCompetitions[0].year}`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fipho-navy/90 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h2 className="text-3xl font-bold text-white">
                  FIPHO {upcomingCompetitions[0].year}
                </h2>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-fipho-gold" />
                    <p className="text-fipho-navy">
                      {upcomingCompetitions[0].location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-fipho-gold" />
                    <p className="text-fipho-navy">
                      {upcomingCompetitions[0].dates}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-fipho-navy mb-2">
                    Theme
                  </h3>
                  <p className="text-fipho-slate/70">
                    {upcomingCompetitions[0].theme}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-xl font-semibold text-fipho-navy mb-4">
                      Eligibility Requirements
                    </h3>
                    <ul className="space-y-2">
                      {upcomingCompetitions[0].eligibility.map(
                        (requirement, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-fipho-slate/70"
                          >
                            <CheckCircle className="h-5 w-5 text-fipho-gold mt-0.5 shrink-0" />
                            <span>{requirement}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-fipho-navy mb-4">
                      Important Dates
                   </h3>
                    <div className="space-y-3">
                    <div className="flex items-center gap-2">
      <AlertCircle className="h-5 w-5 text-yellow-500" />
      <p className="text-fipho-slate/70">Exact Dates to be announced.</p>
    </div>
    <div className="flex items-center gap-2">
      <CheckCircle className="h-5 w-5 text-fipho-blue" />
      <p className="text-fipho-slate/70">Another date</p>
    </div>
                    </div>
                  </div>
                </div>

               
              </div>
            </CardContent>
          </Card>
        </div>

      
        {/* Competition Format */}
        <div className="mx-auto max-w-5xl mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">
              Competition Format
            </h2>
            <p className="mt-2 text-fipho-slate/70">
              What to expect at FIPHO 2026
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Theoretical Examination",
                icon: <FileText className="h-6 w-6 text-fipho-gold" />,
                description:
                  "A comprehensive 5-hour written examination covering mechanics, electromagnetism, thermodynamics, optics, and modern physics.",
              },
              {
                title: "Practical Laboratory",
                icon: <GraduationCap className="h-6 w-6 text-fipho-gold" />,
                description:
                  "A challenging 5-hour laboratory session testing experimental skills, data analysis, and problem-solving in a hands-on environment.",
              },
              {
                title: "Research Presentation",
                icon: <Users className="h-6 w-6 text-fipho-gold" />,
                description:
                  "Participants will prepare and present a short research proposal on a physics topic related to the competition theme.",
              },
            ].map((format, index) => (
              <Card
                key={index}
                className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {format.icon}
                    <CardTitle className="text-fipho-navy">
                      {format.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-fipho-slate/70">{format.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Host Country */}
        <div className="mx-auto max-w-5xl mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Host Country</h2>
            <p className="text-white mb-6">
              Learn more about Uzbekistan, the host of FIPHO 2026
            </p>
          </div>

          <Card className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="relative h-[300px] md:h-auto">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Uzbekistan"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-fipho-navy">
                  Uzbekistan
                </h3>
                <p className="text-fipho-slate/70">
                  Uzbekistan, located in Central Asia, is a country with a rich
                  scientific heritage and a strong commitment to education. It
                  is the birthplace of Ahmad al-Fargʻoniy, the renowned
                  polymath after whom our competition is named.
                </p>
                <p className="text-fipho-slate/70">
                  Participants will have the opportunity to experience
                  Uzbekistan`s unique culture, visit historical sites, and
                  engage with local scientists and students.
                </p>
                <Button
                  variant="outline"
                  className="border-fipho-gold/50 text-fipho-navy hover:bg-fipho-navy/50 hover:text-white"
                  asChild
                >
                  <Link href="/uzbekistan">
                    <Globe className="mr-2 h-4 w-4" />
                    Discover Uzbekistan
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Future Competitions */}
        <div className="mx-auto max-w-5xl mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Looking Ahead</h2>
            <p className="text-white mb-6">
              Future FIPHO competitions
            </p>
          </div>

          <Card className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-fipho-navy">FIPHO 2026</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-fipho-gold" />
                  <p className="text-fipho-navy">
                    {upcomingCompetitions[1].location}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-fipho-gold" />
                  <p className="text-fipho-navy">
                    {upcomingCompetitions[1].dates}
                  </p>
                </div>
              </div>
              <p className="text-fipho-slate/70">
                Planning is already underway for FIPHO 2026. The competition
                will continue to evolve, introducing new elements while
                maintaining the core focus on physics excellence.
              </p>
              <p className="text-fipho-slate/70">
                Theme: {upcomingCompetitions[1].theme}
              </p>
              <p className="text-fipho-slate/70">
                More details will be announced following the conclusion of
                FIPHO 2026.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mx-auto max-w-3xl mt-16 text-center">
          <p className="text-white mb-6">
            Ready to be part of the next generation of physics excellence?
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <Button className="bg-fipho-blue text-white hover:bg-fipho-blue/90 cursor-pointer">
              Register for FIPHO 2026
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="border-fipho-gold/50 text-fipho-navy hover:bg-fipho-navy/50 hover:text-white"
              asChild
            >
              <Link href="/past-fipho">Explore Past Competitions</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
