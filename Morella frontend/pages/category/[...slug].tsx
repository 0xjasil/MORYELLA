/**
 * Category PLP — exact Nykaa layout from Playwright MCP snapshots:
 *
 * navigation "Breadcrumb" → "Home ❯ Makeup"
 * h1: "Buy [Category] Products Online, N products available"
 * heading "All Products" [level=2]
 * layout: navigation "Side" (left) | product grid (right)
 *
 * Sidebar filters from snapshot:
 *   Sort By: popularity
 *   Brand | Price | Category | Discount | Avg Customer Rating |
 *   Country Of Origin | Gender | Preference | Color | Formulation |
 *   Finish | Skin type | Benefits | Ingredient | Concern | Coverage | Pack Size
 */
import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/components/ProductGrid";

/* ── Filter sidebar config ────────────────────────────────────── */
const FILTER_GROUPS = [
  "Brand", "Price", "Category", "Discount", "Avg Customer Rating",
  "Country Of Origin", "Gender", "Preference", "Color", "Formulation",
  "Finish", "Skin type", "Benefits", "Ingredient", "Concern", "Coverage", "Pack Size",
];

const SORT_OPTIONS = [
  { value: "popularity",  label: "Popularity" },
  { value: "price-asc",   label: "Price: Low to High" },
  { value: "price-desc",  label: "Price: High to Low" },
  { value: "rating",      label: "Customer Rating" },
  { value: "discount",    label: "Discount" },
  { value: "newest",      label: "New Arrivals" },
];

/* ── Chevron icon ─────────────────────────────────────────────── */
const ChevronDown = ({ open }: { open: boolean }) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    className={`transition-transform ${open ? "rotate-180" : ""}`}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ── Filter accordion item ────────────────────────────────────── */
function FilterGroup({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#F4F4F4]">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-[12px] font-medium text-[#000000] hover:text-[#E80071] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E80071]">
        {label}
        <ChevronDown open={open} />
      </button>
      {/* Filter content placeholder — collapsed by default */}
      {open && (
        <div className="px-3 pb-3 text-[11px] text-[#999]">
          No filters available for this category.
        </div>
      )}
    </div>
  );
}

export default function Category() {
  const router = useRouter();
  const { slug, q } = router.query;
  const [sortBy, setSortBy] = useState("popularity");
  const [sortOpen, setSortOpen] = useState(false);

  const categorySlug = Array.isArray(slug) ? slug[0] : slug ?? "all";
  const searchQuery = typeof q === "string" ? q.trim().toLowerCase() : "";

  /* "Buy Makeup Products Online" — Nykaa h1 pattern */
  const categoryDisplay = searchQuery
    ? `Results for "${q}"`
    : categorySlug === "all"
    ? "All"
    : categorySlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  const baseProducts = useMemo(() => {
    let list = products;
    if (searchQuery) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(searchQuery) ||
        p.brand.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery)
      );
      return list;
    }
    if (categorySlug === "all") return products;
    const matched = products.filter(p =>
      p.category.toLowerCase() === categorySlug.toLowerCase() ||
      p.brand.toLowerCase().replace(/\s+/g, "-").includes(categorySlug.toLowerCase())
    );
    return matched.length > 0 ? matched : products;
  }, [categorySlug, searchQuery]);

  const sorted = useMemo(() => {
    const arr = [...baseProducts];
    switch (sortBy) {
      case "price-asc":  return arr.sort((a, b) => a.price - b.price);
      case "price-desc": return arr.sort((a, b) => b.price - a.price);
      case "rating":     return arr.sort((a, b) => b.rating - a.rating);
      case "discount":   return arr.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
      default:           return arr;
    }
  }, [baseProducts, sortBy]);

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-[#F4F4F4]">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6 py-4">

          {/* navigation "Breadcrumb" — "Home ❯ Makeup" from snapshot */}
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex items-center gap-1 text-[12px] text-[#595E63]" role="list">
              <li role="listitem">
                <Link href="/" className="hover:text-[#E80071] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E80071] rounded">
                  Home
                </Link>
              </li>
              <li role="listitem" aria-hidden="true" className="text-[#999]">❯</li>
              <li role="listitem" className="text-[#000000] font-medium capitalize" aria-current="page">
                {categoryDisplay}
              </li>
            </ol>
          </nav>

          {/* h1 "Buy Makeup Products Online, N products available" — from snapshot */}
          <div className="mb-1">
            <h1 className="text-[16px] font-semibold text-[#000000]">
              Buy {categoryDisplay} Products Online
              <span aria-hidden="true" className="text-[14px] font-normal text-[#999] ml-1">
                ({sorted.length})
              </span>
              <span className="sr-only"> — {sorted.length} products available</span>
            </h1>
          </div>

          {/* heading "All Products" [level=2] — from snapshot */}
          <h2 className="text-[13px] font-medium text-[#000000] mb-3">All Products</h2>

          {/* ── Main layout: navigation "Side" + product grid ── */}
          <div className="flex gap-4 items-start">

            {/* navigation "Side" — left sidebar from snapshot */}
            <nav
              aria-label="Side navigation — filters"
              className="hidden md:block flex-shrink-0 bg-white border border-[#E8E8E8]"
              style={{ width: "200px", minWidth: "200px" }}>

              {/* Sort By button — "Sort By : popularity" from snapshot */}
              <div className="border-b border-[#E8E8E8]">
                <div className="relative">
                  <button
                    type="button"
                    aria-expanded={sortOpen}
                    aria-label={`Sort By: ${SORT_OPTIONS.find(o => o.value === sortBy)?.label}`}
                    onClick={() => setSortOpen(v => !v)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-[12px] font-semibold text-[#000000] hover:text-[#E80071] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E80071]">
                    <span>Sort By : <span className="font-normal">{SORT_OPTIONS.find(o => o.value === sortBy)?.label}</span></span>
                    <ChevronDown open={sortOpen} />
                  </button>
                  {sortOpen && (
                    <div className="absolute left-0 top-full w-full bg-white border border-[#E8E8E8] z-20 shadow-sm">
                      {SORT_OPTIONS.map(o => (
                        <button
                          key={o.value}
                          type="button"
                          onClick={() => { setSortBy(o.value); setSortOpen(false); }}
                          className={`w-full text-left px-3 py-2 text-[12px] hover:bg-[#F4F4F4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E80071] ${
                            sortBy === o.value ? "text-[#E80071] font-semibold" : "text-[#000000]"
                          }`}>
                          {o.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Filter accordion groups from snapshot */}
              {FILTER_GROUPS.map(label => (
                <FilterGroup key={label} label={label} />
              ))}
            </nav>

            {/* ── Product grid ── */}
            <div className="flex-1 min-w-0">

              {/* Mobile sort bar */}
              <div className="md:hidden flex items-center justify-between bg-white border border-[#E8E8E8] px-3 py-2 mb-3">
                <label htmlFor="mobile-sort" className="text-[12px] text-[#595E63] font-medium">
                  Sort:
                </label>
                <select id="mobile-sort" name="sort" value={sortBy} onChange={e => setSortBy(e.target.value)}
                  className="text-[12px] border-0 outline-none bg-transparent text-[#000000] font-semibold cursor-pointer">
                  {SORT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {sorted.length === 0 ? (
                <div className="bg-white border border-[#E8E8E8] p-12 text-center">
                  <p className="text-[13px] text-[#595E63]">No products in "{categoryDisplay}".</p>
                  <Link href="/" className="inline-block mt-4 text-[13px] font-medium text-[#E80071] hover:underline">
                    Back to Home
                  </Link>
                </div>
              ) : (
                /* Product grid — 4 cols on desktop matching Nykaa */
                <div
                  className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                  aria-label={`${categoryDisplay} products`}>
                  {sorted.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
