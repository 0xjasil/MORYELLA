import React from "react";
import Link from "next/link";

const spotlightItems = [
  {
    img: "https://images-static.nykaa.com/uploads/b03f2a8c-2569-4e97-82e7-bd4c52225c17.jpg?tr=w-150,cm-pad_resize",
    name: "Aromatherapy Candles",
    link: "/category/fragrance"
  },
  {
    img: "https://images-static.nykaa.com/uploads/7f30da73-e647-412c-90b9-8e57c539a1dc.jpg?tr=w-150,cm-pad_resize",
    name: "Body Mists",
    link: "/category/fragrance"
  },
  {
    img: "https://images-static.nykaa.com/uploads/3599bb63-aa8c-4d7d-9684-6ee186fdca1d.jpg?tr=w-150,cm-pad_resize",
    name: "Essential Oils",
    link: "/category/skincare"
  },
  {
    img: "https://images-static.nykaa.com/uploads/1c0744ef-f265-41a4-814b-14c1dd5c1741.jpg?tr=w-150,cm-pad_resize",
    name: "Botanical Bath Salts",
    link: "/category/bath-body"
  },
  {
    img: "https://images-static.nykaa.com/uploads/9d3c7e7d-56f0-4c50-a45b-00d2d2ba77dc.jpg?tr=w-150,cm-pad_resize",
    name: "Massage Oils",
    link: "/category/bath-body"
  },
  {
    img: "https://images-static.nykaa.com/uploads/cd72bae9-630d-4ef1-a6c6-51b5b47cef54.jpg?tr=w-150,cm-pad_resize",
    name: "Exfoliating Scrubs",
    link: "/category/skincare"
  },
  {
    img: "https://images-static.nykaa.com/uploads/60c8a181-a669-4988-b9f8-fa59540119c6.jpg?tr=w-150,cm-pad_resize",
    name: "Foot Care Rituals",
    link: "/category/bath-body"
  }
];

export default function SpotlightSection() {
  return (
    <section className="w-full px-3 sm:px-6 my-8" aria-label="In The Spotlight">
      <div className="mb-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-mb-text text-left">
          In The Spotlight
        </h2>
        <p className="text-xs sm:text-sm font-medium text-mb-muted mt-1">
          Self-Care &amp; Sanctuary Essentials
        </p>
      </div>

      {/* Hero Banner with text */}
      <div className="relative overflow-hidden rounded-[14px] shadow-card mb-6 group border border-mb-border">
        <Link href="/category/bath-body" className="block">
          <img
            src="https://images-static.nykaa.com/uploads/da2f92c4-5065-4b0c-889b-9d66e9b9a870.jpg?tr=w-1200,cm-pad_resize"
            alt="In The Spotlight Self-Care"
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
          />
          <div className="absolute bottom-4 left-4 bg-mb-primary/95 text-mb-bg px-5 py-3 rounded-[10px] shadow-card border border-mb-primary-hover">
            <p className="font-serif text-lg sm:text-xl font-bold leading-tight text-mb-bg">Up To 30% Off</p>
            <p className="text-xs text-mb-gold font-medium mt-0.5 uppercase tracking-wider">On Sanctuary Must-Haves</p>
          </div>
        </Link>
      </div>

      {/* 7 Item Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4">
        {spotlightItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.link}
            className="group flex flex-col items-center justify-center p-3 bg-mb-surface rounded-[12px] border border-mb-border shadow-card hover:shadow-dropdown transition-all text-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-full bg-mb-bg border border-mb-border-lite flex items-center justify-center mb-2.5 shadow-xs">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span className="font-serif text-xs sm:text-sm font-semibold text-mb-text group-hover:text-mb-primary transition-colors leading-tight">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
