import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { products } from "@/components/ProductGrid";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === id) || products[0];

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <main>
      <Header />
      <div className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-8)]">
        <nav className="mb-[var(--space-4)] text-xs text-[var(--color-text-secondary)]">
          <Link href="/" className="hover:underline">Home</Link> &gt;{" "}
          <Link href={`/category/${product.category}`} className="capitalize hover:underline">
            {product.category}
          </Link>{" "}
          &gt; <span>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-[var(--space-8)] lg:grid-cols-2">
          {/* Image */}
          <div className="flex items-center justify-center overflow-hidden rounded-[var(--radius-lg)] bg-white p-8 shadow-[var(--shadow-md)]">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[460px] w-auto object-contain"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-[var(--space-6)]">
            <div className="flex items-center gap-3">
              {product.badge && (
                <span className="inline-block rounded-full bg-[var(--color-accent)] px-[var(--space-3)] py-[var(--space-1)] text-xs font-semibold text-white">
                  {product.badge}
                </span>
              )}
              <span className="text-xs font-bold uppercase text-[var(--color-text-secondary)]">
                {product.brand}
              </span>
            </div>

            <h1
              className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]"
              style={{ lineHeight: "var(--leading-6xl)" }}
            >
              {product.name}
            </h1>

            <div className="flex items-center gap-[var(--space-2)]">
              <span className="text-[var(--color-accent)]">★</span>
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                {product.rating} ({product.reviewCount.toLocaleString()} verified ratings)
              </span>
            </div>

            <div className="flex items-center gap-[var(--space-3)]">
              <span className="text-3xl font-bold text-[var(--color-text-primary)]">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-[var(--color-text-secondary)] line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.discount && (
                <span className="rounded bg-[var(--color-surface-warm)] px-[var(--space-2)] py-[var(--space-1)] text-sm font-semibold text-[var(--color-accent)]">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            <p
              className="text-base text-[var(--color-text-secondary)] leading-relaxed"
            >
              Experience authentic luxury with <strong>{product.brand}</strong>. Formulated for everyday brilliance, premium quality ingredients, and unmatched customer satisfaction exclusively curated at MORYELLE.
            </p>

            <div className="flex gap-[var(--space-4)]">
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
              >
                {added ? "✓ Added to Bag!" : "Add to Bag"}
              </Button>
              <Link href="/cart" className="flex-1">
                <Button variant="outline" size="lg" className="w-full">
                  Go to Bag
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}