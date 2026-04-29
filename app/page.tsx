import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OverviewCards from "@/components/OverviewCards";
import MapPanel from "@/components/MapPanel";
import WaterCharts from "@/components/WaterCharts";
import SensorPanel from "@/components/SensorPanel";
import AlertsPanel from "@/components/AlertsPanel";
import ControlPanel from "@/components/ControlPanel";
import ImpactMetrics from "@/components/ImpactMetrics";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="relative flex-1">
        <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="aurora" />
        </div>
        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-4">
          {/* Section title */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">
                Operational Theatre
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight bg-gradient-to-r from-white via-[#00E5FF] to-[#00FF88] bg-clip-text text-transparent">
                National Irrigation Overview
              </h2>
              <p className="text-xs text-white/65 max-w-2xl">
                Real-time view of water distribution, scheme performance, and
                field telemetry across the MAJISMART network.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-white/70">
              <span className="status-dot green animate-blinker" />
              <span className="font-mono uppercase tracking-widest">
                Live · Simulated demonstration data
              </span>
            </div>
          </div>

          <OverviewCards />

          <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-4">
            <MapPanel />
            <AlertsPanel />
          </div>

          <WaterCharts />

          <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-4">
            <SensorPanel />
            <ControlPanel />
          </div>

          <ImpactMetrics />
        </div>
      </main>

      <Footer />
    </div>
  );
}
