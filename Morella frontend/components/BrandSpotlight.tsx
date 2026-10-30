/**
 * BrandSpotlight — "IN THE SPOTLIGHT" section
 * Nykaa pattern: landscape brand tiles with product image + brand name + deal text
 * Each tile scrolls horizontally with hover scale effect
 */
import React from "react";
import Link from "next/link";
import bannersData from "@/banners.json";

const allBanners = bannersData as any[];

/* Brand images from banners.json IDs 8-50 */
const brandImages = allBanners
  .filter(b => b.image && Number(b.id?.split("-")[1]) >= 8 && Number(b.id?.split("-")[1]) <= 50)
  .slice(0, 12);

const BRANDS = [
  { name: "L'Oréal Paris",   slug: "loreal-paris",  deal: "Up To 55% Off"  },
  { name: "Maybelline",       slug: "maybelline",     deal: "Up To 50% Off"  },
  { name: "Lakmé",            slug: "lakme",          deal: "Up To 60% Off"  },
  { name: "MORYELLE",         slug: "moryelle",       deal: "Up To 40% Off"  },
  { name: "Fenty Beauty",     slug: "fenty-beauty",   deal: "New Launch"     },
  { name: "Biotique",         slug: "biotique",       deal: "Up To 50% Off"  },
  { name: "Mamaearth",        slug: "mamaearth",      deal: "Up To 28% Off"  },
  { name: "Himalaya",         slug: "himalaya",       deal: "Up To 30% Off"  },
  { name: "PIXI",             slug: "pixi",           deal: "Up To 35% Off"  },
  { name: "NuFace",           slug: "nuface",         deal: "Best Facial Tools" },
  { name: "Sol de Janeiro",   slug: "sol-de-janeiro", deal: "Two Icons, One Obsession" },
  { name: "PAT McGRATH",      slug: "pat-mcgrath",    deal: "Couture Colour"  },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-center text-12 font-semibold text-nk-text uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
      <span className="text-nk-accent" aria-hidden="true">✦</span>
      {children}
      <span className="text-nk-accent" aria-hidden="true">✦</span>
    </h2>
  );
}

export default function BrandSpotlight() {
  return (
    <section className="bg-nk-bg py-4 px-4 md:px-6 border-t border-nk-lite" aria-label="Brand spotlight">
      <div className="mx-auto max-w-content">

        {/* Exclusive launch banner */}
        <div className="mb-4 bg-white border border-nk-lite flex items-center overflow-hidden"
          style={{ borderRadius: "8px", minHeight: "68px" }}>
          {brandImages[0]?.image && (
            <img src={brandImages[0].image} alt="Fenty Beauty"
              width={140} height={68} loading="lazy"
              className="h-full flex-shrink-0 object-contain"
              style={{ width: "clamp(100px, 12vw, 140px)" }}
            />
          )}
          <div className="flex-1 px-4 py-2">
            <p className="text-10 font-bold uppercase tracking-widest text-nk-accent mb-0.5">Exclusive Launch</p>
            <p className="text-14 font-semibold text-nk-text">Fenty Beauty</p>
            <p className="text-12 text-nk-muted">Now available at MORYELLE</p>
          </div>
          <Link href="/category/fenty-beauty"
            className="flex-shrink-0 mr-4 text-12 font-semibold text-nk-accent border border-nk-accent px-3 py-1.5 hover:bg-nk-accent hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nk-accent"
            style={{ borderRadius: "2px" }}>
            Shop Now →
          </Link>
        </div>

        {/* IN THE SPOTLIGHT title */}
        <SectionTitle>IN THE SPOTLIGHT</SectionTitle>

        {/* Brand grid — 4 cols desktop, 2 mobile, landscape 2:1 */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {BRANDS.slice(0, 8).map((brand, i) => (
            <Link key={brand.slug} href={`/category/${brand.slug}`}
              className="group relative overflow-hidden bg-nk-bg hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nk-accent"
              style={{ aspectRatio: "2 / 1", borderRadius: "8px" }}>
              {brandImages[i]?.image ? (
                <img src={brandImages[i].image} alt={brand.name}
                  width={300} height={150} loading="lazy"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-nk-pink flex items-center justify-center">
                  <span className="text-12 font-bold text-nk-accent">{brand.name}</span>
                </div>
              )}
              <div className="absolute bottom-0 inset-x-0 px-2 py-1.5"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)", borderRadius: "0 0 8px 8px" }}>
                <p className="text-10 font-bold text-white truncate">{brand.name}</p>
                <p className="text-9 text-white/80">{brand.deal}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Top brands row — horizontal scroll strip */}
        <div className="mt-4">
          <SectionTitle>TOP BRANDS</SectionTitle>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {BRANDS.map((brand, i) => (
              <Link key={brand.slug} href={`/category/${brand.slug}`}
                className="group flex-shrink-0 relative overflow-hidden bg-white border border-nk-lite hover:shadow-sm transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nk-accent"
                style={{ width: "clamp(110px, 12vw, 150px)", borderRadius: "8px" }}>
                <div style={{ paddingTop: "70%", position: "relative" }}>
                  {brandImages[i]?.image ? (
                    <img src={brandImages[i].image} alt={brand.name}
                      width={150} height={105} loading="lazy"
                      className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-nk-pink flex items-center justify-center">
                      <span className="text-10 font-bold text-nk-accent">{brand.name[0]}</span>
                    </div>
                  )}
                </div>
                <div className="px-2 pb-2 pt-1">
                  <p className="text-11 font-semibold text-nk-text truncate">{brand.name}</p>
                  <p className="text-10 text-nk-accent font-medium">{brand.deal}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
