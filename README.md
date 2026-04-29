# MAJISMART National Control Center

> **Smart Irrigation Monitoring System – Republic of Kenya**
> A premium, frontend-only demonstration dashboard for a government-level smart-irrigation platform.

Live demo: [majismart.vercel.app](https://majismart.vercel.app)

---

## Overview

MAJISMART is a high-fidelity visual simulation of a national irrigation
control center. It runs entirely on simulated client-side data — no backend,
no APIs — and is intended for stakeholder demonstrations and presentations.

The dashboard surfaces:

- National KPIs (water distributed, active schemes, efficiency, alerts)
- An interactive Kenya map with status-coded irrigation sites
- Daily consumption and per-region distribution charts
- Live sensor telemetry (soil moisture, tank levels, pumps, flow rate)
- Active alerts with critical-grade visual indicators
- Operational controls (scheme toggles, moisture threshold, scheduling — UI only)
- National impact metrics (water saved, yield increase, cost reduction)

## Tech Stack

- **Next.js 14** (App Router, static export)
- **TailwindCSS** with a custom premium control-center palette
- **Recharts** for charts
- **react-leaflet / Leaflet** for the Kenya map
- **lucide-react** for icons

## Getting Started

```bash
npm install
npm run dev
```

Open <http://localhost:3000> in your browser.

To verify the production build:

```bash
npm run build
npm run start
```

## Design System

The UI is built on a bright, high-tech control-center palette:

| Token             | Hex       | Usage                                  |
| ----------------- | --------- | -------------------------------------- |
| Primary blue      | `#00E5FF` | KPIs, primary accents, glow            |
| Background        | `#0B1426` | Base canvas                            |
| Bright green      | `#00FF88` | Optimal status, success, growth        |
| Accent green      | `#22FFAA` | Secondary green highlights             |
| Warning           | `#FFC857` | Cautions, mid-tier alerts              |
| Danger            | `#FF4D4D` | Critical alerts, failures              |

Visual effects: glassmorphic panels, animated grid backdrop, aurora glow
layer, pulsing map markers, blinking critical indicators, hover-glow on KPI
cards, gradient buttons, and animated counters throughout.

## Branding

Branding assets are bundled in `/public`:

- `majismart logo.png` — left of the header
- `caledonia heights logo.png` — right of the header (subtle "Powered by")

A live-system pulse badge in the header confirms operational status.

## Data

All simulated data lives in `lib/mockData.ts`. Real-time updates are produced
purely on the client with `setInterval` (~3.5 s cadence) and
`requestAnimationFrame`-driven counters.

## Deployment

The project deploys cleanly to **Vercel** with no environment configuration
required. Push to GitHub and import the repository in the Vercel dashboard;
the framework is auto-detected as Next.js.

## License

Demonstration software prepared for the Republic of Kenya, Ministry of Water,
Sanitation & Irrigation. Powered by **Caledonia Heights**.
