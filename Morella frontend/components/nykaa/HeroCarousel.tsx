import React, { useState, useEffect } from "react";
import Link from "next/link";

export const heroData = [
  {
    img: "/brand/logo-primary.png",
    offer: "Up To 50% Off",
    description: "Festive Grandeur Collection",
    link: "/category/makeup",
  },
  {
    img: "/brand/logo-secondary.png",
    offer: "Signature Radiance Rituals",
    description: "Discover Skincare",
    link: "/category/skincare",
  },
  {
    img: "/brand/logo-gold.png",
    offer: "Min 40% Off",
    description: "Iconic Bestsellers",
    link: "/category/all",
  },
  {
    img: "/brand/logo-emblem.png",
    offer: "Buy 2 Get 1 Complimentary",
    description: "Botanical Hair Elixirs",
    link: "/category/hair",
  },
  {
    img: "/brand/logo-primary.png",
    offer: "Up To 35% Off",
    description: "Curated Luxury Duos",
    link: "/category/all",
  },
  {
    img: "/brand/logo-secondary.png",
    offer: "25% Off Bond Repair",
    description: "Restorative Rituals",
    link: "/category/skincare",
  },
  {
    img: "/brand/logo-gold.png",
    offer: "Up To 35% Off",
    description: "High-Pigment Lip Couture",
    link: "/category/makeup",
  },
];

export default function HeroCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = heroData.length;

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  return (
    <div
      className="relative w-full px-3 sm:px-6 my-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-[14px]">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${startIndex * (100 / 3)}%)`,
            width: `${(total / 3) * 100}%`,
          }}
        >
          {heroData.map((item, idx) => (
            <div
              key={idx}
              className="px-2"
              style={{ width: `${100 / total}%` }}
            >
              <Link
                href={item.link}
                className="group relative block overflow-hidden rounded-[12px] bg-mb-surface border border-mb-border shadow-card hover:shadow-dropdown transition-all"
              >
                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-mb-surface">
                  <img
                    src={item.img}
                    alt={item.description}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3.5 bg-mb-surface border-t border-mb-border">
                  <h3 className="font-serif text-sm sm:text-base font-semibold text-mb-text group-hover:text-mb-primary transition-colors leading-snug truncate">
                    {item.offer}
                  </h3>
                  <p className="text-xs text-mb-body mt-0.5 truncate font-medium">
                    {item.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-mb-bg border border-mb-border text-mb-primary shadow-card hover:bg-mb-surface hover:scale-105 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-mb-accent"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-mb-bg border border-mb-border text-mb-primary shadow-card hover:bg-mb-surface hover:scale-105 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-mb-accent"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}