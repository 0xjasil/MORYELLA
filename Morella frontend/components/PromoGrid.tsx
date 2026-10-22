import React from "react";

const promoBanners = [
  "Up To 20% Off Gifts At cart!",
  "Up To 10% Off!",
  "Flat 10% Off!",
  "Get 15% Off on 5000",
  "Flat 10% Off!",
  "Shop New Launches!",
  "Free Gifts on Orders*",
  "HAPPY DIWALI Free Gifts on Orders*",
  "Limited Time! Buy 2 Get 1 Free",
  "Free Gifts on ₹999+",
  "Luxe Gift On all Orders!",
  "The Bold New Libre Shop Now!",
  "Popular This Season",
  "Flat 25% Off",
  "One Tint, 3 Ways!",
  "Bestsellers!",
  "Gifts On All Orders",
  "Timeless Elegance Starting ₹2600",
  "Gifts on Orders Above ₹3500",
  "Upto 15% Off On Urban Decay",
  "Free Mini on Mini!",
  "2-pc kit on ₹3600!",
  "Up To 40% Off On Your Favourite Stacks!",
];

const editorialSections = [
  "The 9-to-5 Edit",
  "Serving Now: Mocha Mousse",
  "Viral Beauty Essentials",
  "Bonjour, French Pharmacy",
  "Your No Makeup, Makeup Edit",
  "The College Beauty Guide",
  "Exam Survival Guide",
  "Skincare For All St(ages)",
];

const morePromos = [
  "Up To 20% Off On Haircare",
  "AHA BHA Lotion For Strawberry Skin",
  "Upto 30% Off On Snail Glow",
  "Upto 25% Off On Bestsellers!!",
  "Up To 30% On Entire Range",
  "Floral Tech Now In India",
  "Upto 40% Off Glow From Within",
  "Upto 35% off On Bestsellers!",
  "Nourish & Glow Everyday Body Care",
  "Hottest Drop! Elle 18 Butter Matte",
  "Up to 10% off On Entire Brand",
  "Extra 10% Off Only on MORYELLE*",
  "100% Vegan Hair Ritual",
  "Buy 1, Get 1 On Bestseller",
  "Hyaluron Anti-Ageing Range",
  "Starting @249 Lean Body Support",
  "Beauty Trendsetters",
  "Flat 20% Buy3 Get1",
  "New Launch",
  "Up To 50% Buy1 Get1",
  "Up To 20% New Launch",
  "New Launch",
];

export default function PromoGrid() {
  return (
    <section className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-8)]">
      {/* Promo banner grid */}
      <div className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {promoBanners.map((text, i) => (
          <div
            key={i}
            className="flex min-h-[80px] items-center justify-center rounded-[var(--radius-lg)] p-[var(--space-4)] text-center shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow cursor-pointer"
            style={{ backgroundColor: i % 3 === 0 ? "#FFE1F1" : i % 3 === 1 ? "#F3E3BF" : "#CDD3D8" }}
          >
            <p className="text-xs font-medium text-[var(--color-text-primary)]">{text}</p>
          </div>
        ))}
      </div>

      {/* Need Help Choosing */}
      <div className="mt-[var(--space-12)] rounded-[var(--radius-xl)] bg-[var(--color-surface-warm)] p-[var(--space-8)] text-center">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-[var(--space-4)]">
          Need Help Choosing? Start Here!
        </h2>
        <button className="rounded-[var(--radius-lg)] bg-[var(--color-accent)] px-[var(--space-8)] py-[var(--space-3)] text-base font-medium text-white hover:opacity-90">
          Explore More
        </button>
      </div>

      {/* Editorial sections */}
      <div className="mt-[var(--space-8)]">
        <h2 className="mb-[var(--space-6)] text-2xl font-bold text-[var(--color-text-primary)]">
          Curated For You
        </h2>
        <div className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-4">
          {editorialSections.map((title, i) => (
            <div
              key={i}
              className="flex h-[120px] items-center justify-center rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow cursor-pointer"
              style={{ backgroundColor: i % 2 === 0 ? "#FFE1F1" : "#F3E3BF" }}
            >
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">{title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* More promo grid */}
      <div className="mt-[var(--space-8)] grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {morePromos.map((text, i) => (
          <div
            key={i}
            className="flex min-h-[80px] items-center justify-center rounded-[var(--radius-lg)] p-[var(--space-4)] text-center shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow cursor-pointer"
            style={{ backgroundColor: i % 3 === 0 ? "#CDD3D8" : i % 3 === 1 ? "#FFE1F1" : "#F3E3BF" }}
          >
            <p className="text-xs font-medium text-[var(--color-text-primary)]">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}