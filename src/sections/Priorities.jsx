"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Container, SectionHeading, Eyebrow } from "@/components";
import { priorities, site } from "@/data";
import { useSectionBuild } from "@/hooks";

export function Priorities() {
  const ref = useSectionBuild();

  return (
    <section ref={ref} className="relative bg-paper py-28 sm:py-36">
      <Container size="xl">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="reveal-up">
              <Eyebrow>The Platform</Eyebrow>
            </div>
            <SectionHeading className="reveal-up mt-6">
              Six fights. <span className="text-cobalt">One Oregon.</span>
            </SectionHeading>
          </div>
          <p className="reveal-up max-w-xl text-base text-ink/70 sm:text-lg lg:col-span-6 lg:col-start-7">
            These are the priorities {site.short} talks about in living rooms and town halls every
            week. No vague promises — only commitments we can measure.
          </p>
        </div>

        <div className="reveal-line mt-16 h-px w-full bg-ink/15" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {priorities.map((p) => (
            <PriorityCard key={p.id} priority={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function PriorityCard({ priority }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="reveal-up"
    >
      <Link
        href="/about"
        className="group card-surface relative block h-full overflow-hidden rounded-3xl border border-ink/10 p-8 transition-colors hover:border-ink/30"
      >
        <span className="corner-bracket corner-tl text-cobalt" />
        <span className="corner-bracket corner-tr text-cobalt" />
        <span className="corner-bracket corner-bl text-cobalt" />
        <span className="corner-bracket corner-br text-cobalt" />

        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-cobalt via-cobalt to-saffron"
        />

        <div className="relative flex items-baseline justify-between">
          <span className="font-mono text-[11px] tracking-[0.24em] text-ink/40">
            / {priority.id}
          </span>
          <motion.span
            initial={{ x: 0, opacity: 0.4 }}
            whileHover={{ x: 4, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-cobalt"
            aria-hidden
          >
            →
          </motion.span>
        </div>

        <h3 className="relative mt-12 font-display text-2xl font-semibold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[1.65rem]">
          {priority.title}
        </h3>
        <p className="relative mt-4 text-sm text-ink/65 sm:text-base">{priority.body}</p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/60"
        >
          Read the plan
          <span className="h-px w-10 bg-ink/40" />
        </motion.div>
      </Link>
    </motion.div>
  );
}
