"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/admin/sidebar";
import { Header } from "@/components/admin/header";
import { Toaster } from "react-hot-toast";

import { getAdminContext } from "@/lib/admin-route";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [hostname, setHostname] = useState<string>();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    setHostname(window.location.hostname);
  }, []);

  const context = getAdminContext(hostname);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated && !isLoginPage) {
      router.replace("/admin/login");
    }
    if (isAuthenticated && isLoginPage) {
      router.replace(context.defaultRoute);
    }
  }, [context.defaultRoute, isAuthenticated, isLoading, isLoginPage, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.20),_transparent_32%),linear-gradient(180deg,_#eff6ff_0%,_#e0f2fe_100%)] px-6">
        <div className="rounded-[1.75rem] border border-[#bae6fd] bg-white/80 px-8 py-6 text-center shadow-[0_22px_60px_rgba(28,40,56,0.12)] backdrop-blur">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0369a1]">
            Loading
          </div>
          <p className="mt-3 text-sm text-[#667282]">
            Preparing the admin workspace.
          </p>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(22,43,64,0.08),_transparent_28%),linear-gradient(180deg,_#eff6ff_0%,_#e0f2fe_100%)]">
      <div className="mx-auto flex min-h-screen max-w-[1700px] flex-col lg:flex-row">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          <div className="rounded-[2rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.74))] p-4 shadow-[0_26px_80px_rgba(28,40,56,0.08)] backdrop-blur sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AuthProvider>
  );
}
