"use client";

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
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function UzbekistanPage() {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-fipho-navy to-fipho-navy-light text-slate-100 overflow-hidden selection:bg-fipho-gold/30">
      {/* Dynamic Background Lighting Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] left-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-fipho-blue/10 to-transparent blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-fipho-gold/5 to-transparent blur-[100px]" />
        <div className="absolute bottom-0 left-[-5%] h-[400px] w-[400px] rounded-full bg-fipho-blue/5 blur-[90px]" />
      </div>

      <div className="container relative mx-auto px-6 py-24 max-w-7xl">
        
        {/* ================= HERO SECTION ================= */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20 space-y-6">
          <Badge
            variant="outline"
            className="px-4 py-1 border-fipho-gold/30 bg-fipho-gold/5 text-fipho-gold font-medium tracking-wide uppercase text-xs rounded-full backdrop-blur-sm animate-fade-in"
          >
            ✦ Host Country
          </Badge>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Discover Uzbekistan
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl font-light leading-relaxed">
            A land of rich history, vibrant culture, and warm hospitality at the
            heart of Central Asia.
          </p>
        </div>

        {/* ================= HERO VIDEO EMBED ================= */}
        <div className="relative mx-auto max-w-5xl mb-28 group">
          <div className="absolute inset-0 bg-gradient-to-r from-fipho-blue/20 to-fipho-gold/10 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950 shadow-[0_0_50px_-12px_rgba(224,181,85,0.3)]">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/qr3tvR2tcJA?si=dfDDM4RIQBohJ4Xr"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* ================= QUICK FACTS ================= */}
        <div className="mb-32">
          <div className="flex flex-col items-center mb-12 space-y-2">
            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-fipho-gold">Key Matrix</h2>
            <p className="text-2xl font-bold text-white">Quick Facts at a Glance</p>
          </div>
          
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <MapPin className="h-5 w-5" />, title: "Capital", desc: "Tashkent" },
              { icon: <Globe className="h-5 w-5" />, title: "Language", desc: "Uzbek" },
              { icon: <Users className="h-5 w-5" />, title: "Population", desc: "~35 million" },
              { icon: <Calendar className="h-5 w-5" />, title: "Time Zone", desc: "UTC+5 (UZT)" },
            ].map((fact, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-xl border border-slate-800/60 bg-gradient-to-b from-slate-900/50 to-slate-950/50 backdrop-blur-md transition-all duration-300 hover:border-fipho-gold/40 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-slate-800/40 text-fipho-gold group-hover:bg-fipho-gold/10 group-hover:text-fipho-gold transition-colors duration-300">
                    {fact.icon}
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{fact.title}</p>
                    <p className="text-base font-semibold text-slate-200 mt-0.5">{fact.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RICH HISTORY (Asymmetric split layout) ================= */}
        <div className="grid gap-12 lg:grid-cols-12 items-center mb-32">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-sm text-fipho-gold">
              <History className="h-4 w-4" />
              <span>2,500+ Years of Legacy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The Crossroads of Civilizations
            </h2>
            <div className="space-y-4 text-slate-400 font-light leading-relaxed">
              <p>
                Uzbekistan stands at the crossroads of ancient civilizations, with
                a history spanning over 2,500 years. The country was a key hub on
                the Great Silk Road, connecting East and West through trade and
                cultural exchange.
              </p>
              <p>
                Home to some of the world's oldest cities, including Samarkand,
                Bukhara, and Khiva, Uzbekistan preserves the legacy of conquerors
                and scholars like Alexander the Great, Genghis Khan, and Amir
                Timur (Tamerlane).
              </p>
              <p className="border-l-2 border-fipho-gold/40 pl-4 italic text-slate-300">
                The region has been a center of scientific advancement, with
                scholars like Ahmad al-Fargʻoniy, Avicenna (Ibn Sina), and
                Al-Khwarizmi making groundbreaking contributions to mathematics,
                medicine, astronomy, and physics.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 relative h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <Image
              src="/images/rich-history.jpg"
              alt="Historical Uzbekistan"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-fipho-navy via-transparent to-transparent opacity-60" />
          </div>
        </div>

        {/* ================= CULTURAL HERITAGE ================= */}
        <div className="mb-32">
          <div className="flex flex-col items-center mb-16 space-y-2 text-center">
            <div className="p-3 rounded-full bg-slate-900 border border-slate-800 text-fipho-gold mb-2">
              <Landmark className="h-5 w-5" />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Cultural Heritage</h2>
            <p className="text-slate-400 max-w-xl font-light text-sm">Timeless traditions sculpted through generations.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
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
              <div
                key={index}
                className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/30 overflow-hidden hover:border-slate-700/60 transition-colors duration-300 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-fipho-navy/90 via-transparent to-transparent" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <h3 className="text-xl font-semibold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= CUISINE SECTION ================= */}
        <div className="mb-32">
          <div className="relative rounded-2xl border border-slate-800/80 bg-gradient-to-r from-slate-900/60 to-slate-950/40 p-8 sm:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 p-6 text-slate-800 pointer-events-none">
              <Utensils className="h-32 w-32 opacity-5 rotate-12" />
            </div>
            
            <div className="grid gap-12 md:grid-cols-12 items-center relative z-10">
              <div className="md:col-span-7 space-y-6">
                <div className="flex items-center gap-3 text-fipho-gold">
                  <Utensils className="h-5 w-5" />
                  <span className="text-xs uppercase tracking-widest font-semibold">Gastronomy</span>
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tight">A Feast of Authentic Flavors</h3>
                <p className="text-slate-400 font-light leading-relaxed">
                  Uzbek cuisine is known for its rich flavors, aromatic spices, and hearty dishes. Central to Uzbek culinary tradition is plov (pilaf), a savory rice dish cooked with meat, carrots, and spices, often prepared for special occasions and gatherings.
                </p>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {[
                    { name: "Shashlik", desc: "Marinated meat skewers" },
                    { name: "Lagman", desc: "Hand-pulled noodle soup" },
                    { name: "Samsa", desc: "Savory baked pastries" },
                    { name: "Non", desc: "Traditional tandoor bread" },
                  ].map((food, idx) => (
                    <div key={idx} className="flex gap-2 items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-fipho-gold mt-2 shrink-0" />
                      <div>
                        <h4 className="text-sm font-semibold text-slate-200">{food.name}</h4>
                        <p className="text-xs text-slate-500">{food.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-5 relative h-[300px] rounded-xl overflow-hidden border border-slate-800">
                <Image
                  src="/images/food.jpg"
                  alt="Uzbek Cuisine"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= EDUCATION & SCIENCE ================= */}
        <div className="mb-32">
          <div className="grid gap-12 md:grid-cols-12 items-center">
            <div className="md:col-span-5 order-last md:order-first relative h-[320px] rounded-xl overflow-hidden border border-slate-800">
              <Image
                src="/images/education.jpg"
                alt="Education in Uzbekistan"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="md:col-span-7 space-y-6">
              <div className="flex items-center gap-3 text-fipho-gold">
                <GraduationCap className="h-5 w-5" />
                <span className="text-xs uppercase tracking-widest font-semibold">Legacy of Minds</span>
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight">Education & Science Focus</h3>
              <div className="space-y-4 text-slate-400 font-light leading-relaxed">
                <p>
                  Uzbekistan has a strong tradition of scientific achievement dating back to the Islamic Golden Age. Today, the country continues to prioritize education and scientific advancement.
                </p>
                <p>
                  The country is home to numerous universities and research institutions, including the National University of Uzbekistan, Tashkent State Technical University, and the Academy of Sciences of Uzbekistan.
                </p>
                <p>
                  Uzbekistan has made significant investments in STEM education, with a particular focus on physics, mathematics, and engineering. The country regularly participates in international science olympiads and competitions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MUST-VISIT DESTINATIONS ================= */}
        <div className="mb-32">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-white">Must-Visit Destinations</h2>
            <p className="text-slate-400 font-light text-sm">Iconic geographic highlights waiting to be explored.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Samarkand",
                image: "/images/samarqand.webp",
                description: "Known as the 'Crossroads of Cultures,' Samarkand features the iconic Registan Square with its three magnificent madrasas and the stunning Shah-i-Zinda necropolis.",
              },
              {
                name: "Bukhara",
                image: "/images/buxoro.jpg",
                description: "This ancient city boasts over 140 architectural monuments, including the Poi-Kalyan complex and the ancient trading domes that once bustled with silk road merchants.",
              },
              {
                name: "Khiva",
                image: "/images/xiva.jpg",
                description: "A perfectly preserved walled city, Khiva's Itchan Kala (inner town) feels like stepping back in time with its mud-brick walls, minarets, and palaces.",
              },
              {
                name: "Tashkent",
                image: "/images/tashkent.jpg",
                description: "The capital city blends Soviet-era architecture with modern developments and traditional Uzbek influences. Visit the Chorsu Bazaar and ride the ornate metro system.",
              },
              {
                name: "Fergana Valley",
                image: "/images/valley.jpg",
                description: "Known for its fertile land and traditional silk production, the valley offers beautiful landscapes and insights into rural Uzbek life.",
              },
              {
                name: "Aral Sea",
                image: "/images/aral.jpg",
                description: "Once the world's fourth-largest lake, the Aral Sea is now largely a desert. It offers a sobering but important environmental lesson.",
              },
            ].map((destination, index) => (
              <div
                key={index}
                className="group relative flex flex-col justify-end h-80 rounded-2xl overflow-hidden border border-slate-900 shadow-lg hover:border-slate-800 transition-all duration-300"
              >
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fipho-navy via-fipho-navy/50 to-transparent transition-opacity duration-300" />
                
                <div className="relative p-6 space-y-2 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    {destination.name}
                  </h3>
                  <p className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-light leading-relaxed">
                    {destination.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= PRACTICAL INFORMATION ================= */}
        <div className="mb-32">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-white">Practical Guide for Visitors</h2>
            <p className="text-slate-400 font-light text-sm">Essential logistical details for your smooth arrival.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Visa Information",
                content: "Uzbekistan has significantly simplified its visa policy in recent years. Citizens of many countries can visit visa-free for up to 30 days, while others can obtain e-visas online. FIPHO participants will receive special visa support through the organizing committee.",
              },
              {
                title: "Transportation",
                content: "Tashkent International Airport is the main gateway to Uzbekistan, with connections to major international cities. The country also has an extensive rail network, including high-speed trains connecting major cities. Within cities, taxis and ride-sharing services are affordable and convenient.",
              },
              {
                title: "Accommodation",
                content: "Uzbekistan offers a range of accommodation options, from international hotel chains to boutique hotels in historic buildings and traditional guesthouses. FIPHO participants will be provided with accommodation information as part of the registration process.",
              },
              {
                title: "Currency & Payments",
                content: "The local currency is the Uzbekistani Som (UZS). Major credit cards are accepted in hotels and larger establishments, but it's advisable to carry some cash, especially when visiting markets or smaller towns. ATMs are widely available in major cities.",
              },
            ].map((info, idx) => (
              <Card key={idx} className="border-slate-800/80 bg-slate-900/20 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white font-semibold text-lg tracking-wide">
                    {info.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    {info.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ================= CALL TO ACTION SECTION ================= */}
        <div className="relative max-w-4xl mx-auto text-center p-12 rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-900/40 to-transparent backdrop-blur-md">
          <p className="text-lg sm:text-xl text-slate-300 font-light mb-8 max-w-xl mx-auto">
            We look forward to welcoming FIPHO participants to Uzbekistan in 2026!
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center items-center">
            <Link
              href="https://www.tripadvisor.com/Attractions-g293967-Activities-Uzbekistan.html"
              passHref
              target="_blank"
            >
              <Button className="w-full sm:w-auto bg-fipho-gold text-fipho-navy hover:bg-fipho-gold/90 font-semibold px-6 py-5 rounded-xl transition-all shadow-lg hover:shadow-fipho-gold/20 flex items-center justify-center gap-2 cursor-pointer">
                Explore Tourist Attractions
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            
            <Link
              href="http://lonelyplanet.com/articles/things-to-know-before-traveling-to-uzbekistan"
              passHref
              target="_blank"
            >
              <Button
                variant="outline"
                className="w-full sm:w-auto border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white px-6 py-5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
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