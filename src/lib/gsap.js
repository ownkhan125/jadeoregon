"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;

export function registerGsap() {
  if (typeof window === "undefined" || registered) return { gsap, ScrollTrigger, SplitText };
  gsap.registerPlugin(ScrollTrigger, SplitText);
  registered = true;
  return { gsap, ScrollTrigger, SplitText };
}

export { gsap, ScrollTrigger, SplitText };
