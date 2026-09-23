"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MemberPhotoProps {
  name: string;
  role: string;
  image?: string;
  thumbnail?: string;
  imagePosition?: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

export function MemberPhoto({
  name,
  role,
  image,
  thumbnail,
  imagePosition,
}: MemberPhotoProps) {
  const avatarClass =
    "relative h-16 w-16 flex-shrink-0 rounded-full overflow-hidden border-2 border-amber-300/50 bg-amber-100 flex items-center justify-center";

  if (!image) {
    return (
      <div className={avatarClass}>
        <span className="font-heading font-semibold text-amber-800">
          {initials(name)}
        </span>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger
        className={`${avatarClass} cursor-zoom-in transition hover:border-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500`}
        aria-label={`View photo of ${name}`}
      >
        <Image
          src={thumbnail ?? image}
          alt={name}
          fill
          unoptimized
          className={`object-cover ${thumbnail ? "" : imagePosition ?? ""}`}
        />
      </DialogTrigger>
      <DialogContent className="w-full max-w-[calc(100%-2rem)] gap-3 border-amber-200 bg-[#f7f2e7] p-3 sm:w-auto sm:max-w-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          className="mx-auto max-h-[75vh] w-full rounded-md object-contain sm:w-auto"
        />
        <div className="px-1 pb-1">
          <DialogTitle className="font-heading text-base font-semibold text-amber-950">
            {name}
          </DialogTitle>
          <DialogDescription className="text-sm text-amber-700">
            {role}
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}
