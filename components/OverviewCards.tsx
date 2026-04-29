"use client";

import { memo, useEffect, useState } from "react";
import { Droplets, Layers, Gauge, Siren } from "lucide-react";
import AnimatedNumber from "./AnimatedNumber";
import { useSimulationTick } from "@/lib/SimulationTickContext";

interface CardConfig {
  id: string;
  label: string;
  unit?: string;
  icon: React.ReactNode;
  base: number;
  jitter: number;
  decimals: number;
  delta: number;
  trend: "up" | "down" | "flat";
  accent: "primary" | "green" | "warn" | "danger";
  prefix?: string;
  suffix?: string;
}

const ACCENTS: Record<
  CardConfig["accent"],
  {
    text: string;
    iconBg: string;
    iconBorder: string;
    chip: string;
    glow: string;
    border: string;
    gradient: string;
  }
> = {
  primary: {
    text: "text-[#00E5FF]",
    iconBg: "from-[rgba(0,229,255,0.18)] to-transparent",
    iconBorder: "border-[rgba(0,229,255,0.45)]",
    chip: "bg-[rgba(0,229,255,0.12)] text-[#00E5FF] border-[rgba(0,229,255,0.4)]",
    glow: "hover:shadow-[0_0_36px_rgba(0,229,255,0.35)]",
    border: "hover:border-[rgba(0,229,255,0.55)]",
    gradient:
      "bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.18),transparent_60%)]",
  },
  green: {
    text: "text-[#00FF88]",
    iconBg: "from-[rgba(0,255,136,0.18)] to-transparent",
    iconBorder: "border-[rgba(0,255,136,0.45)]",
    chip: "bg-[rgba(0,255,136,0.12)] text-[#00FF88] border-[rgba(0,255,136,0.4)]",
    glow: "hover:shadow-[0_0_36px_rgba(0,255,136,0.32)]",
    border: "hover:border-[rgba(0,255,136,0.55)]",
    gradient:
      "bg-[radial-gradient(circle_at_top_right,rgba(0,255,136,0.18),transparent_60%)]",
  },
  warn: {
    text: "text-[#FFC857]",
    iconBg: "from-[rgba(255,200,87,0.18)] to-transparent",
    iconBorder: "border-[rgba(255,200,87,0.45)]",
    chip: "bg-[rgba(255,200,87,0.12)] text-[#FFC857] border-[rgba(255,200,87,0.4)]",
    glow: "hover:shadow-[0_0_36px_rgba(255,200,87,0.32)]",
    border: "hover:border-[rgba(255,200,87,0.55)]",
    gradient:
      "bg-[radial-gradient(circle_at_top_right,rgba(255,200,87,0.18),transparent_60%)]",
  },
  danger: {
    text: "text-[#FF4D4D]",
    iconBg: "from-[rgba(255,77,77,0.18)] to-transparent",
    iconBorder: "border-[rgba(255,77,77,0.45)]",
    chip: "bg-[rgba(255,77,77,0.12)] text-[#FF4D4D] border-[rgba(255,77,77,0.4)]",
    glow: "hover:shadow-[0_0_36px_rgba(255,77,77,0.35)]",
    border: "hover:border-[rgba(255,77,77,0.55)]",
    gradient:
      "bg-[radial-gradient(circle_at_top_right,rgba(255,77,77,0.18),transparent_60%)]",
  },
};

const INITIAL: CardConfig[] = [
  {
    id: "water",
    label: "Total Water Distributed",
    icon: <Droplets className="w-5 h-5" />,
    base: 12.4,
    jitter: 0.06,
    decimals: 2,
    delta: 3.2,
    trend: "up",
    accent: "primary",
    suffix: "M m³",
  },
  {
    id: "schemes",
    label: "Active Schemes",
    icon: <Layers className="w-5 h-5" />,
    base: 48,
    jitter: 0,
    decimals: 0,
    delta: 4,
    trend: "up",
    accent: "green",
  },
  {
    id: "efficiency",
    label: "Water Efficiency",
    icon: <Gauge className="w-5 h-5" />,
    base: 67,
    jitter: 1.2,
    decimals: 1,
    delta: 2.1,
    trend: "up",
    accent: "warn",
    suffix: "%",
  },
  {
    id: "alerts",
    label: "Active Alerts",
    icon: <Siren className="w-5 h-5" />,
    base: 6,
    jitter: 0.6,
    decimals: 0,
    delta: -2,
    trend: "down",
    accent: "danger",
  },
];

const OverviewCardItem = memo(function OverviewCardItem({
  cfg,
  value,
}: {
  cfg: CardConfig;
  value: number;
}) {
  const A = ACCENTS[cfg.accent];
  const trendUp = cfg.trend === "up";
  const trendFlat = cfg.trend === "flat";

  return (
    <div
      className={`panel scan-bar lift-card overflow-hidden transition-all duration-300 ${A.glow} ${A.border}`}
    >
      <div className={`absolute inset-0 pointer-events-none ${A.gradient}`} />
      <div className="panel-body relative">
        <div className="flex items-start justify-between">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br border ${A.iconBg} ${A.iconBorder} ${A.text} shadow-glow`}
          >
            {cfg.icon}
          </div>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${A.chip}`}
          >
            {trendFlat ? "—" : trendUp ? "▲" : "▼"} {Math.abs(cfg.delta)}
            {cfg.id === "schemes" || cfg.id === "alerts" ? "" : "%"}
          </span>
        </div>
        <div className="mt-3 text-[11px] uppercase tracking-widest text-white/65">
          {cfg.label}
        </div>
        <div className="mt-1 font-mono text-3xl font-semibold tracking-tight tabular-nums">
          <AnimatedNumber
            value={value}
            decimals={cfg.decimals}
            suffix={cfg.suffix ? ` ${cfg.suffix}` : ""}
            className={`${A.text} drop-shadow-[0_0_14px_currentColor]`}
          />
        </div>
        <div className="mt-2 text-[11px] text-white/55">
          {cfg.id === "water" && "Cumulative — last 24 h, all schemes"}
          {cfg.id === "schemes" && "Across 14 counties"}
          {cfg.id === "efficiency" && "Weighted national average"}
          {cfg.id === "alerts" && "Open across the network"}
        </div>
      </div>
    </div>
  );
});

export default function OverviewCards() {
  const tick = useSimulationTick();
  const [values, setValues] = useState<number[]>(() =>
    INITIAL.map((c) => c.base)
  );

  useEffect(() => {
    if (tick === 0) return;
    setValues((prev) =>
      prev.map((_, i) => {
        const cfg = INITIAL[i];
        if (cfg.jitter === 0) return cfg.base;
        const delta = (Math.random() - 0.5) * cfg.jitter * 2;
        const next = cfg.base + delta;
        return Math.max(0, next);
      })
    );
  }, [tick]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {INITIAL.map((cfg, idx) => (
        <OverviewCardItem key={cfg.id} cfg={cfg} value={values[idx]} />
      ))}
    </div>
  );
}
