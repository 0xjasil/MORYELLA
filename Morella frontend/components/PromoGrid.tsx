import React from "react";
import Link from "next/link";
import bannersData from "@/banners.json";

const allBanners = bannersData as any[];
const offerBanners   = allBanners.filter(b => b.image && Number(b.id?.split("-")[1]) >= 30 && Number(b.id?.split("-")[1]) <= 60).slice(0, 8);
const editBanners    = allBanners.filter(b => b.image && Number(b.id?.split("-")[1]) >= 60 && Number(b.id?.split("-")[1]) <= 75).slice(0, 8);

const OFFERS = [
  { text: "Up To 20% Off Gifts",    href: "/category/gifting"           },
  { text: "Flat 10% Off Skincare",  href: "/category/skincare"          },
  { text: "Buy 2 Get 1 Free",       href: "/"                           },
  { text: "Free Gifts on ₹999+",    href: "/"                           },
  { text: "Luxe Gift All Orders",   href: "/category/luxe"              },
  { text: "Flat 25% Fragrance",     href: "/category/fragrance"         },
  { text: "40% Off Hair Care",      href: "/category/hair"              },
  { text: "30% Off Bestsellers",    href: "/"                           },
];

const EDITORIAL = [
  "The 9-to-5 Edit",        "Serving: Mocha Mousse",
  "Viral Beauty Essentials", "Bonjour, French Pharmacy",
  "No Makeup, Makeup",       "College Beauty Guide",
  "Exam Survival Guide",     "Skincare For All Ages",
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

function ImageTile({ image, label, href, aspect = "2/1" }: {
  image?: string; label: string; href: string; aspect?: string;
}) {
  return (
    <Link href={href}
      className="group relative overflow-hidden bg-nk-bg hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nk-accent"
      style={{ aspectRatio: aspect, borderRadius: "8px" }}>
      {image ? (
        <img src={image} alt={label} width={300} height={150} loading="lazy"
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-nk-pink flex items-center justify-center p-3">
          <p className="text-12 font-semibold text-nk-accent text-center">{label}</p>
        </div>
      )}
      <div className="absolute bottom-0 inset-x-0 px-2 py-1.5"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)", borderRadius: "0 0 8px 8px" }}>
        <p className="text-10 font-semibold text-white truncate">{label}</p>
      </div>
    </Link>
  );
}

export default function PromoGrid() {
  return (
    <>
      {/* Today's Best Offers */}
      <section className="bg-nk-pink py-4 px-4 md:px-6" aria-label="Today's best offers">
        <div className="mx-auto max-w-content">
          <SectionTitle>TODAY'S BEST OFFERS</SectionTitle>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {OFFERS.map((o, i) => (
              <ImageTile key={i} image={offerBanners[i]?.image} label={o.text} href={o.href} />
            ))}
          </div>
        </div>
      </section>

      {/* Help CTA */}
      <div className="bg-white border-y border-nk-lite py-4 px-4 md:px-6">
        <div className="mx-auto max-w-content flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="text-14 font-semibold text-nk-text">Not sure what to pick?</p>
            <p className="text-12 text-nk-muted">Let us guide you to your perfect beauty match</p>
          </div>
          <Link href="/category/skincare"
            className="flex-shrink-0 bg-nk-accent text-white text-12 font-semibold px-5 py-2 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nk-accent"
            style={{ borderRadius: "4px" }}>
            Explore All Beauty →
          </Link>
        </div>
      </div>

      {/* Curated For You editorial */}
      <section className="bg-white py-4 px-4 md:px-6" aria-label="Curated editorial">
        <div className="mx-auto max-w-content">
          <SectionTitle>CURATED FOR YOU</SectionTitle>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {EDITORIAL.map((title, i) => (
              <ImageTile key={i} image={editBanners[i]?.image} label={title} href="/" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
