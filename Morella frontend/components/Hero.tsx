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
    <section className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-4)]">
      {/* Hero carousel */}
      <div className="relative overflow-hidden rounded-[var(--radius-xl)]">
        {banner && (
          <a href={banner.link || "#"} target="_blank" rel="noreferrer">
            <img
              src={banner.image}
              alt={banner.title}
              className="h-[320px] w-full object-cover md:h-[420px]"
            />
          </a>
        )}
        <div className="absolute bottom-[var(--space-4)] left-[var(--space-6)] max-w-xl rounded-[var(--radius-lg)] bg-black/40 p-[var(--space-4)] text-white">
          <h1 className="mb-[var(--space-2)] text-2xl font-bold md:text-4xl">{banner?.title}</h1>
          <p className="mb-[var(--space-4)] text-sm md:text-base">{banner?.subtitle?.slice(0, 80)}</p>
          <button className="rounded-[var(--radius-lg)] bg-[var(--color-accent)] px-[var(--space-8)] py-[var(--space-3)] text-base font-medium text-white hover:opacity-90">
            {banner?.cta}
          </button>
        </div>
        {/* Dots */}
        <div className="absolute bottom-[var(--space-4)] right-[var(--space-6)] flex gap-[var(--space-2)]">
          {heroBanners.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === active ? "bg-[var(--color-accent)]" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Promo tiles grid */}
      <div className="mt-[var(--space-6)] grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 md:grid-cols-5">
        {promoTiles.map((tile, i) => (
          <a
            key={i}
            href={(bannersData as any[])[6 + i]?.link || "#"}
            target="_blank"
            rel="noreferrer"
            className="overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow"
          >
            <img src={tile.image} alt={tile.title} className="h-24 w-full object-cover" />
          </a>
        ))}
      </div>
    </section>
  );
}