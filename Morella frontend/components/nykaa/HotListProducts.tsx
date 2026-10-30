import React, { useRef } from "react";
import Link from "next/link";
// @ts-ignore
import { justDropped } from "@/data/TopBrands";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function HotListProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addItem, items } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const products = (justDropped || []) as Array<{
    "custom-tag"?: string;
    img: string;
    name: string;
    price: string;
    offer?: string;
    qty?: string;
    best?: string;
    shades?: string;
  }>;

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = direction === "left" ? -280 : 280;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  const handleAddToCart = (e: React.MouseEvent, p: any, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    const cleanPrice = parseInt(p.price.replace(/[^\d]/g, ""), 10) || 499;
    addItem({
      id: `hot-${idx + 1}`,
      name: p.name,
      price: cleanPrice,
      rating: 4.5,
      reviewCount: parseInt((p.qty || "100").replace(/[^\d]/g, ""), 10) || 120,
      image: p.img,
      category: "makeup",
      brand: p.name.split(" ")[0] || "Moryelle",
      badge: p.best || p["custom-tag"]
    });
  };

  return (
    <section className="w-full px-3 sm:px-6 my-8" aria-label="Hot List Super Sellers">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-2">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-mb-text text-left">
            Hot List Icons
          </h2>
          <p className="text-xs sm:text-sm font-medium text-mb-muted mt-1">
            Moryelle Beauté’s Iconic Super Sellers
          </p>
        </div>
        <Link
          href="/category/makeup"
          className="text-xs sm:text-sm font-semibold text-mb-accent-deep hover:text-mb-primary flex items-center gap-1 transition-colors"
        >
          View Collection <span>→</span>
        </Link>
      </div>

      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          aria-label="Previous products"
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-mb-bg border border-mb-border text-mb-primary shadow-card flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 hover:bg-mb-surface hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2"
        >
          {products.slice(0, 16).map((product, i) => {
            const prodId = `hot-${i + 1}`;
            const inCart = items.some(item => item.product.id === prodId);
            const wishlisted = isWishlisted(prodId);

            return (
              <div
                key={i}
                className="flex-shrink-0 w-[190px] sm:w-[220px] bg-mb-surface rounded-[12px] border border-mb-border shadow-card hover:shadow-dropdown transition-all flex flex-col justify-between p-3.5 relative group/card"
              >
                {/* Badges */}
                <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
                  {product["custom-tag"] && (
                    <span className="bg-mb-gold-deep text-mb-bg text-[10px] font-bold px-2 py-0.5 rounded-[4px] shadow-sm uppercase tracking-wider">
                      {product["custom-tag"]}
                    </span>
                  )}
                  {product.best && (
                    <span className="bg-mb-primary text-mb-bg text-[10px] font-bold px-2 py-0.5 rounded-[4px] shadow-sm uppercase tracking-wider">
                      {product.best}
                    </span>
                  )}
                </div>

                {/* Wishlist button */}
                <button
                  type="button"
                  aria-label="Wishlist"
                  onClick={(e) => {
                    e.preventDefault();
                    const cleanPrice = parseInt(product.price.replace(/[^\d]/g, ""), 10) || 499;
                    toggleWishlist({
                      id: prodId,
                      name: product.name,
                      price: cleanPrice,
                      rating: 4.5,
                      reviewCount: 150,
                      image: product.img,
                      category: "makeup",
                      brand: product.name.split(" ")[0] || "Moryelle"
                    });
                  }}
                  className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-mb-bg border border-mb-border shadow-sm flex items-center justify-center text-mb-accent hover:text-mb-primary transition-colors hover:scale-110"
                >
                  <svg
                    className={`w-3.5 h-3.5 ${wishlisted ? "fill-mb-accent text-mb-accent" : "fill-none stroke-currentColor"}`}
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>

                {/* Image */}
                <div className="relative aspect-square w-full overflow-hidden rounded-[8px] bg-mb-surface flex items-center justify-center mb-2.5">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover/card:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <h3
                      className="font-serif text-xs sm:text-sm font-semibold text-mb-text line-clamp-2 leading-snug mb-1"
                      title={product.name}
                    >
                      {product.name}
                    </h3>

                    {/* Price and offer */}
                    <div className="flex items-baseline gap-2 flex-wrap my-1.5">
                      <span className="text-sm font-bold text-mb-text">{product.price}</span>
                      {product.offer && (
                        <span className="text-[11px] font-bold text-mb-accent-deep">
                          {product.offer}
                        </span>
                      )}
                    </div>

                    {/* Reviews count and shades */}
                    <div className="flex items-center gap-2 text-[10px] text-mb-muted mb-3">
                      {product.qty && <span>{product.qty}</span>}
                      {product.shades && <span className="text-mb-accent-deep font-semibold">• {product.shades}</span>}
                    </div>
                  </div>

                  {/* Add to Bag CTA */}
                  <button
                    onClick={(e) => handleAddToCart(e, product, i)}
                    className={`w-full py-2 text-xs font-semibold rounded-[10px] transition-all shadow-sm ${
                      inCart
                        ? "bg-mb-primary text-mb-bg border border-mb-primary"
                        : "bg-mb-primary hover:bg-mb-primary-hover text-mb-bg"
                    }`}
                  >
                    {inCart ? "✓ Added to Bag" : "Add to Bag"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => scroll("right")}
          aria-label="Next products"
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-mb-bg border border-mb-border text-mb-primary shadow-card flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 hover:bg-mb-surface hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
