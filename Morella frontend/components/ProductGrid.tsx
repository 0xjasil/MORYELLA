import React from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  category: string;
  brand: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Vitamin C Brightening Serum",
    price: 1299,
    originalPrice: 1799,
    rating: 4.5,
    reviewCount: 2341,
    image: "https://images.unsplash.com/photo-1620915262434-4b377c5294aa?w=400",
    badge: "Bestseller",
    category: "skincare",
    brand: "Nykaa Cosmetics",
  },
  {
    id: "2",
    name: "Matte Lipstick - Rose",
    price: 899,
    rating: 4.2,
    reviewCount: 1890,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
    category: "makeup",
    brand: "Nykaa Cosmetics",
  },
  {
    id: "3",
    name: "Argan Oil Hair Mask",
    price: 1499,
    originalPrice: 1999,
    rating: 4.7,
    reviewCount: 3210,
    image: "https://images.unsplash.com/photo-1535693842576-7f4ffd7e8a8b?w=400",
    badge: "Top Rated",
    category: "haircare",
    brand: "Nykaa Cosmetics",
  },
  {
    id: "4",
    name: "Floral Eau de Parfum",
    price: 2499,
    rating: 4.4,
    reviewCount: 765,
    image: "https://images.unsplash.com/photo-1547861851-efc1f27fd07a?w=400",
    category: "fragrance",
    brand: "Nykaa Cosmetics",
  },
  {
    id: "5",
    name: "Gentle Cleansing Foam",
    price: 699,
    rating: 4.1,
    reviewCount: 987,
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400",
    category: "skincare",
    brand: "Nykaa Cosmetics",
  },
  {
    id: "6",
    name: "Eyeshadow Palette",
    price: 1599,
    originalPrice: 2199,
    rating: 4.6,
    reviewCount: 1543,
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=400",
    badge: "New",
    category: "makeup",
    brand: "Nykaa Cosmetics",
  },
];

export default function ProductGrid() {
  return (
    <section className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-8)]">
      <div className="mb-[var(--space-6)] flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Featured Products
          </h2>
          <p className="mt-[var(--space-1)] text-sm text-[var(--color-text-secondary)]">
            Handpicked picks just for you
          </p>
        </div>
        <Link
          href="/category/all"
          className="hidden text-sm font-medium text-[var(--color-text-link)] hover:underline sm:inline-flex"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-white)] shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]"
          >
            <div className="relative aspect-square overflow-hidden bg-[var(--color-surface)]">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {product.badge && (
                <span className="absolute top-[var(--space-2)] left-[var(--space-2)] rounded-full bg-[var(--color-accent)] px-[var(--space-3)] py-[var(--space-1)] text-xs font-medium text-white">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="p-[var(--space-3)]">
              <p className="mb-[var(--space-1)] text-xs font-medium text-[var(--color-text-secondary)] uppercase">
                {product.brand}
              </p>
              <h3
                className="mb-[var(--space-2)] text-sm font-medium text-[var(--color-text-primary)] line-clamp-2"
                style={{ lineHeight: "var(--leading-sm)" }}
              >
                {product.name}
              </h3>
              <div className="flex items-center gap-[var(--space-2)] flex-wrap">
                <span className="text-base font-semibold text-[var(--color-text-primary)]">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[var(--color-text-secondary)] line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-medium text-[var(--color-accent)]">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% Off
                  </span>
                )}
              </div>
              <div className="mt-[var(--space-1)] flex items-center gap-[var(--space-1)]">
                <span className="text-xs text-[var(--color-accent)]">★</span>
                <span className="text-xs text-[var(--color-text-secondary)]">
                  {product.rating} ({product.reviewCount})
                </span>
              </div>
              <button className="mt-[var(--space-3)] w-full rounded-[var(--radius-md)] border border-[var(--color-accent)] py-[var(--space-2)] text-xs font-medium text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-colors">
                Add to Bag
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}