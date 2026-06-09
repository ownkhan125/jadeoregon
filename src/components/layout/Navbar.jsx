"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { site } from "@/data";
import { Container } from "./Container";
import { Button } from "@/components/ui";
import { cn } from "@/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const { scrollY } = useScroll();
  const padding = useTransform(scrollY, [0, 80], ["1.05rem", "0.55rem"]);
  const radius = useTransform(scrollY, [0, 80], ["0px", "999px"]);
  const inset = useTransform(scrollY, [0, 80], ["0px", "12px"]);
  const surfaceOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  // Body scroll lock when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close menu when navigating
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.header
      style={{ paddingTop: inset, paddingLeft: inset, paddingRight: inset }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <motion.div
        style={{ paddingTop: padding, paddingBottom: padding, borderRadius: radius }}
        className="relative mx-auto max-w-[1400px] backdrop-blur-md"
      >
        <motion.div
          aria-hidden
          style={{ opacity: surfaceOpacity }}
          className="absolute inset-0 -z-10 rounded-[inherit] bg-paper/85 ring-1 ring-ink/10 shadow-[0_20px_60px_-30px_rgba(11,31,58,0.35)]"
        />
        <Container
          size="xl"
          className="flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-10"
        >
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
            aria-label={`${site.name} home`}
          >
            <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-paper">
              <span className="font-display text-base font-semibold leading-none">J</span>
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-saffron ring-2 ring-paper" />
            </span>
            <span className="hidden min-w-0 flex-col leading-none sm:flex">
              <span className="truncate font-display text-base font-semibold tracking-tight">
                {site.name}
              </span>
              <span className="truncate text-[10px] uppercase tracking-[0.28em] text-ink/60">
                {site.role}
              </span>
            </span>
          </Link>

          <DesktopNav items={site.nav} isActive={isActive} />

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-2 md:flex">
              <Button href={site.navCTAs.volunteer} variant="ghost" size="sm">
                Volunteer
              </Button>
              <Button href={site.navCTAs.donate} size="sm">
                Donate
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink/[0.04] lg:hidden"
            >
              <span className="relative block h-3 w-5" aria-hidden>
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-5 bg-ink transition-transform duration-300",
                    open && "translate-y-[6px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-3 h-px w-5 bg-ink transition-transform duration-300",
                    open && "-translate-y-[6px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </Container>
      </motion.div>

      <MobileMenu open={open} setOpen={setOpen} isActive={isActive} />
    </motion.header>
  );
}

/** Desktop nav: sliding pill background + leading saffron dot, no double underline. */
function DesktopNav({ items, isActive }) {
  const navRef = useRef(null);
  const itemRefs = useRef([]);
  const [hovered, setHovered] = useState(null);
  const [pill, setPill] = useState({ left: 0, width: 0, opacity: 0 });

  // Default pill position = active route, if any
  const activeIndex = items.findIndex((it) => isActive(it.href));

  useEffect(() => {
    if (hovered === null && activeIndex === -1) {
      setPill((p) => ({ ...p, opacity: 0 }));
      return;
    }
    const idx = hovered ?? activeIndex;
    const el = itemRefs.current[idx];
    const wrap = navRef.current;
    if (!el || !wrap) return;
    const er = el.getBoundingClientRect();
    const wr = wrap.getBoundingClientRect();
    setPill({ left: er.left - wr.left, width: er.width, opacity: 1 });
  }, [hovered, activeIndex]);

  return (
    <nav
      ref={navRef}
      onMouseLeave={() => setHovered(null)}
      onBlur={() => setHovered(null)}
      className="relative hidden items-center gap-0 lg:flex"
      aria-label="Primary"
    >
      <motion.span
        aria-hidden
        animate={pill}
        transition={{ type: "spring", stiffness: 360, damping: 30 }}
        className="pointer-events-none absolute inset-y-1.5 -z-10 rounded-full bg-ink/[0.06] ring-1 ring-inset ring-ink/10"
      />
      <motion.span
        aria-hidden
        animate={{ x: pill.left + 12, opacity: pill.opacity }}
        transition={{ type: "spring", stiffness: 360, damping: 30 }}
        className="pointer-events-none absolute top-1/2 -mt-[3px] h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-saffron shadow-[0_0_0_3px_rgba(247,221,125,0.25)]"
      />
      {items.map((item, i) => {
        const active = isActive(item.href);
        return (
          <Link
            ref={(n) => (itemRefs.current[i] = n)}
            key={item.href}
            href={item.href}
            onMouseEnter={() => setHovered(i)}
            onFocus={() => setHovered(i)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative px-4 py-2 text-sm font-medium tracking-tight transition-colors duration-200",
              active ? "text-ink" : "text-ink/70 hover:text-ink focus-visible:text-ink",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

/** Mobile menu sheet with overlay, explicit close, and accessible dialog roles. */
function MobileMenu({ open, setOpen, isActive }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          className="fixed inset-0 z-[60] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop — click to close */}
          <motion.button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            tabIndex={-1}
            className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
          />

          {/* Sheet */}
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ y: "-105%" }}
            animate={{ y: 0 }}
            exit={{ y: "-105%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-3 top-3 max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-[28px] bg-ink p-6 pt-5 text-paper shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)] sm:p-8 sm:pt-6"
          >
            {/* Top bar: brand + close */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="relative grid h-9 w-9 place-items-center rounded-full bg-paper/10 text-paper">
                  <span className="font-display text-base font-semibold leading-none">J</span>
                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-saffron ring-2 ring-ink" />
                </span>
                <span className="flex flex-col leading-none">
                  <span className="font-display text-base font-semibold tracking-tight">
                    {site.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.28em] text-paper/55">
                    {site.role}
                  </span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-paper/30 text-paper transition-colors hover:border-saffron hover:bg-paper/[0.08] hover:text-saffron focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/60"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
                  <path
                    d="M3 3 L13 13 M13 3 L3 13"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav aria-label="Mobile" className="mt-8 flex flex-col">
              {site.nav.map((item, i) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.05,
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group flex items-center justify-between border-b border-paper/15 py-4 font-display text-2xl font-semibold tracking-tight transition-colors sm:text-3xl sm:py-5",
                        active ? "text-saffron" : "text-paper hover:text-saffron",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        {active && (
                          <span className="inline-block h-2 w-2 rounded-full bg-saffron" aria-hidden />
                        )}
                        {item.label}
                      </span>
                      <span
                        aria-hidden
                        className="text-saffron/70 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3">
              <Button
                href={site.navCTAs.donate}
                onClick={() => setOpen(false)}
                variant="accent"
                className="w-full"
              >
                Donate
              </Button>
              <Button
                href={site.navCTAs.volunteer}
                onClick={() => setOpen(false)}
                variant="ghost-dark"
                className="w-full"
              >
                Volunteer
              </Button>
            </div>

            <p className="mt-8 text-center text-[10px] uppercase tracking-[0.28em] text-paper/40">
              Paid for by {site.name} for Congress
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
