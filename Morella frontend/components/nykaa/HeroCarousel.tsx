import React, { useState, useEffect } from "react";
import Link from "next/link";

export const heroData = [
  {
    img: "https://images-static.nykaa.com/creatives/90b13d57-9dc2-4180-87e7-08a77b94208c/default.jpg?tr=w-400,cm-pad_resize",
    offer: "Up To 50% Off",
    description: "Festive Grandeur Collection",
    link: "/category/makeup"
  },
  {
    img: "https://images-static.nykaa.com/creatives/55a85f63-b44e-434e-83d8-50e96fc1d6d1/default.jpg?tr=w-400,cm-pad_resize",
    offer: "Signature Radiance Rituals",
    description: "Discover Skincare",
    link: "/category/skincare"
  },
  {
    img: "https://images-static.nykaa.com/creatives/b2279e38-3621-481a-842f-a26b082e5871/default.jpg?tr=w-400,cm-pad_resize",
    offer: "Min 40% Off",
    description: "Iconic Bestsellers",
    link: "/category/all"
  },
  {
    img: "https://images-static.nykaa.com/creatives/0e7ff908-c829-4142-a890-451d95e95c7b/default.jpg?tr=w-400,cm-pad_resize",
    offer: "Buy 2 Get 1 Complimentary",
    description: "Botanical Hair Elixirs",
    link: "/category/hair"
  },
  {
    img: "https://images-static.nykaa.com/creatives/d01fbdc7-6f2a-4911-a42b-4b4a541f0007/default.jpg?tr=w-400,cm-pad_resize",
    offer: "Up To 35% Off",
    description: "Curated Luxury Duos",
    link: "/category/all"
  },
  {
    img: "https://images-static.nykaa.com/creatives/aafc1871-8ad4-461f-8e61-5ec950351fe2/default.jpg?tr=w-400,cm-pad_resize",
    offer: "25% Off Bond Repair",
    description: "Restorative Rituals",
    link: "/category/skincare"
  },
  {
    img: "https://images-static.nykaa.com/creatives/a8435015-fb2f-4538-89bd-0481b631fc5b/default.jpg?tr=w-400,cm-pad_resize",
    offer: "Up To 35% Off",
    description: "High-Pigment Lip Couture",
    link: "/category/makeup"
  }
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
      {/* Container for slides */}
      <div className="relative overflow-hidden rounded-[14px]">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${startIndex * (100 / 3)}%)`,
            width: `${(total / 3) * 100}%`
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
                {/* Image */}
                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-mb-surface">
                  <img
                    src={item.img}
                    alt={item.description}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Card text placed at bottom */}
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

      {/* Prev button */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-mb-bg border border-mb-border text-mb-primary shadow-card hover:bg-mb-surface hover:scale-105 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-mb-accent"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next button */}
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
