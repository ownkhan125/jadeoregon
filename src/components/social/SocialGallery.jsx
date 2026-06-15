"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/layout";
import { Eyebrow } from "@/components/ui";
import { SocialPostFrame } from "./SocialPostFrame";
import { cn } from "@/utils";

const FORMAT_FILTERS = [
  { key: "all", label: "All Creatives" },
  { key: "feed", label: "Feed · 1:1" },
  { key: "story", label: "Story · 9:16" },
];

export function SocialGallery({ posts, categories }) {
  const [query, setQuery] = useState("");
  const [format, setFormat] = useState("all");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (format !== "all" && p.format !== format) return false;
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      const haystack = [p.title, p.category, p.description, ...(p.tags || [])]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query, format, category]);

  const feeds = filtered.filter((p) => p.format === "feed");
  const stories = filtered.filter((p) => p.format === "story");

  const reset = () => {
    setQuery("");
    setFormat("all");
    setCategory("all");
  };

  return (
    <section className="relative pb-28 pt-2 sm:pb-32">
      <Container size="xl">
        {/* Toolbar */}
        <div className="sticky top-24 z-30 -mx-2 mb-12 rounded-3xl border border-ink/10 bg-paper/90 p-3 backdrop-blur-md sm:mx-0 sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <SearchInput value={query} onChange={setQuery} />
            <div className="flex flex-wrap items-center gap-2">
              <FilterGroup
                label="Format"
                options={FORMAT_FILTERS}
                value={format}
                onChange={setFormat}
              />
              <CategorySelect
                value={category}
                onChange={setCategory}
                categories={categories}
              />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between px-1 text-[11px] uppercase tracking-[0.22em] text-ink/50">
            <span>
              {filtered.length} of {posts.length} creatives
            </span>
            {(query || format !== "all" || category !== "all") && (
              <button
                type="button"
                onClick={reset}
                className="font-medium text-ink/70 transition-colors hover:text-cobalt"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <Empty onReset={reset} />
        ) : (
          <div className="space-y-24">
            {feeds.length > 0 && (
              <GallerySection
                eyebrow="Section I"
                title="Feed Posts"
                count={feeds.length}
                description="Ten 1080 × 1080 creatives designed to break the feed — built as standalone, export-ready posts."
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                  {feeds.map((p, i) => (
                    <PostCard post={p} key={p.slug} index={i} />
                  ))}
                </div>
              </GallerySection>
            )}

            {stories.length > 0 && (
              <GallerySection
                eyebrow="Section II"
                title="Stories"
                count={stories.length}
                description="Ten 9:16 vertical creatives for Instagram, TikTok, Reels, and YouTube Shorts."
              >
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
                  {stories.map((p, i) => (
                    <PostCard post={p} key={p.slug} index={i} />
                  ))}
                </div>
              </GallerySection>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}

function GallerySection({ eyebrow, title, count, description, children }) {
  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 border-b border-ink/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-sm text-ink/65 sm:text-base">{description}</p>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink/45">
          {String(count).padStart(2, "0")} / {String(count).padStart(2, "0")} ·
          Export Ready
        </span>
      </div>
      {children}
    </div>
  );
}

function PostCard({ post, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.03, 0.18),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/social-media-posts/${post.slug}`}
        className="group block focus-visible:outline-none"
        aria-label={`Open ${post.title} (${post.format === "feed" ? "Feed" : "Story"})`}
      >
        <div className="relative overflow-hidden rounded-2xl bg-ink ring-1 ring-ink/10 transition-shadow duration-500 group-hover:shadow-[0_40px_80px_-40px_rgba(11,31,58,0.55)]">
          <SocialPostFrame
            src={`/social-media-pack/${post.file}`}
            width={post.dimensions.width}
            height={post.dimensions.height}
            title={post.title}
          />

          {/* Hover veil with "Open" affordance — does not alter the creative,
              only appears on hover above it. */}
          <div className="pointer-events-none absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink/70 via-ink/0 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-paper/80">
              {post.format === "feed" ? "1:1" : "9:16"} · {post.number}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-saffron px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink">
              Open
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M3 13L13 3M13 3H6M13 3V10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 px-1">
          <div className="min-w-0">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-ink/45">
              <span>{post.format === "feed" ? "Feed" : "Story"}</span>
              <span>·</span>
              <span>{post.number}</span>
            </div>
            <h3 className="mt-1 truncate font-display text-base font-semibold tracking-[-0.01em] text-ink sm:text-lg">
              {post.title}
            </h3>
          </div>
          <span className="shrink-0 rounded-full border border-ink/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-ink/60 transition-colors group-hover:border-cobalt group-hover:text-cobalt">
            {post.category}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function SearchInput({ value, onChange }) {
  return (
    <div className="relative w-full lg:max-w-md">
      <svg
        viewBox="0 0 16 16"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
        fill="none"
        aria-hidden
      >
        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="m11 11 3 3"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title, tag, or category…"
        className="w-full rounded-full border border-ink/15 bg-paper-soft py-2.5 pl-9 pr-4 text-sm text-ink placeholder:text-ink/45 focus:border-cobalt focus:bg-paper focus:outline-none focus:ring-2 focus:ring-cobalt/20"
        aria-label="Search creatives"
      />
    </div>
  );
}

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="flex items-center gap-1 rounded-full bg-ink/[0.04] p-1 ring-1 ring-inset ring-ink/10"
    >
      {options.map((opt) => {
        const active = value === opt.key;
        return (
          <button
            key={opt.key}
            role="radio"
            aria-checked={active}
            type="button"
            onClick={() => onChange(opt.key)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors",
              active
                ? "bg-ink text-paper shadow-[0_4px_12px_-6px_rgba(11,31,58,0.5)]"
                : "text-ink/65 hover:text-ink",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function CategorySelect({ value, onChange, categories }) {
  return (
    <label className="relative flex items-center">
      <span className="sr-only">Category</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-full border border-ink/15 bg-paper-soft py-2 pl-3.5 pr-9 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/80 focus:border-cobalt focus:outline-none focus:ring-2 focus:ring-cobalt/20"
      >
        <option value="all">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 12 12"
        className="pointer-events-none absolute right-3 h-3 w-3 text-ink/55"
        fill="none"
        aria-hidden
      >
        <path
          d="M3 4.5 6 7.5 9 4.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </label>
  );
}

function Empty({ onReset }) {
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-dashed border-ink/15 bg-paper-soft p-12 text-center">
      <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink/50">
        No matches
      </div>
      <p className="mt-4 font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
        Nothing matches that filter.
      </p>
      <p className="mt-3 text-sm text-ink/65">
        Try a different search term or reset the filters to see all twenty
        creatives.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-paper transition-colors hover:bg-[#142a4a]"
      >
        Reset filters
      </button>
    </div>
  );
}
