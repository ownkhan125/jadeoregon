"use client";

import { motion } from "motion/react";

const words = ["Listen", "Lead", "Deliver", "Build", "Repair", "Protect", "Restore"];

export function Marquee() {
  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-ink/10 bg-ink py-5 text-paper"
    >
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap font-display text-xl font-medium uppercase tracking-[0.18em] sm:text-2xl"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
      >
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i} className="inline-flex items-center gap-10 text-paper/85">
            <span>{w}</span>
            <span className="font-mono text-xs text-saffron">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
