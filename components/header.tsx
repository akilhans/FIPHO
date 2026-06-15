"use client";
import { MainNav } from "@/components/main-nav";
import { FiphoLogo } from "@/components/logo";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { MobileNav } from "@/components/main-nav";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-fipho-gold/10 bg-fipho-navy/95 backdrop-blur-md supports-[backdrop-filter]:bg-fipho-navy/90 shadow-[0_4px_30px_rgba(11,31,58,0.3)]">
      <div className="container flex items-center justify-between py-3 min-h-[72px] px-4 md:px-6 m-auto">
        <FiphoLogo variant="light" className="shrink-0 z-10" />

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-fipho-gold z-10"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <MainNav />
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-fipho-navy border-t border-white/10 lg:hidden">
            <MobileNav onCloseAction={handleClose} />
          </div>
        )}
      </div>
    </header>
  );
}
