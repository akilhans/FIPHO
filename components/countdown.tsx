"use client";

import { useEffect, useState } from "react";

function getTimeLeft() {
  const target = new Date("2026-11-03T09:00:00");
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

type TimeLeft = ReturnType<typeof getTimeLeft>;

export function Countdown() {
  const [t, setT] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setT(getTimeLeft());
    const id = setInterval(() => setT(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!t) return null;

  const units = [
    { v: t.d, l: "Days" },
    { v: t.h, l: "Hours" },
    { v: t.m, l: "Min" },
    { v: t.s, l: "Sec" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 py-4 border-y border-white/10">
      <span className="text-white/40 text-xs tracking-[0.15em] uppercase font-mono shrink-0">
        Olympiad begins in
      </span>
      <div className="flex gap-2 items-center">
        {units.map(({ v, l }, i) => (
          <div key={l} className="flex items-center gap-2">
            <div className="text-center">
              <div className="bg-fipho-gold/10 border border-fipho-gold/25 rounded-lg px-2.5 py-1.5 min-w-[48px]">
                <span className="font-mono text-xl font-bold text-white tabular-nums leading-none">
                  {String(v).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[9px] text-white/35 uppercase tracking-wider mt-1 block">
                {l}
              </span>
            </div>
            {i < 3 && (
              <span className="text-fipho-gold/40 font-bold text-lg mb-5">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
