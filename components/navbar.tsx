"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const olympiadLinks = [
  { href: "/requirements", label: "Eligibility Requirements" },
  { href: "/past-fipho", label: "Past FIPHO" },
  { href: "/future-fipho", label: "Future FIPHO" },
];

// navbar.tsx
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
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors outline-none"
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

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <span className="font-heading italic text-lg text-accent">Ψ</span>
          <span className="font-heading font-semibold text-lg tracking-wide">
            FIPHO
          </span>
        </Link>

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

        <Link
          href="/register"
          className="text-sm font-medium px-5 py-2.5 rounded-full bg-accent text-accent-foreground hover:opacity-90 transition-opacity flex-shrink-0"
        >
          Register
        </Link>
      </div>
    </header>
  );
}