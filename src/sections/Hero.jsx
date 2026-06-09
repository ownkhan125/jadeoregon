"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { Container, Button, Eyebrow, HeroBackdrop } from "@/components";
import { images, site } from "@/data";
import { useSplitText } from "@/hooks";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const headlineRef = useSplitText({ type: "words,chars", stagger: 0.02 });

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-paper pt-32 pb-16 sm:pt-40 sm:pb-24"
    >
      {/* Background photo + readability overlay */}
      <motion.div
        aria-hidden
        style={{ scale }}
        className="absolute inset-0 -z-30"
      >
        <Image
          src={images.hero}
          alt={images.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-br from-paper/85 via-paper/72 to-paper/95"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-transparent via-transparent to-paper"
      />

      {/* Tech grid + animated data streams sit on top */}
      <motion.div style={{ y, opacity: fade }} className="absolute inset-0 -z-10">
        <HeroBackdrop />
      </motion.div>

      <Container size="xl" className="relative w-full">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Eyebrow>Candidate · {site.district}</Eyebrow>
            </motion.div>

            <h1
              ref={headlineRef}
              className="split-prepared mt-8 font-display text-[clamp(2.25rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-ink break-words"
            >
              <span className="block">A steady voice.</span>
              <span className="block">
                A stronger <span className="text-cobalt">Oregon.</span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-8 max-w-xl text-balance text-base text-ink/75 sm:text-lg"
            >
              {site.promise} {site.name} is running to bring focused, principled leadership to{" "}
              {site.district}.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Button href="/donate" size="lg">
                Donate
                <span aria-hidden>→</span>
              </Button>
              <Button href="/about" variant="ghost" size="lg">
                Meet Jade
              </Button>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4"
          >
            <div className="relative overflow-hidden rounded-3xl bg-ink p-1 text-paper shadow-[0_40px_120px_-40px_rgba(11,31,58,0.55)]">
              <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full text-paper/[0.06]"
                viewBox="0 0 200 200"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern id="card-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.4" />
                  </pattern>
                </defs>
                <rect width="200" height="200" fill="url(#card-grid)" />
              </svg>

              <div className="relative rounded-[22px] border border-paper/10 p-6 sm:p-7">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-paper/60">
                  <span>Primary Election</span>
                  <span className="inline-flex items-center gap-2">
                    Live
                    <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-saffron" />
                  </span>
                </div>
                <div className="mt-4 font-display text-4xl font-semibold leading-none tracking-[-0.03em] sm:text-5xl">
                  {site.electionDate}
                </div>
                <p className="mt-3 text-sm text-paper/70">
                  Mark the date. Tell three friends. The path to a stronger Oregon starts here.
                </p>
                <div className="mt-7 grid grid-cols-3 divide-x divide-paper/10 overflow-hidden rounded-2xl bg-paper/[0.04]">
                  {["Listen", "Lead", "Deliver"].map((w) => (
                    <div key={w} className="px-3 py-3 text-center">
                      <div className="font-display text-base font-medium text-saffron">{w}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 flex items-center gap-4 text-xs uppercase tracking-[0.28em] text-ink/55 sm:mt-24"
        >
          <span className="h-px w-14 bg-ink/30" />
          <span>Scroll to explore</span>
        </motion.div>
      </Container>
    </section>
  );
}
