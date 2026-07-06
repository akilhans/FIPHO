"use client";

import { useEffect, useState } from "react";
import { BRAND } from "@/lib/brand";

function getTimeLeft() {
  const diff = Math.max(
    0,
    new Date(BRAND.eventStartDate).getTime() - Date.now()
  );
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function Ring({
  value,
  max,
  label,
}: {
  value: number;
  max: number;
  label: string;
}) {
  const size = 84;
  const stroke = 3;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);
  const offset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading font-semibold text-xl tabular-nums">
            {value}
          </span>
        </div>
      </div>
      <span className="font-mono-ui text-[10px] tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  // 1. Initialize state with a stable default value to match the SSR layout perfectly
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 2. Set the real time immediately on mount in the client browser
    setTimeLeft(getTimeLeft());

    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  // 3. Render a visual shell matching the dimensions until client calculations kick in
  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-5 sm:gap-8 opacity-0">
        <Ring value={0} max={365} label="DAYS" />
        <Ring value={0} max={24} label="HOURS" />
        <Ring value={0} max={60} label="MIN" />
        <Ring value={0} max={60} label="SEC" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-5 sm:gap-8 animate-fade-in">
      <Ring value={timeLeft.days} max={365} label="DAYS" />
      <Ring value={timeLeft.hours} max={24} label="HOURS" />
      <Ring value={timeLeft.minutes} max={60} label="MIN" />
      <Ring value={timeLeft.seconds} max={60} label="SEC" />
    </div>
  );
}