"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Container, SectionHeading, Eyebrow } from "@/components";
import { endorsements } from "@/data";
import { useSectionBuild } from "@/hooks";

export function Endorsements() {
  const ref = useSectionBuild();
  const featured = endorsements.slice(0, 4);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ink py-28 text-paper sm:py-36"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -left-32 top-10 h-[460px] w-[460px] rounded-full bg-cobalt/40 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[520px] w-[520px] rounded-full bg-saffron/15 blur-3xl" />
        <svg
          className="absolute inset-0 h-full w-full text-paper/[0.05]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="endorse-grid" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M 6 0 L 0 0 0 6" fill="none" stroke="currentColor" strokeWidth="0.08" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#endorse-grid)" />
        </svg>
      </div>
      <Container size="xl" className="relative">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="reveal-up">
              <Eyebrow tone="paper">Endorsements</Eyebrow>
            </div>
            <SectionHeading className="reveal-up mt-6 text-paper">
              Voices from across <span className="text-saffron">Oregon.</span>
            </SectionHeading>
          </div>
          <div className="reveal-up lg:col-span-5 lg:col-start-8">
            <p className="max-w-md text-paper/70">
              Mayors, veterans, organizers, and neighbors — the people closest to this district are
              standing with Jade.
            </p>
            <Link
              href="/endorsements"
              className="group mt-6 inline-flex items-center gap-3 rounded-full border border-paper/25 px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-paper transition-colors hover:border-paper hover:bg-paper/10"
            >
              All endorsements
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>

        <div className="reveal-line mt-16 h-px w-full bg-paper/20" />

        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {featured.map((e, i) => (
            <motion.li
              key={e.name}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="reveal-up"
            >
              <Link
                href="/endorsements"
                className="group card-dark relative block overflow-hidden rounded-3xl border border-paper/10 p-8 transition-colors hover:border-saffron/50"
              >
                <span className="corner-bracket corner-tl text-saffron" />
                <span className="corner-bracket corner-tr text-saffron" />
                <span className="corner-bracket corner-bl text-saffron" />
                <span className="corner-bracket corner-br text-saffron" />

                <div className="flex items-start justify-between">
                  <span className="font-display text-5xl font-semibold leading-none text-saffron">
                    “
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.22em] text-paper/40">
                    / 0{i + 1}
                  </span>
                </div>
                <p className="mt-4 font-display text-xl font-medium leading-snug tracking-[-0.015em] text-paper sm:text-[1.4rem]">
                  {e.quote}
                </p>
                <div className="mt-8 flex items-center justify-between border-t border-paper/10 pt-5">
                  <div>
                    <div className="text-sm font-medium text-paper">{e.name}</div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-paper/60">
                      {e.role}
                    </div>
                  </div>
                  <span
                    aria-hidden
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-paper/15 text-paper/60 transition-all duration-500 group-hover:border-saffron group-hover:text-saffron"
                  >
                    →
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
