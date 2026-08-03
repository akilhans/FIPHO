import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandLockupProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLockup({
  className,
  priority = false,
}: BrandLockupProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-[1.35rem] border border-[#38bdf8]/55 bg-white px-4 py-3 shadow-[0_16px_40px_rgba(2,132,199,0.16)]",
        className
      )}
    >
      <Image
        src="/logo/fipho-logo.png"
        alt="FIPHO"
        width={3258}
        height={2818}
        priority={priority}
        sizes="152px"
        className="h-20 w-auto max-w-[9.5rem] object-contain"
      />
    </div>
  );
}
