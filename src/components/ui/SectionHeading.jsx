import { cn } from "@/utils";

export function SectionHeading({ children, className, as: Tag = "h2" }) {
  return (
    <Tag
      className={cn(
        "font-display text-[clamp(1.875rem,5vw,4.25rem)] leading-[1.05] tracking-[-0.02em] text-ink text-balance break-words",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
