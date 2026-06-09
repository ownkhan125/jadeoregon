"use client";

import Link from "next/link";
import Image from "next/image";

export function EventCard({ event, layout = "stacked" }) {
  const href = `/events/${event.slug}`;
  if (layout === "row") {
    return (
      <Link
        href={href}
        className="group grid grid-cols-1 gap-6 rounded-3xl border border-ink/10 bg-paper p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-[0_24px_50px_-30px_rgba(11,31,58,0.35)] sm:grid-cols-[260px_1fr] sm:gap-8 sm:p-5"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-square">
          <Image
            src={event.image}
            alt=""
            fill
            sizes="(min-width: 640px) 260px, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-paper/95 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink">
            {event.type}
          </span>
        </div>
        <div className="flex flex-col p-2 sm:p-3">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-3xl font-semibold leading-none tracking-[-0.03em] sm:text-4xl">
              {event.date.day}
            </span>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-[0.22em] text-cobalt">
                {event.date.month} {event.date.year}
              </span>
              <span className="mt-0.5 text-[11px] text-ink/55">{event.time}</span>
            </div>
          </div>
          <h3 className="mt-5 font-display text-xl font-semibold leading-tight tracking-[-0.02em] sm:text-2xl">
            {event.title}
          </h3>
          <p className="mt-3 text-sm text-ink/65">{event.summary}</p>
          <div className="mt-auto flex items-center justify-between border-t border-ink/10 pt-5">
            <span className="text-xs text-ink/60">{event.location}</span>
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink transition-colors group-hover:text-cobalt">
              View details
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-ink/30 hover:shadow-[0_30px_60px_-30px_rgba(11,31,58,0.35)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={event.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-paper/95 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink">
          {event.type}
        </span>
        <div className="absolute right-4 top-4 flex flex-col items-end gap-0.5 rounded-2xl bg-ink/85 px-3 py-2 text-paper backdrop-blur">
          <span className="font-display text-2xl font-semibold leading-none">{event.date.day}</span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-saffron">
            {event.date.month}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-xl font-semibold leading-tight tracking-[-0.02em] sm:text-2xl">
          {event.title}
        </h3>
        <p className="mt-3 text-sm text-ink/65">{event.summary}</p>
        <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-ink/10 pt-5 text-xs">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.22em] text-ink/50">Where</dt>
            <dd className="mt-1 text-ink/80">{event.location}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.22em] text-ink/50">When</dt>
            <dd className="mt-1 text-ink/80">{event.time}</dd>
          </div>
        </dl>
        <div className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink transition-colors group-hover:text-cobalt">
          RSVP
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
