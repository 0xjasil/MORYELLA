import React, { useState } from "react";
import { useRouter } from "next/router";
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
      <Header />
      <main id="main-content" className="min-h-screen bg-[#F4F4F4]">
        <div className="mx-auto max-w-content px-4 md:px-6 py-4">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-xs text-[#595E63]" role="list">
              <li role="listitem">
                <Link href="/" className="hover:text-[#E80071] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E80071] rounded">
                  Home
                </Link>
              </li>
              <li role="listitem" aria-hidden="true">/</li>
              <li role="listitem">
                <Link
                  href={`/category/${product.category}`}
                  className="capitalize hover:text-[#E80071] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E80071] rounded"
                >
                  {product.category}
                </Link>
              </li>
              <li role="listitem" aria-hidden="true">/</li>
              <li role="listitem" className="text-[#000000] font-medium truncate max-w-[200px]" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-[420px_1fr]">

            {/* ── Image ───────────────────────────────────── */}
            <div className="bg-white rounded-lg border border-[#CDD3D8] p-6 flex items-center justify-center aspect-square md:aspect-auto md:min-h-[400px]">
              <img
                src={product.image}
                alt={product.name}
                width={420}
                height={420}
                loading="eager"
                fetchPriority="high"
                className="max-h-[380px] w-auto object-contain"
              />
            </div>

            {/* ── Details ─────────────────────────────────── */}
            <div className="bg-white rounded-lg border border-[#CDD3D8] p-5 flex flex-col gap-4">

              {/* Brand + badge */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#595E63] uppercase tracking-wider">
                  {product.brand}
                </span>
                {product.badge && (
                  <span className="bg-[#000000] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-sm">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Name */}
              <h1 className="text-lg font-semibold text-[#000000] leading-snug">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <span
                  className="flex items-center gap-0.5 bg-[#E80071] text-white text-xs font-semibold px-1.5 py-0.5 rounded-sm"
                  aria-label={`${product.rating} out of 5 stars`}
                >
                  {product.rating}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </span>
                <span className="text-xs text-[#6F7981]">
                  {product.reviewCount.toLocaleString()} ratings
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 border-t border-[#F4F4F4] pt-3">
                <span className="text-2xl font-semibold text-[#000000]">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#6F7981] line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discount && (
                  <span className="text-sm font-semibold text-[#E80071]">
                    {product.discount}% Off
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-[#595E63] leading-relaxed">
                Experience authentic luxury with{" "}
                <strong className="text-[#000000]">{product.brand}</strong>.
                Premium quality formulation, dermatologist-tested and exclusively curated for MORYELLE.
              </p>

              {/* Qty + CTAs */}
              <div className="flex flex-col gap-3 pt-1">

                {/* Quantity selector */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-[#595E63]">Qty:</span>
                  <div
                    className="flex items-center border border-[#CDD3D8] rounded-sm overflow-hidden"
                    role="group"
                    aria-label="Select quantity"
                  >
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQty(v => Math.max(1, v - 1))}
                      className="px-3 py-1.5 text-sm font-bold text-[#000000] hover:bg-[#F4F4F4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E80071]"
                    >
                      −
                    </button>
                    <span className="px-3 py-1.5 text-sm font-semibold text-[#000000] border-x border-[#CDD3D8] min-w-[32px] text-center">
                      {qty}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQty(v => v + 1)}
                      className="px-3 py-1.5 text-sm font-bold text-[#000000] hover:bg-[#F4F4F4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E80071]"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to bag + wishlist */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label={flash ? "Added to bag" : "Add to bag"}
                    onClick={handleAddToCart}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-md border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E80071] ${
                      flash || inCart
                        ? "bg-green-600 border-green-600 text-white"
                        : "bg-[#E80071] border-[#E80071] text-white hover:opacity-90"
                    }`}
                  >
                    {flash ? "✓ Added to Bag!" : inCart ? "✓ In Your Bag" : "Add to Bag"}
                  </button>

                  <button
                    type="button"
                    aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    aria-pressed={wishlisted}
                    onClick={() => toggleWishlist(product)}
                    className={`px-3 py-2.5 rounded-md border text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E80071] ${
                      wishlisted
                        ? "border-[#E80071] bg-[#FFF0F5] text-[#E80071]"
                        : "border-[#CDD3D8] text-[#595E63] hover:border-[#E80071] hover:text-[#E80071]"
                    }`}
                  >
                    {wishlisted ? "♥" : "♡"}
                  </button>
                </div>

                <Link
                  href="/cart"
                  className="block w-full text-center py-2.5 text-sm font-semibold rounded-md border border-[#E80071] text-[#E80071] hover:bg-[#E80071] hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E80071]"
                >
                  Go to Bag
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
