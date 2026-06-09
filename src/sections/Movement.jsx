"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Container, SectionHeading, Eyebrow, Button } from "@/components";
import { site } from "@/data";
import { useSectionBuild, useSplitText } from "@/hooks";

export function Movement() {
  const wrap = useRef(null);
  const sectionRef = useSectionBuild();
  const headRef = useSplitText({ type: "words", stagger: 0.04, duration: 0.9 });

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="movement"
      ref={(n) => {
        wrap.current = n;
        sectionRef.current = n;
      }}
      className="relative overflow-hidden bg-cream py-28 sm:py-36"
    >
      <motion.div
        aria-hidden
        style={{ y: y1 }}
        className="pointer-events-none absolute -left-24 top-10 h-[360px] w-[360px] rounded-full bg-cobalt/15 blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ y: y2 }}
        className="pointer-events-none absolute -right-24 bottom-10 h-[420px] w-[420px] rounded-full bg-saffron/40 blur-3xl"
      />

      <Container size="xl" className="relative">
        <div className="reveal-up">
          <Eyebrow>Get Involved</Eyebrow>
        </div>
        <div className="reveal-line mt-8 h-px w-full bg-ink/20" />

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              as="h2"
              className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.03em]"
            >
              <span ref={headRef} className="split-prepared block">
                Join the movement that meets Oregon where it lives.
              </span>
            </SectionHeading>
          </div>
          <div className="reveal-up flex flex-col gap-6 lg:col-span-5">
            <p className="text-base text-ink/70 sm:text-lg">
              Every door knocked, every dollar donated, every conversation started — this is how
              change actually happens. Pick a way to show up.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/donate" size="lg">
                Donate
              </Button>
              <Button href="/volunteer" size="lg" variant="ghost">
                Volunteer
              </Button>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-3 text-center">
              {[25, 50, 100].map((amt) => (
                <Link
                  key={amt}
                  href={`/donate?amount=${amt}`}
                  className="group relative overflow-hidden rounded-2xl border border-ink/15 bg-paper/60 px-3 py-4 text-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-ink hover:bg-paper"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-cobalt transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <span className="block font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
                    ${amt}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-ink/50">
                    one-time
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal-line mt-20 h-px w-full bg-ink/15" />
        <div className="reveal-up mt-8 flex flex-wrap items-center justify-between gap-4 text-sm text-ink/70">
          <span>Paid for by {site.name} for Congress.</span>
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-ink/50">
            #BuildSomethingThatLasts
          </span>
        </div>
      </Container>
    </section>
  );
}
