import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { items, updateQty, removeItem, total, itemCount } = useCart();

  const savings = items.reduce(
    (s, i) =>
      s + ((i.product.originalPrice ?? i.product.price) - i.product.price) * i.qty,
    0
  );

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
                Shopping Bag
              </li>
            </ol>
          </nav>

          <h1 className="text-base font-semibold text-[#000000] mb-5">
            My Bag ({itemCount} {itemCount === 1 ? "item" : "items"})
          </h1>

          {items.length === 0 ? (
            /* ── Empty state ────────────────────────────────── */
            <div className="bg-white rounded-lg border border-[#CDD3D8] p-12 text-center">
              <p className="text-sm font-medium text-[#000000] mb-1">Your bag is empty</p>
              <p className="text-xs text-[#595E63] mb-5">
                Explore our curated beauty collections
              </p>
              <Link
                href="/"
                className="inline-block bg-[#E80071] text-white text-sm font-semibold px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E80071]"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">

              {/* ── Cart items ──────────────────────────────── */}
              <div className="flex flex-col gap-3" aria-label="Cart items">
                {items.map(({ product, qty }) => (
                  <article
                    key={product.id}
                    className="bg-white rounded-lg border border-[#CDD3D8] p-4 flex gap-4"
                  >
                    <Link
                      href={`/product/${product.id}`}
                      className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E80071] rounded-sm"
                      aria-label={`View ${product.name}`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        width={96}
                        height={96}
                        loading="lazy"
                        className="h-24 w-24 object-contain rounded-sm bg-[#F4F4F4] p-1"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#595E63] mb-0.5">
                          {product.brand}
                        </p>
                        <p className="text-sm font-medium text-[#000000] line-clamp-2">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-semibold text-[#000000]">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-[#6F7981] line-through">
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                          {product.discount && (
                            <span className="text-xs font-semibold text-[#E80071]">
                              {product.discount}% Off
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-2">
                        {/* Quantity */}
                        <div
                          className="flex items-center border border-[#CDD3D8] rounded-sm overflow-hidden"
                          role="group"
                          aria-label={`Quantity for ${product.name}`}
                        >
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${product.name}`}
                            onClick={() => updateQty(product.id, -1)}
                            className="px-2.5 py-1 text-sm font-bold text-[#000000] hover:bg-[#F4F4F4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E80071]"
                          >
                            −
                          </button>
                          <span className="px-2.5 py-1 text-xs font-semibold text-[#000000] border-x border-[#CDD3D8] min-w-[28px] text-center">
                            {qty}
                          </span>
                          <button
                            type="button"
                            aria-label={`Increase quantity of ${product.name}`}
                            onClick={() => updateQty(product.id, 1)}
                            className="px-2.5 py-1 text-sm font-bold text-[#000000] hover:bg-[#F4F4F4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E80071]"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          aria-label={`Remove ${product.name} from bag`}
                          onClick={() => removeItem(product.id)}
                          className="text-xs text-[#E80071] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E80071] rounded"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* ── Order summary ────────────────────────────── */}
              <aside aria-label="Order summary">
                <div className="bg-white rounded-lg border border-[#CDD3D8] p-5 sticky top-[130px]">
                  <h2 className="text-sm font-semibold text-[#000000] mb-4 pb-3 border-b border-[#F4F4F4]">
                    Price Details
                  </h2>

                  <dl className="flex flex-col gap-2.5 text-sm text-[#595E63]">
                    <div className="flex justify-between">
                      <dt>Total MRP</dt>
                      <dd>₹{(total + savings).toLocaleString()}</dd>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-green-700 font-medium">
                        <dt>Discount on MRP</dt>
                        <dd>−₹{savings.toLocaleString()}</dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt>Shipping</dt>
                      <dd className="text-green-700 font-medium">Free</dd>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-[#000000] pt-2.5 border-t border-[#F4F4F4]">
                      <dt>Total Amount</dt>
                      <dd className="text-[#E80071]">₹{total.toLocaleString()}</dd>
                    </div>
                  </dl>

                  {savings > 0 && (
                    <p className="mt-3 text-xs text-green-700 font-medium bg-green-50 rounded-sm px-2.5 py-1.5">
                      You save ₹{savings.toLocaleString()} on this order 🎉
                    </p>
                  )}

                  <Link
                    href="#"
                    className="mt-4 block w-full text-center bg-[#E80071] text-white text-sm font-semibold py-3 rounded-md hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E80071]"
                    aria-label="Proceed to checkout"
                  >
                    Proceed to Checkout
                  </Link>

                  <p className="mt-3 text-[10px] text-[#6F7981] text-center">
                    Safe &amp; Secure Payment · Free Returns
                  </p>
                </div>
              </aside>

            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
