const pillars = [
  {
    label: "MISSION",
    body: "To identify, inspire, and mentor exceptional young physicists from around the world through rigorous international competition and scientific collaboration.",
  },
  {
    label: "VISION",
    body: "To become a leading olympiad that shapes the intellectual legacy of Ahmad al-Fergani for a new generation.",
  },
  {
    label: "INTERNATIONAL COLLABORATION",
    body: "FIPHO brings together students, educators, and researchers from thirty nations to exchange knowledge and foster cross-cultural scientific dialogue.",
  },
  {
    label: "WHY PARTICIPATE",
    body: "Earn recognition on a global stage, challenge your problem-solving ability, and connect with peers who share your passion for physics.",
  },
  {
    label: "LEGACY OF AL-FERGANI",
    body: "Named in honor of the renowned 9th-century polymath, echoing his enduring contributions to astronomy, mathematics, and natural science.",
  },
  {
    label: "OBJECTIVES",
    body: "Promote physics education, encourage scientific research, and strengthen international ties in the global scientific community.",
  },
];

export default function About() {
  return (
    <section id="about" className="px-6 py-28 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono-ui text-xs tracking-[0.25em] uppercase mb-4 text-accent">
            Founding purpose
          </p>
          <h2 className="font-heading font-semibold text-4xl md:text-5xl">
            A prestigious international physics olympiad
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-muted-foreground">
            FIPHO — the Al-Fergani International Physics Olympiad — is a
            world-class competition for talented secondary school students
            passionate about physics, discovery, and scientific excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.label}
              className={`py-7 border-t border-border ${
                i >= pillars.length - 2 ? "md:border-b" : ""
              }`}
            >
              <div className="font-mono-ui text-xs mb-2 text-secondary">
                {pillar.label}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}