import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Calendar, Clock } from "lucide-react";
import Link from "next/link";

export function OpeningCeremony() {
  return (
    <section
      className="relative w-full bg-gradient-to-b from-fipho-navy to-fipho-navy-light py-20"
      id="opening-ceremony"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 -translate-x-1/2 translate-y-1/2 h-96 w-96 rounded-full bg-fipho-blue/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-fipho-blue/20 bg-fipho-blue/10 text-fipho-gold hover:bg-fipho-blue/20"
          >
            <Play className="h-3 w-3 mr-1" />
            Live Event
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Opening Ceremony
          </h2>
          <p className="text-fipho-slate/70">
            Watch the spectacular opening ceremony that marks the beginning of
            our prestigious physics competition.
          </p>
        </div>

        {/* Video Link Container */}
        <div className="max-w-3xl mx-auto">
          <Card className="group relative border-fipho-blue/20 bg-fipho-light/80 backdrop-blur overflow-hidden">
            <CardContent className="p-12 text-center">
              <div className="space-y-6">
                <div className="mx-auto w-24 h-24 bg-fipho-blue/20 rounded-full flex items-center justify-center group-hover:bg-fipho-blue/90/30 transition-colors duration-300">
                  <Play className="h-12 w-12 text-fipho-gold" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">
                    Live Opening Ceremony
                  </h3>
                  <p className="text-fipho-slate/70">
                    Join us for the spectacular opening ceremony broadcast
                  </p>
                </div>
                <Link
                  href="https://youtube.com/live/OyrvrJ1SHG0?feature=share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" inline-flex items-center gap-3 px-8 py-4 bg-fipho-blue hover:bg-fipho-blue text-white rounded-lg font-semibold transition-colors duration-200 text-lg"
                >
                  <Play className="h-6 w-6" />
                  Watch Live on YouTube
                </Link>
              </div>
            </CardContent>
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-fipho-blue/10 group-hover:ring-fipho-blue/20 transition-all duration-300" />
          </Card>
        </div>

        {/* Event Details */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-fipho-slate/70">
            <Calendar className="h-4 w-4 text-fipho-gold" />
            <span className="text-sm">Opening Day</span>
          </div>
          <div className="flex items-center gap-2 text-fipho-slate/70">
            <Clock className="h-4 w-4 text-fipho-gold" />
            <span className="text-sm">Full Ceremony</span>
          </div>
          <div className="flex items-center gap-2 text-fipho-slate/70">
            <Play className="h-4 w-4 text-fipho-gold" />
            <span className="text-sm">HD Quality</span>
          </div>
        </div>

        {/* Supporting Text */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p className="text-fipho-slate/70 text-lg leading-relaxed">
            Experience the grandeur and excitement as we officially launch the
            competition. The ceremony features inspiring speeches, cultural
            performances, and the presentation of participating teams from
            around the world.
          </p>
        </div>
      </div>
    </section>
  );
}
