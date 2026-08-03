"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";

import { BrandLockup } from "@/components/admin/brand-lockup";
import { useAuth } from "@/hooks/use-auth";
import { getAdminContext } from "@/lib/admin-route";
import { Button } from "@/components/ui/button";

export function Header() {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [hostname, setHostname] = useState<string>();

  useEffect(() => {
    setHostname(window.location.hostname);
  }, []);

  const context = getAdminContext(hostname);

  const title = useMemo(() => {
    if (pathname.startsWith("/admin/registrations")) {
      return "Detailed Registrations";
    }
    if (pathname.startsWith("/admin/participation-requests")) {
      return "Participation Requests";
    }
    if (pathname.startsWith("/admin/news")) {
      return "News";
    }
    if (pathname.startsWith("/admin/media")) {
      return "Media";
    }
    if (pathname === "/admin") {
      return "Dashboard";
    }
    return context.title;
  }, [context.title, pathname]);

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  return (
    <header className="border-b border-[#1f3144]/10 bg-[#eff6ff]/85 backdrop-blur">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <BrandLockup className="w-fit bg-white/88" />
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#7dd3fc] bg-[#e0f2fe] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0369a1]">
            {context.accentLabel}
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-[#192738]">
                  {title}
                </h2>
                <p className="text-sm text-[#667282]">{context.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full border-[#7dd3fc] bg-white/80 text-[#203247] hover:bg-[#e0f2fe]"
            >
              <Link href={context.publicSiteHref} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                {context.publicSiteLabel}
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="rounded-full text-[#203247] hover:bg-[#dbeafe]"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
