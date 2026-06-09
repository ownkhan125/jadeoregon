"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "./Container";
import { Eyebrow } from "@/components/ui";

/**
 * Section header used at the top of every sub-page.
 * Optional background image with overlay; eyebrow + display heading + lede.
 */
export function PageHeader({ eyebrow, title, accent, lede, image, imageAlt, align = "left" }) {
  return (
    <header className="relative isolate overflow-hidden bg-paper pt-36 pb-20 sm:pt-44 sm:pb-28">
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt || ""}
            fill
            sizes="100vw"
            priority
            className="-z-20 object-cover opacity-25"
          />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-paper/70 via-paper/85 to-paper" />
        </>
      )}

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-32 -top-10 h-[420px] w-[420px] rounded-full bg-cobalt/15 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-saffron/25 blur-3xl" />
      </div>

      <Container size="xl">
        <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Eyebrow>{eyebrow}</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-[clamp(2rem,6vw,5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-ink text-balance break-words"
          >
            {title}
            {accent && (
              <>
                {" "}
                <span className="text-cobalt">{accent}</span>
              </>
            )}
          </motion.h1>
          {lede && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-2xl text-base text-ink/70 sm:text-lg"
            >
              {lede}
            </motion.p>
          )}
        </div>
      </Container>
    </header>
  );
}
