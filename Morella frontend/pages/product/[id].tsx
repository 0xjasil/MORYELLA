import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

export default function ProductDetail() {
  return (
    <main>
      <Header />
      <div className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-8)]">
        <nav className="mb-[var(--space-4)] text-sm text-[var(--color-text-secondary)]">
          <a href="/">Home</a> &gt; <a href="/category/skincare">Skincare</a> &gt;{" "}
          <span>Vitamin C Brightening Serum</span>
        </nav>

        <div className="grid grid-cols-1 gap-[var(--space-8)] lg:grid-cols-2">
          <div className="overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-md)]">
            <img
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600"
              alt="Vitamin C Brightening Serum"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-[var(--space-6)]">
            <span className="inline-block w-fit rounded-full bg-[var(--color-accent)] px-[var(--space-3)] py-[var(--space-1)] text-xs font-medium text-white">
              Bestseller
            </span>
            <h1
              className="text-3xl font-bold text-[var(--color-text-primary)]"
              style={{ lineHeight: "var(--leading-6xl)" }}
            >
              Vitamin C Brightening Serum
            </h1>
            <div className="flex items-center gap-[var(--space-2)]">
              <span className="text-[var(--color-accent)]">★</span>
              <span className="text-base text-[var(--color-text-secondary)]">
                4.5 (2,341 reviews)
              </span>
            </div>
            <div className="flex items-center gap-[var(--space-3)]">
              <span className="text-2xl font-bold text-[var(--color-text-primary)]">
                ₹1,299
              </span>
              <span className="text-lg text-[var(--color-text-secondary)] line-through">
                ₹1,799
              </span>
              <span className="rounded bg-[var(--color-surface-warm)] px-[var(--space-2)] py-[var(--space-1)] text-sm font-medium text-[var(--color-accent)]">
                28% OFF
              </span>
            </div>
            <p
              className="text-base text-[var(--color-text-secondary)]"
              style={{ lineHeight: "var(--leading-base)" }}
            >
              Brighten and even out your skin tone with our potent Vitamin C serum.
              Infused with natural ingredients to boost radiance and fight dullness.
            </p>
            <div className="flex gap-[var(--space-4)]">
              <Button variant="primary" size="lg" className="flex-1">
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}