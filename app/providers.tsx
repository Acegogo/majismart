"use client";

import { SimulationTickProvider } from "@/lib/SimulationTickContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SimulationTickProvider>{children}</SimulationTickProvider>;
}
