import React from "react";
import Link from "next/link";
// @ts-ignore
import { category } from "@/data/TopBrands";

const slugMap: Record<string, string> = {
  Makeup: "/category/makeup",
  Skincare: "/category/skincare",
  Hair: "/category/hair",
  "Bath & Body": "/category/bath-body",
  Fragrance: "/category/fragrance",
  Luxe: "/category/luxe",
  Wellness: "/category/health-wellness",
  Appliances: "/category/appliances"
};

export default function DiscoverCategories() {
  const items = (category || []) as Array<{ img: string; offer: string }>;

  return (
    <section className="w-full px-3 sm:px-6 my-6" aria-label="Discover Categories">
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4">
        {items.map((el, i) => {
          const href = slugMap[el.offer] || `/category/${el.offer.toLowerCase()}`;
          return (
            <Link
              key={i}
              href={href}
              className="group flex flex-col items-center justify-center p-3 bg-mb-surface rounded-[12px] border border-mb-border shadow-card hover:shadow-dropdown hover:border-mb-accent transition-all text-center"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-full bg-mb-bg border border-mb-border-lite flex items-center justify-center mb-2.5 shadow-xs">
                <img
                  src={el.img}
                  alt={el.offer}
                  className="w-full h-full object-contain p-1.5 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="font-serif text-xs sm:text-sm font-semibold text-mb-text group-hover:text-mb-primary transition-colors">
                {el.offer}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
