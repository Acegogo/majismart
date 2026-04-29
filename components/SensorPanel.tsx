"use client";

import { useEffect, useState } from "react";
import { INITIAL_SENSORS, SensorReading } from "@/lib/mockData";
import { Cpu, Droplet, Gauge, Power, Sprout } from "lucide-react";

type Status = SensorReading["status"];

const iconFor = (m: SensorReading["metric"]) => {
  switch (m) {
    case "moisture": return <Sprout className="w-3.5 h-3.5" />;
    case "tank":     return <Droplet className="w-3.5 h-3.5" />;
    case "flow":     return <Gauge className="w-3.5 h-3.5" />;
    case "pump":     return <Power className="w-3.5 h-3.5" />;
  }
};

const statusToTone: Record<
  Status,
  { bar: string; text: string; ring: string; chip: string; glow: string }
> = {
  ok: {
    bar: "bg-gradient-to-r from-[#00FF88] to-[#22FFAA]",
    text: "text-[#00FF88]",
    ring: "ring-[rgba(0,255,136,0.25)]",
    chip: "bg-[rgba(0,255,136,0.10)] text-[#00FF88] border-[rgba(0,255,136,0.40)]",
    glow: "hover:shadow-[0_0_22px_rgba(0,255,136,0.25)]",
  },
  warn: {
    bar: "bg-gradient-to-r from-[#FFC857] to-[#FFE38A]",
    text: "text-[#FFC857]",
    ring: "ring-[rgba(255,200,87,0.25)]",
    chip: "bg-[rgba(255,200,87,0.10)] text-[#FFC857] border-[rgba(255,200,87,0.40)]",
    glow: "hover:shadow-[0_0_22px_rgba(255,200,87,0.25)]",
  },
  crit: {
    bar: "bg-gradient-to-r from-[#FF4D4D] to-[#FF8585]",
    text: "text-[#FF4D4D]",
    ring: "ring-[rgba(255,77,77,0.30)]",
    chip: "bg-[rgba(255,77,77,0.10)] text-[#FF4D4D] border-[rgba(255,77,77,0.40)]",
    glow: "hover:shadow-[0_0_22px_rgba(255,77,77,0.30)]",
  },
};

const computeStatus = (s: SensorReading, value: number): Status => {
  switch (s.metric) {
    case "moisture":
      if (value < 25) return "crit";
      if (value < 40) return "warn";
      return "ok";
    case "tank":
      if (value < 30) return "crit";
      if (value < 50) return "warn";
      return "ok";
    case "flow":
      if (value < 60) return "crit";
      if (value < 100) return "warn";
      return "ok";
    case "pump":
      return value === 1 ? "ok" : "crit";
  }
};

const jitter = (s: SensorReading): number => {
  switch (s.metric) {
    case "moisture":
      return clamp(s.value + (Math.random() - 0.5) * 1.6, 5, 95);
    case "tank":
      return clamp(s.value + (Math.random() - 0.5) * 0.8, 5, 99);
    case "flow":
      return clamp(s.value + (Math.random() - 0.5) * 6, 0, 260);
    case "pump":
      // 5% chance to flip — but bias toward staying same to keep coherent
      return Math.random() < 0.04 ? (s.value === 1 ? 0 : 1) : s.value;
  }
};

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

export default function SensorPanel() {
  const [sensors, setSensors] = useState<SensorReading[]>(INITIAL_SENSORS);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setSensors((prev) =>
        prev.map((s) => {
          const v = jitter(s);
          const status = computeStatus(s, v);
          let unit = s.unit;
          if (s.metric === "pump") unit = v === 1 ? "ON" : "OFF";
          return { ...s, value: v, unit, status };
        })
      );
      setTick((x) => x + 1);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="panel h-full">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-[#00E5FF]" />
          <h2 className="panel-title">Live Sensor Telemetry</h2>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/45">
          <span className="status-dot cyan animate-blinker" />
          Streaming · t={tick.toString().padStart(3, "0")}
        </div>
      </div>
      <div className="panel-body grid grid-cols-1 sm:grid-cols-2 gap-2">
        {sensors.map((s) => {
          const tone = statusToTone[s.status];
          const isPump = s.metric === "pump";
          const pct =
            s.metric === "flow"
              ? clamp((s.value / 260) * 100, 0, 100)
              : isPump
              ? s.value === 1
                ? 100
                : 0
              : s.value;
          return (
            <div
              key={s.id}
              className={`rounded-xl border border-[rgba(0,229,255,0.12)] bg-gradient-to-br from-[rgba(0,229,255,0.04)] to-transparent p-3 ring-1 ${tone.ring} ${tone.glow} relative overflow-hidden transition-all duration-300`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-[11px] text-white/85">
                  <span className={`flex items-center justify-center w-6 h-6 rounded-md bg-[rgba(0,229,255,0.06)] border border-[rgba(0,229,255,0.18)] ${tone.text}`}>
                    {iconFor(s.metric)}
                  </span>
                  <span className="truncate font-medium">{s.label}</span>
                </div>
                <span
                  className={`shrink-0 text-[9px] uppercase tracking-widest font-mono px-1.5 py-0.5 rounded border ${tone.chip}`}
                >
                  {s.status === "ok" ? "Nominal" : s.status === "warn" ? "Warn" : "Crit"}
                </span>
              </div>

              <div className="mt-2 flex items-baseline justify-between">
                <div className={`font-mono text-2xl font-semibold tabular-nums ${tone.text} drop-shadow-[0_0_10px_currentColor]`}>
                  {isPump
                    ? s.unit
                    : s.metric === "flow"
                    ? s.value.toFixed(0)
                    : s.value.toFixed(1)}
                  {!isPump && (
                    <span className="text-xs text-white/55 ml-1">{s.unit}</span>
                  )}
                </div>
                <div className="text-[10px] text-white/55 font-mono uppercase">
                  {s.region}
                </div>
              </div>

              <div className="mt-2 h-1.5 rounded-full bg-[rgba(0,229,255,0.08)] overflow-hidden">
                <div
                  className={`h-full ${tone.bar} transition-all duration-700 shadow-[0_0_12px_currentColor]`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
