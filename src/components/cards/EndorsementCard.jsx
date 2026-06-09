"use client";

import Image from "next/image";

export function EndorsementCard({ endorsement, tone = "light" }) {
  const isDark = tone === "dark";
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
        isDark
          ? "border-paper/10 bg-paper/[0.03] backdrop-blur-sm hover:border-saffron/50"
          : "border-ink/10 bg-paper hover:border-ink/30 hover:shadow-[0_24px_60px_-30px_rgba(11,31,58,0.35)]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-ink/10">
            <Image
              src={endorsement.image}
              alt={endorsement.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <div>
            <div className={`text-sm font-medium ${isDark ? "text-paper" : "text-ink"}`}>
              {endorsement.name}
            </div>
            <div
              className={`mt-0.5 text-[10px] uppercase tracking-[0.22em] ${
                isDark ? "text-paper/60" : "text-ink/55"
              }`}
            >
              {endorsement.role}
            </div>
          </div>
        </div>
        <span
          className={`font-display text-4xl font-semibold leading-none ${
            isDark ? "text-saffron" : "text-cobalt"
          }`}
        >
          “
        </span>
      </div>

      <p
        className={`mt-5 font-display text-lg font-medium leading-snug tracking-[-0.015em] sm:text-xl ${
          isDark ? "text-paper" : "text-ink"
        }`}
      >
        {endorsement.quote}
      </p>

      <div
        className={`mt-auto flex items-center justify-between pt-6 ${
          isDark ? "border-t border-paper/10" : "border-t border-ink/10"
        }`}
      >
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.22em] ${
            isDark ? "text-paper/55" : "text-ink/50"
          }`}
        >
          {endorsement.category}
        </span>
      </div>
    </article>
  );
}
