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
import { VolunteerForm } from "./VolunteerForm";

export const metadata = {
  title: `Volunteer — ${site.name} for Congress`,
  description:
    "Door knocking, phone banking, hosting, or behind the scenes — pick a way to show up.",
};

const ways = [
  { title: "Door Knocking", body: "Talk to neighbors at their door. Best with a friend." },
  { title: "Phone Banking", body: "From your couch. Scripts, lists, and training provided." },
  { title: "Host an Event", body: "A coffee, a fundraiser, or a backyard meet & greet." },
  { title: "Media & Creative", body: "Photographers, videographers, designers, social wizards." },
];

export default function VolunteerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Volunteer"
        title="Your energy"
        accent="fuels this movement."
        lede="Pick a lane, pick a date, pick a neighborhood. We'll handle the rest."
        image={images.farm}
        imageAlt="Oregon farmland at sunrise."
      />

      {/* Ways to help */}
      <section className="relative py-20 sm:py-24">
        <Container size="xl">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow>Every door knocked matters</Eyebrow>
              <SectionHeading className="mt-5">
                Real time, real outcomes.
              </SectionHeading>
            </div>
            <p className="max-w-md text-ink/70 lg:col-span-5 lg:col-start-8">
              Volunteers built every campaign worth winning. Pick what fits your schedule — even an
              hour helps.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ways.map((w, i) => (
              <article
                key={w.title}
                className="card-surface relative overflow-hidden rounded-3xl border border-ink/10 p-7"
              >
                <span className="font-mono text-[11px] tracking-[0.24em] text-ink/40">
                  / 0{i + 1}
                </span>
                <h3 className="mt-8 font-display text-xl font-semibold leading-tight tracking-[-0.02em] text-ink">
                  {w.title}
                </h3>
                <p className="mt-3 text-sm text-ink/65">{w.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Form + image */}
      <section className="relative bg-paper-soft py-20 sm:py-24">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="sticky top-28 flex flex-col gap-6">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-ink/10">
                  <Image
                    src={images.doorKnock}
                    alt="A volunteer team gathered around a clipboard before a door-knocking shift."
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="rounded-3xl border border-ink/10 bg-paper p-7">
                  <Eyebrow>What you'll get</Eyebrow>
                  <ul className="mt-5 space-y-3 text-sm text-ink/75">
                    <li>• A captain who knows your area</li>
                    <li>• Training that takes 15 minutes</li>
                    <li>• Scripts, lists, and a real plan</li>
                    <li>• Snacks. We always bring snacks.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Eyebrow>Join the Team</Eyebrow>
              <SectionHeading as="h2" className="mt-5">
                Tell us how you want to <span className="text-cobalt">show up.</span>
              </SectionHeading>
              <div className="mt-8 rounded-3xl border border-ink/10 bg-paper p-7 sm:p-9">
                <VolunteerForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Not ready? Donate */}
      <section className="relative overflow-hidden bg-ink py-20 text-paper sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-cobalt/40 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-saffron/15 blur-3xl" />
        </div>
        <Container size="xl" className="relative">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Eyebrow tone="paper">Not ready to volunteer?</Eyebrow>
              <SectionHeading className="mt-5 text-paper">
                Chip in <span className="text-saffron">instead.</span>
              </SectionHeading>
              <p className="mt-6 max-w-xl text-paper/75">
                A donation goes further than you think — it pays for clipboards, gas, and yard
                signs that turn neighborhoods into precincts.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <Button href="/donate" variant="accent" size="lg">
                Donate
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
