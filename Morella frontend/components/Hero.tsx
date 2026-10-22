import React, { useState, useEffect } from "react";
import bannersData from "@/banners.json";

const heroBanners = (bannersData as any[]).slice(0, 6).map((b) => ({
  image: b.image,
  title: (b.callout || b.alt || b.title || "").split("|")[0].trim() || "MORYELLE",
  subtitle: b.title || "",
  cta: "Shop Now",
  link: b.link,
}));

const promoTiles = (bannersData as any[]).slice(6, 21).map((b) => ({
  image: b.image,
  title: (b.callout || b.alt || "").split("|")[0].trim() || "Shop Now",
}));

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (heroBanners.length === 0) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % heroBanners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const banner = heroBanners[active] || heroBanners[0];

  return (
    <section className="mx-auto max-w-[1280px] px-0 py-0">
      {/* Hero carousel */}
      <div className="relative overflow-hidden">
        {banner && (
          <a href={banner.link || "#"} target="_blank" rel="noreferrer">
            <img
              src={banner.image}
              alt={banner.title}
              className="h-[320px] w-full object-cover md:h-[420px]"
              style={{ borderRadius: 0 }}
            />
          </a>
        )}
        <div className="absolute bottom-[var(--space-14)] left-[var(--space-15)] max-w-xl p-[var(--space-14)] text-white">
          <h1 className="mb-[var(--space-8)] text-2xl font-semibold md:text-4xl" style={{ lineHeight: "var(--leading-2xl)" }}>{banner?.title?.split("|")[0]}</h1>
          {banner?.subtitle && <p className="mb-[var(--space-12)] text-sm md:text-base" style={{ lineHeight: "var(--leading-lg)" }}>{banner?.subtitle?.slice(0, 80)}</p>}
          <button className="bg-[var(--color-accent)] px-[var(--space-15)] py-[var(--space-8)] text-sm font-medium text-white hover:opacity-90" style={{ borderRadius: 0 }}>
            {banner?.cta}
          </button>
        </div>
        {/* Dots */}
        <div className="absolute bottom-[var(--space-14)] right-[var(--space-15)] flex gap-[var(--space-8)]">
          {heroBanners.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-2 w-2 ${i === active ? "bg-[var(--color-accent)]" : "bg-white/60"}`}
              style={{ borderRadius: 0 }}
            />
          ))}
        </div>
      </div>

      {/* Promo tiles grid - sharp rectangles */}
      <div className="mt-[var(--space-15)] grid grid-cols-2 gap-0 sm:grid-cols-3 md:grid-cols-5">
        {promoTiles.map((tile, i) => (
          <a
            key={i}
            href={(bannersData as any[])[6 + i]?.link || "#"}
            target="_blank"
            rel="noreferrer"
            className="overflow-hidden"
          >
            <img src={tile.image} alt={tile.title} className="h-24 w-full object-cover" style={{ borderRadius: 0 }} />
          </a>
        ))}
      </div>
    </section>
  );
}