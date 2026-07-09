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
  Clock3,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function UzbekistanPage() {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-fipho-navy to-fipho-navy-light text-slate-100 overflow-hidden selection:bg-fipho-gold/30">
      {/* ================= AMBIENT LIGHTING (matches site background treatment) ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] left-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-fipho-blue/10 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 right-[-5%] h-[400px] w-[400px] rounded-full bg-fipho-gold/5 blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-6 py-24 max-w-7xl">
        {/* ================= HERO ================= */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20 space-y-6">
          <Badge
            variant="outline"
            className="px-4 py-1 border-fipho-gold/30 bg-fipho-gold/5 text-fipho-gold font-medium tracking-wide uppercase text-xs rounded-full backdrop-blur-sm"
          >
            ✦ Host Country — 2026
          </Badge>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Discover Uzbekistan
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl font-light leading-relaxed">
            A land of ancient cities, old trade routes, and warm hospitality
            at the heart of Central Asia.
          </p>
        </div>

        {/* ================= HERO VIDEO ================= */}
        <div className="relative mx-auto max-w-5xl mb-28 group">
          <div className="absolute inset-0 bg-gradient-to-r from-fipho-blue/20 to-fipho-gold/10 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950 shadow-[0_0_50px_-12px_rgba(224,181,85,0.3)]">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/01_upSvzTRs?si=KB8U_lYwvJtWelNC"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full object-cover border-0"
            />
          </div>
        </div>

        {/* ================= QUICK FACTS ================= */}
        <div className="mb-32">
          <div className="flex flex-col items-center mb-12 space-y-2">
            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-fipho-gold">
              Key Facts
            </h2>
            <p className="text-2xl font-serif font-bold text-white">Quick Facts at a Glance</p>
          </div>

          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <MapPin className="h-5 w-5" />, title: "Capital", desc: "Tashkent" },
              { icon: <Globe className="h-5 w-5" />, title: "Language", desc: "Uzbek" },
              { icon: <Users className="h-5 w-5" />, title: "Population", desc: "~36 million" },
              { icon: <Clock3 className="h-5 w-5" />, title: "Time Zone", desc: "UTC+5 (UZT)" },
            ].map((fact, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-xl border border-slate-800/60 bg-gradient-to-b from-slate-900/50 to-slate-950/50 backdrop-blur-md transition-all duration-300 hover:border-fipho-gold/40 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-slate-800/40 text-fipho-gold group-hover:bg-fipho-gold/10 transition-colors duration-300">
                    {fact.icon}
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      {fact.title}
                    </p>
                    <p className="text-base font-semibold text-slate-200 mt-0.5">{fact.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= HISTORY ================= */}
        <div className="grid gap-12 lg:grid-cols-12 items-center mb-32">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-sm text-fipho-gold">
              <History className="h-4 w-4" />
              <span>2,500+ years on the trade route</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Where Caravans Became Cities
            </h2>
            <div className="space-y-4 text-slate-400 font-light leading-relaxed">
              <p>
                Long before it was a country on a map, this land was a
                waypoint — the place merchants, scholars, and armies passed
                through on their way somewhere else, and often chose to stay.
                Silk, paper, and mathematics moved through here as often as
                spices and silver.
              </p>
              <p>
                Samarkand, Bukhara, and Khiva grew rich on that traffic, and
                still carry the fingerprints of Alexander the Great, Genghis
                Khan, and the empire-builder Amir Timur, who made Samarkand
                his capital and filled it with the turquoise-domed monuments
                that define the region today.
              </p>
              <p>
                It was also a place of ideas: al-Khwarizmi&apos;s algebra,
                al-Farghani&apos;s astronomy, and Ibn Sina&apos;s medicine all trace
                back to scholars raised or trained in this region.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 relative h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950">
            <Image
              src="/images/registon.jpg"
              alt=""
              aria-hidden="true"
              fill
              className="object-cover scale-110 blur-2xl opacity-50"
            />
            <Image
              src="/images/registon.jpg"
              alt="Registan Square monuments in Samarkand"
              fill
              className="object-contain relative"
            />
          </div>
        </div>

        {/* ================= CULTURAL HERITAGE ================= */}
        <div className="mb-32">
          <div className="flex flex-col items-center mb-16 space-y-2 text-center">
            <div className="p-3 rounded-full bg-slate-900 border border-slate-800 text-fipho-gold mb-2">
              <Landmark className="h-5 w-5" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-white tracking-tight">Made by Hand</h2>
            <p className="text-slate-400 max-w-xl font-light text-sm">
              Three crafts that still shape everyday life here.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Tilework",
                image: "/images/turquoise_majolica.jpg",
                description:
                  "Cobalt and turquoise majolica tiles cover the madrasas and mausoleums of Samarkand, Bukhara, and Khiva — three historic centers now protected as UNESCO World Heritage sites.",
              },
              {
                title: "Ikat & Suzani",
                image: "/images/weavers.jpg",
                description:
                  "Fergana Valley weavers still hand-dye and hand-loom ikat silk, while suzani embroidery — bold floral needlework once made for a bride's dowry — decorates homes across the country.",
              },
              {
                title: "Music",
                image: "/images/dutardaira.jpg",
                description:
                  "The dutar's two strings and the doira's frame-drum rhythms carry maqom, a centuries-old modal music tradition shared across Central Asia and recognized by UNESCO.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/30 overflow-hidden hover:border-fipho-gold/30 transition-colors duration-300 group"
              >
                <div className="relative h-56 overflow-hidden bg-slate-950">
                  <Image
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    fill
                    className="object-cover scale-110 blur-2xl opacity-50"
                  />
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain relative group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <h3 className="font-serif text-xl font-semibold text-white tracking-tight">
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

        {/* ================= CUISINE ================= */}
        <div className="mb-32">
          <div className="relative rounded-2xl border border-slate-800/80 bg-gradient-to-r from-slate-900/60 to-slate-950/40 p-8 sm:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 p-6 text-slate-800 pointer-events-none">
              <Utensils className="h-32 w-32 opacity-5 rotate-12" />
            </div>

            <div className="grid gap-12 md:grid-cols-12 items-center relative z-10">
              <div className="md:col-span-7 space-y-6">
                <div className="flex items-center gap-3 text-fipho-gold">
                  <Utensils className="h-5 w-5" />
                  <span className="text-xs uppercase tracking-widest font-semibold">On the Table</span>
                </div>
                <h3 className="font-serif text-3xl font-bold text-white tracking-tight">
                  A Table Built for Sharing
                </h3>
                <p className="text-slate-400 font-light leading-relaxed">
                  The centerpiece is almost always plov — rice slow-cooked
                  with lamb, carrot, and cumin in a single wide kazan pot,
                  usually made in enormous batches for weddings and
                  gatherings. Around it sits a table of dishes built for
                  passing plates, not eating alone.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  {[
                    { name: "Manti", desc: "Steamed dumplings, lamb & pumpkin" },
                    { name: "Norin", desc: "Cold hand-cut noodles with horse meat" },
                    { name: "Chuchvara", desc: "Tiny boiled meat dumplings in broth" },
                    { name: "Non", desc: "Tandoor-baked bread, stamped by hand" },
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

              <div className="md:col-span-5 relative h-[300px] rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                <Image
                  src="/images/oshwamaki.jpg"
                  alt=""
                  aria-hidden="true"
                  fill
                  className="object-cover scale-110 blur-2xl opacity-50"
                />
                <Image
                  src="/images/oshwamaki.jpg"
                  alt="Traditional Uzbek plov (Osh) served in a wide bowl"
                  fill
                  className="object-contain relative"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= EDUCATION & SCIENCE ================= */}
        <div className="mb-32">
          <div className="grid gap-12 md:grid-cols-12 items-center">
            <div className="md:col-span-5 order-last md:order-first relative h-[320px] rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <Image
                src="/images/ulugbek.jpg"
                alt=""
                aria-hidden="true"
                fill
                className="object-cover scale-110 blur-2xl opacity-50"
              />
              <Image
                src="/images/ulugbek.jpg"
                alt="Ulugh Beg Observatory artifact"
                fill
                className="object-contain relative"
              />
            </div>

            <div className="md:col-span-7 space-y-6">
              <div className="flex items-center gap-3 text-fipho-gold">
                <GraduationCap className="h-5 w-5" />
                <span className="text-xs uppercase tracking-widest font-semibold">A Long Habit of Study</span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-white tracking-tight">
                Education & Science Focus
              </h3>
              <div className="space-y-4 text-slate-400 font-light leading-relaxed">
                <p>
                  The same region that produced al-Khwarizmi and Ulugh Beg —
                  the astronomer-king who built one of the medieval world&apos;s
                  most accurate observatories in Samarkand — still treats
                  mathematics and the sciences as a point of national pride.
                </p>
                <p>
                  Today, institutions like the National University of
                  Uzbekistan, Tashkent State Technical University, and the
                  Academy of Sciences anchor a growing research and STEM
                  education push.
                </p>
                <p>
                  Uzbek students regularly place at international olympiads
                  in physics and mathematics — part of why hosting FIPHO here
                  feels less like a departure and more like a homecoming.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= DESTINATIONS — ROUTE MAP ================= */}
        <div className="mb-32">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white">
              Must-Visit Destinations
            </h2>
            <p className="text-slate-400 font-light text-sm">
              A handful of places worth building your trip around.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Khiva",
                image: "/images/ichanqala.jpg",
                description:
                  "The walled inner city of Itchan Kala is a single, near-intact museum town of mud-brick palaces and minarets — small enough to cross on foot in an afternoon.",
              },
              {
                name: "Bukhara",
                image: "/images/poikalan.jpg",
                description:
                  "Over 140 protected monuments sit around the Poi-Kalyan complex, where the Kalyan Minaret once guided caravans home from miles out on the steppe.",
              },
              {
                name: "Shahrisabz",
                image: "/images/oqsaroy.jpg",
                description:
                  "Amir Timur's birthplace, home to the ruined but still enormous Ak-Saray Palace gate — built to be the largest of its age.",
              },
              {
                name: "Samarkand",
                image: "/images/registon3.jpg",
                description:
                  "Registan Square's three madrasas face each other across a single plaza — arguably the most photographed square in Central Asia, and worth seeing at both dawn and dusk.",
              },
              {
                name: "Tashkent",
                image: "/images/chorsu.jpg",
                description:
                  "The capital pairs Soviet-era mosaics with a metro system built like an underground palace, plus Chorsu Bazaar's sprawling blue-domed market hall.",
              },
              {
                name: "Nukus",
                image: "/images/ayazkala.jpg",
                description:
                  "Ancient desert fortresses in Karakalpakstan, dramatic ruins rising from the sands.",
              },
            ].map((destination, index) => (
              <div
                key={index}
                className="group relative flex flex-col justify-end h-80 rounded-2xl overflow-hidden border border-slate-900 bg-slate-950 shadow-lg hover:border-slate-800 transition-all duration-300"
              >
                <Image
                  src={destination.image}
                  alt=""
                  aria-hidden="true"
                  fill
                  className="object-cover scale-110 blur-2xl opacity-50"
                />
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-contain relative transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fipho-navy via-fipho-navy/40 to-transparent" />

                <div className="relative p-6 space-y-2 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-xl font-bold text-white tracking-wide">
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

        {/* ================= PRACTICAL INFO ================= */}
        <div className="mb-32">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white">Before You Land</h2>
            <p className="text-slate-400 font-light text-sm">The logistics, sorted.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Visa",
                content:
                  "Most nationalities can enter visa-free for up to 30 days or apply for an e-visa online in a few days. FIPHO participants receive additional visa support directly through the organizing committee.",
              },
              {
                title: "Getting In & Around",
                content:
                  "Tashkent International Airport connects to most major hubs. High-speed Afrosiyob trains link Tashkent, Samarkand, Bukhara, and Khiva in a few hours each; taxis and ride-hailing apps cover the rest.",
              },
              {
                title: "Where to Stay",
                content:
                  "Options range from international hotel chains in Tashkent to family-run guesthouses inside the historic quarters of Bukhara and Khiva. FIPHO accommodation details go out with event registration.",
              },
              {
                title: "Money",
                content:
                  "The currency is the Uzbekistani Som (UZS). Cards work at hotels and city restaurants; carry cash for bazaars, smaller towns, and taxis. ATMs are common in every major city.",
              },
            ].map((info, idx) => (
              <Card key={idx} className="border-slate-800/80 bg-slate-900/20 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="font-serif text-white font-semibold text-lg tracking-wide">
                    {info.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">{info.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ================= CTA ================= */}
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
                Explore Attractions
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link
              href="https://www.lonelyplanet.com/articles/things-to-know-before-traveling-to-uzbekistan"
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
