"use client";

import { Container, SectionHeading, Eyebrow, StatNumber } from "@/components";
import { site } from "@/data";
import { useSectionBuild, useSplitText } from "@/hooks";

export function About() {
  const sectionRef = useSectionBuild();
  const leadRef = useSplitText({ type: "words", stagger: 0.04, duration: 0.8 });

  return (
    <section id="about" ref={sectionRef} className="relative py-28 sm:py-36">
      <Container size="xl">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="reveal-up">
              <Eyebrow>Meet {site.short}</Eyebrow>
            </div>
            <div className="reveal-line mt-8 h-px w-full bg-ink/20" />
            <SectionHeading className="reveal-up mt-8">
              A neighbor first. A <span className="text-cobalt">candidate</span> second.
            </SectionHeading>
          </div>

          <div className="lg:col-span-7">
            <p
              ref={leadRef}
              className="split-prepared font-display text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-tight tracking-[-0.02em] text-ink"
            >
              {site.name} has spent decades in Oregon's hospitals, classrooms, and small business
              halls — the rooms where decisions made in Washington actually land.
            </p>

            <div className="reveal-fade mt-8 grid gap-5 text-base text-ink/70 sm:text-lg">
              <p>
                Trained as a healthcare advocate and small-business mentor, {site.short} built a
                career on showing up early, listening hard, and finishing what was started. That
                same posture is what this district has been waiting for in Congress.
              </p>
              <p>
                This campaign isn't built on slogans. It's built on a clear plan, an open door, and
                a refusal to trade Oregon's future for Washington's headlines.
              </p>
            </div>

            <div className="reveal-line mt-12 h-px w-full bg-ink/15" />

            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
              {site.stats.map((s) => (
                <StatNumber key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
