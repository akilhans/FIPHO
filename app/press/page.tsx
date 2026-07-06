import {
  Calendar,
  MapPin,
  Users,
  Building,
  Phone,
  Mail,
  Globe,
  Download,
  BookOpen,
} from "lucide-react";

const keyEvents = [
  {
    title: "Opening Ceremony",
    date: "May 29, 2025, at 10:00 AM",
    venue: "Central Asian University (CAU)",
  },
  {
    title: "Closing & Awards Ceremony",
    date: "June 3, 2025, at 4:00 PM",
    venue: "Central Asian University (CAU)",
  },
];

const venues = [
  {
    icon: Building,
    title: "Main Venue",
    name: "Central Asian University (CAU)",
    address: "Tashkent, Milliy Bog Street, 264",
  },
];

const accommodation = [
  { name: "The Tower Hotel Tashkent", address: "Tashkent, Kichik Beshyogoch Street, 40" },
  { name: "Al-Anvar Hotel", address: "Tashkent, Yusuf Khos Hojib Street, 65" },
];

export default function PressPage() {
  return (
    <main>
      {/* DATELINE HEADER */}
      <section className="relative pt-36 pb-14 px-6 bg-background overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(224,181,85,0.08), transparent 70%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="font-mono-ui text-xs tracking-[0.3em] uppercase mb-5 text-accent">
            Press Release
          </p>
          <h1 className="font-heading font-semibold text-3xl md:text-5xl leading-tight mb-6">
            Tashkent will host the Ahmad al-Fargʻoniy International Physics
            Olympiad
          </h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <Calendar className="h-4 w-4 text-accent" />
            <span className="font-mono-ui text-sm">May 28 – June 4, 2025</span>
          </div>
          <a
            href="/docs/press.docx"
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
          >
            <Download className="h-4 w-4" />
            Download Uzbek Version
          </a>
        </div>
      </section>

      {/* RUNNING TEXT — release body */}
      <section className="px-6 py-14 bg-background">
        <div className="max-w-2xl mx-auto space-y-5 text-muted-foreground leading-relaxed">
          <p>
            Ahmad al-Fargʻoniy International Physics Olympiad will be held in
            Samarkand from October 10th to 17th, 2026. This prestigious event
            brings together talented students from around the world who
            possess knowledge and skills in the main branches of physics.
          </p>
          <p>
            This year&apos;s Olympiad is expected to feature participants
            from more than ten countries, including Saudi Arabia, Turkey,
            Georgia, Vietnam, Russia, Belarus, Mongolia, Azerbaijan, India,
            Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan, and Uzbekistan.
          </p>
        </div>
      </section>

      {/* KEY EVENTS — thin-rule list, not cards */}
      <section className="px-6 py-14 bg-background-raised border-y border-border">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Calendar className="h-5 w-5 text-accent" />
            <h2 className="font-heading font-semibold text-2xl">Key Events</h2>
          </div>
          <div>
            {keyEvents.map((event, i) => (
              <div
                key={event.title}
                className={`flex items-start gap-4 py-5 border-t border-border ${
                  i === keyEvents.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                  <p className="text-xs text-muted-foreground/70 mt-0.5">{event.venue}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/70 mt-6">
            The events will be attended by officials from the Ministry of
            Preschool and School Education of the Republic of Uzbekistan,
            international guests, and diplomatic representatives from the
            participating countries.
          </p>
        </div>
      </section>

      {/* REPORT BOOK */}
      <section className="px-6 py-14 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-accent" />
              <h2 className="font-heading font-semibold text-2xl">Report Book</h2>
            </div>
            <div className="flex gap-3">
              <a
                href="/docs/report.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm border border-border hover:border-accent/40 transition-colors"
              >
                <Globe className="h-4 w-4" />
                Open in new tab
              </a>
              <a
                href="/docs/report.pdf"
                download
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            </div>
          </div>
          <div className="rounded-xl border border-border overflow-hidden">
            <iframe
              src="/docs/report.pdf#view=FitH"
              title="FIPHO Report Book"
              className="w-full h-[80vh]"
              loading="lazy"
            />
            <div className="p-4 text-center text-sm text-muted-foreground border-t border-border">
              If the PDF doesn&apos;t display,{" "}
              <a href="/docs/report.pdf" target="_blank" rel="noopener noreferrer" className="text-accent underline">
                open it in a new tab
              </a>.
            </div>
          </div>
        </div>
      </section>

      {/* VENUES */}
      <section className="px-6 py-14 bg-background-raised border-y border-border">
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-10">
          {venues.map((venue) => (
            <div key={venue.title}>
              <div className="flex items-center gap-2 mb-4">
                <venue.icon className="h-5 w-5 text-accent" />
                <h3 className="font-heading font-semibold text-lg">{venue.title}</h3>
              </div>
              <p className="font-medium text-sm mb-1">{venue.name}</p>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{venue.address}</span>
              </div>
            </div>
          ))}

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-accent" />
              <h3 className="font-heading font-semibold text-lg">Accommodation</h3>
            </div>
            <div className="space-y-4">
              {accommodation.map((hotel) => (
                <div key={hotel.name}>
                  <p className="font-medium text-sm mb-1">{hotel.name}</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{hotel.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ORGANIZING COMMITTEE CONTACT */}
      <section className="px-6 py-14 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-semibold text-2xl mb-2">Organizing Committee</h2>
          <p className="text-sm text-muted-foreground mb-8">Science Olympiad Center</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Address</p>
                  <p className="text-sm text-muted-foreground">
                    100099, Otchopar-1, Darvozakent Street, House 60
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Contact</p>
                  <p className="text-sm text-muted-foreground">+998712070524</p>
                  <p className="text-sm text-muted-foreground">Telegram/WhatsApp: +998775503366</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Website</p>
                  <a href="https://fipho.uz" className="text-sm text-accent hover:underline">
                    https://fipho.uz
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Email</p>
                  <a href="mailto:info@fipho.uz" className="text-sm text-accent hover:underline">
                    info@fipho.uz
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <section className="px-6 py-16 text-center bg-background-raised border-t border-border">
        <p className="text-muted-foreground max-w-lg mx-auto">
          For media inquiries and additional information, please contact the
          Science Olympiad Center.
        </p>
      </section>
    </main>
  );
}