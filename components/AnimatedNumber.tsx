"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const formatNumber = (n: number, decimals: number) => {
  if (decimals > 0) return n.toFixed(decimals);
  return Math.round(n).toLocaleString("en-US");
};

export default function AnimatedNumber({
  value,
  decimals = 0,
  duration = 900,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(value);
  const startRef = useRef<number | null>(null);
  const fromRef = useRef<number>(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    fromRef.current = display;
    startRef.current = null;

    const tick = (t: number) => {
      if (startRef.current === null) startRef.current = t;
      const elapsed = t - startRef.current;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = fromRef.current + (value - fromRef.current) * eased;
      setDisplay(next);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span className={className}>
      {prefix}
      {formatNumber(display, decimals)}
      {suffix}
    </span>
  );
}
