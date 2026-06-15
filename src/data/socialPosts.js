/**
 * Social media creative catalog.
 *
 * Each entry maps to an HTML file in /public/social-media-pack/.
 * Dimensions match the original canvas inside each creative — feeds are
 * 1080×1080, stories are 540×960. The iframe in the preview is sized at
 * these intrinsic dimensions so the original design renders 1:1 and is
 * then scaled with CSS transform without distortion.
 */
const FEED = { width: 1080, height: 1080, ratio: "1:1" };
const STORY = { width: 540, height: 960, ratio: "9:16" };

const posts = [
  // ── Feed Posts ────────────────────────────────────────────────
  {
    slug: "feed-01-quote",
    file: "feed-01-quote.html",
    number: "01",
    format: "feed",
    title: "Editorial Quote",
    category: "Editorial",
    description:
      "A cinematic editorial quote card with light leaks and serif typography — built for high-engagement quote moments.",
    tags: ["Quote", "Editorial", "Hero"],
    dimensions: FEED,
  },
  {
    slug: "feed-02-announcement",
    file: "feed-02-announcement.html",
    number: "02",
    format: "feed",
    title: "Announcement",
    category: "Announcement",
    description:
      "A bold campaign announcement layout designed to break the feed with confidence and clarity.",
    tags: ["Announcement", "Launch"],
    dimensions: FEED,
  },
  {
    slug: "feed-03-campaign-portrait",
    file: "feed-03-campaign-portrait.html",
    number: "03",
    format: "feed",
    title: "Campaign Portrait",
    category: "Portrait",
    description:
      "A magazine-style portrait composition pairing the candidate with editorial typography.",
    tags: ["Portrait", "Candidate"],
    dimensions: FEED,
  },
  {
    slug: "feed-04-event-poster",
    file: "feed-04-event-poster.html",
    number: "04",
    format: "feed",
    title: "Event Poster",
    category: "Event",
    description:
      "A square poster-style event invite with venue, date, and ticket-style detail block.",
    tags: ["Event", "Poster"],
    dimensions: FEED,
  },
  {
    slug: "feed-05-testimonial-card",
    file: "feed-05-testimonial-card.html",
    number: "05",
    format: "feed",
    title: "Testimonial",
    category: "Testimonial",
    description:
      "A focused testimonial card built around a single voice from across OR‑05.",
    tags: ["Testimonial", "Voices"],
    dimensions: FEED,
  },
  {
    slug: "feed-06-awareness-abstract",
    file: "feed-06-awareness-abstract.html",
    number: "06",
    format: "feed",
    title: "Awareness",
    category: "Awareness",
    description:
      "An abstract, awareness-focused composition for issue-driven storytelling moments.",
    tags: ["Awareness", "Abstract"],
    dimensions: FEED,
  },
  {
    slug: "feed-07-statistic-bold",
    file: "feed-07-statistic-bold.html",
    number: "07",
    format: "feed",
    title: "Statistic",
    category: "Statistic",
    description:
      "A bold statistic frame designed to anchor a single number with maximum stopping power.",
    tags: ["Stat", "Data"],
    dimensions: FEED,
  },
  {
    slug: "feed-08-community-grid",
    file: "feed-08-community-grid.html",
    number: "08",
    format: "feed",
    title: "Community Impact",
    category: "Community",
    description:
      "A grid composition celebrating community impact across OR‑05 counties.",
    tags: ["Community", "Grid"],
    dimensions: FEED,
  },
  {
    slug: "feed-09-cta-cinematic",
    file: "feed-09-cta-cinematic.html",
    number: "09",
    format: "feed",
    title: "Cinematic CTA",
    category: "CTA",
    description:
      "A cinematic call to action — built for momentum moments, volunteer pushes, and donation drives.",
    tags: ["CTA", "Donate"],
    dimensions: FEED,
  },
  {
    slug: "feed-10-brand-monogram",
    file: "feed-10-brand-monogram.html",
    number: "10",
    format: "feed",
    title: "Brand Monogram",
    category: "Brand",
    description:
      "A pure brand monogram statement — quiet, confident, and unmistakably Jade Oregon.",
    tags: ["Brand", "Monogram"],
    dimensions: FEED,
  },

  // ── Story Posts ───────────────────────────────────────────────
  {
    slug: "story-01-quote",
    file: "story-01-quote.html",
    number: "01",
    format: "story",
    title: "Editorial Quote",
    category: "Editorial",
    description:
      "A vertical editorial quote story for IG, TikTok, and Reels covers.",
    tags: ["Quote", "Editorial"],
    dimensions: STORY,
  },
  {
    slug: "story-02-countdown",
    file: "story-02-countdown.html",
    number: "02",
    format: "story",
    title: "Countdown",
    category: "Countdown",
    description:
      "An event countdown vertical, designed for primary-day urgency and tour stops.",
    tags: ["Countdown", "Event"],
    dimensions: STORY,
  },
  {
    slug: "story-03-cinematic-cover",
    file: "story-03-cinematic-cover.html",
    number: "03",
    format: "story",
    title: "Cinematic Cover",
    category: "Cover",
    description:
      "A widescreen-style story cover with HUD overlay and film treatment.",
    tags: ["Cover", "Cinematic"],
    dimensions: STORY,
  },
  {
    slug: "story-04-event-vertical",
    file: "story-04-event-vertical.html",
    number: "04",
    format: "story",
    title: "Event Ticket",
    category: "Event",
    description:
      "A vertical event-ticket story — perforation, dot pattern, the works.",
    tags: ["Event", "Ticket"],
    dimensions: STORY,
  },
  {
    slug: "story-05-testimonial-portrait",
    file: "story-05-testimonial-portrait.html",
    number: "05",
    format: "story",
    title: "Voices",
    category: "Testimonial",
    description:
      "A portrait testimonial story for highlighting voices from across the district.",
    tags: ["Testimonial", "Portrait"],
    dimensions: STORY,
  },
  {
    slug: "story-06-stat-bold",
    file: "story-06-stat-bold.html",
    number: "06",
    format: "story",
    title: "Bold Stat",
    category: "Statistic",
    description:
      "A bold stat story built around a single, oversized number.",
    tags: ["Stat", "Data"],
    dimensions: STORY,
  },
  {
    slug: "story-07-bts-polaroid",
    file: "story-07-bts-polaroid.html",
    number: "07",
    format: "story",
    title: "Behind the Scenes",
    category: "Behind the Scenes",
    description:
      "A polaroid-styled BTS story for trail-day glimpses and team moments.",
    tags: ["BTS", "Polaroid"],
    dimensions: STORY,
  },
  {
    slug: "story-08-manifesto",
    file: "story-08-manifesto.html",
    number: "08",
    format: "story",
    title: "Manifesto",
    category: "Manifesto",
    description:
      "A manifesto story — typographic, principled, built for sharing.",
    tags: ["Manifesto", "Editorial"],
    dimensions: STORY,
  },
  {
    slug: "story-09-cta-swipe",
    file: "story-09-cta-swipe.html",
    number: "09",
    format: "story",
    title: "Swipe Up CTA",
    category: "CTA",
    description:
      "A swipe-up vertical CTA designed for donation, volunteer, and signup drives.",
    tags: ["CTA", "Donate"],
    dimensions: STORY,
  },
  {
    slug: "story-10-magazine-cover",
    file: "story-10-magazine-cover.html",
    number: "10",
    format: "story",
    title: "Magazine Cover",
    category: "Cover",
    description:
      "A magazine-cover story treatment — masthead, cover lines, the whole feel.",
    tags: ["Cover", "Magazine"],
    dimensions: STORY,
  },
];

export const socialPosts = posts;

export const socialCategories = Array.from(
  new Set(posts.map((p) => p.category)),
).sort();

export function getSocialPost(slug) {
  return posts.find((p) => p.slug === slug);
}

export function getSocialPostNeighbors(slug) {
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: posts[(i - 1 + posts.length) % posts.length],
    next: posts[(i + 1) % posts.length],
  };
}
