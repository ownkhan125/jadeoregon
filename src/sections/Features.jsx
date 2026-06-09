"use client";

import { useGsap } from "@/hooks";
import { Container } from "@/components";
import gsap from "gsap";

const features = [
  { title: "Next.js 16", body: "App Router, server components, and Turbopack out of the box." },
  { title: "Tailwind v4", body: "Theme via CSS variables and zero-config PostCSS pipeline." },
  { title: "Motion + GSAP", body: "Declarative React motion plus imperative GSAP timelines." },
];

export function Features() {
  const scope = useGsap(() => {
    gsap.from(".feature-card", {
      y: 32,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
    });
  }, []);

  return (
    <section id="features" ref={scope} className="py-24">
      <Container>
        <h2 className="mb-12 text-3xl font-semibold tracking-tight sm:text-4xl">
          Built for scale.
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="feature-card rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6"
            >
              <h3 className="mb-2 text-lg font-medium">{f.title}</h3>
              <p className="text-sm text-foreground/70">{f.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
