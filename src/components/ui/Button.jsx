import Link from "next/link";
import { cn } from "@/utils";

/**
 * Responsive button system.
 *  - Variants: primary, accent, ghost, ghost-dark
 *  - Sizes: sm / md / lg — each tier scales down by one step on phones (<sm)
 *  - Pass `href` to render as a Next.js Link (safe for server components)
 *  - Pass `as` for any other custom element
 */
export function Button({
  as,
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  const Tag = href ? Link : as || "button";

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight whitespace-nowrap " +
    "transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper " +
    "active:translate-y-0 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary:
      "bg-ink text-paper border border-ink hover:-translate-y-[1px] hover:bg-[#142a4a] hover:shadow-[0_8px_20px_-10px_rgba(11,31,58,0.5)] focus-visible:ring-cobalt",
    accent:
      "bg-saffron text-ink border border-saffron hover:-translate-y-[1px] hover:bg-[#ffd14a] hover:border-[#ffd14a] hover:shadow-[0_8px_20px_-10px_rgba(247,221,125,0.65)] focus-visible:ring-ink",
    ghost:
      "bg-transparent text-ink border border-ink/20 hover:-translate-y-[1px] hover:border-ink hover:bg-ink/[0.03] focus-visible:ring-ink",
    "ghost-dark":
      "bg-transparent text-paper border border-paper/25 hover:-translate-y-[1px] hover:border-paper hover:bg-paper/[0.06] focus-visible:ring-paper",
  };

  // Each size declares a phone size first, then `sm:` overrides for tablet+.
  // 44px minimum tap target on touch.
  const sizes = {
    sm: "h-10 px-4 text-xs sm:px-5 sm:text-[13px]",
    md: "h-11 px-5 text-[13px] sm:h-12 sm:px-7 sm:text-sm",
    lg: "h-12 px-6 text-sm sm:h-14 sm:px-8 sm:text-base",
  };

  return (
    <Tag
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
