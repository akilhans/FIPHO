import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle2 } from "lucide-react";

const timelineEvents = [
  {
    date: "March 1, 2026",
    title: "Registration Opens",
    description: "National teams may begin submitting their registration applications.",
  },
  {
    date: "August 15, 2026",
    title: "Registration Deadline",
    description: "Final date for all participating countries to complete team registration.",
  },
  {
    date: "November 3–10, 2026",
    title: "Olympiad Dates",
    description: "Theoretical and experimental rounds, cultural program, and ceremonies.",
  },
  {
    date: "November 9, 2026",
    title: "Results Announcement",
    description: "Medal winners and official results published at the awards ceremony.",
  },
  {
    date: "November 10, 2026",
    title: "Closing Ceremony",
    description: "Formal conclusion of FIPHO 2026 with awards presentation and farewell.",
  },
];

export function TimelineSection() {
  return (
    <section className="relative w-full bg-fipho-light py-20 overflow-hidden" id="timeline">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-fipho-blue/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-fipho-blue/20 bg-fipho-blue/5 text-fipho-blue"
          >
            Key Dates
          </Badge>
          <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight text-fipho-navy sm:text-4xl">
            Olympiad Timeline
          </h2>
          <p className="text-fipho-slate/70">
            Important milestones for FIPHO 2026 participants and organizers.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-fipho-blue via-fipho-gold to-fipho-blue" />
            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <div key={event.title} className="relative flex gap-6">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-fipho-blue bg-white shadow-md">
                    <CheckCircle2 className="h-5 w-5 text-fipho-blue" />
                  </div>
                  <div className="glass-card-light rounded-xl p-5 flex-1 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-fipho-gold" />
                      <span className="text-sm font-semibold text-fipho-blue">
                        {event.date}
                      </span>
                      {index === 0 && (
                        <Badge className="ml-auto bg-fipho-gold/10 text-fipho-gold border-fipho-gold/30 text-xs">
                          Upcoming
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-fipho-navy mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-fipho-slate/70">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
