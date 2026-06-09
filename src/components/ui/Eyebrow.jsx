import { cn } from "@/utils";

export function Eyebrow({ children, className, tone = "ink" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em]",
        tone === "ink" ? "text-ink/70" : "text-paper/80",
        className,
      )}
    >
      <span
        className={cn(
          "inline-block h-px w-8",
          tone === "ink" ? "bg-ink/30" : "bg-paper/40",
        )}
      />
      {children}
    </span>
  );
}
