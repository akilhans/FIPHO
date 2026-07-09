const disciplines = [
  {
    name: "Mechanics",
    topics: ["Kinematics & dynamics", "Energy & momentum", "Rotational motion", "Gravitation"],
  },
  {
    name: "Electromagnetism",
    topics: ["Electric fields & potential", "Magnetic forces", "Maxwell's equations", "Electromagnetic induction"],
  },
  {
    name: "Thermodynamics",
    topics: ["Laws of thermodynamics", "Heat transfer", "Thermodynamic cycles", "Statistical physics"],
  },
  {
    name: "Optics",
    topics: ["Geometric optics", "Wave optics", "Interference & diffraction", "Polarization"],
  },
  {
    name: "Modern physics",
    topics: ["Quantum mechanics", "Special relativity", "Nuclear physics", "Particle physics"],
  },
  {
    name: "Waves & oscillations",
    topics: ["Simple harmonic motion", "Wave propagation", "Resonance & standing waves", "Sound & acoustics"],
  },
];

export default function Disciplines() {
  return (
    <section className="px-6 py-28 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono-ui text-xs tracking-[0.25em] uppercase mb-4 text-accent">
            Examination scope
          </p>
          <h2 className="font-heading font-semibold text-3xl md:text-4xl mb-4">
            Physics disciplines
          </h2>
          <p className="max-w-xl mx-auto text-sm text-muted-foreground">
            FIPHO examinations span the full breadth of classical and modern
            physics, testing theoretical understanding and experimental
            mastery.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {disciplines.map((d) => (
            <div
              key={d.name}
              className="p-6 rounded-xl border border-border hover:border-accent/40 hover:-translate-y-0.5 transition-all"
            >
              <h3 className="font-heading font-semibold text-lg mb-3">
                {d.name}
              </h3>
              <ul className="text-sm space-y-1.5 text-muted-foreground">
                {d.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}