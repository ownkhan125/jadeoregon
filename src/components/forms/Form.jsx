"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

/**
 * Lightweight client-side form wrapper. Calls onSubmit(data, helpers).
 * Renders a success state when helpers.success() is invoked.
 */
export function Form({
  children,
  onSubmit,
  submitLabel = "Submit",
  successTitle = "Thank you.",
  successBody = "We received your message and a member of the team will be in touch soon.",
  className,
}) {
  const [state, setState] = useState({ status: "idle", error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.status === "submitting") return;
    setState({ status: "submitting", error: null });
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await onSubmit?.(data);
      setState({ status: "success", error: null });
    } catch (err) {
      setState({ status: "idle", error: err?.message || "Something went wrong." });
    }
  };

  if (state.status === "success") {
    return (
      <div className="rounded-3xl border border-ink/10 bg-paper/60 p-8 text-center sm:p-12">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-saffron text-ink">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path d="M5 12 L10 17 L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.02em]">
          {successTitle}
        </h3>
        <p className="mt-3 text-sm text-ink/70">{successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <div className="flex flex-col gap-5">{children}</div>
      {state.error && (
        <p className="mt-4 text-sm text-red-700" role="alert">
          {state.error}
        </p>
      )}
      <div className="mt-8">
        <Button type="submit" size="lg" disabled={state.status === "submitting"}>
          {state.status === "submitting" ? "Sending…" : submitLabel}
          <span aria-hidden>→</span>
        </Button>
      </div>
    </form>
  );
}
