"use client";

import { useEffect, useState } from "react";

/**
 * Real share controls: mailto, X intent, Facebook sharer, and a clipboard "copy link" button.
 */
export function ShareRow({ title, slug }) {
  const [origin, setOrigin] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin);
  }, []);

  const url = origin ? `${origin}/events/${slug}` : `/events/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const items = [
    { label: "Email", href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}` },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // no-op
    }
  };

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-ink/15 px-4 py-2 text-xs uppercase tracking-[0.22em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
        >
          {item.label}
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        className="rounded-full border border-ink/15 px-4 py-2 text-xs uppercase tracking-[0.22em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
