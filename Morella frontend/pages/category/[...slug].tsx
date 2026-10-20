import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function Category() {
  const router = useRouter();
  const { slug } = router.query;
  const categoryName = Array.isArray(slug)
    ? slug.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")
    : typeof slug === "string"
    ? slug.charAt(0).toUpperCase() + slug.slice(1)
    : "All Products";

  return (
    <main>
      <Header />
      <div className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-8)]">
        <h1
          className="mb-[var(--space-6)] text-3xl font-bold text-[var(--color-text-primary)]"
          style={{ lineHeight: "var(--leading-6xl)" }}
        >
          {categoryName}
        </h1>
        <div className="grid grid-cols-2 gap-[var(--space-6)] sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-white)] shadow-[var(--shadow-sm)]"
            >
              <div className="aspect-square bg-[var(--color-surface)]" />
              <div className="p-[var(--space-4)]">
                <div className="mb-[var(--space-2)] h-4 w-3/4 rounded bg-[var(--color-surface)]" />
                <div className="h-4 w-1/2 rounded bg-[var(--color-surface)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}