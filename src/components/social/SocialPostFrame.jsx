"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Faithfully renders an original HTML creative inside an iframe.
 *
 * The iframe is set to the creative's intrinsic pixel dimensions, then scaled
 * down with a CSS transform to fit its container. The container preserves the
 * creative's aspect ratio. No padding, no border, no background — the only
 * thing visible is the original creative at its real proportions.
 *
 * The original HTML uses `width:Wpx; height:Hpx` on a centered `.canvas` div
 * inside a body with 48px padding and `display:grid; place-items:center`.
 * Because grid centering compensates for the padding when the canvas equals
 * the body width, rendering the iframe at the exact canvas dimensions shows
 * the creative pixel-perfect, no clipping, no bars.
 */
export function SocialPostFrame({
  src,
  width,
  height,
  title,
  className = "",
  interactive = false,
}) {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      if (!rect.width) return;
      setScale(rect.width / width);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [width]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: `${width} / ${height}`,
        overflow: "hidden",
      }}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        scrolling="no"
        tabIndex={interactive ? 0 : -1}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${width}px`,
          height: `${height}px`,
          border: 0,
          display: "block",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          pointerEvents: interactive ? "auto" : "none",
        }}
      />
    </div>
  );
}
