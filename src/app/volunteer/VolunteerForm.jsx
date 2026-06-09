"use client";

import { Form, Field, Input, Select, Textarea, Checkbox } from "@/components";

const counties = [
  "Benton",
  "Clackamas",
  "Clatsop",
  "Columbia",
  "Lane",
  "Lincoln",
  "Linn",
  "Marion",
  "Multnomah",
  "Polk",
  "Tillamook",
  "Washington",
  "Yamhill",
];

const regions = ["Coast", "Willamette Valley", "Portland Metro", "Central", "Southern", "Eastern"];

const interests = [
  "Door knocking",
  "Phone banking",
  "Host a fundraiser",
  "Host a meet & greet",
  "Digital / social media",
  "Photo / video",
  "Event planning",
  "Volunteer coordination",
];

export function VolunteerForm() {
  return (
    <Form
      submitLabel="Sign me up"
      successTitle="Welcome to the team."
      successBody="A volunteer captain will reach out within 48 hours with next steps."
      onSubmit={async () => {
        await new Promise((r) => setTimeout(r, 700));
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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Email" htmlFor="email" required>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </Field>
        <Field label="Phone" htmlFor="phone" hint="Optional">
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Field label="Zip" htmlFor="zip">
          <Input id="zip" name="zipCode" type="text" inputMode="numeric" autoComplete="postal-code" />
        </Field>
        <Field label="County" htmlFor="county">
          <Select id="county" name="county" defaultValue="">
            <option value="" disabled>
              Choose county
            </option>
            {counties.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Region" htmlFor="region" required>
          <Select id="region" name="region" defaultValue="" required>
            <option value="" disabled>
              Choose region
            </option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Registered to vote in Oregon?" htmlFor="registeredVoter" required>
          <Select id="registeredVoter" name="registeredVoter" defaultValue="" required>
            <option value="" disabled>
              Choose one
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="not-sure">Not sure</option>
          </Select>
        </Field>
        <Field label="Campaign experience" htmlFor="campaignExperience" required>
          <Select id="campaignExperience" name="campaignExperience" defaultValue="" required>
            <option value="" disabled>
              Choose one
            </option>
            <option value="first-time">First time</option>
            <option value="some">Some experience</option>
            <option value="seasoned">Seasoned organizer</option>
          </Select>
        </Field>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-paper-soft p-5">
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/70">
          How do you want to help?
        </span>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {interests.map((label) => (
            <Checkbox key={label} name={`interest_${label}`} label={label} />
          ))}
        </div>
      </div>

      <Field label="Availability" htmlFor="availability" required>
        <Select id="availability" name="availability" defaultValue="" required>
          <option value="" disabled>
            Choose availability
          </option>
          <option value="weekdays">Weekdays</option>
          <option value="weeknights">Week nights</option>
          <option value="weekends">Weekends</option>
          <option value="anytime">Anytime</option>
        </Select>
      </Field>

      <Field label="What issue matters most to you?" htmlFor="issues" required>
        <Textarea id="issues" name="issues" required rows={4} placeholder="Tell us what brought you in." />
      </Field>

      <Field label="Anything else we should know?" htmlFor="anythingElse">
        <Textarea id="anythingElse" name="anythingElse" rows={3} />
      </Field>

      <div className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-paper-soft p-4">
        <Checkbox
          name="sms_updates"
          label="Send me volunteer updates by SMS"
          hint="Event reminders and shift confirmations only."
        />
        <Checkbox
          name="sms_promo"
          label="Include fundraising drives"
          hint="Standard message rates may apply."
        />
      </div>
    </Form>
  );
}
