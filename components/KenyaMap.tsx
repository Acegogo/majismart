"use client";

import { memo, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import { REGIONS, type Region, type RegionStatus } from "@/lib/mockData";

const colorFor = (s: RegionStatus) =>
  s === "optimal" ? "#00FF88" : s === "warning" ? "#FFC857" : "#FF4D4D";

const labelFor = (s: RegionStatus) =>
  s === "optimal" ? "Optimal" : s === "warning" ? "Warning" : "Critical";

/** Stable Leaflet icons — created once per session, never per render. */
const REGION_ICONS: Record<RegionStatus, L.DivIcon> = {
  optimal: L.divIcon({
    className: "",
    html: `<div class="maji-marker green"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  }),
  warning: L.divIcon({
    className: "",
    html: `<div class="maji-marker amber"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  }),
  critical: L.divIcon({
    className: "",
    html: `<div class="maji-marker red"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  }),
};

const RegionMarker = memo(function RegionMarker({
  region,
  onSelect,
}: {
  region: Region;
  onSelect: (id: string) => void;
}) {
  const icon = REGION_ICONS[region.status];
  const handlers = useMemo(
    () => ({
      click: () => {
        onSelect(region.id);
      },
    }),
    [region.id, onSelect]
  );

  return (
    <Marker
      position={[region.lat, region.lng]}
      icon={icon}
      eventHandlers={handlers}
    >
      <Popup>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <strong className="text-sm">{region.name}</strong>
            <span
              style={{ color: colorFor(region.status) }}
              className="text-[10px] uppercase tracking-widest font-mono"
            >
              {labelFor(region.status)}
            </span>
          </div>
          <div className="text-[11px] text-white/60">{region.county}</div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 mt-1">
            <span className="text-white/55 text-[11px]">Water use</span>
            <span className="font-mono text-[11px] text-right">
              {(region.waterUsage / 1000).toFixed(1)}k m³/day
            </span>
            <span className="text-white/55 text-[11px]">Soil moist.</span>
            <span className="font-mono text-[11px] text-right">
              {region.soilMoisture}%
            </span>
            <span className="text-white/55 text-[11px]">Efficiency</span>
            <span className="font-mono text-[11px] text-right">
              {region.efficiency}%
            </span>
          </div>
        </div>
      </Popup>
    </Marker>
  );
});

const SelectionHighlight = memo(function SelectionHighlight({
  selectedId,
}: {
  selectedId: string | null;
}) {
  if (!selectedId) return null;
  const r = REGIONS.find((x) => x.id === selectedId);
  if (!r) return null;
  return (
    <CircleMarker
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
  );
});

const MAP_CENTER: [number, number] = [0.2, 37.9];

interface KenyaMapProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function KenyaMapInner({ selectedId, onSelect }: KenyaMapProps) {
  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={MAP_CENTER}
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

        {REGIONS.map((r) => (
          <RegionMarker key={r.id} region={r} onSelect={onSelect} />
        ))}

        <SelectionHighlight selectedId={selectedId} />
      </MapContainer>

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

export default memo(KenyaMapInner);
