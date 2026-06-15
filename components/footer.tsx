import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { FiphoLogo } from "@/components/logo";
import { BRAND } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="relative w-full bg-fipho-navy border-t border-fipho-gold/10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-fipho-gold/20 to-transparent" />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-24">
          <div className="space-y-6">
            <FiphoLogo variant="light" />
            <p className="max-w-xs text-sm leading-6 text-white/70">
              An international physics olympiad honoring the legacy of Ahmad
              al-Fargʻoniy, fostering scientific excellence and global
              collaboration among young physicists.
            </p>
            <div className="flex space-x-5">
              {[
                { Icon: Facebook, href: "https://facebook.com/fipho" },
                { Icon: Twitter, href: "https://twitter.com/fipho" },
                { Icon: Instagram, href: "https://instagram.com/fipho" },
                { Icon: Linkedin, href: "https://linkedin.com/company/fipho" },
              ].map(({ Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  className="text-fipho-gold/80 hover:text-fipho-gold"
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
                    className="text-sm leading-6 text-white/70 hover:text-fipho-gold"
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
                  className="text-sm leading-6 text-white/70 hover:text-fipho-gold"
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
                  {BRAND.address}
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
