"use client";

import { useState } from "react";
import { ALERTS, Alert } from "@/lib/mockData";
import { AlertTriangle, AlertOctagon, Info, BellRing } from "lucide-react";

const tone = (s: Alert["severity"]) => {
  switch (s) {
    case "critical":
      return {
        ring: "ring-[rgba(255,77,77,0.40)]",
        text: "text-[#FF4D4D]",
        chip: "bg-[rgba(255,77,77,0.15)] text-[#FF4D4D] border-[rgba(255,77,77,0.45)]",
        glow: "shadow-[0_0_24px_rgba(255,77,77,0.20)]",
        bg: "bg-gradient-to-br from-[rgba(255,77,77,0.08)] to-transparent",
        icon: <AlertOctagon className="w-3.5 h-3.5" />,
        blink: true,
      };
    case "warning":
      return {
        ring: "ring-[rgba(255,200,87,0.35)]",
        text: "text-[#FFC857]",
        chip: "bg-[rgba(255,200,87,0.12)] text-[#FFC857] border-[rgba(255,200,87,0.40)]",
        glow: "shadow-[0_0_18px_rgba(255,200,87,0.15)]",
        bg: "bg-gradient-to-br from-[rgba(255,200,87,0.06)] to-transparent",
        icon: <AlertTriangle className="w-3.5 h-3.5" />,
        blink: false,
      };
    default:
      return {
        ring: "ring-[rgba(0,229,255,0.30)]",
        text: "text-[#00E5FF]",
        chip: "bg-[rgba(0,229,255,0.10)] text-[#00E5FF] border-[rgba(0,229,255,0.40)]",
        glow: "shadow-[0_0_18px_rgba(0,229,255,0.15)]",
        bg: "bg-gradient-to-br from-[rgba(0,229,255,0.06)] to-transparent",
        icon: <Info className="w-3.5 h-3.5" />,
        blink: false,
      };
  }
};

export default function AlertsPanel() {
  const [acked, setAcked] = useState<Set<string>>(new Set());

  const open = ALERTS.filter((a) => !acked.has(a.id));
  const critCount = open.filter((a) => a.severity === "critical").length;

  return (
    <div className="panel h-full">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <BellRing
            className={`w-3.5 h-3.5 text-[#FF4D4D] ${
              critCount > 0 ? "animate-blinker drop-shadow-[0_0_8px_rgba(255,77,77,0.7)]" : ""
            }`}
          />
          <h2 className="panel-title">Active Alerts</h2>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/65">
          <span className="px-1.5 py-0.5 rounded bg-[rgba(255,77,77,0.15)] text-[#FF4D4D] border border-[rgba(255,77,77,0.45)] shadow-[0_0_12px_rgba(255,77,77,0.25)]">
            {critCount} critical
          </span>
          <span className="px-1.5 py-0.5 rounded bg-[rgba(255,200,87,0.10)] text-[#FFC857] border border-[rgba(255,200,87,0.40)]">
            {open.length} open
          </span>
        </div>
      </div>
      <div className="panel-body flex flex-col gap-2 max-h-[420px] overflow-y-auto">
        {open.length === 0 && (
          <div className="text-xs text-white/45 px-1 py-6 text-center">
            All systems nominal — no open alerts.
          </div>
        )}
        {open.map((a) => {
          const t = tone(a.severity);
          return (
            <div
              key={a.id}
              className={`relative rounded-xl border border-[rgba(0,229,255,0.10)] ${t.bg} p-3 ring-1 ${t.ring} ${t.glow} transition-all duration-300`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2 min-w-0">
                  <span
                    className={`shrink-0 mt-0.5 flex items-center justify-center w-7 h-7 rounded-md bg-[rgba(0,229,255,0.06)] border border-[rgba(0,229,255,0.20)] ${t.text} ${
                      t.blink ? "animate-pulseRingDanger" : ""
                    }`}
                  >
                    {t.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold truncate">
                        {a.title}
                      </span>
                      <span
                        className={`shrink-0 text-[9px] uppercase tracking-widest font-mono px-1.5 py-0.5 rounded border ${t.chip}`}
                      >
                        {a.severity}
                      </span>
                    </div>
                    <div className="text-[11px] text-white/50">
                      {a.region} · {a.time}
                    </div>
                    <p className="mt-1 text-[12px] text-white/75 leading-snug">
                      {a.detail}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setAcked((s) => new Set([...s, a.id]))}
                  className="shrink-0 text-[10px] font-mono uppercase tracking-widest text-white/65 hover:text-[#00E5FF] border border-[rgba(0,229,255,0.20)] hover:border-[rgba(0,229,255,0.50)] hover:shadow-[0_0_12px_rgba(0,229,255,0.20)] px-2 py-1 rounded transition-all duration-300"
                >
                  Ack
                </button>
              </div>
            </div>
          );
        })}
        {acked.size > 0 && (
          <button
            onClick={() => setAcked(new Set())}
            className="self-start text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-white/70 transition-colors"
          >
            Reset acknowledged ({acked.size})
          </button>
        )}
      </div>
    </div>
  );
}
