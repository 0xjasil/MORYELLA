/**
 * Homepage — exact Nykaa section order from Playwright MCP snapshots
 * Name: MORYELLE (Nykaa clone with brand swap)
 *
 * Sections (Nykaa order):
 * 1. Hero carousel
 * 2. Category offer tiles — "THE BIG PRICE REVEAL" (4-col, star-burst style)
 * 3. Full-width "NEW AT MORYELLE" banner
 * 4. Brand hit list (horizontal scroll, each brand has product image)
 * 5. Featured products grid
 * 6. BrandSpotlight (IN THE SPOTLIGHT)
 * 7. Exclusive collection scroll strip
 * 8. ProductSections (Health & Wellness + Gifting)
 * 9. PromoGrid (Offers + Editorial)
 */
import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import BrandSpotlight from "@/components/BrandSpotlight";
import ProductSections from "@/components/ProductSections";
import PromoGrid from "@/components/PromoGrid";
import Footer from "@/components/Footer";
import bannersData from "@/banners.json";
import Link from "next/link";

/* ── Banner data ──────────────────────────────────────────────── */
const all = bannersData as any[];

// Price reveal tiles — IDs 7-20
const priceTiles = all.filter(b =>
  b.image && Number(b.id?.split("-")[1]) >= 7 && Number(b.id?.split("-")[1]) <= 20
).slice(0, 8);

// Wide promo banner — IDs 21-30
const wideBanner = all.find(b =>
  b.image && Number(b.id?.split("-")[1]) >= 21 && Number(b.id?.split("-")[1]) <= 30
);

// Brand scroll strip — IDs 8-30
const brandScrollBanners = all.filter(b =>
  b.image && Number(b.id?.split("-")[1]) >= 8 && Number(b.id?.split("-")[1]) <= 30
).slice(0, 10);

// Collection strip — IDs 84-90
const collectionBanners = all.filter(b =>
  [84,85,86,87,88,89,90].includes(Number(b.id?.split("-")[1]))
).slice(0, 7);

/* ── Category discount data — matches Nykaa "Big Price Reveal" ── */
const PRICE_CATS = [
  { label: "Makeup",      pct: "60", href: "/category/makeup"           },
  { label: "Skin",        pct: "50", href: "/category/skincare"          },
  { label: "Hair",        pct: "50", href: "/category/hair"              },
  { label: "Luxe",        pct: "40", href: "/category/luxe"              },
  { label: "Bath & Body", pct: "50", href: "/category/bath-body"         },
  { label: "Fragrances",  pct: "60", href: "/category/fragrance"         },
  { label: "Appliances",  pct: "60", href: "/category/appliances"        },
  { label: "Wellness",    pct: "50", href: "/category/health-wellness"   },
];

/* ── Shared layout wrappers ────────────────────────────────────── */
const W = "mx-auto max-w-content px-4 md:px-6";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-center text-12 font-semibold text-nk-text uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
      <span className="text-nk-accent" aria-hidden="true">✦</span>
      {children}
      <span className="text-nk-accent" aria-hidden="true">✦</span>
    </h2>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-nk-bg">

        {/* ═══════════════════════════════════════════════════
            1. HERO CAROUSEL — full-bleed, 420px tall
        ════════════════════════════════════════════════════ */}
        <Hero />

        {/* ═══════════════════════════════════════════════════
            2. THE BIG PRICE REVEAL
            Nykaa: pink bg, 4-col, each tile = product image
            right + "Up To X% Off / Category" text left
        ════════════════════════════════════════════════════ */}
        <div className="bg-nk-pink py-5">
          <div className={W}>
            <SectionTitle>THE BIG PRICE REVEAL</SectionTitle>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {PRICE_CATS.map((cat, i) => {
                const b = priceTiles[i];
                return (
                  <Link
                    key={cat.label}
                    href={cat.href}
                    className="group relative flex items-center overflow-hidden bg-white hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nk-accent"
                    style={{ height: "clamp(88px, 11vw, 144px)", borderRadius: "8px" }}
                  >
                    {/* Text left */}
                    <div className="relative z-10 flex-shrink-0 flex flex-col justify-center pl-2.5 py-2"
                      style={{ width: "52%" }}>
                      <p className="text-nk-accent font-bold leading-tight"
                        style={{ fontSize: "clamp(9px, 1.4vw, 13px)" }}>
                        Up To {cat.pct}%
                      </p>
                      <p className="text-nk-accent font-bold leading-tight"
                        style={{ fontSize: "clamp(9px, 1.4vw, 13px)" }}>
                        OFF
                      </p>
                      <p className="text-nk-text font-semibold mt-0.5"
                        style={{ fontSize: "clamp(9px, 1.4vw, 12px)" }}>
                        {cat.label}
                      </p>
                    </div>
                    {/* Product image right */}
                    <div className="absolute right-0 top-0 h-full"
                      style={{ width: "55%" }}>
                      {b?.image ? (
                        <img src={b.image} alt="" aria-hidden="true"
                          width={144} height={144} loading="lazy"
                          className="h-full w-full object-contain object-right transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full bg-nk-pink" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            3. FULL-WIDTH "NEW AT MORYELLE" BANNER
        ════════════════════════════════════════════════════ */}
        {wideBanner?.image && (
          <a href={wideBanner.link || "#"} target="_blank" rel="noreferrer"
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nk-accent">
            <img
              src={wideBanner.image}
              alt={wideBanner.alt || wideBanner.title || "New at MORYELLE"}
              width={1280} height={200} loading="lazy"
              className="w-full object-cover"
              style={{ maxHeight: "clamp(80px, 14vw, 200px)" }}
            />
          </a>
        )}

        {/* ═══════════════════════════════════════════════════
            4. BRAND HIT LIST — horizontal scroll strip
            Nykaa: each brand card is landscape ~240×120px
        ════════════════════════════════════════════════════ */}
        <div className="bg-white py-4 border-y border-nk-lite">
          <div className={W}>
            <SectionTitle>PEEK AT OUR BRAND HIT LIST</SectionTitle>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {brandScrollBanners.map((b: any, i: number) => (
                <a key={b.id || i} href={b.link || "#"} target="_blank" rel="noreferrer"
                  className="group flex-shrink-0 relative overflow-hidden bg-nk-bg hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nk-accent"
                  style={{ width: "clamp(160px, 18vw, 240px)", height: "clamp(80px, 9vw, 120px)", borderRadius: "8px" }}>
                  <img src={b.image} alt={b.alt || b.title || "brand"} width={240} height={120}
                    loading="lazy"
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  {(b.callout || b.title) && (
                    <div className="absolute bottom-0 inset-x-0 px-2 py-1"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }}>
                      <p className="text-white text-10 font-semibold truncate">
                        {(b.callout || b.title).split("|")[0].trim()}
                      </p>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            5. FEATURED PRODUCTS GRID
        ════════════════════════════════════════════════════ */}
        <ProductGrid />

        {/* ═══════════════════════════════════════════════════
            6. BRAND SPOTLIGHT — IN THE SPOTLIGHT
        ════════════════════════════════════════════════════ */}
        <BrandSpotlight />

        {/* ═══════════════════════════════════════════════════
            7. EXCLUSIVE RELEASES — horizontal scroll strip
        ════════════════════════════════════════════════════ */}
        {collectionBanners.length > 0 && (
          <div className="bg-white py-4 border-t border-nk-lite">
            <div className={W}>
              <SectionTitle>MORYELLE EXCLUSIVE RELEASES</SectionTitle>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {collectionBanners.map((b: any, i: number) => (
                  <a key={b.id || i} href={b.link || "#"} target="_blank" rel="noreferrer"
                    className="group flex-shrink-0 overflow-hidden bg-nk-bg hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nk-accent"
                    style={{ width: "clamp(120px, 13vw, 170px)", borderRadius: "8px" }}>
                    <div style={{ paddingTop: "100%", position: "relative" }}>
                      <img src={b.image} alt={b.alt || b.title || "collection"} width={170} height={170}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    {(b.callout || b.title) && (
                      <p className="px-2 py-1 text-10 font-medium text-nk-text truncate text-center">
                        {(b.callout || b.title).split("|")[0].trim()}
                      </p>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════
            8. HEALTH & WELLNESS + GIFTING
        ════════════════════════════════════════════════════ */}
        <ProductSections />

        {/* ═══════════════════════════════════════════════════
            9. OFFERS + EDITORIAL
        ════════════════════════════════════════════════════ */}
        <PromoGrid />

      </main>
      <Footer />
    </>
  );
}
