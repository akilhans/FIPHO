import { Download, FileText, FlaskConical, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const problems = [
  {
    title: "Practical Round Problems",
    language: "Uzbek",
    file: "/problems/Amaliy bosqich.pdf",
  },
  {
    title: "Experimental Problems",
    language: "English",
    file: "/problems/EXPRERIMENTAL PROBLEMS.pdf",
  },
  {
    title: "Theoretical Problems",
    language: "Uzbek",
    file: "/problems/NAZARIY MASALALAR.pdf",
  },
  {
    title: "Theory Problems",
    language: "English",
    file: "/problems/THEORY PROBLEMS.pdf",
  },
  {
    title: "Theory Problems",
    language: "Russian",
    file: "/problems/ТЕОРИЯ-ЗАДАЧИ.pdf",
  },
  {
    title: "Experimental Problems",
    language: "Russian",
    file: "/problems/Эксперимент.pdf",
  },
];

const solutions = [
  {
    title: "Theory Solutions",
    language: "Russian",
    file: "/solutions/Решения задач theory.pdf",
  },
  {
    title: "Experimental Solutions",
    language: "Russian",
    file: "/solutions/Эксперимент решение.pdf",
  },
];

type DocumentCardProps = {
  title: string;
  language: string;
  file: string;
  icon: LucideIcon;
};

function DocumentCard({ title, language, file, icon: Icon }: DocumentCardProps) {
  return (
    <div className="group relative flex items-center justify-between gap-4 p-5 rounded-xl border border-border bg-background hover:border-accent/50 hover:shadow-md hover:shadow-accent/5 transition-all duration-300">
      <div className="flex items-center gap-4 min-w-0">
        <div className="h-11 w-11 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/15 transition-colors">
          <Icon className="h-5 w-5 text-accent" />
        </div>
        <div className="min-w-0">
          <h3 className="font-medium text-sm mb-1 truncate">{title}</h3>
          <span className="inline-block text-[11px] font-mono-ui uppercase tracking-wider text-muted-foreground/70 px-2 py-0.5 rounded-full border border-border">
            {language}
          </span>
        </div>
      </div>
      <a
        href={file}
        download
        aria-label={`Download ${title} (${language})`}
        className="flex-shrink-0 h-9 w-9 flex items-center justify-center rounded-full border border-accent/40 text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <Download className="h-4 w-4" />
      </a>
    </div>
  );
}

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
            Official problem sets and solutions, available in Uzbek, Russian,
            and English.
          </p>
        </div>
      </section>

      {/* DOCUMENT LIST */}
      <section className="px-6 pb-24 bg-background space-y-8">
        {/* PROBLEMS */}
        <div className="max-w-4xl mx-auto p-8 md:p-10 rounded-2xl border border-border bg-background-raised">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-9 w-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <FlaskConical className="h-4 w-4 text-accent" />
            </div>
            <h2 className="font-heading font-semibold text-2xl">Problems</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {problems.map((doc) => (
              <DocumentCard key={doc.file} {...doc} icon={FileText} />
            ))}
          </div>
        </div>

        {/* SOLUTIONS */}
        <div className="max-w-4xl mx-auto p-8 md:p-10 rounded-2xl border border-border bg-background-raised">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-9 w-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-accent" />
            </div>
            <h2 className="font-heading font-semibold text-2xl">Solutions</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {solutions.map((doc) => (
              <DocumentCard key={doc.file} {...doc} icon={FileText} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}