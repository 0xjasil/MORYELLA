import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { products } from "@/components/ProductGrid";

export default function Cart() {
  const [items, setItems] = useState([
    { product: products[0], qty: 1 },
    { product: products[6], qty: 1 },
  ]);

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as any
    );
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );
  const discountTotal = items.reduce(
    (sum, item) =>
      sum +
      (item.product.originalPrice
        ? (item.product.originalPrice - item.product.price) * item.qty
        : 0),
    0
  );

  return (
    <main>
      <Header />
      <div className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-8)]">
        <h1
          className="mb-[var(--space-6)] text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]"
          style={{ lineHeight: "var(--leading-6xl)" }}
        >
          MORYELLE Shopping Bag ({items.length})
        </h1>

        {items.length === 0 ? (
          <div className="rounded-[var(--radius-lg)] bg-[var(--color-bg-white)] p-[var(--space-8)] text-center shadow-[var(--shadow-sm)]">
            <p className="text-base text-[var(--color-text-secondary)] mb-4">
              Your MORYELLE shopping bag is empty.
            </p>
            <Link
              href="/"
              className="inline-block rounded-[var(--radius-lg)] bg-[var(--color-accent)] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Items list */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {items.map(({ product, qty }) => (
                <div
                  key={product.id}
                  className="flex gap-4 rounded-[var(--radius-lg)] bg-white p-4 shadow-[var(--shadow-sm)]"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-24 w-24 object-contain rounded bg-[var(--color-surface)] p-1"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[var(--color-text-secondary)]">
                        {product.brand}
                      </span>
                      <h3 className="text-sm font-medium text-[var(--color-text-primary)]">
                        {product.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm font-bold text-[var(--color-text-primary)]">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[var(--color-text-secondary)] line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-[var(--color-border)] rounded">
                        <button
                          onClick={() => updateQty(product.id, -1)}
                          className="px-2 py-1 text-sm font-bold text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-semibold">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQty(product.id, 1)}
                          className="px-2 py-1 text-sm font-bold text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => updateQty(product.id, -qty)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price details */}
            <div className="rounded-[var(--radius-lg)] bg-white p-6 shadow-[var(--shadow-sm)] h-fit">
              <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 border-b pb-2">
                Order Summary
              </h2>
              <div className="flex flex-col gap-3 text-sm text-[var(--color-text-secondary)]">
                <div className="flex justify-between">
                  <span>Bag Total</span>
                  <span>₹{(subtotal + discountTotal).toLocaleString()}</span>
                </div>
                {discountTotal > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Bag Discount</span>
                    <span>-₹{discountTotal.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-base font-bold text-[var(--color-text-primary)]">
                  <span>Total Amount</span>
                  <span className="text-[var(--color-accent)]">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
              </div>
              <button className="mt-6 w-full rounded-[var(--radius-lg)] bg-[var(--color-accent)] py-3 text-sm font-bold text-white hover:opacity-90">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}