export default function Rounds() {
  return (
    <section id="rounds" className="px-6 py-28 border-t border-border bg-background-raised">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono-ui text-xs tracking-[0.25em] uppercase mb-4 text-accent">
            Competition format
          </p>
          <h2 className="font-heading font-semibold text-3xl md:text-4xl mb-4">
            Olympiad rounds
          </h2>
          <p className="max-w-xl mx-auto text-sm text-muted-foreground">
            Two rounds designed to test theoretical mastery and experimental
            skill at the highest international standard.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-6">
          <div className="p-7 rounded-xl border border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono-ui text-xs text-accent">ROUND 01</span>
              <span className="font-mono-ui text-xs text-muted-foreground">5 HOURS</span>
            </div>
            <h3 className="font-heading font-semibold text-2xl mb-3">
              Experimental round
            </h3>
            <p className="text-sm mb-5 text-muted-foreground">
              Participants design and conduct laboratory experiments, collect
              and analyze data, and draw quantifiable, well-reasoned
              scientific conclusions.
            </p>
            <div className="flex justify-between text-xs font-mono-ui pt-4 border-t border-border text-muted-foreground">
              <span>MAX SCORE</span>
              <span className="text-foreground">40 POINTS</span>
            </div>
          </div>

          <div className="p-7 rounded-xl border border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono-ui text-xs text-accent">ROUND 02</span>
              <span className="font-mono-ui text-xs text-muted-foreground">5 HOURS</span>
            </div>
            <h3 className="font-heading font-semibold text-2xl mb-3">
              Theoretical round
            </h3>
            <p className="text-sm mb-5 text-muted-foreground">
              Students solve challenging multi-part physics problems spanning
              all major disciplines — mechanics, electromagnetism,
              thermodynamics, optics, and modern physics.
            </p>
            <div className="flex justify-between text-xs font-mono-ui pt-4 border-t border-border text-muted-foreground">
              <span>MAX SCORE</span>
              <span className="text-foreground">60 POINTS</span>
            </div>
          </div>
        </div>

        <div className="p-7 rounded-xl border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-lg">
              Score distribution — 100 points total
            </h3>
          </div>
          <div className="flex h-2 rounded-full overflow-hidden mb-3 bg-border">
            {/* Changed from bg-fipho-bronze to a clean slate-gray */}
            <div className="bg-slate-500 opacity-80" style={{ width: "40%" }} />
            <div className="bg-fipho-gold" style={{ width: "60%" }} />
          </div>
          <div className="flex justify-between font-mono-ui text-xs text-muted-foreground">
            <span>Experimental Round · 40 pts</span>
            <span>Theoretical Round · 60 pts</span>
          </div>
        </div>
      </div>
    </section>
  );
}