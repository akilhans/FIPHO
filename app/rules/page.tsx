import { FileText, ShieldAlert, Clock } from "lucide-react";

export default function RulesGuidelinesPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative pt-36 pb-16 px-6 text-center bg-background overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(224,181,85,0.08), transparent 70%)",
          }}
        />
        <div className="relative max-w-2xl mx-auto">
          <p className="font-mono-ui text-xs tracking-[0.3em] uppercase mb-5 text-accent">
            Info Center
          </p>
          <h1 className="font-heading font-semibold text-4xl md:text-6xl leading-tight mb-5">
            Rules &amp; Guidelines
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Access official competition rules and regulatory documentation for FIPHO.
          </p>
        </div>
      </section>

      {/* COMING SOON STATUS SPOTLIGHT */}
      <section className="px-6 pb-24 bg-background">
        <div className="max-w-3xl mx-auto p-8 md:p-10 rounded-2xl border border-dashed border-border bg-background-raised flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Clock className="h-7 w-7 text-accent animate-pulse" />
          </div>
          <div className="flex-1">
            <span className="font-mono-ui text-xs text-accent uppercase tracking-wider bg-accent/5 px-2.5 py-1 rounded border border-accent/20 inline-block mb-3">
              Under Review
            </span>
            <h2 className="font-heading font-semibold text-2xl mb-2">
              Competition Regulations 2026
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xl leading-relaxed">
              The official FIPHO 2026 rulebook, examination protocols, and syllabus breakdown are currently undergoing final approval by the Scientific Committee. The downloadable PDF and digital document preview will be published here soon.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border select-none">
              <ShieldAlert className="h-3.5 w-3.5" />
              Notifications will be sent to registered team leaders upon release
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}