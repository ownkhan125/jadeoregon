"use client";

import { useEffect, useRef, useState } from "react";
import { registerGsap } from "@/lib/gsap";

export function useCounter(to = 0, { duration = 1.6, start = "top 85%" } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const { gsap, ScrollTrigger } = registerGsap();
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: to,
      duration,
      ease: "power3.out",
      scrollTrigger: { trigger: node, start, once: true },
      onUpdate: () => setValue(Math.round(obj.v)),
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      ScrollTrigger.refresh();
    };
  }, [to, duration, start]);

  return [ref, value];
}
