import { cn } from "@/utils";

export function Container({ className, children, size = "lg", ...props }) {
  const max = size === "xl" ? "max-w-[1400px]" : size === "md" ? "max-w-4xl" : "max-w-[1240px]";
  return (
    <div className={cn("mx-auto w-full px-6 sm:px-8 lg:px-12", max, className)} {...props}>
      {children}
    </div>
  );
}
