import React, { useState, useEffect } from "react";

const heroBanners = [
  { title: "Up To 25% Off!", subtitle: "On Top Festive Picks", cta: "Shop Now", bg: "linear-gradient(135deg, #FFE1F1 0%, #F3E3BF 100%)", color: "#E80071" },
  { title: "Up To 60% Off", subtitle: "Extra Offers On Cart", cta: "Shop Now", bg: "linear-gradient(135deg, #E80071 0%, #FFE1F1 100%)", color: "#FFFFFF" },
  { title: "Upto 10% Off", subtitle: "Lip oil in a stick!", cta: "Shop Now", bg: "linear-gradient(135deg, #F3E3BF 0%, #CDD3D8 100%)", color: "#595E63" },
  { title: "Flat 20% Off!", subtitle: "Smoother & Even Skin", cta: "Shop Now", bg: "linear-gradient(135deg, #CDD3D8 0%, #F4F4F4 100%)", color: "#0000EE" },
  { title: "Only at Nykaa", subtitle: "Korean Floral Tech", cta: "Shop Now", bg: "linear-gradient(135deg, #F4F4F4 0%, #FFE1F1 100%)", color: "#E80071" },
];

const promoTiles = [
  { title: "Three New Scents", subtitle: "Bottled to Perfection", bg: "#F3E3BF" },
  { title: "Stay Berry Iconic!", subtitle: "", bg: "#FFE1F1" },
  { title: "Matcha Your Energy!", subtitle: "", bg: "#CDD3D8" },
  { title: "Smell Figgin' Delicious!", subtitle: "", bg: "#F4F4F4" },
  { title: "On ₹3500", subtitle: "Get a Mini + Pouch", bg: "#FFE1F1" },
  { title: "NEW LAUNCH", subtitle: "Free Gift On ₹3200+", bg: "#F3E3BF" },
  { title: "Flat 10% Off", subtitle: "Get 2 Gifts on ₹5000", bg: "#CDD3D8" },
  { title: "Lip Essentials", subtitle: "Advanced Hydration", bg: "#F4F4F4" },
  { title: "Flat 10% Off", subtitle: "on orders ₹4000+", bg: "#FFE1F1" },
  { title: "Cult Favorite!", subtitle: "Now In 2 New Shades", bg: "#F3E3BF" },
  { title: "YSL Lovenude", subtitle: "Undress Your Lips", bg: "#CDD3D8" },
  { title: "New Launch", subtitle: "Own Your Waves", bg: "#F4F4F4" },
  { title: "Upto 30% Off", subtitle: "Free Gift on ₹599+", bg: "#FFE1F1" },
  { title: "Upto 40% Off", subtitle: "On Hair Growth Serum", bg: "#F3E3BF" },
  { title: "Up To 50% Off", subtitle: "Explore Stacks", bg: "#CDD3D8" },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % heroBanners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const banner = heroBanners[active];

  return (
    <section className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-4)]">
      {/* Hero carousel */}
      <div
        className="relative overflow-hidden rounded-[var(--radius-xl)] px-[var(--space-6)] py-[var(--space-12)] md:py-[var(--space-14)]"
        style={{ background: banner.bg }}
      >
        <div className="relative z-10 max-w-xl">
          <span
            className="mb-[var(--space-4)] inline-block rounded-full px-[var(--space-4)] py-[var(--space-2)] text-sm font-medium"
            style={{ backgroundColor: banner.color, color: "#FFFFFF" }}
          >
            Limited Time
          </span>
          <h1
            className="mb-[var(--space-4)] text-4xl font-bold md:text-5xl"
            style={{ color: banner.color, lineHeight: "var(--leading-7xl)" }}
          >
            {banner.title}
          </h1>
          <p
            className="mb-[var(--space-6)] text-lg text-[var(--color-text-secondary)]"
            style={{ lineHeight: "var(--leading-lg)" }}
          >
            {banner.subtitle}
          </p>
          <button
            className="rounded-[var(--radius-lg)] bg-[var(--color-accent)] px-[var(--space-10)] py-[var(--space-4)] text-lg font-medium text-white hover:opacity-90"
          >
            {banner.cta}
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-[var(--space-6)] left-1/2 flex -translate-x-1/2 gap-[var(--space-2)]">
          {heroBanners.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === active ? "bg-[var(--color-accent)]" : "bg-[var(--color-surface)]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* HSBC bank offer */}
      <div className="mt-[var(--space-4)] rounded-[var(--radius-lg)] bg-[var(--color-surface-warm)] px-[var(--space-6)] py-[var(--space-4)] text-center">
        <p className="text-sm font-medium text-[var(--color-text-primary)]">
          Slide 1 of 2, HSBC, Get 20% Off On HSBC Taj Credit Cards, On All Orders Above ₹7500
        </p>
      </div>

      {/* Promo tiles grid */}
      <div className="mt-[var(--space-6)] grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 md:grid-cols-5">
        {promoTiles.map((tile, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center rounded-[var(--radius-lg)] p-[var(--space-6)] text-center shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow cursor-pointer"
            style={{ backgroundColor: tile.bg }}
          >
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{tile.title}</h3>
            {tile.subtitle && (
              <p className="mt-[var(--space-1)] text-xs text-[var(--color-text-secondary)]">{tile.subtitle}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}