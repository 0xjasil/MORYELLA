import React from "react";
import Link from "next/link";

const radarItems = [
  { img: "/brand/logo-primary.png", offer: "Upto 20% Off", description: "On Entire Range" },
  { img: "/brand/logo-secondary.png", offer: "Upto 40% Off", description: "On Bestsellers" },
  { img: "/brand/logo-gold.png", offer: "Flat 10% Off +", description: "B5G5 On Sheet Masks" },
  { img: "/brand/logo-emblem.png", offer: "Upto 30% Off", description: "On Entire Range", link: "/category/all" },
  { img: "/brand/logo-primary.png", offer: "Flat 5% Off", description: "On Entire Range" },
  { img: "/brand/logo-secondary.png", offer: "Up To 40% Off", description: "On Entire Range" },
  { img: "/brand/logo-gold.png", offer: "Drench the Lip", description: "in Sheer Hydration!" },
  { img: "/brand/logo-emblem.png", offer: "Upto 30% Off", description: "On Entire Range!" },
  { img: "/brand/logo-primary.png", offer: "Award Winning", description: "Root Treatment Oil!" },
  { img: "/brand/logo-secondary.png", offer: "On ₹3000:", description: "Complexion Stick" },
];

export default function RadarSection() {
  const items = radarItems;

  return (
    <section className="w-full px-3 sm:px-6 my-8" aria-label="On Our Radar">
      <div className="mb-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-mb-text text-left">
          On Our Radar
        </h2>
        <p className="text-xs sm:text-sm font-medium text-mb-muted mt-1">
          Handpicked Highlights &amp; Coveted Finds
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
        {items.slice(0, 10).map((el, i) => {
          const href = el.link || "/category/all";
          return (
            <Link
              key={i}
              href={href}
              className="group flex flex-col bg-mb-surface rounded-[12px] border border-mb-border shadow-card hover:shadow-dropdown transition-all p-3.5 text-center"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-[8px] bg-mb-surface mb-2.5 flex items-center justify-center">
                <img
                  src={el.img}
                  alt={el.description}
                  className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-sm font-semibold text-mb-text group-hover:text-mb-primary transition-colors leading-tight">
                {el.offer}
              </h3>
              <p className="text-xs text-mb-body mt-1 line-clamp-1">
                {el.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}