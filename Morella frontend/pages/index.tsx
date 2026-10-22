import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import BrandSpotlight from "@/components/BrandSpotlight";
import ProductSections from "@/components/ProductSections";
import PromoGrid from "@/components/PromoGrid";
import Footer from "@/components/Footer";
import bannersData from "@/banners.json";

export default function Home() {
  const midBanners = (bannersData as any[])
    .filter((b) => b.image && b.id?.startsWith("banner-") && Number(b.id.split("-")[1]) >= 7 && Number(b.id.split("-")[1]) <= 20)
    .slice(0, 14);

  const brandBanners = (bannersData as any[])
    .filter((b) => b.image && Number(b.id?.split("-")[1]) >= 8 && Number(b.id?.split("-")[1]) <= 30)
    .slice(0, 12);

  const categoryIcons = (bannersData as any[])
    .filter((b) => b.image && Number(b.id?.split("-")[1]) >= 61 && Number(b.id?.split("-")[1]) <= 69)
    .slice(0, 9);

  const nykaaCollectionBanners = (bannersData as any[])
    .filter((b) => [84, 85, 86, 87, 88, 89, 90].includes(Number(b.id?.split("-")[1])))
    .slice(0, 7);

  return (
    <main>
      <Header />
      
      {/* Top Banner Strip - Full width rectangles */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex items-center overflow-x-auto no-scrollbar">
            {(bannersData as any[])
              .slice(6, 21)
              .filter((b: any) => b.image)
              .map((banner: any, i: number) => (
                <a
                  key={banner.id || i}
                  href={banner.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-shrink-0"
                >
                  <img
                    src={banner.image}
                    alt={banner.alt || banner.title || "banner"}
                    className="h-12 md:h-16 w-auto object-cover"
                    style={{ borderRadius: 0 }}
                  />
                </a>
              ))}
          </div>
        </div>
      </section>

      <Hero />

      <Hero />

      {/* Top Picks / Mid Banners */}
      {midBanners.length > 0 && (
        <section className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-6)]">
          <h2 className="mb-[var(--space-4)] text-xl font-bold text-[var(--color-text-primary)]">
            Trending Now
          </h2>
          <div className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {midBanners.map((banner: any, i: number) => (
              <a
                key={banner.id || i}
                href={banner.link || "#"}
                target="_blank"
                rel="noreferrer"
                className="overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow"
              >
                <img
                  src={banner.image}
                  alt={banner.alt || banner.title || "banner"}
                  className="h-32 w-full object-cover"
                />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Shop By Category */}
      {categoryIcons.length > 0 && (
        <section className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-6)]">
          <h2 className="mb-[var(--space-6)] text-xl font-bold text-[var(--color-text-primary)]">
            Shop By Category
          </h2>
          <div className="grid grid-cols-3 gap-[var(--space-4)] sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9">
            {categoryIcons.map((banner: any, i: number) => (
              <a
                key={banner.id || i}
                href={banner.link || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center text-center hover:opacity-90"
              >
                <div className="mb-[var(--space-2)] h-20 w-20 overflow-hidden rounded-full shadow-[var(--shadow-sm)]">
                  <img
                    src={banner.image}
                    alt={banner.alt || banner.title || "category"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-xs font-medium text-[var(--color-text-primary)] line-clamp-2">
                  {banner.alt || banner.title || ""}
                </p>
              </a>
            ))}
          </div>
        </section>
      )}

      <BrandSpotlight />

      {/* Brand Strip - continuous banners, sharp edges */}
      {(bannersData as any[]).filter((b, idx) => idx >= 8 && idx <= 30 && b.image).length > 0 && (
        <section className="bg-white border-t border-[var(--color-border)]">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex items-center overflow-x-auto no-scrollbar">
              {(bannersData as any[])
                .filter((b, idx) => idx >= 8 && idx <= 30 && b.image)
                .map((banner: any, i: number) => (
                  <a
                    key={banner.id || i}
                    href={banner.link || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-shrink-0"
                  >
                    <img
                      src={banner.image}
                      alt={banner.alt || banner.title || "brand"}
                      className="h-16 md:h-24 w-auto object-cover"
                      style={{ borderRadius: 0 }}
                    />
                  </a>
                ))}
            </div>
          </div>
        </section>
      )}

      <ProductGrid />

      {/* Nykaa Collection */}
      {nykaaCollectionBanners.length > 0 && (
        <section className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-6)]">
          <h2 className="mb-[var(--space-4)] text-xl font-bold text-[var(--color-text-primary)]">
            Nykaa Collection
          </h2>
          <div className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {nykaaCollectionBanners.map((banner: any, i: number) => (
              <a
                key={banner.id || i}
                href={banner.link || "#"}
                target="_blank"
                rel="noreferrer"
                className="overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow"
              >
                <img
                  src={banner.image}
                  alt={banner.alt || banner.title || "nykaa collection"}
                  className="h-40 w-full object-cover"
                />
              </a>
            ))}
          </div>
        </section>
      )}

      <ProductSections />
      <PromoGrid />

      {/* Extra Banner Section */}
      <section className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-6)]">
        <div className="grid grid-cols-1 gap-[var(--space-4)] md:grid-cols-2">
          {(bannersData as any[])
            .filter((b, idx) => idx >= 40 && idx <= 41 && b.image)
            .map((banner: any, i: number) => (
              <a
                key={banner.id || i}
                href={banner.link || "#"}
                target="_blank"
                rel="noreferrer"
                className="overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow"
              >
                <img
                  src={banner.image}
                  alt={banner.alt || banner.title || "banner"}
                  className="h-48 w-full object-cover"
                />
              </a>
            ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}