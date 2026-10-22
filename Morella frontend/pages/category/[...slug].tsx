import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import Link from "next/link";
import { products } from "@/components/ProductGrid";

export default function Category() {
  const router = useRouter();
  const { slug } = router.query;
  const [addedItems, setAddedItems] = useState<{ [key: string]: boolean }>({});

  const categorySlug = Array.isArray(slug) ? slug[0] : slug || "all";
  const categoryTitle =
    categorySlug === "all"
      ? "All Products"
      : categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);

  // Filter products matching category or show all
  const displayedProducts =
    categorySlug === "all"
      ? products
      : products.filter(
          (p) =>
            p.category.toLowerCase() === categorySlug.toLowerCase() ||
            p.brand.toLowerCase().includes(categorySlug.toLowerCase())
        );

  const finalProducts = displayedProducts.length > 0 ? displayedProducts : products;

  const handleAddToBag = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setAddedItems((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <main>
      <Header />
      <div className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-8)]">
        <div className="mb-[var(--space-6)]">
          <nav className="mb-2 text-xs text-[var(--color-text-secondary)]">
            <Link href="/" className="hover:underline">Home</Link> &gt; <span>{categoryTitle}</span>
          </nav>
          <div className="flex items-center justify-between">
            <h1
              className="text-3xl font-bold text-[var(--color-text-primary)]"
              style={{ lineHeight: "var(--leading-6xl)" }}
            >
              {categoryTitle} ({finalProducts.length})
            </h1>
            <span className="text-xs text-[var(--color-text-secondary)]">
              Showing authentic MORYELLE selections
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {finalProducts.map((product) => (
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
      </div>
      <Footer />
    </main>
  );
}