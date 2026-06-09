"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";
import { registerGsap } from "@/lib/gsap";

/**
 * Reveals headline text by characters/words on scroll into view.
 * Uses GSAP SplitText (free, built-in to GSAP 3.13+) + ScrollTrigger.
 */
export function useSplitText({
  type = "words,chars",
  selector,
  delay = 0,
  duration = 0.9,
  stagger = 0.025,
  from = { yPercent: 110, opacity: 0 },
  start = "top 85%",
} = {}) {
  const ref = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const { gsap, ScrollTrigger, SplitText } = registerGsap();

    const target = selector ? node.querySelectorAll(selector) : node;
    const splits = [];
    const targets = target instanceof NodeList ? Array.from(target) : [target];

    const ctx = gsap.context(() => {
      targets.forEach((el) => {
        const split = new SplitText(el, { type, linesClass: "split-line", wordsClass: "split-word", charsClass: "split-char" });
        splits.push(split);
        const pieces = type.includes("chars") ? split.chars : split.words;

        gsap.set(el, { perspective: 600 });
        gsap.from(pieces, {
          ...from,
          duration,
          ease: "power4.out",
          stagger,
          delay,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        });
      });
    }, node);

    return () => {
      splits.forEach((s) => s.revert?.());
      ctx.revert();
    };
  }, []);

  return ref;
}
