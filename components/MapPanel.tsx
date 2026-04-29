"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { REGIONS, RegionStatus } from "@/lib/mockData";
import { MapPin, Droplet, Leaf, Activity } from "lucide-react";

const KenyaMap = dynamic(() => import("./KenyaMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full grid place-items-center text-white/50 text-xs">
      Loading map…
    </div>
  ),
});

const statusColor = (s: RegionStatus) =>
  s === "optimal"
    ? "text-[#00FF88]"
    : s === "warning"
    ? "text-[#FFC857]"
    : "text-[#FF4D4D]";

const statusBadge = (s: RegionStatus) =>
  s === "optimal"
    ? "bg-[rgba(0,255,136,0.10)] text-[#00FF88] border-[rgba(0,255,136,0.40)]"
    : s === "warning"
    ? "bg-[rgba(255,200,87,0.10)] text-[#FFC857] border-[rgba(255,200,87,0.40)]"
    : "bg-[rgba(255,77,77,0.10)] text-[#FF4D4D] border-[rgba(255,77,77,0.40)]";

export default function MapPanel() {
  const [selectedId, setSelectedId] = useState<string | null>("mwea");
  const selected =
    REGIONS.find((r) => r.id === selectedId) ?? REGIONS[0];

  return (
    <div className="panel h-full">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <span className="status-dot cyan animate-blinker" />
          <h2 className="panel-title">National Coverage Map</h2>
        </div>
        <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
          {REGIONS.length} active sites
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-3 p-3">
        <div className="relative h-[420px] lg:h-[500px] rounded-xl overflow-hidden border border-white/5">
          <KenyaMap selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-[rgba(0,229,255,0.18)] bg-gradient-to-br from-[rgba(0,229,255,0.06)] to-transparent p-3 shadow-glow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-white/70">
                <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span className="font-mono uppercase tracking-widest">
                  Region
                </span>
              </div>
              <span
                className={`text-[10px] uppercase tracking-widest border px-1.5 py-0.5 rounded font-mono ${statusBadge(
                  selected.status
                )}`}
              >
                {selected.status}
              </span>
            </div>
            <div className="mt-2 text-base font-semibold">{selected.name}</div>
            <div className="text-xs text-white/55">{selected.county}</div>
            <p className="mt-2 text-[11px] leading-relaxed text-white/65">
              {selected.notes}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Stat
              icon={<Droplet className="w-3.5 h-3.5" />}
              label="Water usage"
              value={`${(selected.waterUsage / 1000).toFixed(1)}k m³`}
              hint="per day"
            />
            <Stat
              icon={<Leaf className="w-3.5 h-3.5" />}
              label="Soil moisture"
              value={`${selected.soilMoisture}%`}
              hint="avg sectors"
            />
            <Stat
              icon={<Activity className="w-3.5 h-3.5" />}
              label="Efficiency"
              value={`${selected.efficiency}%`}
              hint="vs target"
            />
            <Stat
              icon={<MapPin className="w-3.5 h-3.5" />}
              label="Schemes"
              value={String(selected.schemes)}
              hint="under mgmt"
            />
          </div>

          <div className="rounded-xl border border-[rgba(0,229,255,0.10)] bg-gradient-to-br from-[rgba(0,229,255,0.04)] to-transparent p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/70 uppercase tracking-widest font-mono">
                Other sites
              </span>
            </div>
            <div className="mt-2 flex flex-col gap-1">
              {REGIONS.filter((r) => r.id !== selected.id).map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedId(r.id)}
                  className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-[rgba(0,229,255,0.08)] hover:shadow-[0_0_18px_rgba(0,229,255,0.15)] transition-all duration-300 text-left border border-transparent hover:border-[rgba(0,229,255,0.25)]"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`status-dot ${
                        r.status === "optimal"
                          ? "green"
                          : r.status === "warning"
                          ? "amber"
                          : "red"
                      }`}
                    />
                    <span className="font-medium">{r.name.split(" ")[0]}</span>
                  </span>
                  <span className={`font-mono ${statusColor(r.status)}`}>
                    {r.efficiency}%
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-[rgba(0,229,255,0.10)] bg-gradient-to-br from-[rgba(0,229,255,0.04)] to-transparent p-3 transition-all duration-300 hover:border-[rgba(0,229,255,0.30)] hover:shadow-[0_0_18px_rgba(0,229,255,0.15)]">
      <div className="flex items-center gap-1.5 text-[10px] text-white/65 uppercase tracking-widest font-mono">
        {icon}
        {label}
      </div>
      <div className="mt-1 font-mono text-lg font-semibold text-[#00E5FF] tabular-nums drop-shadow-[0_0_10px_rgba(0,229,255,0.4)]">
        {value}
      </div>
      {hint && <div className="text-[10px] text-white/45">{hint}</div>}
    </div>
  );
}
