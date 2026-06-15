"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import Image from "next/image";

// Gallery media type (now supports both images and videos)
interface GalleryMedia {
  id: number;
  src: string;
  alt: string;
  year: string;
  category: string;
  description: string;
  type: 'image' | 'video';
  thumbnail?: string;
}

// Gallery data with both images and videos
const galleryMedia: GalleryMedia[] = [
  {
    id: 1,
    src: "/images/gallery/opening2.jpg",
    alt: "Opening Ceremony 2023",
    year: "2023",
    category: "Ceremonies",
    description:
      "A grand outdoor event with an elegant setup around a central water feature, attended by participants from 45 countries under a beautifully lit evening sky",
    type: 'image'
  },
  {
    id: 2,
    src: "/images/gallery/last.JPG",
    alt: "Engaged Audience",
    year: "2023",
    category: "Competition",
    description:
      "Participants, dressed in traditional and formal attire, eagerly watching the event, clapping, and showing enthusiasm for the performances and speeches.",
    type: 'image'
  },
  {
    id: 3,
    src: "/images/gallery/national.JPG",
    alt: "Cultural Performance by Young Musicians",
    year: "2023",
    category: "Ceremonies",
    description: " A group of students in formal school uniforms playing traditional instruments, showcasing their musical skills in a well-lit indoor setting.",
    type: 'image'
  },
  {
    id: 4,
    src: "/images/gallery/national2.jpg",
    alt: "Theatrical Folk Dance",
    year: "2023",
    category: "Cultural",
    description: "Performers dressed in historical and cultural outfits reenacting a traditional dance on stage, accompanied by live music and an artistic backdrop.",
    type: 'image'
  },
  {
    id: 5,
    src: "/images/gallery/closing22.JPG",
    alt: "Joyful Celebration",
    year: "2023",
    category: "Teams",
    description: "A lively nighttime scene where children and adults join hands in a celebratory dance, moving in unison under the open sky, embracing the festive spirit.",
    type: 'image'
  },
  {
    id: 6,
    src: "/images/gallery/organization.JPG",
    alt: "Official Speech & International Representation",
    year: "2023",
    category: "Organization",
    description: "A distinguished speaker addresses the audience from a podium adorned with an official emblem, symbolizing leadership and unity. Behind him, an interpreter stands ready, emphasizing the event's global reach. Flags from multiple countries, held by participants in formal attire, highlight the diversity and international collaboration within the organization.",
    type: 'image'
  },
    {
    id: 10,
    src: "/images/gallery/1.JPG",
    alt: "",
    year: "2025",
    category: "",
    description: "Practical exam highlights",
    type: 'image'
  },
     {
    id: 11,
    src: "/images/gallery/2.JPG",
    alt: "",
    year: "2025",
    category: "",
    description: "Practical exam highlights",
    type: 'image'
  },
       {
    id: 12,
    src: "/images/gallery/3.JPG",
    alt: "",
    year: "2025",
    category: "",
    description: "Practical exam highlights",
    type: 'image'
  },
       {
    id: 13,
    src: "/images/gallery/4.JPG",
    alt: "",
    year: "2025",
    category: "",
    description: "Practical exam highlights",
    type: 'image'
  },
       {
    id: 14,
    src: "/images/gallery/5.JPG",
    alt: "",
    year: "2025",
    category: "",
    description: "Practical exam highlights",
    type: 'image'
  },
  
        {
    id: 15,
    src: "/images/gallery/6.JPG",
    alt: "",
    year: "2025",
    category: "",
    description: "Practical exam highlights",
    type: 'image'
  },
        {
    id: 16,
    src: "/images/gallery/7.JPG",
    alt: "",
    year: "2025",
    category: "",
    description: "Practical exam highlights",
    type: 'image'
  },
        {
    id: 18,
    src: "/images/gallery/8.JPG",
    alt: "",
    year: "2025",
    category: "",
    description: "Practical exam highlights",
    type: 'image'
  },
        {
    id: 17,
    src: "/images/gallery/9.JPG",
    alt: "",
    year: "2025",
    category: "",
    description: "Practical exam highlights",
    type: 'image'
  },
  {
  id: 122,
  src: "/images/gallery/10.JPG",
  alt: "",
  year: "2025",
  category: "",
  description: "Samarkand trip highlights",
  type: 'image'
},
{
  id: 19,
  src: "/images/gallery/11.JPG",
  alt: "",
  year: "2025",
  category: "",
  description: "Samarkand trip highlights",
  type: 'image'
},
{
  id: 20,
  src: "/images/gallery/12.JPG",
  alt: "",
  year: "2025",
  category: "",
  description: "Samarkand trip highlights",
  type: 'image'
},
{
  id: 21,
  src: "/images/gallery/13.JPG",
  alt: "",
  year: "2025",
  category: "",
  description: "Samarkand trip highlights",
  type: 'image'
},
{
  id: 22,
  src: "/images/gallery/14.JPG",
  alt: "",
  year: "2025",
  category: "",
  description: "Samarkand trip highlights",
  type: 'image'
},
{
  id: 23,
  src: "/images/gallery/15.JPG",
  alt: "",
  year: "2025",
  category: "",
  description: "Samarkand trip highlights",
  type: 'image'
},
{
  id: 24,
  src: "/images/gallery/16.JPG",
  alt: "",
  year: "2025",
  category: "",
  description: "Samarkand trip highlights",
  type: 'image'
},
{
  id: 25,
  src: "/images/gallery/17.JPG",
  alt: "",
  year: "2025",
  category: "",
  description: "Samarkand trip highlights",
  type: 'image'
},
{
  id: 26,
  src: "/images/gallery/18.JPG",
  alt: "",
  year: "2025",
  category: "",
  description: "Samarkand trip highlights",
  type: 'image'
},
{
  id: 27,
  src: "/images/gallery/19.JPG",
  alt: "",
  year: "2025",
  category: "",
  description: "Samarkand trip highlights",
  type: 'image'
}
,
  {
    id: 7,
    src: "https://alxorazmiy.nyc3.cdn.digitaloceanspaces.com/0527.mp4",
    alt: "FIPHO Event Opening ceremony",
    year: "2025",
    category: "Events",
    description: "",
    type: 'video'
  },
  {
    id: 8,
    src: "https://alxorazmiy.nyc3.cdn.digitaloceanspaces.com/1X0A1126_1.mp4",
    alt: "Ahmad al-Fargʻoniy",
    year: "2025",
    category: "Educational",
    description: "",
    type: 'video'
  },
  {
    id: 9,
    src: "https://alxorazmiy.nyc3.cdn.digitaloceanspaces.com/fipho-documentary-eng.mp4",
    alt: "FIPHO Competition Documentation",
    year: "2026",
    category: "Competition",
    description: "",
    type: 'video'
  },
  {
    id: 10,
    src: "https://alxorazmiy.nyc3.cdn.digitaloceanspaces.com/1.mp4",
    alt: "Competition Documentation",
    year: "2025",
    category: "Competition",
    description: "",
    type: 'video'
  },
];

export default function GalleryPage() {
  const [selectedMedia, setSelectedMedia] = useState<GalleryMedia | null>(null);

  return (
    <section className="relative w-full bg-gradient-to-b from-fipho-navy to-fipho-navy-light">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 -translate-x-1/2 translate-y-1/2 h-96 w-96 rounded-full bg-fipho-blue/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:px-8">
        {/* Gallery Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-fipho-blue/20 bg-fipho-blue/10 text-fipho-gold hover:bg-fipho-blue/20"
          >
            Media Gallery
          </Badge>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            FIPHO Gallery
          </h1>
          <p className="mt-6 text-lg leading-8 text-fipho-slate/70">
            Explore photos and videos from past FIPHO events, capturing the spirit of
            international collaboration and scientific excellence
          </p>
        </div>

        <div className="text-center mb-8">
  <a
    href="https://drive.google.com/drive/folders/1Wy5sect47zpbVtZSLXNX4R0AceR_JWzy?usp=sharing"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button className="bg-fipho-blue hover:bg-fipho-blue/90 text-white px-6 py-2 rounded-md shadow">
      📁 View All Photos
    </Button>
  </a>
</div>


        {/* Gallery Grid */}
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryMedia.map((media) => (
              <Card
                key={media.id}
                className="group relative border-fipho-blue/20 bg-fipho-light/80 backdrop-blur overflow-hidden cursor-pointer"
                onClick={() => setSelectedMedia(media)}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  {media.type === 'image' ? (
                    <Image
                      src={media.src || "/placeholder.svg"}
                      alt={media.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <video
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      controls
                      preload="metadata"
                    >
                      <source src={media.src} type="video/mp4" />
                      <source src={media.src.replace(".mp4", ".MP4")} type="video/MP4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-fipho-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-medium">{media.alt}</p>
                    <p className="text-fipho-slate/70 text-sm">
                      {media.year} • {media.type === 'video' ? 'Video' : 'Photo'}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-fipho-blue/10 group-hover:ring-fipho-blue/30 transition-all duration-300" />
              </Card>
            ))}
          </div>
        </div>

        {/* Media Viewer Dialog */}
        <Dialog
          open={!!selectedMedia}
          onOpenChange={(open) => !open && setSelectedMedia(null)}
        >
          <DialogContent className="max-w-4xl bg-fipho-navy/95 border-fipho-blue/20 text-fipho-navy">
            <DialogHeader>
              <DialogTitle className="text-fipho-navy">
                {selectedMedia?.alt}
              </DialogTitle>
              <DialogDescription className="text-fipho-slate/70">
                {selectedMedia?.year} | {selectedMedia?.category} | {selectedMedia?.type === 'video' ? 'Video' : 'Photo'}
              </DialogDescription>
            </DialogHeader>
            <div className="relative aspect-video w-full overflow-hidden rounded-md">
              {selectedMedia && (
                selectedMedia.type === 'image' ? (
                  <Image
                    src={selectedMedia.src || "/placeholder.svg"}
                    alt={selectedMedia.alt}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <video
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                  >
                    <source src={selectedMedia.src} type="video/mp4" />
                    <source src={selectedMedia.src.replace(".mp4", ".MP4")} type="video/MP4" />
                    Your browser does not support the video tag.
                  </video>
                )
              )}
            </div>
            <p className="text-fipho-slate/70">{selectedMedia?.description}</p>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-fipho-slate/70 hover:text-fipho-navy hover:bg-fipho-navy/20"
              onClick={() => setSelectedMedia(null)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}