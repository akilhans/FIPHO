import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, Building, Phone, Mail, Globe, Download, BookOpen } from 'lucide-react';

export default function PressPage() {
  return (
    <section className="relative w-full bg-gradient-to-b from-fipho-navy to-fipho-navy-light">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 -translate-x-1/2 translate-y-1/2 h-96 w-96 rounded-full bg-fipho-blue/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-fipho-blue/20 bg-fipho-blue/10 text-fipho-gold hover:bg-fipho-blue/20"
          >
            Press Release
          </Badge>
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            Tashkent will host the Ahmad al-Fargʻoniy International Physics Olympiad
          </h1>
          <div className="flex items-center justify-center gap-2 text-fipho-slate/70 text-lg mb-6">
            <Calendar className="w-5 h-5 text-fipho-gold" />
            <span>May 28 - June 4, 2025</span>
          </div>
          <a
            href="/docs/press.docx"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-fipho-blue hover:bg-fipho-blue/90 text-white rounded-lg transition-colors font-medium"
          >
            <Download className="w-4 h-4" />
            Download Uzbek Version
          </a>
        </div>

        {/* Introduction */}
        <div className="mx-auto max-w-5xl mb-8">
          <Card className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur">
            <CardContent className="p-8">
              <p className="text-lg text-fipho-slate/70 leading-relaxed mb-4">
                Ahmad al-Fargʻoniy International Physics Olympiad will be held in Tashkent from May 28 to June 4, 2025. 
                This prestigious event brings together talented students from around the world who possess knowledge and 
                skills in the main branches of physics.
              </p>
              <p className="text-lg text-fipho-slate/70 leading-relaxed">
                This year`s Olympiad is expected to feature participants from more than ten countries, including Saudi Arabia, 
                Turkey, Georgia, Vietnam, Russia, Belarus, Mongolia, Azerbaijan, India, Kazakhstan, Kyrgyzstan, Tajikistan, 
                Turkmenistan, and Uzbekistan.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Events */}
        <div className="mx-auto max-w-5xl mb-8">
          <Card className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-fipho-navy flex items-center gap-3">
                <Calendar className="w-6 h-6 text-fipho-gold" />
                Key Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-fipho-blue/10 rounded-lg border border-fipho-blue/20">
                <div className="w-2 h-2 bg-fipho-gold rounded-full mt-3"></div>
                <div>
                  <h3 className="font-semibold text-fipho-navy">Opening Ceremony</h3>
                  <p className="text-fipho-slate/70">May 29, 2025, at 10:00 AM</p>
                  <p className="text-sm text-fipho-navy/60 mt-1">Central Asian University (CAU)</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-3"></div>
                <div>
                  <h3 className="font-semibold text-fipho-navy">Closing & Awards Ceremony</h3>
                  <p className="text-fipho-slate/70">June 3, 2025, at 4:00 PM</p>
                  <p className="text-sm text-fipho-navy/60 mt-1">Central Asian University (CAU)</p>
                </div>
              </div>
              <p className="text-fipho-navy/60 mt-6 text-sm">
                The events will be attended by officials from the Ministry of Preschool and School Education of the 
                Republic of Uzbekistan, international guests, and diplomatic representatives from the participating countries.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Report Book (PDF) */}
        <div className="mx-auto max-w-5xl mb-8">
          <Card className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur">
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-fipho-navy flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-fipho-gold" />
                Report Book
              </CardTitle>
              <div className="flex gap-3">
                <a
                  href="/docs/report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-fipho-blue text-white hover:bg-fipho-blue/90 transition"
                >
                  <Globe className="w-4 h-4" />
                  Open in new tab
                </a>
                <a
                  href="/docs/report.pdf"
                  download
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-fipho-blue text-white hover:bg-fipho-blue/90 transition"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <iframe
                src="/docs/report.pdf#view=FitH"
                title="FIPHO Report Book"
                className="w-full h-[80vh] rounded-b-lg border-t border-fipho-blue/20"
                loading="lazy"
              />
              {/* Fallback text for devices that block inline PDF */}
              <div className="p-4 text-center text-fipho-slate/70 text-sm">
                If the PDF doesn’t display,{" "}
                <a href="/docs/report.pdf" target="_blank" rel="noopener noreferrer" className="text-fipho-gold underline hover:text-fipho-gold">
                  open it in a new tab
                </a>.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Venues */}
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-8 mb-8">
          {/* Main Venue */}
          <Card className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-fipho-navy flex items-center gap-3">
                <Building className="w-5 h-5 text-fipho-gold" />
                Main Venue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <h3 className="font-semibold text-fipho-navy mb-2">Central Asian University (CAU)</h3>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-fipho-gold mt-1 flex-shrink-0" />
                  <span className="text-fipho-slate/70">Tashkent, Milliy Bog Street, 264</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accommodation */}
          <Card className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-fipho-navy flex items-center gap-3">
                <Users className="w-5 h-5 text-fipho-gold" />
                Accommodation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-fipho-navy">The Tower Hotel Tashkent</h3>
                <div className="flex items-start gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-fipho-gold mt-1 flex-shrink-0" />
                  <span className="text-fipho-slate/70">Tashkent, Kichik Beshyogoch Street, 40</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-fipho-navy">Al-Anvar Hotel</h3>
                <div className="flex items-start gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-fipho-gold mt-1 flex-shrink-0" />
                  <span className="text-fipho-slate/70">Tashkent, Yusuf Khos Hojib Street, 65</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Organizing Committee */}
        <div className="mx-auto max-w-5xl">
          <Card className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-fipho-navy">Organizing Committee</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold text-fipho-navy mb-6">Science Olympiad Center</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-fipho-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-fipho-navy">Address</p>
                      <p className="text-fipho-slate/70">100099, Otchopar-1, Darvozakent Street, House 60</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-fipho-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-fipho-navy">Contact</p>
                      <p className="text-fipho-slate/70">+998712070524</p>
                      <p className="text-fipho-slate/70">Telegram/WhatsApp: +998775503366</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-fipho-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-fipho-navy">Website</p>
                      <a href="https://fipho.uz" className="text-fipho-gold hover:text-fipho-gold transition-colors">
                        https://fipho.uz
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-fipho-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-fipho-navy">Email</p>
                      <a href="mailto:info@fipho.uz" className="text-fipho-gold hover:text-fipho-gold transition-colors">
                        info@fipho.uz
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <div className="mx-auto max-w-5xl text-center mt-12">
          <Card className="border-fipho-blue/20 bg-fipho-blue/10 backdrop-blur">
            <CardContent className="p-6">
              <p className="text-fipho-slate/70">
                For media inquiries and additional information, please contact the Science Olympiad Center.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
