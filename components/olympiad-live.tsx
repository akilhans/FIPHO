"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { CheckCircle2, FlaskConical, NotebookPen } from "lucide-react";

// Flags: flag-icons 7.5.0 (MIT), copied into public/flags.
const DELEGATIONS = [
  { name: "China", code: "cn" },
  { name: "Jordan", code: "jo" },
  { name: "Kazakhstan", code: "kz" },
  { name: "Kyrgyzstan", code: "kg" },
  { name: "Kuwait", code: "kw" },
  { name: "Latvia", code: "lv" },
  { name: "Malaysia", code: "my" },
  { name: "Mongolia", code: "mn" },
  { name: "Qatar", code: "qa" },
  { name: "Romania", code: "ro" },
  { name: "Russia", code: "ru" },
  { name: "Türkiye", code: "tr" },
  { name: "Turkmenistan", code: "tm" },
  { name: "Uzbekistan", code: "uz", host: true },
  { name: "Vietnam", code: "vn" },
];

// Times from the official programme (public/docs/programme.pdf), Uzbekistan time.
const EXAMS = [
  {
    title: "Practical Examination",
    icon: FlaskConical,
    date: "2026-10-12",
    weekday: "Monday",
    start: "2026-10-12T09:00:00+05:00",
    end: "2026-10-12T14:00:00+05:00",
  },
  {
    title: "Theoretical Examination",
    icon: NotebookPen,
    date: "2026-10-14",
    weekday: "Wednesday",
    start: "2026-10-14T09:00:00+05:00",
    end: "2026-10-14T14:00:00+05:00",
  },
];

type Status =
  | { kind: "upcoming"; label: string }
  | { kind: "live" }
  | { kind: "done" };

const UZT_OFFSET_MS = 5 * 60 * 60 * 1000;

function examStatus(exam: (typeof EXAMS)[number], now: number): Status {
  const start = Date.parse(exam.start);
  const end = Date.parse(exam.end);
  if (now >= end) return { kind: "done" };
  if (now >= start) return { kind: "live" };
  const todayUzt = new Date(now + UZT_OFFSET_MS).toISOString().slice(0, 10);
  const days = Math.round((Date.parse(exam.date) - Date.parse(todayUzt)) / 86400000);
  if (days <= 0) return { kind: "upcoming", label: "Today · starts at 09:00" };
  if (days === 1) return { kind: "upcoming", label: "Tomorrow" };
  return { kind: "upcoming", label: `In ${days} days` };
}

function startsIn(exam: (typeof EXAMS)[number], now: number) {
  const left = Math.max(0, Date.parse(exam.start) - now);
  const days = Math.floor(left / 86400000);
  const pad = (n: number) => String(n).padStart(2, "0");
  const hms = `${pad(Math.floor((left % 86400000) / 3600000))}:${pad(
    Math.floor((left % 3600000) / 60000)
  )}:${pad(Math.floor((left % 60000) / 1000))}`;
  return days ? `${days}d ${hms}` : hms;
}

function FlagChip({ name, code, host }: (typeof DELEGATIONS)[number]) {
  return (
    <li
      className={`flex shrink-0 items-center gap-2.5 rounded-xl border px-3.5 py-2 transition hover:-translate-y-0.5 ${
        host
          ? "border-accent/50 bg-accent/10"
          : "border-white/10 bg-white/[0.05] hover:border-white/30"
      }`}
    >
      <Image
        src={`/flags/${code}.svg`}
        alt=""
        width={28}
        height={21}
        unoptimized
        className="h-[21px] w-7 shrink-0 rounded-[3px] object-cover ring-1 ring-white/20"
      />
      <span className="whitespace-nowrap text-sm text-white/85">{name}</span>
      {host && (
        <span className="font-mono-ui text-[9px] uppercase tracking-wider text-accent">
          Host
        </span>
      )}
    </li>
  );
}

function MarqueeRow({
  items,
  reverse,
  duration,
}: {
  items: (typeof DELEGATIONS)[number][];
  reverse?: boolean;
  duration: string;
}) {
  // Two copies side by side; the track slides by half its width and loops.
  return (
    <div className="live-marquee overflow-hidden py-1">
      <div
        className="live-marquee-track"
        data-reverse={reverse ? "" : undefined}
        style={{ "--live-duration": duration } as CSSProperties}
      >
        {[false, true].map((copy) => (
          <ul
            key={String(copy)}
            aria-hidden={copy || undefined}
            className="flex shrink-0 gap-3 pr-3"
          >
            {items.map((delegation) => (
              <FlagChip key={delegation.code} {...delegation} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function StatusChip({ status }: { status: Status | null }) {
  if (!status) return null;
  if (status.kind === "live") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        In progress
      </span>
    );
  }
  if (status.kind === "done") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/60">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Completed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-accent/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
      {status.label}
    </span>
  );
}

export function OlympiadLive() {
  // Status depends on the visitor's clock, so it is computed after mount.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
      {/* Live banner */}
      <div className="live-shimmer relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-emerald-400/30 bg-emerald-400/10 px-6 py-2.5 shadow-[0_0_40px_rgba(52,211,153,0.15)] backdrop-blur-sm">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
        </span>
        <span className="font-mono-ui text-sm md:text-base tracking-[0.2em] uppercase text-emerald-200">
          The Olympiad is open now
        </span>
      </div>

      {/* Exams */}
      <div className="grid w-full gap-4 sm:grid-cols-2">
        {EXAMS.map((exam, index) => {
          const status = now === null ? null : examStatus(exam, now);
          const isNext =
            now !== null &&
            EXAMS.find((e) => Date.parse(e.start) > now)?.title === exam.title;
          const day = Number(exam.date.slice(8));
          return (
            <div
              key={exam.title}
              className={`live-border animate-fade-in group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left backdrop-blur-md transition-transform hover:-translate-y-1 ${
                status?.kind === "done" ? "[&::before]:hidden" : ""
              }`}
              style={{
                animationDelay: `${0.45 + index * 0.15}s`,
                ...(status?.kind === "live"
                  ? ({ "--live-color": "rgba(52, 211, 153, 0.95)" } as CSSProperties)
                  : {}),
              }}
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent via-accent/60 to-transparent" />
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center justify-center rounded-xl border border-accent/30 bg-accent/10 px-3.5 py-2 min-w-[4.25rem]">
                  <span className="font-heading text-3xl font-semibold leading-none text-white">
                    {day}
                  </span>
                  <span className="mt-1 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-accent">
                    Oct
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-white">
                    <exam.icon className="h-4 w-4 shrink-0 text-accent" />
                    <h3 className="font-heading text-lg font-semibold leading-tight">
                      {exam.title}
                    </h3>
                  </div>
                  <p className="mt-1 font-mono-ui text-xs text-white/60">
                    {exam.weekday} · 09:00–14:00 · 5 hours
                  </p>
                  <div className="mt-3 flex min-h-[1.5rem] flex-wrap items-center gap-x-3 gap-y-1">
                    <StatusChip status={status} />
                    {isNext && now !== null && (
                      <span className="font-mono-ui text-xs tabular-nums text-white/70">
                        Starts in {startsIn(exam, now)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delegations */}
      <div className="w-full">
        <p className="mb-4 font-mono-ui text-xs uppercase tracking-[0.3em] text-white/50">
          <span className="text-accent">{DELEGATIONS.length}</span> participating delegations
        </p>
        <div className="space-y-3">
          <MarqueeRow items={DELEGATIONS.slice(0, 8)} duration="38s" />
          <MarqueeRow items={DELEGATIONS.slice(8)} duration="34s" reverse />
        </div>
      </div>
    </div>
  );
}
