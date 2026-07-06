const timelineEvents = [
  {
    date: "MAY 15, 2026",
    title: "Institutional Registration Opens",
    description: "National organizing bodies submit intent to compete and delegate allocations.",
  },
  {
    date: "JULY 30, 2026",
    title: "Student Roster Finalization",
    description: "Deadline for submitting competing student metrics and academic profiles.",
  },
  {
    date: "SEPTEMBER 10, 2026",
    title: "Theoretical Framework Release",
    description: "Syllabus boundaries and preparatory problem matrices are issued to teams.",
  },
  {
    date: "OCTOBER 22, 2026",
    title: "Opening Ceremony · Samarkand",
    description: "Conformation assemblies and the initiation of the experimental exam phase.",
  },
];

export function TimelineSection() {
  return (
    <section id="rounds" className="px-6 py-32 bg-fipho-navy border-y border-border">
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
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Key developmental checkpoints and structural operations mapping towards the 2026 grand finals.
            </p>
          </div>

          {/* Right Column: Generously Spaced Asymmetric Cascade */}
          <div className="lg:col-span-8 space-y-16 md:space-y-24">
            {timelineEvents.map((event, index) => (
              <div 
                key={index} 
                className="group grid md:grid-cols-12 gap-4 md:gap-8 items-start relative pb-8 border-b border-border/40 last:border-0"
              >
                {/* Step & Date Tracker */}
                <div className="md:col-span-4 flex flex-row md:flex-col justify-between md:justify-start gap-2">
                  <span className="font-mono-ui text-xs text-accent tracking-widest block">
                    // 0{index + 1}
                  </span>
                  <span className="font-mono-ui text-xs text-secondary tracking-wider block mt-0.5">
                    {event.date}
                  </span>
                </div>

                {/* Content Block */}
                <div className="md:col-span-8">
                  <h3 className="font-heading font-semibold text-xl md:text-2xl text-foreground mb-3 tracking-tight group-hover:text-accent transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
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