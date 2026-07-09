import { Metadata } from "next";
import { Download, FileText, CheckCircle2 } from "lucide-react";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Preparatory Problems | ${BRAND.fullName}`,
  description:
    "Download official FIPHO preparatory problems and solutions to prepare for the international physics olympiad.",
};

const documents = [
  {
    title: "Preparatory Problems",
    description:
      "Official practice problems covering all topics in the FIPHO syllabus.",
    href: "/docs/problems.pdf",
    type: "PDF",
    accent: "text-accent",
    iconBg: "bg-accent/10",
    border: "hover:border-accent/40",
  },
  {
    title: "Solutions",
    description:
      "Detailed solutions to the preparatory problems with full explanations.",
    href: "/solutions.pdf",
    type: "PDF",
    accent: "text-fipho-cyan",
    iconBg: "bg-fipho-cyan/10",
    border: "hover:border-fipho-cyan/40",
  },
];

export default function PreparatoryProblemsPage() {
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
            Preparation Materials
          </p>
          <h1 className="font-heading font-semibold text-4xl md:text-6xl leading-tight mb-5">
            Preparatory Problems &amp; Solutions
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Official practice materials to help participating teams prepare
            for FIPHO {BRAND.year}.
          </p>
        </div>
      </section>

      {/* DOCUMENT CARDS */}
      <section className="px-6 pb-24 bg-background">
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.title}
              className={`p-8 rounded-2xl border border-border bg-background-raised transition-colors flex flex-col items-center text-center ${doc.border}`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${doc.iconBg}`}>
                <FileText className={`h-7 w-7 ${doc.accent}`} />
              </div>

              <h2 className="font-heading font-semibold text-xl mb-2">
                {doc.title}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {doc.description}
              </p>

              <div className="flex items-center gap-1.5 text-xs font-mono-ui text-muted-foreground mb-6">
                <CheckCircle2 className={`h-3.5 w-3.5 ${doc.accent}`} />
                Official FIPHO document
              </div>

              <a
                href={doc.href}
                download
                className="mt-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
              >
                <Download className="h-4 w-4" />
                Download {doc.type}
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}