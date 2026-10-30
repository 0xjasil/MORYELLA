import React, { useState } from "react";
import Link from "next/link";
import ProductCard, { type Product } from "@/components/ProductCard";
import productsData from "@/products.json";

/* ── Products from JSON ───────────────────────────────────────── */
export const products: Product[] = (productsData as any[]).map((p: any, i: number) => ({
  id:            String(p.id ?? i + 1),
  name:          p.name,
  price:         p.price ?? 499,
  originalPrice: p.originalPrice ?? undefined,
  discount:      p.discount ?? undefined,
  rating:        p.rating ?? 4.2,
  reviewCount:   p.reviewCount ?? 120,
  image:         p.image,
  badge:         p.badge ?? undefined,
  category:      (p.category as Product["category"]) ?? "makeup",
  brand:         p.brand ?? "MORYELLE",
}));

/* ── Section header ───────────────────────────────────────────── */
export function SectionHeader({ title, subtitle, viewAllHref }: {
  title: string; subtitle?: string; viewAllHref?: string;
}) {
  return (
    <div className="flex items-end justify-between mb-3">
      <div>
        <h2 className="text-14 font-semibold text-nk-text leading-tight">{title}</h2>
        {subtitle && <p className="text-12 text-nk-muted mt-0.5">{subtitle}</p>}
      </div>
      {viewAllHref && (
        <Link href={viewAllHref}
          className="text-12 font-medium text-nk-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nk-accent"
          style={{ borderRadius: "2px" }}>
          View All →
        </Link>
      )}
    </div>
  );
}

/* ── Category filter tabs ─────────────────────────────────────── */
const CATS = [
  { key: "all",       label: "All Products" },
  { key: "makeup",    label: "Makeup" },
  { key: "skincare",  label: "Skincare" },
  { key: "fragrance", label: "Fragrance" },
  { key: "haircare",  label: "Hair" },
];

/* ── ProductGrid ──────────────────────────────────────────────── */
export default function ProductGrid() {
  const [cat, setCat] = useState("all");
  const filtered = cat === "all" ? products : products.filter(p => p.category === cat);

  return (
    <section className="bg-white py-4 px-4 md:px-6 border-t border-nk-lite" aria-labelledby="pg-heading">
      <div className="mx-auto max-w-content">

        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
          <div>
            <h2 id="pg-heading" className="text-14 font-semibold text-nk-text">Featured Products</h2>
            <p className="text-12 text-nk-muted mt-0.5">Authentic beauty, curated for you</p>
          </div>
          {/* Filter pills */}
          <div role="group" aria-label="Filter by category" className="flex gap-1.5 flex-wrap">
            {CATS.map(c => (
              <button key={c.key} type="button" role="radio" aria-checked={cat === c.key}
                onClick={() => setCat(c.key)}
                className={`px-3 py-1 text-12 font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nk-accent ${
                  cat === c.key
                    ? "bg-nk-accent border-nk-accent text-white"
                    : "border-nk-border text-nk-muted hover:border-nk-accent hover:text-nk-accent bg-white"
                }`}
                style={{ borderRadius: "9999px" }}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid — 3→4→5→6→7 cols matching Nykaa density */}
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7"
          aria-label="Product listing">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-14 text-nk-muted">No products in this category.</p>
        )}
      </div>
    </section>
  );
}
