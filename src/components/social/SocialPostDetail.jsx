"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/layout";
import { Eyebrow, Button } from "@/components/ui";
import { SocialPostFrame } from "./SocialPostFrame";

export function SocialPostDetail({ post, prev, next }) {
  const router = useRouter();
  const [fullView, setFullView] = useState(false);

  useEffect(() => {
    if (!fullView) return;
    const onKey = (e) => {
      if (e.key === "Escape") setFullView(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [fullView]);

  // Keyboard arrows for prev/next when not in fullView
  useEffect(() => {
    if (fullView) return;
    const onKey = (e) => {
      const t = e.target;
      if (t && t.tagName && /INPUT|TEXTAREA|SELECT/.test(t.tagName)) return;
      if (e.key === "ArrowLeft" && prev) {
        e.preventDefault();
        router.push(`/social-media-posts/${prev.slug}`);
      } else if (e.key === "ArrowRight" && next) {
        e.preventDefault();
        router.push(`/social-media-posts/${next.slug}`);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullView, prev, next, router]);

  const isStory = post.format === "story";
  const src = `/social-media-pack/${post.file}`;

  return (
    <>
      <section className="relative bg-paper-soft pb-20 pt-32 sm:pt-40">
        {/* Decorative blobs matching PageHeader's style */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-32 -top-10 h-[420px] w-[420px] rounded-full bg-cobalt/15 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-saffron/25 blur-3xl" />
        </div>

        <Container size="xl">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55"
          >
            <Link href="/social-media-posts" className="hover:text-cobalt">
              Social Library
            </Link>
            <span aria-hidden>/</span>
            <span>{isStory ? "Stories" : "Feed"}</span>
            <span aria-hidden>/</span>
            <span className="text-ink/80">
              {post.number} · {post.title}
            </span>
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Creative */}
            <div
              className={
                isStory
                  ? "order-1 mx-auto w-full max-w-[440px] lg:col-span-5 lg:mx-0 lg:max-w-none"
                  : "order-1 mx-auto w-full max-w-[640px] lg:col-span-7 lg:mx-0 lg:max-w-none"
              }
            >
              <div className="overflow-hidden rounded-2xl bg-ink ring-1 ring-ink/10 shadow-[0_60px_120px_-40px_rgba(11,31,58,0.5)]">
                <SocialPostFrame
                  src={src}
                  width={post.dimensions.width}
                  height={post.dimensions.height}
                  title={post.title}
                  interactive
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-1 font-mono text-[10px] uppercase tracking-[0.28em] text-ink/50">
                <span>
                  Native {post.dimensions.width} × {post.dimensions.height}
                </span>
                <span>Ratio {post.dimensions.ratio}</span>
              </div>
            </div>

            {/* Meta */}
            <div
              className={
                isStory
                  ? "order-2 mx-auto w-full max-w-[640px] lg:col-span-7 lg:mx-0 lg:max-w-none"
                  : "order-2 mx-auto w-full max-w-[640px] lg:col-span-5 lg:mx-0 lg:max-w-none"
              }
            >
              <Eyebrow>
                {isStory ? "Story" : "Feed Post"} · {post.number} / 10
              </Eyebrow>
              <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-ink text-balance">
                {post.title}
              </h1>
              <p className="mt-5 max-w-xl text-base text-ink/70 sm:mt-6 sm:text-lg">
                {post.description}
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:mt-10 sm:grid-cols-3">
                <Detail label="Format" value={isStory ? "Story · 9:16" : "Feed · 1:1"} />
                <Detail label="Category" value={post.category} />
                <Detail
                  label="Dimensions"
                  value={`${post.dimensions.width} × ${post.dimensions.height}`}
                />
                <Detail label="Edition" value="Pack 04 · 2026" />
                <Detail label="Brand" value="Jade Oregon · OR‑05" />
                <Detail label="Export" value="HTML · Ready" />
              </dl>

              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-ink/15 bg-paper px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-ink/65"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-10 flex flex-wrap gap-3">
                <Button onClick={() => setFullView(true)} size="md">
                  Open full view
                </Button>
                <a
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  className="relative inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-ink/20 bg-transparent px-5 text-[13px] font-medium tracking-tight text-ink transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out hover:-translate-y-[1px] hover:border-ink hover:bg-ink/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:h-12 sm:px-7 sm:text-sm"
                >
                  Open raw HTML
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path
                      d="M3 13L13 3M13 3H6M13 3V10"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>

              <p className="mt-4 hidden text-xs text-ink/45 lg:block">
                Tip · Use ← / → to navigate between creatives.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Prev / Next nav strip */}
      <section className="border-y border-ink/10 bg-paper">
        <Container size="xl">
          <div className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-2">
            <NeighborLink post={prev} direction="prev" />
            <NeighborLink post={next} direction="next" />
          </div>
        </Container>
      </section>

      {/* Full view modal */}
      <AnimatePresence>
        {fullView && (
          <motion.div
            key="fullview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={`${post.title} full view`}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setFullView(false)}
              aria-label="Close full view"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-paper/30 bg-paper/[0.06] text-paper backdrop-blur transition-colors hover:border-saffron hover:bg-paper/10 hover:text-saffron"
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

            <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.28em] text-paper/65">
              {post.format === "feed" ? "Feed" : "Story"} · {post.number} ·{" "}
              {post.dimensions.width} × {post.dimensions.height}
            </span>

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full w-full items-center justify-center p-4 sm:p-8"
            >
              <div
                className="relative h-full w-full"
                style={{
                  maxWidth: isStory ? "min(100%, 56vh)" : "min(100%, 88vh)",
                  maxHeight: isStory ? "min(100%, 95vh)" : "min(100%, 88vh)",
                  aspectRatio: `${post.dimensions.width} / ${post.dimensions.height}`,
                  margin: "auto",
                }}
              >
                <div className="h-full w-full overflow-hidden rounded-xl shadow-[0_60px_120px_-30px_rgba(0,0,0,0.7)]">
                  <SocialPostFrame
                    src={src}
                    width={post.dimensions.width}
                    height={post.dimensions.height}
                    title={`${post.title} (full view)`}
                    interactive
                  />
                </div>
              </div>
            </motion.div>

            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.28em] text-paper/55">
              Esc · Close
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/45">
        {label}
      </dt>
      <dd className="mt-2 text-sm font-medium text-ink">{value}</dd>
    </div>
  );
}

function NeighborLink({ post, direction }) {
  if (!post) return <span aria-hidden />;
  const isPrev = direction === "prev";
  return (
    <Link
      href={`/social-media-posts/${post.slug}`}
      className={`group flex items-center gap-4 rounded-2xl border border-ink/10 bg-paper-soft p-5 transition-all hover:-translate-y-[1px] hover:border-cobalt/40 hover:bg-paper hover:shadow-[0_20px_40px_-30px_rgba(11,31,58,0.4)] ${
        isPrev ? "" : "sm:flex-row-reverse sm:text-right"
      }`}
    >
      <span
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-paper transition-transform ${
          isPrev ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
        }`}
        aria-hidden
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          {isPrev ? (
            <path
              d="M10 3 L4 8 L10 13"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M6 3 L12 8 L6 13"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] uppercase tracking-[0.28em] text-ink/50">
          {isPrev ? "Previous" : "Next"} · {post.format === "feed" ? "Feed" : "Story"} {post.number}
        </span>
        <span className="mt-1 block truncate font-display text-lg font-semibold tracking-[-0.01em] text-ink">
          {post.title}
        </span>
        <span className="mt-0.5 block text-xs text-ink/55">{post.category}</span>
      </span>
    </Link>
  );
}
