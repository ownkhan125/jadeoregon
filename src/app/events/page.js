import Link from "next/link";
import {
  Container,
  PageHeader,
  Eyebrow,
  SectionHeading,
  Button,
  EventCard,
} from "@/components";
import { events, images, site } from "@/data";

export const metadata = {
  title: `Events — ${site.name} for Congress`,
  description: "Town halls, coffees, and roundtables across Oregon. RSVP and join us.",
};

export default function EventsPage() {
  const featured = events[0];
  const rest = events.slice(1);

  return (
    <>
      <PageHeader
        eyebrow="Upcoming Events"
        title="Join the campaign."
        accent="In person."
        lede="Every door knocked, every cup of coffee shared, every question asked — the work happens face-to-face. Here's where we'll be."
        image={images.cityPortland}
        imageAlt="Skyline of Portland, Oregon at dusk."
      />

      <section className="relative py-20 sm:py-24">
        <Container size="xl">
          {/* Featured */}
          <div className="mb-16">
            <div className="mb-6 flex items-baseline justify-between gap-4">
              <Eyebrow>Featured</Eyebrow>
              <Link
                href={`/events/${featured.slug}`}
                className="hidden text-xs uppercase tracking-[0.22em] text-ink/55 hover:text-ink sm:inline"
              >
                Read more →
              </Link>
            </div>
            <EventCard event={featured} layout="row" />
          </div>

          {/* Grid */}
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>All Events</Eyebrow>
              <SectionHeading as="h2" className="mt-5">
                {rest.length} more chances to <span className="text-cobalt">show up.</span>
              </SectionHeading>
            </div>
            <Button href="/volunteer" variant="ghost">
              Want to host one? Volunteer
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((e) => (
              <EventCard key={e.slug} event={e} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-cream py-20 sm:py-24">
        <Container size="xl">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>Can't make it?</Eyebrow>
              <SectionHeading className="mt-5">
                Pitch in from <span className="text-cobalt">anywhere.</span>
              </SectionHeading>
              <p className="mt-6 max-w-xl text-ink/70">
                Phone bank from your couch, share a post, or donate the cost of a coffee. Every
                hand on the wheel changes the trajectory.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <Button href="/volunteer" size="lg">
                Volunteer
              </Button>
              <Button href="/donate" variant="ghost" size="lg">
                Donate
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
