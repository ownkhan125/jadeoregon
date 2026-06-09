"use client";

import Link from "next/link";
import { Container } from "@/components";
import { site } from "@/data";

export function Footer() {
  return (
    <footer className="relative bg-ink pt-20 pb-10 text-paper">
      <Container size="xl">
        <div className="grid gap-12 border-b border-paper/10 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-saffron text-ink">
                <span className="font-display text-lg font-semibold leading-none">J</span>
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold tracking-tight">
                  {site.name}
                </span>
                <span className="text-[10px] uppercase tracking-[0.28em] text-paper/60">
                  {site.role}
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm text-paper/70">
              {site.promise} Built by Oregonians, for Oregonians.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-4 lg:col-start-7">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-paper/50">Explore</div>
              <ul className="mt-5 space-y-3 text-sm">
                {site.nav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="text-paper/85 transition-colors hover:text-saffron">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-paper/50">Connect</div>
              <ul className="mt-5 space-y-3 text-sm">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-paper/85 transition-colors hover:text-saffron"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-11">
            <div className="text-xs uppercase tracking-[0.22em] text-paper/50">Contact</div>
            <ul className="mt-5 space-y-3 text-sm text-paper/85">
              <li>{site.contact.phone}</li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="hover:text-saffron">
                  {site.contact.email}
                </a>
              </li>
              <li className="text-paper/70">{site.contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 text-xs text-paper/55 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name} for Congress. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-saffron">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-saffron">
              Terms
            </Link>
            <span className="text-paper/40">Built in Oregon</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
