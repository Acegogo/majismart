"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Activity, ShieldCheck, Wifi } from "lucide-react";

const formatTime = (d: Date) =>
  d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

const formatDate = (d: Date) =>
  d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export default function Header() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="relative border-b border-[rgba(0,229,255,0.18)]">
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none animate-gridShift" />
      <div
        className="absolute inset-x-0 -bottom-px h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,229,255,0.6), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        {/* Left: MAJISMART branding */}
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[rgba(0,229,255,0.18)] to-[rgba(0,255,136,0.10)] border border-[rgba(0,229,255,0.45)] shadow-glow overflow-hidden transition-all duration-300 hover:shadow-glowStrong hover:scale-[1.03]">
              <Image
                src="/majismart%20logo.png"
                alt="MAJISMART"
                width={48}
                height={48}
                className="w-full h-full object-contain p-1"
                priority
              />
            </div>
            <span className="absolute -bottom-1 -right-1 status-dot cyan animate-blinker" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-base sm:text-lg font-semibold tracking-wide bg-gradient-to-r from-[#00E5FF] via-white to-[#00FF88] bg-clip-text text-transparent">
                MAJISMART National Control Center
              </h1>
              <span className="kbd hidden sm:inline">v1.0 · DEMO</span>
              <span className="live-badge">
                <span className="live-dot" />
                Live System
              </span>
            </div>
            <p className="text-xs text-white/65 tracking-wide">
              Smart Irrigation Monitoring System &middot; Republic of Kenya
            </p>
          </div>
        </div>

        {/* Right: status + clock + Caledonia */}
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
          <div className="flex items-center gap-2 text-xs text-white/80 transition-all duration-300 hover:text-white">
            <ShieldCheck className="w-4 h-4 text-[#00FF88]" />
            <span className="hidden sm:inline">Secure session</span>
            <span className="sm:hidden">Secure</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/80 transition-all duration-300 hover:text-white">
            <Wifi className="w-4 h-4 text-[#00E5FF]" />
            <span>Telemetry: live</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/80 transition-all duration-300 hover:text-white">
            <Activity className="w-4 h-4 text-[#FFC857]" />
            <span>Load 42%</span>
          </div>
          <div className="hidden md:flex flex-col items-end font-mono leading-tight">
            <span className="text-sm text-[#00E5FF] tabular-nums drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">
              {now ? formatTime(now) : "--:--:--"}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-white/55">
              {now ? formatDate(now) : ""}
            </span>
          </div>
          <div className="flex items-center gap-2 pl-3 sm:pl-5 border-l border-[rgba(0,229,255,0.20)]">
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-widest text-white/55">
                Powered by
              </div>
              <div className="text-xs font-semibold text-white/95">
                Caledonia Heights
              </div>
            </div>
            <div
              className="w-10 h-10 rounded-lg border border-[rgba(0,229,255,0.30)] bg-gradient-to-br from-white/[0.06] to-transparent flex items-center justify-center overflow-hidden shadow-glow transition-all duration-300 hover:shadow-glowStrong hover:scale-[1.04]"
              title="Caledonia Heights"
            >
              <Image
                src="/caledonia%20heights%20logo.png"
                alt="Caledonia Heights"
                width={40}
                height={40}
                className="w-full h-full object-contain p-1"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
