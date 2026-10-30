import React, { useState, useEffect, useCallback } from "react";
import bannersData from "@/banners.json";

/* ── Data ─────────────────────────────────────────────────────── */
const heroBanners = (bannersData as any[])
  .filter((b: any) => b.image)
  .slice(0, 6)
  .map((b: any) => ({
    image: b.image as string,
    title: ((b.callout || b.alt || b.title || "") as string).split("|")[0].trim() || "MORYELLE",
    subtitle: (b.title || "") as string,
    link: (b.link || "#") as string,
  }));

/* ── Icons ────────────────────────────────────────────────────── */
const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* ── Component ────────────────────────────────────────────────── */
export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = heroBanners.length;

  const next = useCallback(() => setActive(p => (p + 1) % total), [total]);
  const prev = useCallback(() => setActive(p => (p - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused || total === 0) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [paused, next, total]);

  if (total === 0) return null;

  return (
    <section
      aria-label="Featured promotions"
      className="relative w-full overflow-hidden bg-[#F4F4F4]"
      /* Nykaa hero: full-width, ~420px tall on desktop */
      style={{ height: "clamp(200px, 35vw, 420px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {heroBanners.map((b, i) => (
        <div
          key={i}
          aria-hidden={i !== active}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: i === active ? 1 : 0, pointerEvents: i === active ? "auto" : "none" }}
        >
          <a href={b.link} target="_blank" rel="noreferrer" tabIndex={i === active ? 0 : -1}>
            {/* object-cover intentional for hero — full bleed like Nykaa */}
            <img
              src={b.image}
              alt={b.title}
              width={1440}
              height={420}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : undefined}
              className="w-full h-full object-cover"
            />
          </a>
        </div>
      ))}

      {/* Prev / Next */}
      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center shadow hover:bg-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E80071]"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center shadow hover:bg-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E80071]"
          >
            <ChevronRight />
          </button>
        </>
      )}

      {/* Dots */}
      {total > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1" role="tablist" aria-label="Slide indicators">
          {heroBanners.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                i === active ? "w-5 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
