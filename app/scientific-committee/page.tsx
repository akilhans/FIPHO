"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";

export default function ScientificCommitteePage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-accent/30">
      {/* Structural ambient lighting gradient to match design system */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle 500px at 50% 40%, rgba(224,181,85,0.06), transparent 70%)",
        }}
      />

      <div className="relative max-w-xl text-center space-y-8 z-10">
        {/* Animated structural icon wrapper */}
        <div className="inline-flex p-4 rounded-2xl bg-accent/5 border border-accent/20 text-accent animate-pulse">
          <GraduationCap className="h-10 w-10 stroke-[1.5]" />
        </div>

        <div className="space-y-4">
          <Badge
            variant="outline"
            className="px-4 py-1 border-accent/30 bg-accent/5 text-accent font-mono-ui tracking-[0.2em] uppercase text-xs rounded-full backdrop-blur-sm"
          >
            Academic Roster
          </Badge>
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight">
            Scientific Committee
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed max-w-md mx-auto">
            Our distinguished lineup of international physicists, researchers, and academic experts is currently being finalized.
          </p>
        </div>

        {/* Structural status indicator component */}
        <div className="p-4 rounded-xl border border-border bg-background-raised flex items-center justify-center gap-3 text-sm font-mono-ui text-muted-foreground max-w-xs mx-auto">
          <Calendar className="h-4 w-4 text-accent" />
          <span>Release Scheduled: July 2026</span>
        </div>

        <div className="pt-4">
          <Link href="/" passHref>
            <Button
              variant="outline"
              className="border-border hover:bg-background-raised rounded-full px-6 py-5 flex items-center gap-2 text-sm font-medium mx-auto transition-all cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}