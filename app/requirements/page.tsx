import {
  Users,
  GraduationCap,
  ClipboardCheck,
  FileText,
  Globe,
  Shield,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { id: "eligibility", icon: Users, title: "Eligibility", description: "Age and academic requirements" },
  { id: "registration", icon: ClipboardCheck, title: "Registration", description: "Process and deadlines" },
  { id: "rules", icon: Shield, title: "Rules", description: "Competition guidelines" },
  { id: "documents", icon: FileText, title: "Documents", description: "Required paperwork" },
];

const academicRequirements = [
  "Must be enrolled in secondary education during the 2025-2026 academic year",
  "Not enrolled in any university-level courses",
  "Not holding a secondary school graduation certificate as of January 1, 2026",
  "No more than two participations in previous FIPHO competitions",
];

const countryRequirements = [
  "Each country may send multiple teams",
  "Teams must be officially endorsed by their national physics organization or education ministry",
  "Maximum of 5 + 2 students per team",
  "Students must be citizens or legal permanent residents of the country they represent",
];

const teamCompositionRules = [
  "5 student participants",
  "2 head mentors (team leaders)",
  "Students must compete in their respective age divisions",
];

const academicIntegrity = [
  "No external resources during examinations",
  "Independent work on all tasks",
  "No communication during competition rounds",
  "Strict adherence to examination rules",
];

const behavioralStandards = [
  "Respect for all participants and staff",
  "Punctual attendance at all events",
  "Proper laboratory safety compliance",
  "Cultural sensitivity and inclusivity",
];

const documents = [
  {
    title: "For Students",
    items: [
      "Valid passport copy",
      "Recent photograph",
      "School enrollment verification",
      "Parent/guardian consent form",
      "Medical information form",
      "Travel insurance confirmation",
    ],
  },
  {
    title: "For Team Leaders",
    items: [
      "Valid passport copy",
      "Recent photograph",
      "Professional credentials",
      "Institution endorsement letter",
      "Emergency contact information",
      "Code of conduct agreement",
    ],
  },
];

export default function RequirementsPage() {
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
            Competition Guidelines
          </p>
          <h1 className="font-heading font-semibold text-4xl md:text-6xl leading-tight mb-5">
            Participation Requirements
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Essential information and guidelines for participating in FIPHO 2026
          </p>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="px-6 pb-8 bg-background">
        <div className="max-w-5xl mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map(({ id, icon: Icon, title, description }) => (
            <a
              key={id}
              href={`#${id}`}
              className="p-6 rounded-xl border border-border hover:border-accent/40 hover:-translate-y-0.5 transition-all text-center block"
            >
              <Icon className="h-6 w-6 text-accent mx-auto mb-3" />
              <h3 className="font-medium mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ELIGIBILITY REQUIREMENTS */}
      <section id="eligibility" className="px-6 py-16 scroll-mt-16 bg-background">
        <div className="max-w-4xl mx-auto p-8 md:p-10 rounded-2xl border border-border bg-background-raised">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="h-6 w-6 text-accent" />
            <h2 className="font-heading font-semibold text-2xl">
              Eligibility Requirements
            </h2>
          </div>

          <div className="mb-8">
            <h3 className="font-medium mb-4">Academic Requirements</h3>
            <ul className="space-y-3">
              {academicRequirements.map((req) => (
                <li key={req} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Country Representation</h3>
            <ul className="space-y-3">
              {countryRequirements.map((req) => (
                <li key={req} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* COMPETITION RULES */}
      <section id="rules" className="px-6 py-16 scroll-mt-16 bg-background-raised border-y border-border">
        <div className="max-w-4xl mx-auto p-8 md:p-10 rounded-2xl border border-border bg-background">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-6 w-6 text-accent" />
            <h2 className="font-heading font-semibold text-2xl">
              Competition Rules
            </h2>
          </div>

          <div className="mb-8">
            <h3 className="font-medium mb-4">Team Composition</h3>
            <ul className="space-y-3">
              {teamCompositionRules.map((rule) => (
                <li key={rule} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="font-medium mb-4">Language Requirements</h3>
            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">
                The official languages of the Olympiad are Uzbek and English.
                Participants may complete the exam in their native language.
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-5">Code of Conduct</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium mb-3 text-accent">
                  Academic Integrity
                </h4>
                <ul className="space-y-2.5">
                  {academicIntegrity.map((rule) => (
                    <li key={rule} className="flex items-start gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3 text-accent">
                  Behavioral Standards
                </h4>
                <ul className="space-y-2.5">
                  {behavioralStandards.map((rule) => (
                    <li key={rule} className="flex items-start gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REQUIRED DOCUMENTS */}
      <section id="documents" className="px-6 py-16 scroll-mt-16 bg-background">
        <div className="max-w-4xl mx-auto p-8 md:p-10 rounded-2xl border border-border bg-background-raised">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="h-6 w-6 text-accent" />
            <h2 className="font-heading font-semibold text-2xl">
              Required Documents
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {documents.map((section) => (
              <div key={section.title}>
                <h3 className="font-medium mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <FileText className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center bg-background">
        <p className="mb-6 text-lg text-muted-foreground">
          Ready to participate in FIPHO 2026?
        </p>
        <Link
          href="/contact"
          className="inline-block px-7 py-3.5 rounded-full font-medium text-sm border border-accent/50 text-accent hover:bg-accent/10 transition-colors"
        >
          Contact Organizing Committee
        </Link>
      </section>
    </main>
  );
}