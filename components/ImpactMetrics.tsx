"use client";

import { Leaf, TrendingUp, Wallet } from "lucide-react";
import AnimatedNumber from "./AnimatedNumber";
import { memo, useEffect, useState } from "react";

interface ImpactCard {
  id: string;
  label: string;
  value: number;
  decimals: number;
  prefix: string;
  suffix: string;
  caption: string;
  icon: React.ReactNode;
  accent: "primary" | "green" | "warn";
}

const CARDS: ImpactCard[] = [
  {
    id: "saved",
    label: "Water Saved",
    value: 2.4,
    decimals: 2,
    prefix: "+",
    suffix: "M m³",
    caption: "vs. baseline irrigation (FY 2025)",
    icon: <Leaf className="w-5 h-5" />,
    accent: "primary",
  },
  {
    id: "yield",
    label: "Yield Increase",
    value: 28,
    decimals: 0,
    prefix: "+",
    suffix: "%",
    caption: "across enrolled smallholder farms",
    icon: <TrendingUp className="w-5 h-5" />,
    accent: "green",
  },
  {
    id: "cost",
    label: "Cost Reduction",
    value: 35,
    decimals: 0,
    prefix: "−",
    suffix: "%",
    caption: "operating cost per hectare-month",
    icon: <Wallet className="w-5 h-5" />,
    accent: "warn",
  },
];

const ACCENTS: Record<
  ImpactCard["accent"],
  { text: string; bg: string; border: string; bar: string; glow: string }
> = {
  primary: {
    text: "text-[#00E5FF]",
    bg: "from-[rgba(0,229,255,0.18)]",
    border: "border-[rgba(0,229,255,0.35)]",
    bar: "from-[#00E5FF] to-[#22FFAA]",
    glow: "hover:shadow-[0_0_36px_rgba(0,229,255,0.32)]",
  },
  green: {
    text: "text-[#00FF88]",
    bg: "from-[rgba(0,255,136,0.18)]",
    border: "border-[rgba(0,255,136,0.35)]",
    bar: "from-[#00FF88] to-[#00E5FF]",
    glow: "hover:shadow-[0_0_36px_rgba(0,255,136,0.30)]",
  },
  warn: {
    text: "text-[#FFC857]",
    bg: "from-[rgba(255,200,87,0.18)]",
    border: "border-[rgba(255,200,87,0.35)]",
    bar: "from-[#FFC857] to-[#FF8A6B]",
    glow: "hover:shadow-[0_0_36px_rgba(255,200,87,0.30)]",
  },
};

const ImpactCardBlock = memo(function ImpactCardBlock({
  c,
  progress,
}: {
  c: ImpactCard;
  progress: number;
}) {
  const A = ACCENTS[c.accent];
  return (
    <div
      className={`relative rounded-2xl border ${A.border} bg-gradient-to-br ${A.bg} to-transparent p-4 overflow-hidden lift-card transition-all duration-300 ${A.glow}`}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(400px 200px at 80% -10%, rgba(255,255,255,0.06), transparent 60%)",
        }}
      />
      <div className="relative flex items-center justify-between">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center bg-[rgba(0,229,255,0.06)] border border-[rgba(0,229,255,0.20)] ${A.text} shadow-glow`}
        >
          {c.icon}
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/55">
          YTD
        </span>
      </div>
      <div className="relative mt-4 text-[11px] uppercase tracking-widest text-white/65">
        {c.label}
      </div>
      <div
        className={`relative mt-1 font-mono text-4xl font-semibold tabular-nums ${A.text} drop-shadow-[0_0_18px_currentColor]`}
      >
        <AnimatedNumber
          value={c.value}
          decimals={c.decimals}
          prefix={c.prefix}
          suffix={c.suffix}
          duration={1200}
        />
      </div>
      <div className="relative mt-2 text-[11px] text-white/65">{c.caption}</div>
      <div className="relative mt-3 h-1.5 rounded-full bg-[rgba(0,229,255,0.08)] overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${A.bar} transition-all duration-[1200ms] ease-out shadow-[0_0_8px_currentColor]`}
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
});

export default function ImpactMetrics() {
  const [progress, setProgress] = useState<number[]>(CARDS.map(() => 0));

  useEffect(() => {
    const t = setTimeout(() => setProgress(CARDS.map(() => 1)), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <span className="status-dot green animate-blinker" />
          <h2 className="panel-title">National Impact (Year-to-date)</h2>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-white/55 font-mono">
          Verified by KARLO · MoWS&I
        </span>
      </div>
      <div className="panel-body grid grid-cols-1 md:grid-cols-3 gap-3">
        {CARDS.map((c, i) => (
          <ImpactCardBlock key={c.id} c={c} progress={progress[i]} />
        ))}
      </div>
    </div>
  );
}
