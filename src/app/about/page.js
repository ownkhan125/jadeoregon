import Image from "next/image";
import Link from "next/link";
import {
  Container,
  PageHeader,
  Eyebrow,
  SectionHeading,
  Button,
} from "@/components";
import { images, site } from "@/data";

export const metadata = {
  title: `About — ${site.name} for Congress`,
  description: `Meet ${site.name}, candidate for ${site.district}. A steady, principled voice for Oregon families.`,
};

const careerTimeline = [
  { year: "1991", title: "Bachelor of Public Health", body: "Oregon State University." },
  { year: "1995", title: "Healthcare Advocate", body: "Pacific Northwest community clinics." },
  { year: "2003", title: "Founded Salem Family Mentorship", body: "Small-business mentorship nonprofit." },
  { year: "2011", title: "Oregon Legislature Testimony", body: "Authored testimony on rural healthcare access." },
  { year: "2018", title: "Statewide Civic Service Award", body: "For sustained community organizing." },
  { year: "2022", title: "Board Chair, OR-5 Workforce Coalition", body: "Cross-sector skills initiatives." },
  { year: "2026", title: "Running for Congress", body: "Oregon's 5th Congressional District." },
];

const values = [
  {
    title: "Accountability",
    body: "Show your work. Publish what you spend. Tell the truth when you're wrong — and what you'll do differently.",
  },
  {
    title: "Evidence Over Ideology",
    body: "Policy gets better when it gets honest about what works. Pilot. Measure. Scale. Repeat.",
  },
  {
    title: "Community First",
    body: "If a policy doesn't make sense at a kitchen table in Salem, it doesn't make sense in Washington either.",
  },
];

const expertise = [
  { tag: "2018", title: "Statewide Civic Service Award" },
  { tag: "2014–2024", title: "Oregon Legislature Testimony · Rural Health & Housing" },
  { tag: "Credentials", title: "MPH, Oregon State · 30+ years of community service" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A neighbor first."
        accent="A candidate second."
        lede={`${site.name} has spent decades in Oregon's hospitals, classrooms, and small business halls — the rooms where decisions made in Washington actually land.`}
        image={images.forest}
        imageAlt="Oregon forest at sunrise."
      />

      {/* Story + Portrait */}
      <section className="relative py-24 sm:py-28">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-paper-soft">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={images.candidatePortrait}
                    alt={images.candidatePortraitAlt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-paper/95 p-4 backdrop-blur">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-ink/55">
                    Candidate
                  </div>
                  <div className="mt-1 font-display text-xl font-semibold tracking-[-0.02em] text-ink">
                    {site.name}
                  </div>
                  <div className="text-xs text-ink/60">{site.district}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Eyebrow>The Story</Eyebrow>
              <SectionHeading className="mt-5">
                Built in Oregon. <span className="text-cobalt">Built for Oregon.</span>
              </SectionHeading>

              <div className="mt-8 grid gap-5 text-base text-ink/75 sm:text-lg">
                <p>
                  Jade was born in Salem and raised across three counties — a kid of small towns,
                  PTA meetings, and the quiet certainty that you show up for your neighbors. After
                  earning a Master of Public Health, she started her career inside the clinics and
                  classrooms where people get hurt the most when policy fails.
                </p>
                <p>
                  Over three decades, she built coalitions across rural, urban, and tribal Oregon —
                  not because the politics rewarded it, but because the problems required it. From
                  housing pilots in Tillamook to skills programs in Bend, she's done the unglamorous
                  work of repairing systems other people gave up on.
                </p>
                <p>
                  That same posture is what this district has been waiting for in Congress.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {expertise.map((e) => (
                  <div
                    key={e.title}
                    className="rounded-2xl border border-ink/10 bg-paper/60 p-5"
                  >
                    <div className="text-[10px] uppercase tracking-[0.22em] text-cobalt">
                      {e.tag}
                    </div>
                    <div className="mt-2 text-sm font-medium text-ink">{e.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Career Timeline */}
      <section className="relative bg-paper-soft py-24 sm:py-28">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Career of Service</Eyebrow>
              <SectionHeading className="mt-5">
                A pattern of <span className="text-cobalt">showing up.</span>
              </SectionHeading>
              <p className="mt-6 max-w-md text-ink/70">
                Three decades, one district, the same way of working: listen first, do the homework,
                deliver what you said you would.
              </p>
            </div>

            <div className="relative lg:col-span-8">
              <div className="absolute left-6 top-2 bottom-2 w-px bg-ink/15 lg:left-3" />
              <ol className="space-y-8">
                {careerTimeline.map((item) => (
                  <li key={item.year} className="relative pl-14 lg:pl-10">
                    <span className="absolute left-4 top-2 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full bg-paper-soft lg:left-3">
                      <span className="block h-2.5 w-2.5 rounded-full bg-cobalt ring-2 ring-paper-soft" />
                    </span>
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs uppercase tracking-[0.22em] text-ink/55">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm text-ink/65 sm:text-base">{item.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="relative py-24 sm:py-28">
        <Container size="xl">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow>What Drives {site.short}</Eyebrow>
              <SectionHeading className="mt-5">
                Three values. <span className="text-cobalt">No exceptions.</span>
              </SectionHeading>
            </div>
            <p className="max-w-lg text-ink/70 lg:col-span-5 lg:col-start-8">
              These aren't slogans. They're the rules the campaign answers to — and the rules our
              office will answer to in Washington.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map((v, i) => (
              <article
                key={v.title}
                className="card-surface relative overflow-hidden rounded-3xl border border-ink/10 p-8"
              >
                <span className="font-mono text-[11px] tracking-[0.24em] text-ink/40">
                  / 0{i + 1}
                </span>
                <h3 className="mt-8 font-display text-xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-2xl">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm text-ink/65 sm:text-base">{v.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink py-24 text-paper sm:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-10 h-[420px] w-[420px] rounded-full bg-cobalt/40 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-saffron/20 blur-3xl" />
        </div>
        <Container size="xl" className="relative">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow tone="paper">Join the Trail</Eyebrow>
              <SectionHeading className="mt-5 text-paper">
                Meet {site.short} on the <span className="text-saffron">campaign trail.</span>
              </SectionHeading>
              <p className="mt-6 max-w-xl text-paper/75">
                Town halls, coffees, and roundtables across the district. Bring a question. Bring a
                neighbor. Bring whatever's keeping you up at night — we'll talk about it.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <Button href="/events" variant="accent" size="lg">
                See upcoming events
              </Button>
              <Button href="/volunteer" variant="ghost-dark" size="lg">
                Volunteer
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
