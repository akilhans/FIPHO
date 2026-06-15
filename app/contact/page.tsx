import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
} from "lucide-react";

const contacts = [
  {
    name: "Charos Abdusattorova",
    role: "Contact person",
    email: "info@olympcenter.uz",
    phone: "+998 77 550 33 66",
  },
  

];

const socialLinks = [
  {
    name: "Facebook",
    icon: <Facebook className="h-5 w-5" />,
    href: "https://facebook.com/fipho",
    color: "hover:text-blue-500",
  },
  {
    name: "Twitter",
    icon: <Twitter className="h-5 w-5" />,
    href: "https://twitter.com/fipho",
    color: "hover:text-blue-400",
  },
  {
    name: "Instagram",
    icon: <Instagram className="h-5 w-5" />,
    href: "https://www.instagram.com/fan_olimpiadalari_markazi?igsh=cDFqODRsNGx3dnk=",
    color: "hover:text-pink-500",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="h-5 w-5" />,
    href: "https://linkedin.com/company/fipho",
    color: "hover:text-blue-600",
  },
  {
    name: "YouTube",
    icon: <Youtube className="h-5 w-5" />,
    href: "http://bit.ly/olimpdep",
    color: "hover:text-red-500",
  },
];

const offices = [
  {
    city: "Tashkent",
    country: "Uzbekistan",
    address: "100099, Otchopar-1, Darvozakent Street, House 60, Yunusobod District",
    phone: "+998 77 550 33 66",
    timezone: "GMT+5",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM",
  },
 
];

export default function ContactPage() {
  return (
    <section className="relative w-full bg-gradient-to-b from-fipho-navy to-fipho-navy-light">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 -translate-x-1/2 translate-y-1/2 h-96 w-96 rounded-full bg-fipho-blue/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-fipho-blue/20 bg-fipho-blue/10 text-fipho-gold hover:bg-fipho-blue/20"
          >
            Get in Touch
          </Badge>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-6 text-lg leading-8 text-fipho-slate/70">
            Have questions about FIPHO? Our team is here to help you.
          </p>
        </div>

        <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <Card className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-fipho-navy">
                Contact Person
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {contacts.map((contact) => (
                <div key={contact.email} className="space-y-2">
                  <h3 className="text-lg font-medium text-fipho-navy">
                    {contact.name}
                  </h3>
                  <p className="text-sm text-fipho-slate/70">{contact.role}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-fipho-slate/70">
                      <Mail className="h-4 w-4 text-fipho-gold" />
                      <a
                        href={`mailto:${contact.email}`}
                        className="hover:text-fipho-gold"
                      >
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-fipho-slate/70">
                      <Phone className="h-4 w-4 text-fipho-gold" />
                      <a
                        href={`tel:${contact.phone}`}
                        className="hover:text-fipho-gold"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Office Locations */}
          <Card className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-fipho-navy">Our Office</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {offices.map((office) => (
                <div key={office.city} className="space-y-3">
                  <div className="flex items-center gap-2 text-fipho-navy">
                    <Globe className="h-5 w-5 text-fipho-gold" />
                    <h3 className="font-medium">
                      {office.city}, {office.country}
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm text-fipho-slate/70">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-fipho-gold mt-1" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-fipho-gold" />
                      <a
                        href={`tel:${office.phone}`}
                        className="hover:text-fipho-gold"
                      >
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-fipho-gold" />
                      <span>
                        {office.timezone} • {office.hours}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Social Media Links */}
        <div className="mx-auto max-w-5xl mt-8">
          <Card className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-fipho-navy">
                Connect With Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 rounded-full bg-fipho-navy/40 text-fipho-slate/70 transition-all hover:scale-110 ${social.color}`}
                  >
                    {social.icon}
                    <span className="sr-only">{social.name}</span>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
