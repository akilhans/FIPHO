import { Phone, Mail, MousePointerClick, MapPin } from "lucide-react";

const contact = {
  name: "Charos Abdusattorova",
  role: "Contact person",
  email: "info@olympcenter.uz",
  phone: "+998 77 550 33 66",
};

const office = {
  name: "Science Olympiad Center",
  city: "Tashkent",
  country: "Uzbekistan",
  address: "100099, Otchopar-1, Darvozakent Street, House 60, Yunusobod District",
};

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${office.name}, ${office.address}, ${office.city}, ${office.country}`)}`;

export default function ContactPage() {
  return (
    <main>
      {/* HERO — dot-grid texture + pulsing location ping */}
      <section className="relative pt-36 pb-24 px-6 text-center bg-background overflow-hidden">
        {/* dot-grid texture, faded toward edges */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-border) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 60% 60% at 50% 30%, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 60% at 50% 30%, black 30%, transparent 80%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(224,181,85,0.08), transparent 70%)",
          }}
        />

        {/* 🛠️ REMOVED THE MAP LINK WRAPPER — NOW JUST A STATIC DECORATIVE CLICK LOGO */}
        <div className="relative flex justify-center mb-2 select-none pointer-events-none">
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full">
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-24 h-24 rounded-full bg-accent/10 animate-ping [animation-duration:2.5s]" />
            </span>
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-16 h-16 rounded-full bg-accent/15" />
            </span>
            
            <span className="relative flex items-center justify-center w-12 h-12 rounded-full bg-background border border-accent/20 shadow-md">
              <MousePointerClick className="h-6 w-6 text-accent" />
            </span>
          </div>
        </div>

        <div className="relative max-w-xl mx-auto">
          <p className="font-mono-ui text-xs tracking-[0.3em] uppercase mb-5 text-accent">
            Get in Touch
          </p>
          <h1 className="font-heading font-semibold text-4xl md:text-6xl leading-tight mb-4">
            Contact Us
          </h1>
          <div className="w-16 h-px bg-accent mx-auto mb-6" />
          <p className="text-muted-foreground text-lg">
            Have questions about FIPHO? Our team is here to help you.
          </p>
        </div>
      </section>

      {/* THREE-COLUMN INFO — cream cards, real data */}
      <section className="px-6 pb-24 bg-background">
        <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-3">
          
          {/* Card 1: Visit Us (Kept the real map navigation here so users can still find you) */}
          <a 
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[#f7f2e7] p-8 text-center block border border-transparent hover:border-amber-200 transition-all duration-200 group"
          >
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-110">
              <MapPin className="h-5 w-5 text-amber-700" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-amber-950 mb-1 group-hover:text-amber-800 transition-colors">
              Visit Us
            </h3>
            <p className="text-xs font-bold uppercase tracking-wide text-amber-700 mb-2">
              {office.name}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {office.address}
            </p>
            <p className="text-sm text-slate-500 mt-1">
              {office.city}, {office.country}
            </p>
          </a>

          {/* Card 2: Call Us */}
          <div className="rounded-xl bg-[#f7f2e7] p-8 text-center border border-transparent">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-5">
              <Phone className="h-5 w-5 text-amber-700" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-amber-950 mb-3">
              Call Us
            </h3>
            <a
              href={`tel:${contact.phone}`}
              className="text-sm text-slate-600 hover:text-amber-800 transition-colors font-medium"
            >
              {contact.phone}
            </a>
          </div>

          {/* Card 3: Contact Us */}
          <div className="rounded-xl bg-[#f7f2e7] p-8 text-center border border-transparent">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-5">
              <Mail className="h-5 w-5 text-amber-700" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-amber-950 mb-3">
              Contact Us
            </h3>
            <a
              href={`mailto:${contact.email}`}
              className="text-sm text-slate-600 hover:text-amber-800 transition-colors font-medium"
            >
              {contact.email}
            </a>
            <p className="text-xs text-slate-500 mt-2">
              {contact.name} — {contact.role}
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}