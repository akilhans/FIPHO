const stats = [
  { value: "30+", label: "Participating countries" },
  { value: "200+", label: "Competing students" },
  { value: "25+", label: "Scientific committee members" },
  { value: "120+", label: "Medals awarded" },
];

export default function StatsGlance() {
  return (
    <section className="px-6 py-24 border-y border-border bg-background-raised">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-mono-ui text-xs tracking-[0.25em] uppercase mb-4 text-accent">
          By the numbers
        </p>
        <h2 className="font-heading font-semibold text-3xl md:text-4xl mb-16">
          FIPHO at a glance
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-heading font-semibold text-5xl mb-2 text-accent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}