"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  BarChart,
  Bar,
  Cell,
  ComposedChart,
  Legend,
} from "recharts";
import { DAILY_USAGE, REGIONS } from "@/lib/mockData";
import { TrendingUp } from "lucide-react";

const tooltipStyle = {
  background: "rgba(11, 20, 38, 0.95)",
  border: "1px solid rgba(0, 229, 255, 0.35)",
  borderRadius: 12,
  fontSize: 12,
  padding: "10px 12px",
  color: "#e6f1ff",
  boxShadow: "0 0 24px rgba(0, 229, 255, 0.18)",
  backdropFilter: "blur(8px)",
};

const COLOR_FOR_STATUS: Record<string, string> = {
  optimal: "#00FF88",
  warning: "#FFC857",
  critical: "#FF4D4D",
};

export default function WaterCharts() {
  const regionData = REGIONS.map((r) => ({
    name: r.name.split(" ")[0],
    usage: Math.round(r.waterUsage / 1000),
    efficiency: r.efficiency,
    color: COLOR_FOR_STATUS[r.status] || "#00E5FF",
  }));

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
      <div className="panel">
        <div className="panel-header">
          <div className="flex items-center gap-2">
            <span className="status-dot cyan animate-blinker" />
            <h2 className="panel-title">Daily Water Consumption</h2>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-[#00FF88] font-mono">
            <TrendingUp className="w-3 h-3" /> +3.2% wk-over-wk
          </div>
        </div>
        <div className="panel-body h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={DAILY_USAGE} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="useGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity={0.65} />
                  <stop offset="60%" stopColor="#00FF88" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="#00FF88" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="useStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00E5FF" />
                  <stop offset="100%" stopColor="#00FF88" />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(0, 229, 255, 0.08)" vertical={false} />
              <XAxis
                dataKey="day"
                stroke="rgba(230, 241, 255, 0.55)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="rgba(230, 241, 255, 0.55)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={40}
                tickFormatter={(v) => `${v}k`}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                cursor={{ stroke: "rgba(0, 229, 255, 0.5)", strokeDasharray: "3 3" }}
                formatter={(v: number, n: string) => [
                  `${v.toLocaleString()} k m³`,
                  n === "consumption" ? "Consumption" : "Target",
                ]}
              />
              <Legend
                wrapperStyle={{ fontSize: 11, color: "rgba(230, 241, 255, 0.7)" }}
                iconType="plainline"
              />
              <Area
                type="monotone"
                dataKey="consumption"
                stroke="url(#useStroke)"
                strokeWidth={2.5}
                fill="url(#useGrad)"
                dot={{ r: 3, stroke: "#00E5FF", strokeWidth: 2, fill: "#0B1426" }}
                activeDot={{ r: 6, stroke: "#00FF88", strokeWidth: 2, fill: "#0B1426" }}
                name="Consumption"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="rgba(255, 200, 87, 0.85)"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
                name="Target"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div className="flex items-center gap-2">
            <span className="status-dot green" />
            <h2 className="panel-title">Regional Water Distribution</h2>
          </div>
          <div className="text-[10px] text-white/55 font-mono uppercase tracking-widest">
            k m³ / day
          </div>
        </div>
        <div className="panel-body h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regionData} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
              <defs>
                {regionData.map((d, i) => (
                  <linearGradient
                    key={`bar-${i}`}
                    id={`barGrad-${i}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={d.color} stopOpacity={1} />
                    <stop offset="100%" stopColor={d.color} stopOpacity={0.35} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid stroke="rgba(0, 229, 255, 0.08)" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="rgba(230, 241, 255, 0.55)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="rgba(230, 241, 255, 0.55)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={40}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                cursor={{ fill: "rgba(0, 229, 255, 0.06)" }}
                formatter={(v: number) => [`${v} k m³`, "Usage"]}
              />
              <Bar dataKey="usage" radius={[8, 8, 0, 0]} maxBarSize={64}>
                {regionData.map((d, i) => (
                  <Cell
                    key={i}
                    fill={`url(#barGrad-${i})`}
                    stroke={d.color}
                    strokeOpacity={0.6}
                    strokeWidth={1}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
