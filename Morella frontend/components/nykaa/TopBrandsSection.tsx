import React, { useState } from "react";
import Link from "next/link";
// @ts-ignore
import { topBrands } from "@/data/TopBrands";

const SHOW_AT_ONCE = 4;

export default function TopBrandsSection() {
  const brands = (topBrands || []) as Array<{
    name: string;
    img: string;
    offer: string;
    description: string;
  }>;

  const [visibleCount, setVisibleCount] = useState(SHOW_AT_ONCE);
  const visibleBrands = brands.slice(0, visibleCount);
  const hasMore = visibleCount < brands.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + SHOW_AT_ONCE, brands.length));
  };

  return (
    <section className="w-full px-3 sm:px-6 my-8" aria-label="Explore Our Top Brands">
      <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-mb-text mb-6 text-left">
        Explore Maison &amp; Premier Brands
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleBrands.map((brand, i) => (
          <Link
            key={i}
            href={`/category/${brand.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="group flex flex-col bg-mb-surface rounded-[12px] border border-mb-border shadow-card hover:shadow-dropdown transition-all overflow-hidden p-3.5"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[8px] bg-mb-surface mb-3">
              <img
                src={brand.img}
                alt={brand.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <h3 className="font-serif text-base sm:text-lg font-semibold text-mb-text leading-snug">
                  {brand.offer}
                </h3>
                <p className="text-xs sm:text-sm text-mb-body mt-1 line-clamp-2">
                  {brand.description}
                </p>
              </div>
              <span className="text-xs font-semibold text-mb-primary group-hover:text-mb-primary-hover mt-3 transition-colors flex items-center gap-1">
                Shop {brand.name} <span>→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={handleShowMore}
            className="inline-flex items-center gap-2 bg-mb-primary text-mb-bg text-sm font-semibold px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mb-accent"
          >
            Show More Brands
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}