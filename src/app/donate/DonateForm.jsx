"use client";

import { useState } from "react";
import { Form, Field, Input, Select, RadioCard, Checkbox } from "@/components";

const tiers = [
  { value: "25", label: "$25", sub: "Coffee fund" },
  { value: "50", label: "$50", sub: "Yard sign" },
  { value: "100", label: "$100", sub: "Canvass shift" },
  { value: "250", label: "$250", sub: "Field day" },
  { value: "500", label: "$500", sub: "Training" },
  { value: "1000", label: "$1,000", sub: "Champion" },
];

export function DonateForm() {
  const [amount, setAmount] = useState("100");
  const [custom, setCustom] = useState("");

  return (
    <Form
      submitLabel={`Donate ${custom ? `$${custom}` : `$${amount}`}`}
      successTitle="Thank you for chipping in."
      successBody="Your contribution helps us put another canvasser on the street this week."
      onSubmit={async () => {
        await new Promise((r) => setTimeout(r, 800));
      }}
    >
      <input type="hidden" name="amount" value={custom || amount} />
      <input type="hidden" name="frequency" value="one-time" />

      <div>
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/70">
          Choose an amount
        </span>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {tiers.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => {
                setAmount(t.value);
                setCustom("");
              }}
              className={`group relative rounded-2xl border bg-paper-soft p-4 text-left transition-all duration-200 ${
                amount === t.value && !custom
                  ? "border-ink bg-paper shadow-[0_8px_24px_-18px_rgba(11,31,58,0.45)]"
                  : "border-ink/15 hover:border-ink/40"
              }`}
            >
              <div className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
                {t.label}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-ink/55">
                {t.sub}
              </div>
            </button>
          ))}
        </div>
      </div>

      <Field label="Or enter a custom amount" htmlFor="custom">
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-display text-base text-ink/60">
            $
          </span>
          <Input
            id="custom"
            type="number"
            min="1"
            step="1"
            placeholder="Other"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className="pl-9"
          />
        </div>
      </Field>

      <div>
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/70">
          Frequency
        </span>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <RadioCard name="freq" value="one-time" label="One-time" sub="A single contribution" defaultChecked />
          <RadioCard name="freq" value="monthly" label="Monthly" sub="Sustain the field team" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="First Name" htmlFor="d-firstName" required>
          <Input id="d-firstName" name="firstName" type="text" required autoComplete="given-name" />
        </Field>
        <Field label="Last Name" htmlFor="d-lastName" required>
          <Input id="d-lastName" name="lastName" type="text" required autoComplete="family-name" />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Email" htmlFor="d-email" required>
          <Input id="d-email" name="email" type="email" required autoComplete="email" />
        </Field>
        <Field label="Phone" htmlFor="d-phone" hint="Optional">
          <Input id="d-phone" name="phone" type="tel" autoComplete="tel" />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Employer" htmlFor="d-employer" required>
          <Input id="d-employer" name="employer" type="text" required autoComplete="organization" />
        </Field>
        <Field label="Occupation" htmlFor="d-occupation" required>
          <Input id="d-occupation" name="occupation" type="text" required autoComplete="organization-title" />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Field label="Address" htmlFor="d-address">
          <Input id="d-address" name="address" type="text" autoComplete="street-address" />
        </Field>
        <Field label="City" htmlFor="d-city">
          <Input id="d-city" name="city" type="text" autoComplete="address-level2" />
        </Field>
        <Field label="ZIP" htmlFor="d-zip" required>
          <Input id="d-zip" name="zip" type="text" inputMode="numeric" required autoComplete="postal-code" />
        </Field>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-paper-soft p-4">
        <Checkbox
          name="us-citizen"
          label="I am a U.S. citizen or lawful permanent resident."
          defaultChecked
        />
      </div>

      <p className="text-xs text-ink/55">
        This is a stub form for the demo. In production this submits to a compliant payment
        processor.
      </p>
    </Form>
  );
}
