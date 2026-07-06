import React from "react";

interface FiphoLogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function FiphoLogo({ variant = "light", className = "" }: FiphoLogoProps) {
  const isLight = variant === "light";

  return (
    <div className={`flex items-baseline gap-2 select-none ${className}`}>
      {/* 
        Pure, raw Pi icon matching image_ce944d.png exactly.
        No backgrounds, boxes, or borders—just the clean mathematical gold glyph.
      */}
      <span className="font-serif text-3xl font-bold italic text-fipho-gold leading-none translate-y-[2px]">
        π
      </span>

      {/* Main Brand Typography */}
      <span className={`font-heading text-2xl font-bold tracking-wider uppercase ${
        isLight ? "text-white" : "text-fipho-navy"
      }`}>
        FIPHO
      </span>
    </div>
  );
}