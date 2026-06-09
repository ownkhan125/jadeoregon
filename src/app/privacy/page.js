import { Container, PageHeader } from "@/components";
import { site } from "@/data";

export const metadata = {
  title: `Privacy Policy — ${site.name} for Congress`,
  description: "How the campaign collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy"
        accent="Policy"
        lede={`How ${site.name} for Congress collects, uses, and protects information you share with the campaign.`}
      />
      <section className="relative py-20 sm:py-24">
        <Container size="md">
          <div className="prose-campaign space-y-8 text-base text-ink/75 sm:text-lg">
            <Block heading="What we collect">
              We collect information you provide directly — your name, contact details, location,
              and the messages you send us through forms on this site. We also collect basic site
              analytics (page views, referrer, device class) to understand how this site is used.
            </Block>
            <Block heading="How we use it">
              We use your information to respond to inquiries, coordinate volunteer shifts, send
              campaign updates, and report donations as required by federal campaign finance law.
              We never sell your data.
            </Block>
            <Block heading="SMS communications">
              If you opt in to SMS, you'll receive campaign updates, event reminders, and (if you
              opt in to the second box) fundraising drives. Reply STOP to unsubscribe at any time.
              Standard message rates may apply.
            </Block>
            <Block heading="Your choices">
              You can unsubscribe from emails at any time using the link in the footer of any
              message. You can email us to request access to or deletion of the information we hold
              about you.
            </Block>
            <Block heading="Contact">
              Questions about this policy? Reach the campaign at{" "}
              <a className="underline" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
              .
            </Block>
            <p className="text-xs text-ink/55">
              Last updated: {new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

function Block({ heading, children }) {
  return (
    <section className="border-t border-ink/10 pt-8">
      <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
        {heading}
      </h2>
      <p className="mt-4 leading-relaxed">{children}</p>
    </section>
  );
}
