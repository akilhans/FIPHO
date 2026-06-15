import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

interface PageShellProps {
  badge?: string;
  title: string;
  description?: string;
  children: ReactNode;
  variant?: "light" | "dark";
}

export function PageShell({
  badge,
  title,
  description,
  children,
  variant = "light",
}: PageShellProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`relative w-full min-h-screen py-20 ${
        isDark ? "bg-fipho-navy" : "bg-fipho-light"
      }`}
    >
      {isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-0 top-0 -translate-x-1/2 translate-y-1/2 h-96 w-96 rounded-full bg-fipho-blue/5 blur-3xl" />
          <div className="absolute right-0 bottom-0 translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-fipho-gold/5 blur-3xl" />
        </div>
      )}

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          {badge && (
            <Badge
              variant="outline"
              className={`mb-4 ${
                isDark
                  ? "border-fipho-gold/30 bg-fipho-gold/10 text-fipho-gold"
                  : "border-fipho-blue/20 bg-fipho-blue/5 text-fipho-blue"
              }`}
            >
              {badge}
            </Badge>
          )}
          <h1
            className={`font-heading mb-4 text-3xl font-bold tracking-tight sm:text-5xl ${
              isDark ? "text-white" : "text-fipho-navy"
            }`}
          >
            {title}
          </h1>
          {description && (
            <p className={isDark ? "text-white/70" : "text-fipho-slate/70"}>
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
