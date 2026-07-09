import { Clock, Users, Bell, Utensils } from "lucide-react";
import Link from "next/link";

const notes = [
  { icon: Clock, text: "All times are in Uzbekistan Time (UZT, UTC+5)." },
  { icon: Users, text: "Transportation will be provided between official venues and accommodation." },
  { icon: Bell, text: "Students must wear their identification badges at all times." },
  { icon: Clock, text: "Schedule may be subject to minor changes. Team leaders will be notified of any updates." },
  { icon: Utensils, text: "For special dietary requirements, please contact the organizing committee in advance." },
];

export default function SchedulePage() {
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
            FIPHO 2026
          </p>
          <h1 className="font-heading font-semibold text-4xl md:text-6xl leading-tight mb-5">
            Programme Schedule
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-8">
            Detailed schedule of events and activities for the FIPHO
            competition.
          </p>
         <button
  disabled
  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-muted text-muted-foreground cursor-not-allowed opacity-70"
>
  <Clock className="h-4 w-4" />
  Full Schedule Coming Soon
</button>
        </div>
      </section>

    
      {/* IMPORTANT NOTES */}
      <section className="px-6 py-16 bg-background">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading font-semibold text-2xl mb-8 text-center">
            Important Notes
          </h2>
          <div className="space-y-4">
            {notes.map((note, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <note.icon className="h-4 w-4 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground pt-1.5">{note.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center bg-background-raised border-t border-border">
        <p className="mb-6 text-lg text-muted-foreground">
          Have questions about the schedule or need assistance?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-medium text-sm bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
          >
            Contact Organizing Committee
          </Link>
          <Link
            href="/organizing-committee"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-medium text-sm border border-border hover:bg-muted transition-colors"
          >
            Meet the Team
          </Link>
        </div>
      </section>
    </main>
  );
}
