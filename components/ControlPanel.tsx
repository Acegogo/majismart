"use client";

import { useState } from "react";
import { CalendarClock, Power, Sliders, Check } from "lucide-react";
import { REGIONS } from "@/lib/mockData";

export default function ControlPanel() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() => {
    const o: Record<string, boolean> = {};
    REGIONS.forEach((r) => (o[r.id] = r.status !== "critical"));
    return o;
  });
  const [threshold, setThreshold] = useState(35);
  const [scheduleStart, setScheduleStart] = useState("05:30");
  const [scheduleDuration, setScheduleDuration] = useState(45);
  const [scheduleSaved, setScheduleSaved] = useState(false);

  const handleSave = () => {
    setScheduleSaved(true);
    setTimeout(() => setScheduleSaved(false), 1800);
  };

  return (
    <div className="panel h-full">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-[#00E5FF]" />
          <h2 className="panel-title">Operational Control</h2>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-white/55 font-mono">
          Demo — UI only
        </span>
      </div>

      <div className="panel-body flex flex-col gap-4">
        {/* Irrigation toggles */}
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/55 font-mono mb-2">
            <Power className="w-3 h-3" />
            Irrigation Schemes
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {REGIONS.map((r) => {
              const on = enabled[r.id];
              return (
                <button
                  key={r.id}
                  onClick={() =>
                    setEnabled((prev) => ({ ...prev, [r.id]: !prev[r.id] }))
                  }
                  className={`flex items-center justify-between rounded-xl border p-3 text-left transition-all duration-300 ${
                    on
                      ? "border-[rgba(0,229,255,0.40)] bg-gradient-to-br from-[rgba(0,229,255,0.10)] to-transparent shadow-[0_0_18px_rgba(0,229,255,0.18)]"
                      : "border-[rgba(0,229,255,0.10)] bg-[rgba(0,229,255,0.03)] hover:border-[rgba(0,229,255,0.25)] hover:shadow-[0_0_14px_rgba(0,229,255,0.12)]"
                  }`}
                >
                  <div>
                    <div className="text-sm font-semibold">
                      {r.name.split(" ")[0]}
                    </div>
                    <div className="text-[11px] text-white/55">{r.county}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-widest ${
                        on ? "text-[#00E5FF]" : "text-white/55"
                      }`}
                    >
                      {on ? "On" : "Off"}
                    </span>
                    <span
                      className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
                        on
                          ? "bg-gradient-to-r from-[#00E5FF] to-[#00FF88] shadow-[0_0_12px_rgba(0,229,255,0.7)]"
                          : "bg-white/15"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${
                          on ? "left-[22px]" : "left-0.5"
                        }`}
                      />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Threshold slider */}
        <div className="rounded-xl border border-[rgba(0,229,255,0.18)] bg-gradient-to-br from-[rgba(0,229,255,0.05)] to-transparent p-3 shadow-glow">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-white/65 font-mono">
            <span>Soil Moisture Threshold</span>
            <span className="text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.6)] text-base font-semibold tabular-nums">
              {threshold}
              <span className="text-white/55 text-[10px] ml-1">% target</span>
            </span>
          </div>
          <input
            className="maji-slider mt-3"
            type="range"
            min={10}
            max={70}
            value={threshold}
            onChange={(e) => setThreshold(parseInt(e.target.value, 10))}
          />
          <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-white/55">
            <span>Drier · 10%</span>
            <span>Auto-irrigation triggers below this value</span>
            <span>70% · Wetter</span>
          </div>
        </div>

        {/* Schedule */}
        <div className="rounded-xl border border-[rgba(0,229,255,0.12)] bg-gradient-to-br from-[rgba(0,229,255,0.04)] to-transparent p-3">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-white/65 font-mono">
            <span className="flex items-center gap-1.5">
              <CalendarClock className="w-3 h-3 text-[#00E5FF]" />
              Daily Irrigation Schedule
            </span>
            <span className="text-white/50">Repeats every 24 h</span>
          </div>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-white/45 font-mono uppercase tracking-widest">
                Start time
              </label>
              <input
                type="time"
                value={scheduleStart}
                onChange={(e) => setScheduleStart(e.target.value)}
                className="bg-[rgba(0,229,255,0.04)] border border-[rgba(0,229,255,0.20)] rounded-md px-2 py-1.5 text-sm font-mono focus:outline-none focus:border-[rgba(0,229,255,0.60)] focus:shadow-[0_0_12px_rgba(0,229,255,0.30)] transition-all duration-300 [color-scheme:dark]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-white/45 font-mono uppercase tracking-widest">
                Duration (min)
              </label>
              <input
                type="number"
                min={5}
                max={240}
                step={5}
                value={scheduleDuration}
                onChange={(e) =>
                  setScheduleDuration(parseInt(e.target.value || "0", 10))
                }
                className="bg-[rgba(0,229,255,0.04)] border border-[rgba(0,229,255,0.20)] rounded-md px-2 py-1.5 text-sm font-mono focus:outline-none focus:border-[rgba(0,229,255,0.60)] focus:shadow-[0_0_12px_rgba(0,229,255,0.30)] transition-all duration-300"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-white/45 font-mono uppercase tracking-widest">
                Action
              </label>
              <button
                onClick={handleSave}
                className={`rounded-md px-3 py-1.5 text-sm font-medium border transition-all duration-300 ${
                  scheduleSaved
                    ? "border-[rgba(0,255,136,0.50)] bg-[rgba(0,255,136,0.12)] text-[#00FF88] shadow-[0_0_18px_rgba(0,255,136,0.30)]"
                    : "border-[rgba(0,229,255,0.40)] bg-gradient-to-r from-[rgba(0,229,255,0.10)] to-[rgba(0,255,136,0.08)] text-[#00E5FF] hover:shadow-[0_0_18px_rgba(0,229,255,0.35)] hover:border-[rgba(0,229,255,0.65)]"
                }`}
              >
                {scheduleSaved ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" /> Schedule queued
                  </span>
                ) : (
                  "Apply schedule"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
