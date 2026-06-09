"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Container, SectionHeading, Eyebrow } from "@/components";
import { events } from "@/data";
import { useSectionBuild } from "@/hooks";

/**
 * Editorial-style Home Events section:
 *  - Large featured event card (image-led, magazine-feel)
 *  - 3 stacked secondary cards on the right with date-chip + meta
 *  - "View all events" CTA links to /events
 */
export function Events() {
  const sectionRef = useSectionBuild();
  const featured = events[0];
  const secondaries = events.slice(1, 4);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-paper-soft py-28 sm:py-36"
    >
      <Container size="xl">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="reveal-up">
              <Eyebrow>Upcoming Events</Eyebrow>
            </div>
            <SectionHeading className="reveal-up mt-6">
              Show up. <span className="text-cobalt">In person.</span>
            </SectionHeading>
          </div>
          <div className="reveal-up flex justify-start lg:col-span-5 lg:justify-end">
            <Link
              href="/events"
              className="group inline-flex items-center gap-3 rounded-full border border-ink/15 px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              View all events
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="reveal-line mt-16 h-px w-full bg-ink/15" />

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <FeaturedCard event={featured} className="reveal-up lg:col-span-7" />
          <ul className="reveal-up flex flex-col gap-5 lg:col-span-5">
            {secondaries.map((e) => (
              <li key={e.slug}>
                <SecondaryCard event={e} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function FeaturedCard({ event, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className={`group ${className}`}
    >
      <Link
        href={`/events/${event.slug}`}
        className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-paper transition-all duration-300 hover:border-ink/30 hover:shadow-[0_30px_80px_-40px_rgba(11,31,58,0.4)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
          <div className="absolute left-5 top-5 inline-flex items-center gap-3 rounded-full bg-paper/95 px-4 py-1.5 text-[10px] uppercase tracking-[0.24em] text-ink">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-saffron" />
            Featured · {event.type}
          </div>
          <div className="absolute right-5 top-5 flex flex-col items-end gap-0.5 rounded-2xl bg-ink/90 px-4 py-3 text-paper backdrop-blur">
            <span className="font-display text-3xl font-semibold leading-none">
              {event.date.day}
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-saffron">
              {event.date.month} {event.date.year}
            </span>
          </div>
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
            <div>
              <h3 className="max-w-md font-display text-2xl font-semibold leading-tight tracking-[-0.025em] text-paper sm:text-3xl">
                {event.title}
              </h3>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-paper/80">
                {event.location}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-7 sm:p-8">
          <p className="text-sm text-ink/70 sm:text-base">{event.summary}</p>
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-ink/10 pt-5 text-xs">
            <Meta label="Date">{event.date.month} {event.date.day}, {event.date.year}</Meta>
            <Meta label="Time">{event.time}</Meta>
            <Meta label="Type">{event.type}</Meta>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink transition-colors group-hover:text-cobalt">
            RSVP & details
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function SecondaryCard({ event }) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 240, damping: 22 }}>
      <Link
        href={`/events/${event.slug}`}
        className="group relative grid grid-cols-[120px_1fr] gap-5 overflow-hidden rounded-2xl border border-ink/10 bg-paper p-3 transition-all duration-300 hover:border-ink/30 hover:shadow-[0_20px_44px_-30px_rgba(11,31,58,0.35)] sm:grid-cols-[140px_1fr] sm:p-4"
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl sm:aspect-square">
          <Image
            src={event.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 140px, 120px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/60 to-transparent p-2">
            <div className="flex items-baseline gap-1 text-paper">
              <span className="font-display text-xl font-semibold leading-none">
                {event.date.day}
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-saffron">
                {event.date.month}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col py-1 pr-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cobalt">
            {event.type}
          </span>
          <h3 className="mt-2 font-display text-base font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-lg">
            {event.title}
          </h3>
          <p className="mt-2 text-xs text-ink/60 sm:text-[13px]">
            {event.location} · {event.time}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[10px] uppercase tracking-[0.22em] text-ink/70 transition-colors group-hover:text-cobalt">
            Details
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function Meta({ label, children }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.22em] text-ink/50">{label}</div>
      <div className="mt-1 text-ink/80">{children}</div>
    </div>
  );
}
