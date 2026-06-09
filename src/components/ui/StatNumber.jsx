"use client";

import { useCounter } from "@/hooks";

export function StatNumber({ value, suffix = "", label }) {
  const [ref, current] = useCounter(value);
  return (
    <div ref={ref} className="flex flex-col gap-2">
      <span className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-none tracking-[-0.03em] text-ink">
        {current}
        <span className="text-cobalt">{suffix}</span>
      </span>
      <span className="text-xs uppercase tracking-[0.22em] text-ink/60">{label}</span>
    </div>
  );
}
