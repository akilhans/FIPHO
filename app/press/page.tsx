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
  Clock,
} from "lucide-react";

const keyEvents = [
  {
    title: "Opening Ceremony",
    date: "October 10, 2026",
    venue: "Samarkand, Uzbekistan",
  },
  {
    title: "Closing & Awards Ceremony",
    date: "October 17, 2026",
    venue: "Samarkand, Uzbekistan",
  },
];

const venues = [
  {
    icon: Building,
    title: "Main Venue",
    name: "Samarkand Congress Center",
    address: "Samarkand, Uzbekistan",
  },
];

const accommodation = [
  { name: "Official Olympiad Village Hotel", address: "Samarkand, Uzbekistan" },
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
            Samarkand will host the Al-Ferghani International Physics
            Olympiad
          </h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <Calendar className="h-4 w-4 text-accent" />
            <span className="font-mono-ui text-sm">October 10 – October 17, 2026</span>
          </div>
     
        </div>
      </section>

      {/* RUNNING TEXT — release body */}
      <section className="px-6 py-14 bg-background">
        <div className="max-w-2xl mx-auto space-y-5 text-muted-foreground leading-relaxed">
          <p>
           Al-Ferghani International Physics Olympiad will be held in
            Samarkand from October 10th to 17th, 2026. This prestigious event
            brings together talented students from around the world who
            possess knowledge and skills in the main branches of physics.
          </p>
         
        </div>
      </section>

      {/* KEY EVENTS */}
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

     
      <section className="px-6 py-14 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-5 w-5 text-accent" />
            <h2 className="font-heading font-semibold text-2xl">Report Book</h2>
          </div>
          
          <div className="rounded-xl border border-border bg-background-raised/40 backdrop-blur-sm p-12 text-center flex flex-col items-center justify-center border-dashed min-h-[40vh]">
            <Clock className="h-10 w-10 text-accent/70 mb-4 animate-pulse" />
            <h3 className="font-heading font-medium text-xl text-foreground mb-2">
              Official Report Book Coming Soon
            </h3>
            
          </div>
        </div>
      </section>

  
<section className="px-6 py-14 bg-background-raised border-y border-border">
  <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-10">
    
    {/* VENUES */}
    <div>
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-5 w-5 text-accent" />
        <h3 className="font-heading font-semibold text-lg">Venue</h3>
      </div>
      <p className="text-sm text-muted-foreground font-light">Coming Soon</p>
    </div>

    {/* ACCOMMODATION */}
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-5 w-5 text-accent" />
        <h3 className="font-heading font-semibold text-lg">Accommodation</h3>
      </div>
      <p className="text-sm text-muted-foreground font-light">Coming Soon</p>
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
                  <p className="text-sm text-muted-foreground">+998 99 199 49 00</p>
                  <p className="text-sm text-muted-foreground">Telegram/WhatsApp: +998 99 199 49 00</p>
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