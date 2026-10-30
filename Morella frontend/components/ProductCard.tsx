/**
 * ProductCard — exact Nykaa PLP card from Playwright MCP snapshots
 *
 * Snapshot anatomy (f11, f33, f57, f118 series):
 *  article.cursor-pointer
 *   ul > li[BESTSELLER] li[AD] li[NEW] li[FEATURED]  ← absolute top-left
 *   Link[href=/product/id]
 *     img (square, object-contain, pale bg)
 *     div.info
 *       heading[level=2] ← product name, truncated "..."
 *       div[aria-hidden]  ← ₹discounted ₹MRP X% Off
 *       div (SR text)     ← "Regular price ₹X. Discounted price ₹Y. Z% Off."
 *       p (offer text)    ← "Extra 5% Off" / "Enjoy Complimentary Gift"
 *       div[aria-label="N out of 5 star rating"]  ← green badge + count
 *       div               ← "N shades" + sale price row
 *   div.cta               ← "Add to Bag" / "Added"
 */
import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

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

const StarIcon = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg width="13" height="13" viewBox="0 0 24 24"
    fill={filled ? "#e80071" : "none"}
    stroke={filled ? "#e80071" : "#aaa"}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, items } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const inCart = items.some(i => i.product.id === product.id);
  const wishlisted = isWishlisted(product.id);

  const onAdd = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); addItem(product); };
  const onWish = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); };

  /* Nykaa "Sale Price" secondary row — slightly deeper discount */
  const salePrice = product.discount
    ? Math.round(product.price * (1 - (product.discount * 0.12) / 100))
    : null;

  return (
    <article className="group relative flex flex-col bg-white border border-nk-lite hover:shadow-sm transition-shadow"
      style={{ borderRadius: 0 }}>

      {/* ── Badges [BESTSELLER / NEW / FEATURED / AD] ─────────── */}
      {(product.badge || (product.discount && product.discount > 10)) && (
        <ul className="absolute top-1.5 left-1.5 z-10 flex flex-col gap-0.5" role="list" aria-label="Badges">
          {product.discount && product.discount > 10 && (
            <li role="listitem"
              className="bg-white border border-nk-border text-9 font-bold uppercase px-1 py-0.5 leading-tight text-nk-text">
              BESTSELLER
            </li>
          )}
          {product.badge && (
            <li role="listitem"
              className="bg-white border border-nk-border text-9 font-bold uppercase px-1 py-0.5 leading-tight text-nk-accent">
              {product.badge}
            </li>
          )}
        </ul>
      )}

      {/* ── Wishlist (hover) ──────────────────────────────────── */}
      <button type="button"
        aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        aria-pressed={wishlisted}
        onClick={onWish}
        className="absolute top-1.5 right-1.5 z-10 w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nk-accent">
        <HeartIcon filled={wishlisted} />
      </button>

      {/* ── Link: image + info ────────────────────────────────── */}
      <Link href={`/product/${product.id}`}
        aria-label={`${product.brand} ${product.name}, ₹${product.price.toLocaleString()}`}
        className="flex flex-col flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-nk-accent">

        {/* Square image */}
        <div className="relative bg-white overflow-hidden" style={{ paddingTop: "100%" }}>
          <img src={product.image} alt={product.name}
            width={220} height={220} loading="lazy"
            className="absolute inset-0 w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Info block */}
        <div className="flex flex-col flex-1 px-2 pt-1.5 pb-1">

          {/* Brand — 10px uppercase muted */}
          <p className="text-10 font-semibold text-nk-muted uppercase tracking-wide truncate mb-0.5">
            {product.brand}
          </p>

          {/* heading[level=2] — truncated */}
          <h2 className="text-12 font-normal text-nk-text line-clamp-2 mb-1"
            style={{ minHeight: "32px", lineHeight: "1.3" }}
            title={product.name}>
            {product.name}
          </h2>

          {/* Prices — aria-hidden visual row */}
          <div aria-hidden="true" className="flex items-baseline gap-1 flex-wrap mb-0.5">
            <span className="text-12 font-medium text-nk-text">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-11 text-nk-dim line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
            {product.discount && (
              <span className="text-11 text-nk-accent font-medium">
                {product.discount}% Off
              </span>
            )}
          </div>

          {/* SR-only accessible price — "Regular price ₹X. Discounted price ₹Y. Z% Off." */}
          <span className="sr-only">
            {product.originalPrice
              ? `Regular price ₹${product.originalPrice.toLocaleString()}. Discounted price ₹${product.price.toLocaleString()}. ${product.discount}% Off.`
              : `Price ₹${product.price.toLocaleString()}.`}
          </span>

          {/* Star rating — green badge exactly like Nykaa */}
          <div className="flex items-center gap-1 mb-1"
            aria-label={`${product.rating} out of 5 star rating`}>
            <span className="flex items-center gap-0.5 text-white text-10 font-semibold px-1 py-0.5 leading-none"
              style={{ backgroundColor: "#388e3c", borderRadius: "2px" }}>
              {product.rating} <StarIcon />
            </span>
            <span className="text-10 text-nk-dim">
              ( {product.reviewCount.toLocaleString()} )
            </span>
          </div>

          {/* Sale price secondary row */}
          {salePrice && product.discount && (
            <div className="flex items-center gap-1 px-1.5 py-1 mt-auto"
              style={{ backgroundColor: "#fff3cd", borderRadius: "2px" }}>
              <span className="text-9 text-nk-muted whitespace-nowrap">Sale Price</span>
              <span className="text-11 font-semibold text-nk-text">₹{salePrice.toLocaleString()}</span>
              <span className="text-9 text-nk-accent font-semibold">
                {Math.min(product.discount + 5, 65)}% Off
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* ── Add to Bag ────────────────────────────────────────── */}
      <div className="px-2 pb-2 pt-0.5">
        <button type="button"
          aria-label={inCart ? `${product.name} added to bag` : `Add ${product.name} to bag`}
          onClick={onAdd}
          className={`w-full py-1.5 text-11 font-semibold border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-nk-accent ${
            inCart
              ? "bg-nk-accent border-nk-accent text-white"
              : "border-nk-accent text-nk-accent hover:bg-nk-accent hover:text-white"
          }`}
          style={{ borderRadius: "2px" }}>
          {inCart ? "✓ Added" : "Add to Bag"}
        </button>
      </div>

      <span aria-live="polite" aria-atomic="true" className="sr-only">
        {inCart ? `${product.name} added to bag` : ""}
      </span>
    </article>
  );
}
