"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ClipboardList, FileText, Gauge, Images, Newspaper, ShieldCheck, Sparkles } from "lucide-react";

import { BrandLockup } from "@/components/admin/brand-lockup";
import { getAdminContext } from "@/lib/admin-route";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: Gauge,
    exact: true,
  },
  {
    label: "Participation Requests",
    href: "/admin/participation-requests",
    icon: FileText,
  },
  {
    label: "Detailed Registrations",
    href: "/admin/registrations",
    icon: ClipboardList,
  },
  {
    label: "News",
    href: "/admin/news",
    icon: Newspaper,
  },
  {
    label: "Media",
    href: "/admin/media",
    icon: Images,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [hostname, setHostname] = useState<string>();

  useEffect(() => {
    setHostname(window.location.hostname);
  }, []);

  const context = getAdminContext(hostname);

  return (
    <aside className="w-full border-b border-[#1f3144]/10 bg-[linear-gradient(180deg,#0d1927_0%,#112131_52%,#15283a_100%)] px-4 py-4 text-white lg:min-h-screen lg:w-[310px] lg:border-b-0 lg:border-r lg:border-r-white/10 lg:px-5 lg:py-6">
      <div className="space-y-4">
        <Link
          href="/admin"
          className="relative block overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.18),transparent_34%)]" />
          <Image
            src="/logo/fipho-logo-transparent.png"
            alt=""
            aria-hidden="true"
            width={3756}
            height={3148}
            className="pointer-events-none absolute -right-16 -top-10 h-44 w-56 object-contain opacity-10"
            sizes="224px"
            priority
          />
          <div className="relative">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#38bdf8]/40 bg-[#0ea5e9]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#bae6fd]">
              <ShieldCheck className="h-3.5 w-3.5" />
              {context.accentLabel}
            </div>
            <Sparkles className="h-4 w-4 text-[#7dd3fc]" />
          </div>
          <BrandLockup
            className="mt-5 border-[#7dd3fc]/50 bg-white/95"
            priority
          />
          <div className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-[#d3deeb]">
            {context.shortTitle}
          </div>
          <p className="mt-2 max-w-[22rem] text-sm leading-6 text-[#9bb0c4]">
            {context.subtitle}
          </p>
          </div>
        </Link>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-3">
          <div className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7f96aa]">
            Navigation
          </div>
          <nav className="space-y-1.5">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all",
              isActive
                ? "bg-[#e0f2fe] text-[#0f2942] shadow-[0_10px_20px_rgba(0,0,0,0.14)]"
                : "text-[#a9bbcb] hover:bg-white/5 hover:text-white"
            )}
          >
            <span
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg",
                isActive
                  ? "bg-[#0284c7] text-white"
                  : "bg-white/5 text-[#c6d3df]"
              )}
            >
              <item.icon className="h-4 w-4" />
            </span>
            <span className="flex-1">{item.label}</span>
          </Link>
        )})}
          </nav>
        </div>
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-4 text-sm leading-6 text-[#9bb0c4]">
        <div className="font-medium text-white">Operational note</div>
        <p className="mt-2">
          This single panel covers registration operations, published news,
          gallery albums, exports, and staff review workflows.
        </p>
      </div>
    </aside>
  );
}
