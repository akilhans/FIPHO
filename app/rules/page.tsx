import { Download, FileText, ShieldCheck } from "lucide-react";

const documents = [
  {
    title: "Competition Regulations 2025",
    category: "Rules",
    file: "/docs/rules.pdf",
    description: "Complete rulebook for FIPHO 2024",
  },
];

export default function RulesGuidelinesPage() {
  const primaryDoc = documents[0];

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
            Access official competition rules and guidelines for FIPHO.
          </p>
        </div>
      </section>

      {/* DOCUMENT SPOTLIGHT */}
      <section className="px-6 pb-12 bg-background">
        <div className="max-w-3xl mx-auto p-8 md:p-10 rounded-2xl border border-border bg-background-raised flex flex-col sm:flex-row items-start gap-6">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="h-7 w-7 text-accent" />
          </div>
          <div className="flex-1">
            <span className="font-mono-ui text-xs text-accent">
              {primaryDoc.category.toUpperCase()}
            </span>
            <h2 className="font-heading font-semibold text-2xl mt-1 mb-2">
              {primaryDoc.title}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {primaryDoc.description}
            </p>
            <a
              href={primaryDoc.file}
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </div>
        </div>
      </section>

      {/* PDF PREVIEW */}
      <section className="px-6 pb-24 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-4 w-4 text-accent" />
            <h3 className="font-heading font-semibold text-lg">Document Preview</h3>
          </div>
          <div className="rounded-2xl border border-border overflow-hidden">
            <iframe
              src={primaryDoc.file}
              className="w-full h-[600px]"
              title="Document Preview"
            />
          </div>
        </div>
      </section>
    </main>
  );
}