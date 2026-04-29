"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import { REGIONS, Region, RegionStatus } from "@/lib/mockData";

const colorFor = (s: RegionStatus) =>
  s === "optimal" ? "#00FF88" : s === "warning" ? "#FFC857" : "#FF4D4D";

const labelFor = (s: RegionStatus) =>
  s === "optimal" ? "Optimal" : s === "warning" ? "Warning" : "Critical";

const buildIcon = (status: RegionStatus) =>
  L.divIcon({
    className: "",
    html: `<div class="maji-marker ${
      status === "optimal" ? "green" : status === "warning" ? "amber" : "red"
    }"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

interface KenyaMapProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function KenyaMap({ selectedId, onSelect }: KenyaMapProps) {
  const center = useMemo<[number, number]>(() => [0.2, 37.9], []);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-full w-full grid place-items-center text-white/50 text-xs">
        Initializing map…
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <MapContainer
        center={center}
        zoom={6}
        minZoom={5}
        maxZoom={9}
        scrollWheelZoom={false}
        className="h-full w-full rounded-xl"
        zoomControl={true}
        attributionControl={true}
        worldCopyJump={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains={["a", "b", "c", "d"]}
        />

        {REGIONS.map((r: Region) => (
          <Marker
            key={r.id}
            position={[r.lat, r.lng]}
            icon={buildIcon(r.status)}
            eventHandlers={{
              click: () => onSelect(r.id),
            }}
          >
            <Popup>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-sm">{r.name}</strong>
                  <span
                    style={{ color: colorFor(r.status) }}
                    className="text-[10px] uppercase tracking-widest font-mono"
                  >
                    {labelFor(r.status)}
                  </span>
                </div>
                <div className="text-[11px] text-white/60">{r.county}</div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 mt-1">
                  <span className="text-white/55 text-[11px]">Water use</span>
                  <span className="font-mono text-[11px] text-right">
                    {(r.waterUsage / 1000).toFixed(1)}k m³/day
                  </span>
                  <span className="text-white/55 text-[11px]">Soil moist.</span>
                  <span className="font-mono text-[11px] text-right">
                    {r.soilMoisture}%
                  </span>
                  <span className="text-white/55 text-[11px]">Efficiency</span>
                  <span className="font-mono text-[11px] text-right">
                    {r.efficiency}%
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {selectedId &&
          REGIONS.filter((r) => r.id === selectedId).map((r) => (
            <CircleMarker
              key={`ring-${r.id}`}
              center={[r.lat, r.lng]}
              radius={22}
              pathOptions={{
                color: colorFor(r.status),
                weight: 2,
                opacity: 0.95,
                fillOpacity: 0.08,
              }}
              interactive={false}
            />
          ))}
      </MapContainer>

      {/* Legend overlay */}
      <div className="absolute bottom-3 left-3 z-[400] panel px-3 py-2 text-[11px] flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="status-dot green" /> Optimal
        </div>
        <div className="flex items-center gap-1.5">
          <span className="status-dot amber" /> Warning
        </div>
        <div className="flex items-center gap-1.5">
          <span className="status-dot red" /> Critical
        </div>
      </div>
    </div>
  );
}
