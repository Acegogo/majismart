import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          950: "#070d1a",
          900: "#0B1426",
          800: "#101e3a",
          700: "#162a4d",
          600: "#1d3760",
        },
        border: {
          subtle: "rgba(255,255,255,0.06)",
          default: "rgba(0,229,255,0.18)",
          strong: "rgba(0,229,255,0.35)",
        },
        brand: {
          primary: "#00E5FF",
          primaryDim: "#00B8D4",
          green: "#00FF88",
          greenSoft: "#22FFAA",
          warn: "#FFC857",
          danger: "#FF4D4D",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "monospace",
        ],
      },
      boxShadow: {
        glow: "0 4px 14px rgba(0, 229, 255, 0.12)",
        glowStrong: "0 6px 20px rgba(0, 229, 255, 0.2)",
        glowGreen: "0 4px 14px rgba(0, 255, 136, 0.12)",
        glowWarn: "0 4px 14px rgba(255, 200, 87, 0.12)",
        glowDanger: "0 4px 14px rgba(255, 77, 77, 0.14)",
        panel:
          "0 0 0 1px rgba(0, 229, 255, 0.06) inset, 0 8px 24px -12px rgba(0, 0, 0, 0.55)",
      },
      keyframes: {
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(0, 229, 255, 0.7)" },
          "70%": { boxShadow: "0 0 0 14px rgba(0, 229, 255, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(0, 229, 255, 0)" },
        },
        pulseRingDanger: {
          "0%": { boxShadow: "0 0 0 0 rgba(255, 77, 77, 0.75)" },
          "70%": { boxShadow: "0 0 0 14px rgba(255, 77, 77, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(255, 77, 77, 0)" },
        },
        blinker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        scan: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        gridShift: {
          "0%": { backgroundPosition: "0 0, 0 0" },
          "100%": { backgroundPosition: "60px 60px, 60px 60px" },
        },
        auroraDrift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(2%, -2%, 0)" },
        },
        liveBlink: {
          "0%, 60%, 100%": { opacity: "1", transform: "scale(1)" },
          "30%": { opacity: "0.45", transform: "scale(0.85)" },
        },
      },
      animation: {
        pulseRing: "pulseRing 1.8s ease-out infinite",
        pulseRingDanger: "pulseRingDanger 1.4s ease-out infinite",
        blinker: "blinker 1.2s ease-in-out infinite",
        scan: "scan 6s linear infinite",
        gridShift: "gridShift 30s linear infinite",
        auroraDrift: "auroraDrift 18s ease-in-out infinite",
        liveBlink: "liveBlink 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
