import { Download, FileText } from "lucide-react";

const documents = [
  {
    title: "FIPHO 2024 Final Results",
    category: "Results",
    file: "/docs/results.pdf",
    date: "July 15, 2024",
  },
  {
    title: "FIPHO 2025 Final Results",
    category: "Results",
    file: "/docs/results1.pdf",
    date: "June 4, 2025",
  },
  {
    title: "FIPHO 2025 Theory Solutions (Official)",
    category: "Problems",
    file: "/docs/theory.pdf",
    date: "FIPHO 2025",
    size: "2.1 MB",
  },
  {
    title: "FIPHO 2025 Practice Problems (Official)",
    category: "Problems",
    file: "/problems/Al-Farghani practice_Official.pdf",
    date: "FIPHO 2025",
    size: "621.0 KB",
  },
  {
    title: "FIPHO 2025 Practice Problems (Uzbek)",
    category: "Problems",
    file: "/problems/Al-Farghani_practice uzbek.pdf",
    date: "FIPHO 2025",
    size: "621.4 KB",
  },
  {
    title: "FIPHO 2025 Theory Problems (Uzbek)",
    category: "Problems",
    file: "/problems/Al-Farghani theory uzbek.pdf",
    date: "FIPHO 2025",
    size: "1.1 MB",
  },
  {
    title: "FIPHO 2025 Theory Final",
    category: "Problems",
    file: "/problems/Al-Farghani theory_Final.docx",
    date: "FIPHO 2025",
    size: "1.3 MB",
  },
];

export default function ResultsReportsPage() {
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
            Results & Problems
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Access official results and problems from FIPHO.
          </p>
        </div>
      </section>

      {/* DOCUMENT LIST */}
      <section className="px-6 pb-24 bg-background">
        <div className="max-w-4xl mx-auto p-8 md:p-10 rounded-2xl border border-border bg-background-raised">
          <h2 className="font-heading font-semibold text-2xl mb-8">
            Available Documents
          </h2>

          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.file}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-border hover:border-accent/40 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm mb-1">{doc.title}</h3>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span>{doc.category}</span>
                      <span>•</span>
                      <span>{doc.date}</span>
                      {doc.size && (
                        <>
                          <span>•</span>
                          <span>{doc.size}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <a
                  href={doc.file}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-accent/40 text-accent hover:bg-accent/10 transition-colors flex-shrink-0 self-start sm:self-center"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* PDF Preview
        <div className="max-w-4xl mx-auto mt-8 p-8 rounded-2xl border border-border bg-background-raised">
          <h2 className="font-heading font-semibold text-xl mb-6">Document Preview</h2>
          <iframe
            src="/docs/results.pdf"
            className="w-full h-[600px] rounded-lg"
            title="Document Preview"
          />
        </div>
        */}
      </section>
    </main>
  );
}