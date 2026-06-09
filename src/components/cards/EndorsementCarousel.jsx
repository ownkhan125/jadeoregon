"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EndorsementCard } from "./EndorsementCard";

export function EndorsementCarousel({ items, tone = "light" }) {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [snaps, setSnaps] = useState([]);
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback((i) => embla && embla.scrollTo(i), [embla]);
  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    setSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
    embla.on("reInit", () => {
      setSnaps(embla.scrollSnapList());
      onSelect();
    });
    onSelect();
  }, [embla]);

  const isDark = tone === "dark";

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="-ml-5 flex touch-pan-y">
          {items.map((e, i) => (
            <div
              key={i}
              className="min-w-0 flex-[0_0_85%] pl-5 sm:flex-[0_0_55%] lg:flex-[0_0_38%]"
            >
              <EndorsementCard endorsement={e} tone={tone} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-1.5">
          {snaps.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isDark ? "bg-paper/40" : "bg-ink/25"
              } ${selected === i ? "w-8" : "w-2"} ${
                selected === i && (isDark ? "bg-saffron" : "bg-ink")
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <CarouselButton onClick={scrollPrev} label="Previous" tone={tone}>
            ←
          </CarouselButton>
          <CarouselButton onClick={scrollNext} label="Next" tone={tone}>
            →
          </CarouselButton>
        </div>
      </div>
    </div>
  );
}

function CarouselButton({ children, onClick, label, tone }) {
  const isDark = tone === "dark";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`grid h-11 w-11 place-items-center rounded-full border transition-all duration-200 hover:-translate-y-0.5 ${
        isDark
          ? "border-paper/25 text-paper hover:border-paper hover:bg-paper/10"
          : "border-ink/20 text-ink hover:border-ink hover:bg-ink/[0.04]"
      }`}
    >
      {children}
    </button>
  );
}
