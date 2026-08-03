import Link from "next/link";

import { BrandLockup } from "@/components/brand-lockup";
import RegistrationForm from "@/components/register";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(220,210,188,0.45),_transparent_30%),linear-gradient(180deg,_#f7f4ed_0%,_#f4efe4_100%)] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <BrandLockup priority />
          <Link
            href="/registration"
            className="rounded-full border border-[#7dd3fc] bg-white px-5 py-2 text-sm font-semibold text-[#213247] shadow-sm transition hover:border-[#0284c7] hover:text-[#0284c7]"
          >
            Open detailed registration
          </Link>
        </div>
      </div>
      <RegistrationForm />
    </div>
  );
}
