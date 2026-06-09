"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";
import { registerGsap } from "@/lib/gsap";

/**
 * Choreographs a section reveal: first the lines/borders scale-in, then the
 * .reveal-up / .reveal-fade content staggers in.
 */
export function useSectionBuild({ start = "top 80%", once = true } = {}) {
  const ref = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const { gsap } = registerGsap();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: node,
          start,
          once,
        },
      });

      const lines = node.querySelectorAll(".reveal-line");
      const ups = node.querySelectorAll(".reveal-up");
      const fades = node.querySelectorAll(".reveal-fade");

      if (lines.length) {
        tl.to(lines, {
          scaleX: 1,
          duration: 0.9,
          ease: "power3.inOut",
          stagger: 0.08,
        });
      }
      if (ups.length) {
        tl.to(
          ups,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.07,
          },
          lines.length ? "-=0.55" : 0,
        );
      }
      if (fades.length) {
        tl.to(
          fades,
          {
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.06,
          },
          "-=0.5",
        );
      }
    }, node);

    return () => ctx.revert();
  }, []);

  return ref;
}
