import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Container,
  PageHeader,
  Eyebrow,
  SectionHeading,
  Button,
  EventCard,
} from "@/components";
import { events, site } from "@/data";
import { RsvpForm } from "./RsvpForm";
import { ShareRow } from "./ShareRow";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return { title: `Event — ${site.name}` };
  return {
    title: `${event.title} — ${site.name} for Congress`,
    description: event.summary,
  };
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return notFound();
  const related = events.filter((e) => e.slug !== event.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={`${event.type} · ${event.date.month} ${event.date.day}, ${event.date.year}`}
        title={event.title}
        lede={event.summary}
        image={event.image}
        imageAlt={event.title}
      />

      <section className="relative py-20 sm:py-24">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Main column */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-ink/10">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="mt-12">
                <Eyebrow>Event Details</Eyebrow>
                <SectionHeading as="h2" className="mt-5">
                  What we'll cover.
                </SectionHeading>
                <p className="mt-6 text-base text-ink/75 sm:text-lg">{event.summary}</p>
                <p className="mt-4 text-base text-ink/70 sm:text-lg">
                  {site.name} will open with a short conversation about the issues facing this
                  district, then turn the mic over to neighbors. Come with whatever's on your mind —
                  there are no scripted questions, and every voice gets time.
                </p>
              </div>

              <div className="mt-12">
                <Eyebrow>What to Expect</Eyebrow>
                <SectionHeading as="h2" className="mt-5">
                  An honest, working room.
                </SectionHeading>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {event.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-paper/60 p-5"
                    >
                      <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-saffron text-ink">
                        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                          <path
                            d="M2 6.5 L5 9.5 L10 3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="text-sm text-ink/80">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12">
                <Eyebrow>Schedule</Eyebrow>
                <SectionHeading as="h2" className="mt-5">
                  How the night runs.
                </SectionHeading>
                <ol className="mt-8 divide-y divide-ink/10 rounded-3xl border border-ink/10 bg-paper/60">
                  {event.schedule.map((s, i) => (
                    <li key={i} className="grid grid-cols-12 gap-4 p-5 sm:p-6">
                      <span className="col-span-4 font-mono text-xs uppercase tracking-[0.22em] text-cobalt sm:col-span-3">
                        {s.time}
                      </span>
                      <span className="col-span-8 text-sm text-ink/80 sm:col-span-9">
                        {s.label}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Sidebar: Event Info + RSVP */}
            <aside className="lg:col-span-5">
              <div className="sticky top-28 flex flex-col gap-6">
                <div className="rounded-3xl border border-ink/10 bg-paper-soft p-7">
                  <Eyebrow>Event Info</Eyebrow>
                  <dl className="mt-6 space-y-5">
                    <Info label="Date">
                      {event.date.month} {event.date.day}, {event.date.year}
                    </Info>
                    <Info label="Time">{event.time}</Info>
                    <Info label="Location">{event.location}</Info>
                    <Info label="Address">{event.address}</Info>
                    <Info label="Type">{event.type}</Info>
                  </dl>
                </div>

                <RsvpForm eventTitle={event.title} />

                <div className="rounded-3xl border border-ink/10 bg-paper p-7">
                  <Eyebrow>Spread the Word</Eyebrow>
                  <p className="mt-4 text-sm text-ink/65">
                    Invite three neighbors. That's how momentum starts.
                  </p>
                  <ShareRow title={event.title} slug={event.slug} />
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Related */}
      <section className="relative bg-paper-soft py-20 sm:py-24">
        <Container size="xl">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <Eyebrow>More Events</Eyebrow>
              <SectionHeading as="h2" className="mt-5">
                Keep <span className="text-cobalt">showing up.</span>
              </SectionHeading>
            </div>
            <Button href="/events" variant="ghost">
              All events
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <EventCard key={r.slug} event={r} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function Info({ label, children }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.22em] text-ink/55">{label}</dt>
      <dd className="mt-1 text-sm text-ink/85">{children}</dd>
    </div>
  );
}
