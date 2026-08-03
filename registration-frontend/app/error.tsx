"use client";

import { BrandLockup } from "@/components/brand-lockup";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  void error;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[linear-gradient(180deg,_#f8f3ea_0%,_#f2eadf_100%)] px-6 text-center">
      <BrandLockup priority />
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-muted-foreground">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
      >
        Try again
      </button>
    </div>
  );
}
