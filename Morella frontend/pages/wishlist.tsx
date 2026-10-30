import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/context/WishlistContext";

export default function Wishlist() {
  const { products, wishlistCount } = useWishlist();

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-[#F4F4F4]">
        <div className="mx-auto max-w-content px-4 md:px-6 py-5">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-xs text-[#595E63]" role="list">
              <li role="listitem">
                <Link href="/" className="hover:text-[#E80071] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E80071] rounded">
                  Home
                </Link>
              </li>
              <li role="listitem" aria-hidden="true">/</li>
              <li role="listitem" className="text-[#000000] font-medium" aria-current="page">
                Wishlist
              </li>
            </ol>
          </nav>

          <h1 className="text-base font-semibold text-[#000000] mb-5">
            My Wishlist ({wishlistCount} {wishlistCount === 1 ? "item" : "items"})
          </h1>

          {products.length === 0 ? (
            <div className="bg-white rounded-lg border border-[#CDD3D8] p-12 text-center">
              <p className="text-sm font-medium text-[#000000] mb-1">Your wishlist is empty</p>
              <p className="text-xs text-[#595E63] mb-5">
                Save items you love by tapping the heart on any product
              </p>
              <Link
                href="/"
                className="inline-block bg-[#E80071] text-white text-sm font-semibold px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E80071]"
              >
                Discover Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
