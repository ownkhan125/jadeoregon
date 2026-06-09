"use client";

import { useRef } from "react";
import { animate, useMotionValue, useSpring, useTransform } from "motion/react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

/**
 * Returns a ref + motion style object that pulls the element toward the cursor
 * with inertial spring physics. Apply via <motion.div style={style} ref={ref} />.
 */
export function useMagnetic({ strength = 0.35, range = 80, stiffness = 220, damping = 18 } = {}) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness, damping, mass: 0.4 });
  const y = useSpring(0, { stiffness, damping, mass: 0.4 });

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > rect.width / 2 + range) return;
      x.set(dx * strength);
      y.set(dy * strength);
    };
    const reset = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
    };
  }, [strength, range]);

  return { ref, style: { x, y } };
}
