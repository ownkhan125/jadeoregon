import Link from "next/link";
import {
  Container,
  PageHeader,
  Eyebrow,
  SectionHeading,
  Button,
} from "@/components";
import { images, site } from "@/data";
import { DonateForm } from "./DonateForm";

export const metadata = {
  title: `Donate — ${site.name} for Congress`,
  description: "Power the field operation. Every dollar shows up on a doorstep.",
};

const impact = [
  { amount: "$25", body: "Pays for a precinct's worth of door-hangers." },
  { amount: "$100", body: "Fuels two canvassing shifts across the district." },
  { amount: "$500", body: "Funds a full day of training for new volunteers." },
];

export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Donate"
        title="Every dollar"
        accent="lands on a doorstep."
        lede="Field organizing is the work that wins. Power the canvassers, the coffee shifts, and the yard signs that turn neighborhoods into precincts."
        image={images.cityPortland}
        imageAlt="Downtown Portland at golden hour."
      />

      <section className="relative py-20 sm:py-24">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>Choose your contribution</Eyebrow>
              <SectionHeading as="h2" className="mt-5">
                Make it <span className="text-cobalt">count.</span>
              </SectionHeading>
              <div className="mt-8 rounded-3xl border border-ink/10 bg-paper p-7 sm:p-9">
                <DonateForm />
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="sticky top-28 flex flex-col gap-6">
                <div className="rounded-3xl border border-ink/10 bg-paper-soft p-7">
                  <Eyebrow>Where it goes</Eyebrow>
                  <ul className="mt-5 space-y-4">
                    {impact.map((i) => (
                      <li key={i.amount} className="flex items-start gap-4">
                        <span className="font-display text-2xl font-semibold tracking-[-0.02em] text-cobalt">
                          {i.amount}
                        </span>
                        <span className="text-sm text-ink/75">{i.body}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-ink/10 bg-paper p-7 text-sm text-ink/70">
                  <Eyebrow>Disclosure</Eyebrow>
                  <p className="mt-5">
                    Contributions are not tax deductible. The maximum personal contribution is
                    $3,300 per election under federal law.
                  </p>
                  <p className="mt-3 text-xs">Paid for by {site.name} for Congress.</p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink py-20 text-paper sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-cobalt/40 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-saffron/15 blur-3xl" />
        </div>
        <Container size="xl" className="relative">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Eyebrow tone="paper">More than money</Eyebrow>
              <SectionHeading className="mt-5 text-paper">
                Show up <span className="text-saffron">in person.</span>
              </SectionHeading>
              <p className="mt-6 max-w-xl text-paper/75">
                Volunteers are the closest thing to a miracle a campaign has. If you can give an
                hour, it's worth more than a dollar.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <Button href="/volunteer" variant="accent" size="lg">
                Volunteer
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
