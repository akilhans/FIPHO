import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  History,
  Landmark,
  Utensils,
  GraduationCap,
  Users,
  Calendar,
  Globe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function UzbekistanPage() {
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
            Host Country
          </Badge>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Discover Uzbekistan
          </h1>
          <p className="text-white mb-6">
            A land of rich history, vibrant culture, and warm hospitality at the
            heart of Central Asia
          </p>
        </div>

        {/* Hero Image */}
        {/* <div className="mx-auto max-w-5xl mb-16 overflow-hidden rounded-xl">
          <div className="relative h-[400px] w-full">
            <Image
              src="/placeholder.svg?height=800&width=1600"
              alt="Uzbekistan Landscape"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-fipho-navy/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h2 className="text-2xl font-bold text-white">
                Welcome to Uzbekistan
              </h2>
              <p className="text-fipho-slate/80">Host of FIPHO 2025</p>
            </div>
          </div>
        </div> */}
        <div className="mx-auto max-w-5xl mb-16 overflow-hidden rounded-xl">
          <div className="relative h-[400px] w-full">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/qr3tvR2tcJA?si=dfDDM4RIQBohJ4Xr"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 w-full h-full z-10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-fipho-navy/80 to-transparent" />
          </div>
        </div>

        {/* Quick Facts */}
        <div className="mx-auto max-w-5xl mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Quick Facts
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <MapPin className="h-6 w-6 text-fipho-gold" />,
                title: "Capital",
                description: "Tashkent",
              },
              {
                icon: <Globe className="h-6 w-6 text-fipho-gold" />,
                title: "Language",
                description: "Uzbek",
              },
              {
                icon: <Users className="h-6 w-6 text-fipho-gold" />,
                title: "Population",
                description: "~35 million",
              },
              {
                icon: <Calendar className="h-6 w-6 text-fipho-gold" />,
                title: "Time Zone",
                description: "UTC+5 (UZT)",
              },
            ].map((fact, index) => (
              <Card
                key={index}
                className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur"
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    {fact.icon}
                    <h3 className="font-medium text-fipho-navy">
                      {fact.title}
                    </h3>
                    <p className="text-sm text-fipho-slate/70">
                      {fact.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Rich History */}
        <div className="mx-auto max-w-5xl mb-16 grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <History className="h-6 w-6 text-fipho-gold" />
              <h2 className="text-2xl font-bold text-white">Rich History</h2>
            </div>
            <p className="text-white mb-6">
              Uzbekistan stands at the crossroads of ancient civilizations, with
              a history spanning over 2,500 years. The country was a key hub on
              the Great Silk Road, connecting East and West through trade and
              cultural exchange.
            </p>
            <p className="text-white mb-6">
              Home to some of the world`s oldest cities, including Samarkand,
              Bukhara, and Khiva, Uzbekistan preserves the legacy of conquerors
              and scholars like Alexander the Great, Genghis Khan, and Amir
              Timur (Tamerlane).
            </p>
            <p className="text-white mb-6">
              The region has been a center of scientific advancement, with
              scholars like Ahmad al-Fargʻoniy, Avicenna (Ibn Sina), and
              Al-Khwarizmi making groundbreaking contributions to mathematics,
              medicine, astronomy, and physics.
            </p>
          </div>
          <div className="relative h-[300px] rounded-xl overflow-hidden">
            <Image
              src="/images/rich-history.jpg"
              alt="Historical Uzbekistan"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Cultural Heritage */}
        <div className="mx-auto max-w-5xl mb-16">
          <div className="flex items-center gap-3 justify-center mb-8">
            <Landmark className="h-6 w-6 text-fipho-gold" />
            <h2 className="text-2xl font-bold text-white">Cultural Heritage</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Architecture",
                image: "/images/architechture.jpg",
                description:
                  "Uzbekistan is renowned for its stunning Islamic architecture, featuring intricate blue-tiled domes, minarets, and madrasas. The historic centers of Samarkand, Bukhara, and Khiva are UNESCO World Heritage sites.",
              },
              {
                title: "Arts & Crafts",
                image: "/images/arts.png",
                description:
                  "Traditional crafts flourish in Uzbekistan, including silk weaving, carpet making, ceramics, and gold embroidery. Each region has its distinctive styles and techniques passed down through generations.",
              },
              {
                title: "Music & Dance",
                image: "/images/music.png",
                description:
                  "Uzbek music features unique instruments like the dutar (two-stringed lute) and doira (frame drum). Traditional dances celebrate nature, harvests, and historical events with colorful costumes and expressive movements.",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-lg text-fipho-navy mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-fipho-slate/70">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cuisine */}
        <div className="mx-auto max-w-5xl mb-16">
          <div className="flex items-center gap-3 justify-center mb-8">
            <Utensils className="h-6 w-6 text-fipho-gold" />
            <h2 className="text-2xl font-bold text-white">Uzbek Cuisine</h2>
          </div>

          <Card className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div className="space-y-4">
                  <p className="text-fipho-slate/70">
                    Uzbek cuisine is known for its rich flavors, aromatic
                    spices, and hearty dishes. Central to Uzbek culinary
                    tradition is plov (pilaf), a savory rice dish cooked with
                    meat, carrots, and spices, often prepared for special
                    occasions and gatherings.
                  </p>
                  <p className="text-fipho-slate/70">
                    Other popular dishes include:
                  </p>
                  <ul className="space-y-2 text-fipho-slate/70">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-fipho-gold"></div>
                      <span>Shashlik - Marinated and grilled meat skewers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-fipho-gold"></div>
                      <span>
                        Lagman - Hand-pulled noodles with meat and vegetables
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-fipho-gold"></div>
                      <span>
                        Samsa - Baked pastries filled with meat or vegetables
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-fipho-gold"></div>
                      <span>
                        Non - Traditional round bread baked in a tandoor oven
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="relative h-[250px] rounded-xl overflow-hidden">
                  <Image
                    src="/images/food.jpg"
                    alt="Uzbek Cuisine"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Education & Science */}
        <div className="mx-auto max-w-5xl mb-16">
          <div className="flex items-center gap-3 justify-center mb-8">
            <GraduationCap className="h-6 w-6 text-fipho-gold" />
            <h2 className="text-2xl font-bold text-white">
              Education & Science
            </h2>
          </div>

          <Card className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div className="relative h-[250px] rounded-xl overflow-hidden">
                  <Image
                    src="/images/education.jpg"
                    alt="Education in Uzbekistan"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-fipho-slate/70">
                    Uzbekistan has a strong tradition of scientific achievement
                    dating back to the Islamic Golden Age. Today, the country
                    continues to prioritize education and scientific
                    advancement.
                  </p>
                  <p className="text-fipho-slate/70">
                    The country is home to numerous universities and research
                    institutions, including the National University of
                    Uzbekistan, Tashkent State Technical University, and the
                    Academy of Sciences of Uzbekistan.
                  </p>
                  <p className="text-fipho-slate/70">
                    Uzbekistan has made significant investments in STEM
                    education, with a particular focus on physics,
                    mathematics, and engineering. The country regularly
                    participates in international science olympiads and
                    competitions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Must-Visit Destinations */}
        <div className="mx-auto max-w-5xl mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Must-Visit Destinations
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Samarkand",
                image: "/images/samarqand.webp",
                description:
                  "Known as the 'Crossroads of Cultures,' Samarkand features the iconic Registan Square with its three magnificent madrasas and the stunning Shah-i-Zinda necropolis.",
              },
              {
                name: "Bukhara",
                image: "/images/buxoro.jpg",
                description:
                  "This ancient city boasts over 140 architectural monuments, including the Poi-Kalyan complex and the ancient trading domes that once bustled with silk road merchants.",
              },
              {
                name: "Khiva",
                image: "/images/xiva.jpg",
                description:
                  "A perfectly preserved walled city, Khiva's Itchan Kala (inner town) feels like stepping back in time with its mud-brick walls, minarets, and palaces.",
              },
              {
                name: "Tashkent",
                image: "/images/tashkent.jpg",
                description:
                  "The capital city blends Soviet-era architecture with modern developments and traditional Uzbek influences. Visit the Chorsu Bazaar and ride the ornate metro system.",
              },
              {
                name: "Fergana Valley",
                image: "/images/valley.jpg",
                description:
                  "Known for its fertile land and traditional silk production, the valley offers beautiful landscapes and insights into rural Uzbek life.",
              },
              {
                name: "Aral Sea",
                image: "/images/aral.jpg",
                description:
                  "Once the world's fourth-largest lake, the Aral Sea is now largely a desert. It offers a sobering but important environmental lesson.",
              },
            ].map((destination, index) => (
              <Card
                key={index}
                className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-fipho-navy/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="font-medium text-lg text-white">
                      {destination.name}
                    </h3>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm text-fipho-slate/70">
                    {destination.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Practical Information */}
        <div className="mx-auto max-w-5xl mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Practical Information for Visitors
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-fipho-navy">
                  Visa Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-fipho-slate/70 mb-4">
                  Uzbekistan has significantly simplified its visa policy in
                  recent years. Citizens of many countries can visit visa-free
                  for up to 30 days, while others can obtain e-visas online.
                </p>
                <p className="text-fipho-slate/70">
                  FIPHO participants will receive special visa support through
                  the organizing committee.
                </p>
              </CardContent>
            </Card>

            <Card className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-fipho-navy">
                  Transportation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-fipho-slate/70 mb-4">
                  Tashkent International Airport is the main gateway to
                  Uzbekistan, with connections to major international cities.
                  The country also has an extensive rail network, including
                  high-speed trains connecting major cities.
                </p>
                <p className="text-fipho-slate/70">
                  Within cities, taxis and ride-sharing services are affordable
                  and convenient.
                </p>
              </CardContent>
            </Card>

            <Card className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-fipho-navy">
                  Accommodation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-fipho-slate/70">
                  Uzbekistan offers a range of accommodation options, from
                  international hotel chains to boutique hotels in historic
                  buildings and traditional guesthouses. FIPHO participants
                  will be provided with accommodation information as part of the
                  registration process.
                </p>
              </CardContent>
            </Card>

            <Card className="border-fipho-blue/20 bg-fipho-light/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-fipho-navy">
                  Currency & Payments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-fipho-slate/70">
                  The local currency is the Uzbekistani Som (UZS). Major credit
                  cards are accepted in hotels and larger establishments, but
                  it`s advisable to carry some cash, especially when visiting
                  markets or smaller towns. ATMs are widely available in major
                  cities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto max-w-3xl mt-16 text-center">
          <p className="text-white mb-6">
            We look forward to welcoming FIPHO participants to Uzbekistan in
            2025!
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <Link
              href="https://www.tripadvisor.com/Attractions-g293967-Activities-Uzbekistan.html"
              passHref
              target="_blank"
            >
              <Button className="bg-fipho-blue text-white hover:bg-fipho-blue/90 cursor-pointer">
                Explore Tourist Attractions
              </Button>
            </Link>
            <Link
              href="http://lonelyplanet.com/articles/things-to-know-before-traveling-to-uzbekistan"
              passHref
              target="_blank"
            >
              <Button
                className="border-fipho-gold/50 text-fipho-navy hover:bg-fipho-navy/50 hover:text-white cursor-pointer"
              >
                Travel Tips
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
