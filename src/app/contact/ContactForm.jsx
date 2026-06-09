"use client";

import Link from "next/link";
import { Form, Field, Input, Textarea, Checkbox } from "@/components";

export function ContactForm() {
  return (
    <Form
      submitLabel="Send Message"
      successTitle="Message received."
      successBody="A member of the team will reach back within two business days."
      onSubmit={async () => {
        await new Promise((r) => setTimeout(r, 600));
      }}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="First Name" htmlFor="c-firstName" required>
          <Input id="c-firstName" name="firstName" type="text" required autoComplete="given-name" />
        </Field>
        <Field label="Last Name" htmlFor="c-lastName" required>
          <Input id="c-lastName" name="lastName" type="text" required autoComplete="family-name" />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Email" htmlFor="c-email" required>
          <Input id="c-email" name="email" type="email" required autoComplete="email" />
        </Field>
        <Field label="Phone" htmlFor="c-phone" hint="Optional">
          <Input id="c-phone" name="phone" type="tel" autoComplete="tel" placeholder="(503) 555-0142" />
        </Field>
      </div>
      <Field label="Message" htmlFor="c-message" required>
        <Textarea id="c-message" name="message" required rows={6} placeholder="Tell us what's on your mind." />
      </Field>
      <div className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-paper-soft p-4">
        <Checkbox
          name="sms_updates"
          label="Send me campaign updates by SMS"
          hint="Event reminders and volunteer coordination only."
        />
        <Checkbox
          name="sms_promo"
          label="Include fundraising and donation drives"
          hint="Standard message rates may apply."
        />
      </div>
      <p className="text-xs text-ink/55">
        By submitting, you agree to our{" "}
        <Link href="/privacy" className="underline hover:text-ink">Privacy Policy</Link> and{" "}
        <Link href="/terms" className="underline hover:text-ink">Terms of Service</Link>.
      </p>
    </Form>
  );
}
