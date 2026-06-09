"use client";

import { cn } from "@/utils";

export function Field({ label, htmlFor, required, hint, error, className, children }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="flex items-baseline justify-between text-[11px] font-medium uppercase tracking-[0.22em] text-ink/70"
        >
          <span>
            {label}
            {required && <span className="text-cobalt"> *</span>}
          </span>
          {hint && <span className="text-[10px] normal-case tracking-normal text-ink/45">{hint}</span>}
        </label>
      )}
      {children}
      {error && <span className="text-xs text-red-700">{error}</span>}
    </div>
  );
}

const baseInput =
  "w-full rounded-2xl border border-ink/15 bg-paper/60 px-4 py-3 text-sm text-ink placeholder:text-ink/40 " +
  "transition-[border-color,box-shadow,background-color] duration-200 " +
  "focus:border-ink focus:bg-paper focus:outline-none focus:ring-4 focus:ring-cobalt/15";

export function Input({ className, ...props }) {
  return <input className={cn(baseInput, className)} {...props} />;
}

export function Textarea({ className, rows = 5, ...props }) {
  return <textarea rows={rows} className={cn(baseInput, "resize-none", className)} {...props} />;
}

export function Select({ className, children, ...props }) {
  return (
    <div className="relative">
      <select
        className={cn(baseInput, "appearance-none pr-10", className)}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 text-ink/55"
        viewBox="0 0 12 12"
      >
        <path d="M2 4 L6 8 L10 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
}

export function Checkbox({ label, name, defaultChecked, hint, id }) {
  const cid = id || name;
  return (
    <label htmlFor={cid} className="group flex cursor-pointer items-start gap-3">
      <span className="relative mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          id={cid}
          name={name}
          type="checkbox"
          defaultChecked={defaultChecked}
          className="peer absolute inset-0 cursor-pointer appearance-none rounded-md border border-ink/25 bg-paper/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt/40 checked:border-ink checked:bg-ink"
        />
        <svg
          aria-hidden
          className="pointer-events-none relative h-3 w-3 scale-0 text-paper transition-transform duration-200 peer-checked:scale-100"
          viewBox="0 0 12 12"
        >
          <path d="M2 6.5 L5 9.5 L10 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="flex flex-col gap-1 text-sm leading-snug">
        <span className="text-ink/85">{label}</span>
        {hint && <span className="text-xs text-ink/55">{hint}</span>}
      </span>
    </label>
  );
}

export function RadioCard({ name, value, label, sub, defaultChecked }) {
  const id = `${name}-${value}`;
  return (
    <label
      htmlFor={id}
      className="group relative flex cursor-pointer flex-col items-start rounded-2xl border border-ink/15 bg-paper/60 p-4 transition-all has-[:checked]:border-ink has-[:checked]:bg-paper has-[:checked]:shadow-[0_8px_24px_-18px_rgba(11,31,58,0.45)]"
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span className="flex w-full items-center justify-between">
        <span className="font-display text-lg font-semibold tracking-[-0.02em] text-ink">
          {label}
        </span>
        <span className="grid h-4 w-4 place-items-center rounded-full border border-ink/30 peer-checked:border-ink">
          <span className="block h-2 w-2 rounded-full bg-ink opacity-0 transition-opacity peer-checked:opacity-100" />
        </span>
      </span>
      {sub && <span className="mt-1 text-xs text-ink/55">{sub}</span>}
    </label>
  );
}
