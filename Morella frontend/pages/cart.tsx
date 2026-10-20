import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Cart() {
  return (
    <main>
      <Header />
      <div className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-8)]">
        <h1
          className="mb-[var(--space-6)] text-3xl font-bold text-[var(--color-text-primary)]"
          style={{ lineHeight: "var(--leading-6xl)" }}
        >
          Your Cart
        </h1>
        <div className="rounded-[var(--radius-lg)] bg-[var(--color-bg-white)] p-[var(--space-8)] shadow-[var(--shadow-sm)]">
          <p className="text-base text-[var(--color-text-secondary)]">
            Your cart is empty.{" "}
            <a href="/category/all" className="text-[var(--color-text-link)] hover:underline">
              Continue shopping
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}