"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export function useGsap(setup, deps = []) {
  const scope = useRef(null);

  useIsomorphicLayoutEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context(setup, scope);
    return () => ctx.revert();
  }, deps);

  return scope;
}
