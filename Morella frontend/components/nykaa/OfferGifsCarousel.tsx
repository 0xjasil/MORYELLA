import React, { useRef } from "react";
import Link from "next/link";

const gifBanners = [
  {
    img: "https://images-static.nykaa.com/uploads/9d7e5225-1f74-4220-8f45-9ef336b77dae.gif?tr=w-300,cm-pad_resize",
    title: "Trending Drops",
    link: "/category/makeup"
  },
  {
    img: "https://images-static.nykaa.com/uploads/456cce4d-0eda-4b5d-b90a-9d20bccb63a6.gif?tr=w-300,cm-pad_resize",
    title: "Special Combos",
    link: "/category/skincare"
  },
  {
    img: "https://images-static.nykaa.com/uploads/a23c60bf-0e28-4f45-8e06-3441cc1c734d.gif?tr=w-300,cm-pad_resize",
    title: "Best In Beauty",
    link: "/category/hair"
  },
  {
    img: "https://images-static.nykaa.com/uploads/007f3c83-203e-4c6f-a422-3502d2c51d2a.gif?tr=w-300,cm-pad_resize",
    title: "Must Haves",
    link: "/category/all"
  },
  {
    img: "https://images-static.nykaa.com/uploads/7111fd2e-8acf-4a2d-b988-0ba6a78399a7.jpg?tr=w-300,cm-pad_resize",
    title: "Festive Glam",
    link: "/category/fragrance"
  }
];

export default function OfferGifsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = direction === "left" ? -280 : 280;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="relative w-full px-3 sm:px-6 my-6">
      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          aria-label="Previous offers"
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-mb-bg shadow-card border border-mb-border text-mb-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 hover:bg-mb-surface hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1"
        >
          {gifBanners.map((banner, idx) => (
            <Link
              key={idx}
              href={banner.link}
              className="flex-1 min-w-[220px] sm:min-w-[260px] rounded-[12px] overflow-hidden border border-mb-border shadow-card hover:shadow-dropdown transition-all hover:-translate-y-0.5 bg-mb-surface"
            >
              <img
                src={banner.img}
                alt={banner.title}
                className="w-full h-auto object-cover rounded-[12px]"
              />
            </Link>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          aria-label="Next offers"
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-mb-bg shadow-card border border-mb-border text-mb-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 hover:bg-mb-surface hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
