import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, CheckCircle2, Clock, AlertCircle } from 'lucide-react'

// Helper function to determine date status
const getDateStatus = (date: Date) => {
  const now = new Date()
  const isPast = date < now
  const isWithin2Weeks = date.getTime() - now.getTime() < 14 * 24 * 60 * 60 * 1000
  
  if (isPast) return "completed"
  if (isWithin2Weeks) return "upcoming"
  return "future"
}

export function TimelineSection() {
  const timelineEvents = [
    {
      title: "Registration Opens",
      date: new Date("2025-03-01"),
      description: "Online registration begins for all divisions",
      details: [
        "Early bird registration available",
        "Team registrations open",
      ]
    },
    {
      title: "Registration Deadline",
      date: new Date("2025-03-31"),
      description: "Last day to register for the competition",
      details: [
        "Individual registration closes",
        "Team registration closes",
        "Late registration with special permission only"
      ]
    },
    {
      title: "Local Round Examinations",
      date: new Date("2025-06-15"),
      description: "First stage of the competition begins",
      details: [
        "Written examination: 9:00 AM - 11:00 AM",
        "Multiple locations worldwide",
        "Results within 2 weeks"
      ]
    },
    {
      title: "National Round",
      date: new Date("2025-06-20"),
      description: "Qualified candidates proceed to national level",
      details: [
        "Theoretical exam: 9:00 AM - 12:00 PM",
        "Practical lab test: 2:00 PM - 4:00 PM",
        "Results within 3 weeks"
      ]
    },
    {
      title: "International Final Round",
      date: new Date("2025-06-15"),
      description: "Global championship in Uzbekistan",
      details: [
        "Opening ceremony: May 15",
        "Examinations: May 16-18",
        "Cultural programs: May 19",
        "Closing ceremony & awards: May 20"
      ]
    },
    {
      title: "Results Announcement",
      date: new Date("2025-06-20"),
      description: "Final results and awards ceremony",
      details: [
        "Medal ceremony",
        "Special awards announcement",
        "Certificates distribution"
      ]
    }
  ]

  return (
    <section className="relative w-full bg-gradient-to-b from-fipho-navy/90 to-fipho-navy py-20" id="timeline">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-fipho-blue/5 blur-3xl" />
        <div className="absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4 border-fipho-blue/20 bg-fipho-blue/10 text-fipho-gold hover:bg-fipho-blue/20">
            Key Dates
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Important Dates & Timeline
          </h2>
          <p className="text-fipho-slate/70">
            Mark your calendar for these crucial dates in the FIPHO 2025 competition schedule.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-fipho-blue/30 md:left-1/2" />

          {timelineEvents.map((event, index) => {
            const status = getDateStatus(event.date)
            const isEven = index % 2 === 0

            return (
              <div key={event.title} className="relative mb-12 md:mb-16">
                <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}>
                  {/* Date marker */}
                  <div className="flex items-center md:w-1/2">
                    <div className={`
                      absolute left-4 z-10 h-4 w-4 rounded-full border-2
                      ${status === 'completed' ? 'border-fipho-blue bg-fipho-navy' : 
                        status === 'upcoming' ? 'border-yellow-500 bg-yellow-900' : 
                        'border-blue-500 bg-blue-900'}
                      md:left-1/2 md:-translate-x-1/2
                    `} />
                  </div>

                  {/* Content */}
                  <div className="ml-12 md:ml-0 md:w-1/2">
                    <Card className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2 text-fipho-navy">
                            {status === 'completed' ? (
                              <CheckCircle2 className="h-5 w-5 text-fipho-blue" />
                            ) : status === 'upcoming' ? (
                              <AlertCircle className="h-5 w-5 text-yellow-500" />
                            ) : (
                              <Clock className="h-5 w-5 text-blue-500" />
                            )}
                            {event.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-sm">
                            <CalendarDays className="h-4 w-4 text-fipho-gold" />
                            <span className="text-fipho-slate/70">
                              {event.date.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4 text-fipho-slate/70">{event.description}</p>
                        <ul className="space-y-2 text-sm text-fipho-slate/70">
                          {event.details.map((detail, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="h-1 w-1 rounded-full bg-fipho-gold" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
