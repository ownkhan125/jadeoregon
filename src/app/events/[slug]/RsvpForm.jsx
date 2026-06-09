"use client";

import { Eyebrow, Field, Input, Form, Checkbox } from "@/components";

export function RsvpForm({ eventTitle }) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-paper p-7">
      <Eyebrow>Reserve Your Spot</Eyebrow>
      <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
        RSVP
      </h3>
      <p className="mt-2 text-sm text-ink/65">Free entry. Seats are limited — confirm yours.</p>

      <Form
        className="mt-6"
        submitLabel="RSVP now"
        successTitle="You're on the list."
        successBody={`We'll see you at "${eventTitle}". A confirmation is on its way.`}
        onSubmit={async () => {
          await new Promise((r) => setTimeout(r, 600));
        }}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="First Name" htmlFor="firstName" required>
            <Input id="firstName" name="firstName" type="text" required autoComplete="given-name" />
          </Field>
          <Field label="Last Name" htmlFor="lastName" required>
            <Input id="lastName" name="lastName" type="text" required autoComplete="family-name" />
          </Field>
        </div>
        <Field label="Email" htmlFor="email" required>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </Field>
        <Field label="Phone" htmlFor="phone" hint="Optional">
          <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="(503) 555-0142" />
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
      </Form>
    </div>
  );
}
