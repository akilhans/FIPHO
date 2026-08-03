import Link from "next/link";

import { BrandLockup } from "@/components/brand-lockup";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[linear-gradient(180deg,_#f8f3ea_0%,_#f2eadf_100%)] px-6 text-center">
      <BrandLockup priority />
      <h2 className="text-xl font-semibold">Page not found</h2>
      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
      >
        Go home
      </Link>
    </div>
  );
}
