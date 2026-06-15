import Link from "next/link";
import { cn } from "@/lib/utils";
import { Atom } from "lucide-react";

export function FiphoLogo({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const textColor = variant === "light" ? "text-white" : "text-fipho-navy";
  const accentColor = variant === "light" ? "text-fipho-gold" : "text-fipho-blue";

  return (
    <Link href="/" className={cn("flex items-center gap-3 group", className)}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-fipho-gold/10 border border-fipho-gold/30 group-hover:bg-fipho-gold/20 transition-colors">
        <Atom className="h-5 w-5 text-fipho-gold" />
      </div>
      <div className="flex flex-col leading-none">
        <span className={cn("font-heading text-xl font-bold tracking-wide", textColor)}>
          FIPHO
        </span>
        <span className={cn("text-[9px] font-medium tracking-widest uppercase mt-0.5", accentColor)}>
          Physics Olympiad
        </span>
      </div>
    </Link>
  );
}
