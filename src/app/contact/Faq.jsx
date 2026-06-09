"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const items = [
  {
    q: "How can I volunteer?",
    a: "Hit the Volunteer link in the nav, tell us how you want to help, and a captain will reach out within 48 hours.",
  },
  {
    q: "How do I request a yard sign?",
    a: "Email hello@jadeforcongress.com with your address and we'll get one to you. Most signs ship within a week.",
  },
  {
    q: "Can I schedule Jade for a speaking engagement?",
    a: "Yes. Send a note through the message form above with the date, audience, and topic. The scheduling team will follow up.",
  },
  {
    q: "Where does campaign funding go?",
    a: "Field organizing, voter outreach, and the unglamorous costs of building a real movement (clipboards, gas, yard signs).",
  },
  {
    q: "How can I report an issue in my community?",
    a: "Use the contact form on this page and pick 'Community Issue' as your subject. We route every report to the right team.",
  },
];

export function Faq() {
  return (
    <ul className="divide-y divide-ink/10 overflow-hidden rounded-3xl border border-ink/10 bg-paper">
      {items.map((item, i) => (
        <FaqItem key={i} {...item} />
      ))}
    </ul>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-ink/[0.02] sm:px-8 sm:py-6"
        aria-expanded={open}
      >
        <span className="font-display text-lg font-semibold tracking-[-0.02em] text-ink sm:text-xl">
          {q}
        </span>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden
        >
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
            <path d="M8 2 V14 M2 8 H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-sm text-ink/70 sm:px-8 sm:pb-8 sm:text-base">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
