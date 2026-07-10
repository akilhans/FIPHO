"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";

const olympiadLinks = [
  { href: "/requirements", label: "Eligibility Requirements" },
  { href: "/past-fipho", label: "Past FIPHO" },
  { href: "/future-fipho", label: "Future FIPHO" },
];

const infoCenterLinks = [
  { href: "/results", label: "Results & Problems" },
  { href: "/rules", label: "Rules & Guideline (PDF)" },
  { href: "/news", label: "News" },
];

const fipho2026Links = [
  { href: "/organizing-committee", label: "Organizing Committee" },
  { href: "/scientific-committee", label: "Scientific Committee" },
  { href: "/programme-schedule", label: "Program Schedule" },
  { href: "/press", label: "Press Release & Report Book" },
];

function NavDropdown({
  label,
  links,
}: {
  label: string;
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors outline-none cursor-pointer"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 pt-3 z-50">
          <div className="min-w-[220px] rounded-xl border border-border bg-background-raised p-2 shadow-lg">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-border/40 transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileNavGroup({
  label,
  links,
  onNavigate,
}: {
  label: string;
  links: { href: string; label: string }[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/60 last:border-b-0">
      <button
        type="button"
        className="w-full flex items-center justify-between py-3.5 text-sm font-medium text-foreground"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="pb-3 pl-3 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={onNavigate}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group" onClick={closeMobile}>
          {/* Increased container dimensions to 40px for ideal visibility */}
          <div className="relative h-10 w-10 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/Fiphowhite.png"
              alt="FIPHO Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
          <div className="flex flex-col justify-center space-y-0.5">
            <div className="font-heading font-semibold text-lg tracking-wide leading-none text-foreground">
              FIPHO
            </div>
            <div className="font-mono-ui text-[9px] tracking-[0.15em] text-accent leading-none">
              PHYSICS OLYMPIAD
            </div>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-7">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About FIPHO
          </Link>

          <NavDropdown label="Olympiad" links={olympiadLinks} />

          <Link href="/fipho-sponsors" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Sponsors
          </Link>

          <NavDropdown label="Info Center" links={infoCenterLinks} />

          <Link href="/gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Gallery
          </Link>

          <NavDropdown label="FIPHO 2026" links={fipho2026Links} />

          <Link href="/uzbekistan" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Uzbekistan
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border text-foreground"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* MOBILE NAV PANEL */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="max-w-6xl mx-auto px-6 py-2">
            <Link
              href="/"
              className="block py-3.5 text-sm font-medium text-foreground border-b border-border/60"
              onClick={closeMobile}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block py-3.5 text-sm font-medium text-foreground border-b border-border/60"
              onClick={closeMobile}
            >
              About FIPHO
            </Link>

            <MobileNavGroup label="Olympiad" links={olympiadLinks} onNavigate={closeMobile} />

            <Link
              href="/fipho-sponsors"
              className="block py-3.5 text-sm font-medium text-foreground border-b border-border/60"
              onClick={closeMobile}
            >
              Sponsors
            </Link>

            <MobileNavGroup label="Info Center" links={infoCenterLinks} onNavigate={closeMobile} />

            <Link
              href="/gallery"
              className="block py-3.5 text-sm font-medium text-foreground border-b border-border/60"
              onClick={closeMobile}
            >
              Gallery
            </Link>

            <MobileNavGroup label="FIPHO 2026" links={fipho2026Links} onNavigate={closeMobile} />

            <Link
              href="/uzbekistan"
              className="block py-3.5 text-sm font-medium text-foreground border-b border-border/60"
              onClick={closeMobile}
            >
              Uzbekistan
            </Link>
            <Link
              href="/contact"
              className="block py-3.5 text-sm font-medium text-foreground"
              onClick={closeMobile}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}