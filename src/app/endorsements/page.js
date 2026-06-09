import Link from "next/link";
import {
  Container,
  PageHeader,
  Eyebrow,
  SectionHeading,
  Button,
  EndorsementCard,
  EndorsementCarousel,
} from "@/components";
import { endorsements, endorsementCategories, images, site } from "@/data";

export const metadata = {
  title: `Endorsements — ${site.name} for Congress`,
  description: "Mayors, veterans, organizers, and neighbors standing with Jade.",
};

export default function EndorsementsPage() {
  const featured = endorsements.slice(0, 4);

  return (
    <>
      <PageHeader
        eyebrow="Endorsements"
        title="Support is building"
        accent="across Oregon."
        lede={`From elected officials to veterans to small-business owners — Oregonians who know ${site.short} are stepping forward.`}
        image={images.craterLake}
        imageAlt="Crater Lake, Oregon."
      />

      {/* Featured carousel */}
      <section className="relative overflow-hidden bg-ink py-20 text-paper sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-10 h-[460px] w-[460px] rounded-full bg-cobalt/40 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-[520px] w-[520px] rounded-full bg-saffron/15 blur-3xl" />
        </div>
        <Container size="xl" className="relative">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <Eyebrow tone="paper">Featured Voices</Eyebrow>
              <SectionHeading className="mt-5 text-paper">
                Why they're <span className="text-saffron">standing with Jade.</span>
              </SectionHeading>
            </div>
          </div>
          <EndorsementCarousel items={featured} tone="dark" />
        </Container>
      </section>

      {/* Category grid */}
      <section className="relative py-20 sm:py-24">
        <Container size="xl">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow>Current Endorsements</Eyebrow>
              <SectionHeading className="mt-5">
                Built across <span className="text-cobalt">the district.</span>
              </SectionHeading>
            </div>
            <p className="max-w-md text-ink/70 lg:col-span-5 lg:col-start-8">
              {endorsements.length} endorsers from {endorsementCategories.length - 1} fields. New
              names added each week.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {endorsements.map((e) => (
              <EndorsementCard key={e.name} endorsement={e} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-cream py-20 sm:py-24">
        <Container size="xl">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>Stand with Jade</Eyebrow>
              <SectionHeading className="mt-5">
                Want to add your <span className="text-cobalt">name?</span>
              </SectionHeading>
              <p className="mt-6 max-w-xl text-ink/70">
                Organizations, elected officials, and community leaders welcome — drop a line and
                we'll connect you with the endorsements team.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <Button href="/contact" size="lg">
                Contact the Campaign
              </Button>
              <Button href="/volunteer" variant="ghost" size="lg">
                Volunteer
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
