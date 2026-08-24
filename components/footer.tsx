"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Send,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { BRAND } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="relative w-full bg-fipho-navy border-t border-fipho-gold/10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-fipho-gold/20 to-transparent" />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-24 space-y-12 xl:space-y-0">
          <div className="space-y-6">
            
            {/* Logo and branding title section */}
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10">
                <Image
                  src="/images/Fiphowhite.png"
                  alt="FIPHO Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-heading text-2xl font-bold tracking-wider uppercase text-white leading-none">
                FIPHO
              </span>
            </div>

            <p className="max-w-xs text-sm leading-6 text-white/70">
              An international physics olympiad honoring the legacy of Ahmad
              al-Fergani, fostering scientific excellence and global
              collaboration among young physicists.
            </p>
            <div className="flex space-x-5">
              {[
                {
                  Icon: Facebook,
                  label: "Facebook",
                  href: "https://www.facebook.com/share/14NAmhu2D5/?mibextid=wwXIfr",
                },
                {
                  Icon: Send,
                  label: "Telegram",
                  href: "https://t.me/Fan_olimpiadalari_M",
                },
                {
                  Icon: Instagram,
                  label: "Instagram",
                  href: "https://www.instagram.com/fan_olimpiadalari_markazi?igsh=aTl1emd5Z3ludzUw&utm_source=qr",
                },
                {
                  Icon: Linkedin,
                  label: "LinkedIn",
                  href: "https://linkedin.com/company/106571536/",
                },
                {
                  Icon: Youtube,
                  label: "YouTube",
                  href: "https://youtube.com/@olimpmarkaz?si=bZhIJBMLEtM9YuH5",
                },
              ].map(({ Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-fipho-gold/80 hover:text-fipho-gold transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">
              Quick Links
            </h3>
            <ul role="list" className="mt-6 space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "About FIPHO", href: "/about" },
                { name: "Competition", href: "#competition" },
                { name: "Scientific Committee", href: "/scientific-committee" },
                { name: "News", href: "/news" },
                { name: "Gallery", href: "/gallery" },
                { name: "FAQs", href: "#faq" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm leading-6 text-white/70 hover:text-fipho-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">
              Contact Information
            </h3>
            <ul role="list" className="mt-6 space-y-4">
              <li className="flex gap-2">
                <Mail className="h-5 w-5 shrink-0 text-fipho-gold" />
                <Link
                  href={`mailto:${BRAND.email}`}
                  className="text-sm leading-6 text-white/70 hover:text-fipho-gold transition-colors"
                >
                  {BRAND.email}
                </Link>
              </li>
                <li className="flex gap-2">
                <Phone className="h-5 w-5 shrink-0 text-fipho-gold" />
                <span className="text-sm leading-6 text-white/70">
                  {BRAND.phone}
                </span>
              </li>
              <li className="flex gap-2">
                <MapPin className="h-5 w-5 shrink-0 text-fipho-gold" />
                <span className="text-sm leading-6 text-white/70">
                  Toshkent, Uzbekistan
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 text-center">
          <p className="text-xs leading-5 text-white/60">
            &copy; {new Date().getFullYear()} {BRAND.name} — {BRAND.fullName}.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
