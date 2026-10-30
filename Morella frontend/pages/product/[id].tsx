import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/components/ProductGrid";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [qty, setQty] = useState(1);
  const [flash, setFlash] = useState(false);

  const { addItem, items } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const product = products.find(p => p.id === id) ?? products[0];
  if (!product) return null;

  const inCart     = items.some(i => i.product.id === product.id);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setFlash(true);
    setTimeout(() => setFlash(false), 2500);
  };

  return (
    <>
      <Head>
        <title>{product.name} | Moryelle Beauté</title>
        <meta name="description" content={`Experience ${product.name} by ${product.brand} at Moryelle Beauté - Beauty Beyond Today.`} />
      </Head>
      <Header />
      <main id="main-content" className="min-h-screen bg-mb-bg py-8">
        <div className="mx-auto max-w-content px-4 md:px-6">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-mb-muted" role="list">
              <li role="listitem">
                <Link href="/" className="hover:text-mb-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mb-accent rounded">
                  Home
                </Link>
              </li>
              <li role="listitem" aria-hidden="true" className="text-mb-dusty">/</li>
              <li role="listitem">
                <Link
                  href={`/category/${product.category}`}
                  className="capitalize hover:text-mb-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mb-accent rounded"
                >
                  {product.category}
                </Link>
              </li>
              <li role="listitem" aria-hidden="true" className="text-mb-dusty">/</li>
              <li role="listitem" className="text-mb-text font-semibold truncate max-w-[260px]" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[460px_1fr]">

            {/* ── Image ───────────────────────────────────── */}
            <div className="bg-mb-surface rounded-[14px] border border-mb-border shadow-card p-8 flex items-center justify-center aspect-square md:aspect-auto md:min-h-[440px]">
              <img
                src={product.image}
                alt={product.name}
                width={440}
                height={440}
                loading="eager"
                fetchPriority="high"
                className="max-h-[400px] w-auto object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* ── Details ─────────────────────────────────── */}
            <div className="bg-mb-surface rounded-[14px] border border-mb-border shadow-card p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Brand + badge */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mb-muted">
                    {product.brand}
                  </span>
                  {product.badge && (
                    <span className="bg-mb-gold-deep text-mb-bg text-[10px] font-bold px-2 py-0.5 rounded-[4px] shadow-sm uppercase tracking-wider">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Name */}
                <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-mb-text leading-snug mb-3">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="flex items-center gap-1 bg-mb-gold-deep text-mb-bg text-xs font-bold px-2 py-0.5 rounded-[4px] leading-none"
                    aria-label={`${product.rating} out of 5 stars`}
                  >
                    {product.rating}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </span>
                  <span className="text-xs text-mb-muted">
                    {product.reviewCount.toLocaleString()} verified reviews
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 border-t border-mb-border-lite pt-4 mb-4">
                  <span className="text-3xl font-bold text-mb-text">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-mb-muted line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-sm font-bold text-mb-accent-deep">
                      {product.discount}% Off
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-mb-body leading-relaxed mb-6">
                  Experience authentic luxury with <strong className="text-mb-text font-semibold">{product.brand}</strong>.
                  Formulated with rare botanical actives and couture pigments, exclusively presented by Moryelle Beauté.
                </p>
              </div>

              {/* Qty + CTAs */}
              <div className="flex flex-col gap-4 border-t border-mb-border-lite pt-6">

                {/* Quantity selector */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-mb-body uppercase tracking-wider">Quantity:</span>
                  <div
                    className="flex items-center border border-mb-border bg-mb-bg rounded-[8px] overflow-hidden"
                    role="group"
                    aria-label="Select quantity"
                  >
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQty(v => Math.max(1, v - 1))}
                      className="px-3.5 py-1.5 text-sm font-bold text-mb-text hover:bg-mb-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mb-accent"
                    >
                      −
                    </button>
                    <span className="px-3.5 py-1.5 text-sm font-semibold text-mb-text border-x border-mb-border min-w-[36px] text-center">
                      {qty}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQty(v => v + 1)}
                      className="px-3.5 py-1.5 text-sm font-bold text-mb-text hover:bg-mb-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mb-accent"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to bag + wishlist */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    aria-label={flash ? "Added to bag" : "Add to bag"}
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 text-sm font-semibold rounded-[10px] shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-mb-accent ${
                      flash || inCart
                        ? "bg-mb-success text-mb-bg"
                        : "bg-mb-primary hover:bg-mb-primary-hover text-mb-bg"
                    }`}
                  >
                    {flash ? "✓ Added to Bag!" : inCart ? "✓ In Your Bag" : "Add to Bag"}
                  </button>

                  <button
                    type="button"
                    aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    aria-pressed={wishlisted}
                    onClick={() => toggleWishlist(product)}
                    className={`px-4 py-3 rounded-[10px] border text-base transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-mb-accent ${
                      wishlisted
                        ? "border-mb-accent bg-mb-bg text-mb-accent shadow-sm"
                        : "border-mb-border bg-mb-surface text-mb-muted hover:border-mb-accent hover:text-mb-primary"
                    }`}
                  >
                    {wishlisted ? "♥" : "♡"}
                  </button>
                </div>

                <Link
                  href="/cart"
                  className="block w-full text-center py-3 text-sm font-semibold rounded-[10px] border-[1.5px] border-mb-primary text-mb-primary hover:bg-mb-surface transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-mb-accent"
                >
                  View Shopping Bag
                </Link>
              </div>

              {/* Screen reader live region */}
              <span aria-live="polite" aria-atomic="true" className="sr-only">
                {flash ? `${qty} × ${product.name} added to bag` : ""}
              </span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
