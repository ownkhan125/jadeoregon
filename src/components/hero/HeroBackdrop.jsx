"use client";

/**
 * Cinematic hero backdrop — animated SVG grid + traveling data streams
 * plus pulsing connection nodes. All animation is CSS-driven (transform /
 * opacity / stroke-dashoffset), so it's GPU-cheap.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Paper grain + warm corner blooms (kept from prior hero) */}
      <div className="absolute inset-0 bg-grain opacity-70" />
      <div className="absolute -right-40 top-10 h-[640px] w-[640px] rounded-full bg-cobalt/15 blur-3xl" />
      <div className="absolute -left-32 bottom-0 h-[520px] w-[520px] rounded-full bg-saffron/30 blur-3xl" />

      {/* Tech grid */}
      <svg
        className="hero-grid absolute inset-0 h-full w-full text-ink/[0.08]"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.6" />
          </pattern>
          <linearGradient id="hero-grid-fade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="black" stopOpacity="0" />
            <stop offset="35%" stopColor="black" stopOpacity="1" />
            <stop offset="75%" stopColor="black" stopOpacity="1" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </linearGradient>
          <mask id="hero-grid-mask">
            <rect width="1600" height="900" fill="url(#hero-grid-fade)" />
          </mask>
        </defs>
        <rect width="1600" height="900" fill="url(#hero-grid)" mask="url(#hero-grid-mask)" />
      </svg>

      {/* Animated data streams */}
      <svg
        className="hero-stream absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="stream-cobalt" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#406aaf" stopOpacity="0" />
            <stop offset="40%" stopColor="#406aaf" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#427ab5" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="stream-saffron" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f7dd7d" stopOpacity="0" />
            <stop offset="50%" stopColor="#f7dd7d" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#f7dd7d" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          className="s1"
          d="M -20 200 C 220 200 240 360 460 360 S 720 200 900 200 1180 320 1400 320 1640 220 1640 220"
          stroke="url(#stream-cobalt)"
          strokeWidth="1.6"
        />
        <path
          className="s2"
          d="M -20 520 C 200 520 260 420 460 420 S 760 600 980 600 1200 480 1400 480 1640 540 1640 540"
          stroke="url(#stream-saffron)"
          strokeWidth="1.4"
        />
        <path
          className="s3"
          d="M -20 700 C 240 700 320 580 540 580 S 780 760 1000 760 1240 660 1460 660 1640 740 1640 740"
          stroke="url(#stream-cobalt)"
          strokeWidth="1.2"
        />
        <path
          className="s4"
          d="M -20 80 C 260 80 320 200 540 200 S 760 60 980 60 1200 180 1400 180 1640 100 1640 100"
          stroke="url(#stream-saffron)"
          strokeWidth="1.2"
        />

        {/* Pulse nodes at intersections */}
        <g fill="#406aaf">
          <circle className="node-pulse" cx="460" cy="360" r="3" />
          <circle className="node-pulse delay-1" cx="900" cy="200" r="3" />
          <circle className="node-pulse delay-2" cx="980" cy="600" r="3" />
          <circle className="node-pulse delay-3" cx="540" cy="580" r="3" />
        </g>
        <g fill="#f7dd7d">
          <circle className="node-pulse delay-2" cx="1400" cy="320" r="3.5" />
          <circle className="node-pulse" cx="1000" cy="760" r="3.5" />
        </g>
      </svg>
    </div>
  );
}
