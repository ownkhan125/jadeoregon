import Link from "next/link";
import {
  Container,
  PageHeader,
  Eyebrow,
  SectionHeading,
  Button,
} from "@/components";
import { images, site } from "@/data";
import { ContactForm } from "./ContactForm";
import { Faq } from "./Faq";

export const metadata = {
  title: `Contact — ${site.name} for Congress`,
  description: "Reach the campaign. Phone, email, or message form.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We want to hear"
        accent="from you."
        lede="Press inquiries, speaking requests, scheduling, or just a hello — we read every note."
        image={images.coast}
        imageAlt="Oregon coastline at low tide."
      />

      <section className="relative py-20 sm:py-24">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>Send a Message</Eyebrow>
              <SectionHeading as="h2" className="mt-5">
                Start a <span className="text-cobalt">conversation.</span>
              </SectionHeading>
              <div className="mt-8 rounded-3xl border border-ink/10 bg-paper p-7 sm:p-9">
                <ContactForm />
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="sticky top-28 flex flex-col gap-6">
                <ContactCard label="Call Us" value={site.contact.phone} href={`tel:${site.contact.phone.replace(/[^0-9+]/g, "")}`} />
                <ContactCard label="Email Us" value={site.contact.email} href={`mailto:${site.contact.email}`} />
                <ContactCard label="Mailing Address" value={site.contact.address} />
                <div className="rounded-3xl border border-ink/10 bg-paper-soft p-7">
                  <Eyebrow>Office Hours</Eyebrow>
                  <ul className="mt-5 space-y-2 text-sm text-ink/75">
                    <li className="flex justify-between"><span>Mon – Fri</span><span>9 AM – 6 PM</span></li>
                    <li className="flex justify-between"><span>Saturday</span><span>10 AM – 2 PM</span></li>
                    <li className="flex justify-between"><span>Sunday</span><span>Closed</span></li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="relative bg-paper-soft py-20 sm:py-24">
        <Container size="xl">
          <div className="mb-12 grid items-end gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow>Frequently Asked</Eyebrow>
              <SectionHeading className="mt-5">
                Quick answers, <span className="text-cobalt">no run-around.</span>
              </SectionHeading>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <Button href="/volunteer" variant="ghost">
                Still curious? Volunteer to find out
              </Button>
            </div>
          </div>
          <Faq />
        </Container>
      </section>
    </>
  );
}

function ContactCard({ label, value, href }) {
  const Tag = href ? "a" : "div";
  return (
    <Tag
      href={href}
      className="group block rounded-3xl border border-ink/10 bg-paper p-7 transition-colors hover:border-ink/30"
    >
      <Eyebrow>{label}</Eyebrow>
      <div className="mt-4 font-display text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl">
        {value}
      </div>
      {href && (
        <span className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-ink/55 transition-colors group-hover:text-ink">
          Open
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      )}
    </Tag>
  );
}
