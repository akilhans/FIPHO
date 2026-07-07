const timelineEvents = [
  {
    date: "OCTOBER 10, 2026",
    title: "Arrival Day",
    description: "Welcoming international delegations, managing team check-ins, and distributing orientation materials at official checkpoints.",
  },
  {
    date: "OCTOBER 11, 2026",
    title: "Opening Ceremony",
    description: "The grand inaugural assembly, official welcome speeches, cultural performances, and country flag presentations in Samarkand.",
  },
  {
    date: "OCTOBER 12, 2026",
    title: "Theoretical Examination",
    description: "The first major competitive stage testing advanced conceptual mechanics and rigorous problem-solving capacities.",
  },
  {
    date: "OCTOBER 13, 2026",
    title: "Cultural Excursion",
    description: "A scheduled break from academic testing for delegates to explore Samarkand's legendary historic Silk Road landmarks.",
  },
  {
    date: "OCTOBER 14, 2026",
    title: "Experimental Examination",
    description: "The final competitive phase challenge focused on laboratory techniques, practical physics metrics, and data analysis.",
  },
  {
    date: "OCTOBER 15, 2026",
    title: "Moderation & Appeals",
    description: "Coordination assemblies between team leaders and the scientific committee to verify score matrices and finalize calculations.",
  },
  {
    date: "OCTOBER 16, 2026",
    title: "Closing Ceremony",
    description: "The official medal presentation, final podium announcements, certificates deployment, and the celebratory farewell assembly.",
  },
  {
    date: "OCTOBER 17, 2026",
    title: "Departure Day",
    description: "Coordination of regional transport networks, hotel checkout schedules, and final international group departures.",
  },
];

export function TimelineSection() {
  return (
    <section id="rounds" className="px-6 py-32 bg-background border-y border-border">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column: Sticky Title Stack */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
            <p className="font-mono-ui text-xs tracking-[0.25em] uppercase mb-4 text-accent">
              Chronology
            </p>
            <h2 className="font-heading font-semibold text-4xl md:text-5xl tracking-tight text-foreground mb-6">
              Olympiad Timeline
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm font-light">
              Key developmental checkpoints and structural operations mapping out the full event schedule for FIPHO 2026.
            </p>
          </div>

          {/* Right Column: Generously Spaced Asymmetric Cascade */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            {timelineEvents.map((event, index) => (
              <div 
                key={index} 
                className="group grid md:grid-cols-12 gap-4 md:gap-8 items-start relative pb-8 border-b border-border/40 last:border-0"
              >
                {/* Step & Date Tracker */}
                <div className="md:col-span-4 flex flex-row md:flex-col justify-between md:justify-start gap-2">
                  <span className="font-mono-ui text-xs text-accent tracking-widest block">
                    # 0{index + 1}
                  </span>
                  <span className="font-mono-ui text-xs text-foreground/80 font-medium tracking-wider block mt-0.5 uppercase whitespace-nowrap">
                    {event.date}
                  </span>
                </div>

                {/* Content Block */}
                <div className="md:col-span-8">
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2 tracking-tight group-hover:text-accent transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl font-light">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}