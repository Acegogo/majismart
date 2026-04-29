"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/** Single shared cadence for simulated telemetry (overview KPIs + sensors). */
export const SIMULATION_TICK_MS = 7000;

const SimulationTickContext = createContext(0);

export function SimulationTickProvider({ children }: { children: ReactNode }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTick((t) => t + 1);
    }, SIMULATION_TICK_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <SimulationTickContext.Provider value={tick}>
      {children}
    </SimulationTickContext.Provider>
  );
}

export function useSimulationTick() {
  return useContext(SimulationTickContext);
}
