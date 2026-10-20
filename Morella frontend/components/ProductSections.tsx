import React from "react";
import Link from "next/link";

const healthProducts = [
  { name: "Mountainor Liposomal Glutathione Tablets for Glowing Skin", price: 849, original: 1199, discount: 29, brand: "Mountainor" },
  { name: "Nutrova Collagen+ Antioxidants, Marine Collagen supplement", price: 2575, original: null, discount: null, brand: "Nutrova" },
  { name: "Oziva Advanced Hair Growth Actives", price: 1849, original: 2099, discount: 11, brand: "Oziva" },
  { name: "Chicnutrix Mighty Collagen Japanese Marine Collagen", price: 999, original: 1800, discount: 44, brand: "Chicnutrix" },
  { name: "Chicnutrix Glow Advanced Glutathione", price: 909, original: 1399, discount: 35, brand: "Chicnutrix" },
  { name: "Oziva Bioactive Gluta Fizzy", price: 2375, original: 4200, discount: 43, brand: "Oziva" },
  { name: "Nutrova Collagen+ Antioxidants - Cranberry", price: 3463, original: 3645, discount: 5, brand: "Nutrova" },
  { name: "Oziva Phyto Ceramide+ Collagen", price: 2199, original: 3358, discount: 34, brand: "Oziva" },
  { name: "Wellbeing Nutrition Pure Korean Marine Collagen", price: 1619, original: 1799, discount: 10, brand: "Wellbeing Nutrition" },
  { name: "Beautywise Skin Brilliance Glutathione", price: 1359, original: 1699, discount: 20, brand: "Beautywise" },
  { name: "Glutone 1000 Setria L-Glutathione", price: 2447, original: null, discount: null, brand: "Glutone" },
  { name: "HealthKart HK Vitals Skin Radiance Collagen", price: 1169, original: 1398, discount: 16, brand: "HealthKart" },
  { name: "Be Bodywise Collagen Builder Gummies", price: 449, original: 999, discount: 55, brand: "Be Bodywise" },
  { name: "Be Bodywise Biotin Hair Gummies", price: 849, original: 999, discount: 15, brand: "Be Bodywise" },
  { name: "Plix Beauty Sleep Combo", price: 867, original: 1700, discount: 49, brand: "Plix" },
  { name: "Wellbeing Nutrition Glow Collagen Peptides", price: 1799, original: 1999, discount: 10, brand: "Wellbeing Nutrition" },
];

const giftProducts = [
  { name: "L'Oréal Paris Golden Glam Gift Set", price: 1718, original: 2147, discount: 20, brand: "L'Oréal Paris" },
  { name: "PIXI On-The-Glow Mini Blush Duo Kit", price: 2200, original: null, discount: null, brand: "PIXI" },
  { name: "Nykaa Gifting Self Care Kit", price: 7487, original: null, discount: null, brand: "Nykaa Gifting" },
  { name: "inde wild Ice And Spice Dewy Lip Treatment", price: 1528, original: 1798, discount: 15, brand: "inde wild" },
  { name: "Orimii Mother Like No Other Gift Box", price: 1886, original: 1985, discount: 5, brand: "Orimii" },
  { name: "Brillare Rose Royale Gift Box", price: 1271, original: 1495, discount: 15, brand: "Brillare" },
  { name: "The Body Shop Trio Lip Butter Gift Box", price: 1283, original: 1395, discount: 8, brand: "The Body Shop" },
  { name: "Forest Essentials Gift Box Tulsi", price: 2850, original: null, discount: null, brand: "Forest Essentials" },
  { name: "RAS Luxury Oils Varanasi Gift Set", price: 3456, original: 3840, discount: 10, brand: "RAS Luxury Oils" },
  { name: "Foxtale On the Glow Travel Kit", price: 719, original: 899, discount: 20, brand: "Foxtale" },
  { name: "Asaya Head To Toe Pigmentation Kit", price: 1348, original: 1797, discount: 25, brand: "Asaya" },
  { name: "TuCo Kids Glam Makeup Kit", price: 593, original: 899, discount: 34, brand: "TuCo Kids" },
  { name: "Bath & Body Works A Thousand Wishes Gift Set", price: 5624, original: 7499, discount: 25, brand: "Bath & Body Works" },
  { name: "Dot & Key Glow Bomb Gift Set", price: 1599, original: null, discount: null, brand: "Dot & Key" },
  { name: "Aqualogica Born To Glow Kit", price: 1349, original: 1499, discount: 10, brand: "Aqualogica" },
  { name: "Wanderlust Luxury Gift Set", price: 1674, original: 2499, discount: 33, brand: "Wanderlust" },
  { name: "Nykaa Perfumes Aura Fragrance Gift Set", price: 2210, original: 3299, discount: 33, brand: "Nykaa Perfumes" },
  { name: "GUESS Seductive Gift Set", price: 4875, original: 6500, discount: 25, brand: "GUESS" },
  { name: "Kay Beauty Katrina's Top Picks Combo", price: 2098, original: 2997, discount: 30, brand: "Kay Beauty" },
  { name: "L'Occitane Premium Gift Set", price: 3060, original: 3600, discount: 15, brand: "L'Occitane" },
  { name: "LANEIGE Glazy Days Nourished Nights Set", price: 1150, original: null, discount: null, brand: "LANEIGE" },
  { name: "Lakme Bejewel Festive Trio", price: 2654, original: 2949, discount: 10, brand: "Lakme" },
  { name: "Victoria's Secret Velvet Petals Gift Set", price: 2799, original: null, discount: null, brand: "Victoria's Secret" },
  { name: "Kama Ayurveda Kumkumadi Discovery Set", price: 4250, original: null, discount: null, brand: "Kama Ayurveda" },
];

function ProductCard({ product }: { product: any }) {
  return (
    <Link
      href="#"
      className="group overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-white)] shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]"
    >
      <div className="relative aspect-square bg-[var(--color-surface)] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-secondary)] text-xs">
          {product.brand}
        </div>
      </div>
      <div className="p-[var(--space-4)]">
        <p className="mb-[var(--space-1)] text-xs font-medium text-[var(--color-text-secondary)] uppercase">{product.brand}</p>
        <h3 className="mb-[var(--space-2)] text-sm font-medium text-[var(--color-text-primary)] line-clamp-2" style={{ lineHeight: "var(--leading-sm)" }}>
          {product.name}
        </h3>
        <div className="flex items-center gap-[var(--space-2)]">
          <span className="text-base font-semibold text-[var(--color-text-primary)]">
            ₹{product.price.toLocaleString()}
          </span>
          {product.original && (
            <span className="text-sm text-[var(--color-text-secondary)] line-through">
              ₹{product.original.toLocaleString()}
            </span>
          )}
          {product.discount && (
            <span className="text-xs font-medium text-[var(--color-accent)]">
              {product.discount}% Off
            </span>
          )}
        </div>
        <button className="mt-[var(--space-3)] w-full rounded-[var(--radius-md)] border border-[var(--color-accent)] py-[var(--space-2)] text-sm font-medium text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-colors">
          Add to Bag
        </button>
      </div>
    </Link>
  );
}

export default function ProductSections() {
  return (
    <>
      {/* Health & Wellness section */}
      <section className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-8)]">
        <div className="mb-[var(--space-6)] flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Health &amp; Wellness</h2>
          <a href="#" className="text-sm font-medium text-[var(--color-text-link)] hover:underline">View All →</a>
        </div>
        <div className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {healthProducts.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </section>

      {/* Gift sets section */}
      <section className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-8)]">
        <div className="mb-[var(--space-6)] flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Gifting</h2>
          <a href="#" className="text-sm font-medium text-[var(--color-text-link)] hover:underline">View All →</a>
        </div>
        <div className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {giftProducts.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}