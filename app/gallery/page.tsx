"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface GalleryMedia {
  id: string; 
  src: string;
  alt: string;
  year: string;
  category: string;
  description: string;
  type: 'image' | 'video';
}

// 1. Automatically generate the 62 image objects from your local folder
const totalNewImages = 62;
const generatedImages: GalleryMedia[] = Array.from({ length: totalNewImages }, (_, index) => {
  const imageNumber = index + 1;
  return {
    id: `img-n${imageNumber}`, 
    src: `/images/FiphoGallery/n${imageNumber}.jpg`,
    alt: `FIPHO Olympiad Highlight ${imageNumber}`,
    year: "2025",
    category: "Highlights",
    description: "Moments capturing scientific excellence, international team collaboration, and cultural exchange at FIPHO.",
    type: 'image'
  };
});

// 2. Local video setups linking directly to your local assets folder
const localVideos: GalleryMedia[] = [
  {
    id: "vid-fargoniyfinish",
    src: "/images/FiphoGallery/fargoniyfinish.mp4",
    alt: "Fergani Olympiad Closing & Finish",
    year: "2025",
    category: "Ceremonies",
    description: "Celebrating the grand finale, award distributions, and the official closing moments of the competition.",
    type: 'video'
  },
  {
    id: "vid-olimpiada-ochilishi",
    src: "/images/FiphoGallery/Olimpiada_ochilishi.mp4",
    alt: "Olimpiada Ochilish Marosimi (Opening Ceremony)",
    year: "2025",
    category: "Events",
    description: "The spectacular opening ceremony welcoming international delegates and physics competitors.",
    type: 'video'
  },
  {
    id: "vid-olympiadcont",
    src: "/images/FiphoGallery/Olympiadcont.mp4",
    alt: "Olympiad Competition & Evaluation",
    year: "2025",
    category: "Competition",
    description: "An inside look into the rigorous theoretical tests and practical laboratory setups.",
    type: 'video'
  },
];

// Combine arrays to showcase premium video highlights right at the top
const galleryMedia: GalleryMedia[] = [...localVideos, ...generatedImages];

export default function GalleryPage() {
  const [selectedMedia, setSelectedMedia] = useState<GalleryMedia | null>(null);

  return (
    <section className="relative w-full bg-gradient-to-b from-fipho-navy to-fipho-navy-light">
      {/* Background ambient blurs */}
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
          <p className="text-white/80 mb-6">
            Explore photos and videos from past FIPHO events, capturing the spirit of
            international collaboration and scientific excellence.
          </p>
        </div>

        <div className="text-center mb-12">
          <a
            href="https://drive.google.com/drive/folders/1Wy5sect47zpbVtZSLXNX4R0AceR_JWzy?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
           
          </a>
        </div>

        {/* Media Grid */}
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryMedia.map((media) => (
              <Card
                key={media.id}
                className="group relative border-fipho-blue/20 bg-fipho-light/80 backdrop-blur overflow-hidden cursor-pointer"
                onClick={() => setSelectedMedia(media)}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-fipho-navy/40">
                  {media.type === 'image' ? (
                    <Image
                      src={media.src || "/placeholder.svg"}
                      alt={media.alt}
                      fill
                      sizes="(max-w-7xl) 33vw, (max-w-md) 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full relative flex items-center justify-center bg-black/30">
                      <video
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        preload="metadata"
                        muted
                        playsInline
                      >
                        <source src={media.src} type="video/mp4" />
                      </video>
                      
                      {/* Premium Glassmorphism UI Video Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/40 transition-all duration-300 backdrop-blur-[1px] group-hover:backdrop-blur-none">
                        <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/40 flex items-center justify-center shadow-2xl transform scale-95 group-hover:scale-100 group-hover:bg-fipho-gold group-hover:text-fipho-navy group-hover:border-transparent transition-all duration-300 ease-out">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            className="h-6 w-6 translate-x-[2px]"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Title Hover Fade Information overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-fipho-navy/90 via-fipho-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full">
                    <p className="text-white font-medium text-sm truncate">{media.alt}</p>
                    <p className="text-white/60 text-xs mt-0.5">
                      {media.year} • {media.type === 'video' ? 'Video File' : 'Photo File'}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-fipho-blue/10 group-hover:ring-fipho-blue/30 transition-all duration-300" />
              </Card>
            ))}
          </div>
        </div>

        {/* Media Lightbox Viewer Dialog */}
        <Dialog
          open={!!selectedMedia}
          onOpenChange={(open) => !open && setSelectedMedia(null)}
        >
          {/* Default Close button managed organically by Shadcn UI DialogContent */}
          <DialogContent className="max-w-4xl bg-fipho-navy/95 border-fipho-blue/20 text-white shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-white text-xl font-semibold">
                {selectedMedia?.alt}
              </DialogTitle>
              <DialogDescription className="text-white/60">
                {selectedMedia?.year} | {selectedMedia?.category} | {selectedMedia?.type === 'video' ? 'Video Presentation' : 'Official Photograph'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-black/60 flex items-center justify-center my-2">
              {selectedMedia && (
                selectedMedia.type === 'image' ? (
                  <Image
                    src={selectedMedia.src || "/placeholder.svg"}
                    alt={selectedMedia.alt}
                    fill
                    className="object-contain"
                    priority
                  />
                ) : (
                  <video
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                  >
                    <source src={selectedMedia.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )
              )}
            </div>
            
            <div className="pt-2">
              <p className="text-sm text-white/80 leading-relaxed">{selectedMedia?.description}</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
