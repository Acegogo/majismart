export type RegionStatus = "optimal" | "warning" | "critical";

export interface Region {
  id: string;
  name: string;
  county: string;
  lat: number;
  lng: number;
  status: RegionStatus;
  waterUsage: number; // m³/day
  soilMoisture: number; // %
  efficiency: number; // %
  schemes: number;
  notes: string;
}

export const REGIONS: Region[] = [
  {
    id: "mwea",
    name: "Mwea Irrigation Scheme",
    county: "Kirinyaga County",
    lat: -0.6915,
    lng: 37.3667,
    status: "optimal",
    waterUsage: 184_320,
    soilMoisture: 62,
    efficiency: 81,
    schemes: 14,
    notes: "Paddy fields running within optimal flow envelope.",
  },
  {
    id: "laikipia",
    name: "Laikipia Highlands",
    county: "Laikipia County",
    lat: 0.3606,
    lng: 36.7820,
    status: "warning",
    waterUsage: 96_540,
    soilMoisture: 38,
    efficiency: 64,
    schemes: 9,
    notes: "Pressure anomaly detected on trunk line 4 — leak suspected.",
  },
  {
    id: "nakuru",
    name: "Nakuru Basin",
    county: "Nakuru County",
    lat: -0.3031,
    lng: 36.0800,
    status: "warning",
    waterUsage: 142_870,
    soilMoisture: 24,
    efficiency: 58,
    schemes: 11,
    notes: "Low soil moisture across 3 sectors. Schedule auto-correction.",
  },
  {
    id: "bura",
    name: "Bura Irrigation Scheme",
    county: "Tana River County",
    lat: -1.1000,
    lng: 39.9333,
    status: "critical",
    waterUsage: 51_200,
    soilMoisture: 19,
    efficiency: 41,
    schemes: 6,
    notes: "Pump #2 offline. Failover route engaged. Crew dispatched.",
  },
];

export interface DailyUsage {
  day: string;
  consumption: number; // thousand m³
  target: number;
}

export const DAILY_USAGE: DailyUsage[] = [
  { day: "Mon", consumption: 1820, target: 2000 },
  { day: "Tue", consumption: 1965, target: 2000 },
  { day: "Wed", consumption: 1740, target: 2000 },
  { day: "Thu", consumption: 2105, target: 2000 },
  { day: "Fri", consumption: 1898, target: 2000 },
  { day: "Sat", consumption: 1612, target: 2000 },
  { day: "Sun", consumption: 1455, target: 2000 },
];

export interface Alert {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  region: string;
  detail: string;
  time: string;
}

export const ALERTS: Alert[] = [
  {
    id: "a1",
    severity: "critical",
    title: "Pump failure",
    region: "Bura",
    detail: "Pump unit #2 offline — auto-failover engaged at 12:42",
    time: "2 min ago",
  },
  {
    id: "a2",
    severity: "warning",
    title: "Leak detected",
    region: "Laikipia",
    detail: "Pressure drop 0.6 bar on trunk line 4 (Sector E)",
    time: "11 min ago",
  },
  {
    id: "a3",
    severity: "warning",
    title: "Low soil moisture",
    region: "Nakuru",
    detail: "Sectors 7, 9, 12 below 25% — auto-irrigation queued",
    time: "23 min ago",
  },
  {
    id: "a4",
    severity: "info",
    title: "Scheduled maintenance",
    region: "Mwea",
    detail: "Filter station 3 servicing window 14:00 – 15:30",
    time: "1 hr ago",
  },
];

export interface SensorReading {
  id: string;
  label: string;
  region: string;
  metric: "moisture" | "tank" | "flow" | "pump";
  value: number; // %, %, L/s, or 0/1
  unit: string;
  status: "ok" | "warn" | "crit";
}

export const INITIAL_SENSORS: SensorReading[] = [
  { id: "s1", label: "Soil Moisture · Mwea-A1", region: "Mwea", metric: "moisture", value: 62, unit: "%", status: "ok" },
  { id: "s2", label: "Soil Moisture · Nakuru-S7", region: "Nakuru", metric: "moisture", value: 24, unit: "%", status: "warn" },
  { id: "s3", label: "Tank Level · Laikipia-T2", region: "Laikipia", metric: "tank", value: 71, unit: "%", status: "ok" },
  { id: "s4", label: "Tank Level · Bura-T1", region: "Bura", metric: "tank", value: 38, unit: "%", status: "warn" },
  { id: "s5", label: "Flow Rate · Mwea Trunk", region: "Mwea", metric: "flow", value: 184, unit: "L/s", status: "ok" },
  { id: "s6", label: "Flow Rate · Bura Trunk", region: "Bura", metric: "flow", value: 51, unit: "L/s", status: "crit" },
  { id: "s7", label: "Pump #1 · Mwea", region: "Mwea", metric: "pump", value: 1, unit: "ON", status: "ok" },
  { id: "s8", label: "Pump #2 · Bura", region: "Bura", metric: "pump", value: 0, unit: "OFF", status: "crit" },
];
