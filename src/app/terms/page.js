import { Container, PageHeader } from "@/components";
import { site } from "@/data";

export const metadata = {
  title: `Terms of Service — ${site.name} for Congress`,
  description: "Terms of use for the campaign website.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of"
        accent="Service"
        lede="The rules of the road for using this website."
      />
      <section className="relative py-20 sm:py-24">
        <Container size="md">
          <div className="space-y-8 text-base text-ink/75 sm:text-lg">
            <Block heading="About these terms">
              By accessing or using this site, you agree to these terms. If you don't agree, please
              don't use the site.
            </Block>
            <Block heading="Acceptable use">
              You agree not to attempt to disrupt the site, scrape it in ways that burden the
              service, or use it to send spam or solicitation. Be a good neighbor — this is a
              community space.
            </Block>
            <Block heading="Contributions">
              Donations made through this site are governed by federal campaign finance law. You
              certify that you are a U.S. citizen or lawful permanent resident and that the funds
              are your own.
            </Block>
            <Block heading="Content & accuracy">
              We work hard to keep this site accurate. Information may be updated without notice.
              Endorsements reflect personal support unless otherwise noted.
            </Block>
            <Block heading="Limitation of liability">
              This site is provided as-is. The campaign isn't liable for damages arising from your
              use of the site or reliance on its content.
            </Block>
            <Block heading="Contact">
              Questions about these terms? Reach the campaign at{" "}
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
