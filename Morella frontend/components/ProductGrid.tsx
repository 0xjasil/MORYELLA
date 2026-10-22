import React, { useState } from "react";
import Link from "next/link";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  category: "makeup" | "skincare" | "fragrance" | "haircare";
  brand: string;
}

import productsData from "@/products.json";

export const products: Product[] = (productsData as any[]).map((p, idx) => ({
  id: String(p.id || idx + 1),
  name: p.name,
  price: p.price ?? 499,
  originalPrice: p.originalPrice ?? undefined,
  discount: p.discount ?? undefined,
  rating: p.rating ?? 4.5,
  reviewCount: p.reviewCount ?? 120,
  image: p.image,
  badge: p.badge ?? (p.discount && p.discount > 15 ? `${p.discount}% Off` : undefined),
  category: (p.category as Product["category"]) || "makeup",
  brand: p.brand || "MORYELLE",
}));

export default function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [addedItems, setAddedItems] = useState<{ [key: string]: boolean }>({});

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleAddToBag = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setAddedItems((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <section className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-8)]">
      <div className="mb-[var(--space-6)] flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
            MORYELLE Featured Products
          </h2>
          <p className="mt-[var(--space-1)] text-sm text-[var(--color-text-secondary)]">
            Authentic beauty, curated directly from top collections
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {["all", "makeup", "skincare", "fragrance"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-colors ${
                selectedCategory === cat
                  ? "bg-[var(--color-accent)] text-white shadow-sm"
                  : "bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)]"
              }`}
            >
              {cat === "all" ? "All Products" : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group flex flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-white)] shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]"
          >
            <div>
              <div className="relative aspect-square overflow-hidden bg-white p-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {product.badge && (
                  <span className="absolute top-[var(--space-2)] left-[var(--space-2)] rounded-full bg-[var(--color-accent)] px-[var(--space-3)] py-[var(--space-1)] text-[10px] font-semibold text-white tracking-wide shadow-sm">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-[var(--space-3)]">
                <p className="mb-[var(--space-1)] text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
                  {product.brand}
                </p>
                <h3
                  className="mb-[var(--space-2)] text-xs font-medium text-[var(--color-text-primary)] line-clamp-2 min-h-[32px]"
                  style={{ lineHeight: "var(--leading-sm)" }}
                  title={product.name}
                >
                  {product.name}
                </h3>
                <div className="flex items-center gap-[var(--space-2)] flex-wrap">
                  <span className="text-sm font-bold text-[var(--color-text-primary)]">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-[var(--color-text-secondary)] line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-[10px] font-bold text-[var(--color-accent)]">
                      {product.discount}% Off
                    </span>
                  )}
                </div>
                <div className="mt-[var(--space-1)] flex items-center gap-[var(--space-1)]">
                  <span className="text-xs text-[var(--color-accent)]">★</span>
                  <span className="text-[11px] font-medium text-[var(--color-text-secondary)]">
                    {product.rating} ({product.reviewCount.toLocaleString()})
                  </span>
                </div>
              </div>
            </div>
            <div className="p-[var(--space-3)] pt-0">
              <button
                onClick={(e) => handleAddToBag(e, product.id)}
                className={`w-full rounded-[var(--radius-md)] border py-[var(--space-2)] text-xs font-semibold transition-all ${
                  addedItems[product.id]
                    ? "bg-green-600 border-green-600 text-white"
                    : "border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white"
                }`}
              >
                {addedItems[product.id] ? "✓ Added to Bag" : "Add to Bag"}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}