"use client";

import { BrandLockup } from "@/components/brand-lockup";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  void error;

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[linear-gradient(180deg,_#f8f3ea_0%,_#f2eadf_100%)] px-6 text-center font-sans">
          <BrandLockup priority />
          <h2 className="text-xl font-semibold">
            Something went wrong
          </h2>
          <p className="text-[#6b7280]">
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            className="rounded-md bg-[#0f172a] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e293b]"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
