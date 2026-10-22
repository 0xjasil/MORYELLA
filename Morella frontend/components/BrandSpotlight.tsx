import React from "react";

const spotlightBrands = [
  { name: "Fenty Beauty", desc: "In The Spotlight" },
  { name: "Anomaly", desc: "Clean, Refreshed Scalp" },
  { name: "Elemis", desc: "#1 British Luxury Skincare" },
  { name: "ICONIC London", desc: "Get The World Famous Glow" },
  { name: "FOREO", desc: "free gifts on bestselling ranges!" },
  { name: "Virtue", desc: "Science Backed & Smart Hair Care" },
  { name: "PIXI", desc: "Twist. Swipe. Glow." },
  { name: "NuFace", desc: "Discover The Best Of Facial Tools!" },
  { name: "Sol de Janeiro", desc: "Two Icons, One Obsession!" },
  { name: "PAT McGRATH LABS", desc: "Couture Colour" },
  { name: "Color Wow", desc: "Get Gorgeous Hair Everyday!" },
  { name: "Tangle Teezer", desc: "Your Go-To Hair Detangling Heroes!" },
];

const luxeBrands = [
  { name: "PIXI", desc: "Twist. Swipe. Glow." },
  { name: "NuFace", desc: "Discover The Best Of Facial Tools!" },
  { name: "Sol de Janeiro", desc: "Two Icons, One Obsession!" },
  { name: "PAT McGRATH LABS", desc: "Couture Colour" },
  { name: "Color Wow", desc: "Get Gorgeous Hair Everyday!" },
  { name: "Tangle Teezer", desc: "Your Go-To Hair Detangling Heroes!" },
];

const newLaunchBrands = [
  { name: "Espressoh", desc: "Flat 10% Off! Caffeinated Makeup Made In Italy" },
  { name: "Natasha Moor", desc: "Unlock The #MoorMagic, No KYC Required" },
  { name: "Skin Chemists", desc: "Flat 25% Off! Science Backed Skincare" },
  { name: "Versed", desc: "Skin Is Complicated. Skincare Shouldn't Be." },
];

const featuredBrands = [
  { name: "PMD Beauty", desc: "Find Confidence In Your Skin Today!" },
  { name: "K-Secret", desc: "Upto 50% Off! + Free Gift On All Orders!" },
  { name: "Murad", desc: "91% Saw Brighter Skin In 2 Weeks" },
  { name: "Sally Hansen", desc: "upto 30% on entire range" },
  { name: "Isntree", desc: "Flat 10% Off! Expert Korean Skincare" },
  { name: "Fable & Mane", desc: "Award Winning Root Treatment Oil" },
];

const topBrands = [
  { name: "Biotique", discount: "Up To 50% Off" },
  { name: "L'Oréal Paris", discount: "Up To 35% Off" },
  { name: "Swiss Beauty", discount: "Up To 30% Off" },
  { name: "Mamaearth", discount: "Up To 28% Off" },
  { name: "Himalaya", discount: "Up To 30% Off" },
  { name: "MORYELLE Cosmetics", discount: "Up To 40% Off" },
];

export default function BrandSpotlight() {
  return (
    <section className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-8)]">
      {/* Exclusive Launch */}
      <div className="mb-[var(--space-8)] rounded-[var(--radius-xl)] bg-[var(--color-surface-warm)] p-[var(--space-8)] text-center">
        <span className="mb-[var(--space-2)] inline-block rounded-full bg-[var(--color-accent)] px-[var(--space-4)] py-[var(--space-1)] text-xs font-medium text-white">
          EXCLUSIVE LAUNCH
        </span>
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-[var(--space-2)]">Fenty Beauty</h2>
        <p className="text-[var(--color-text-secondary)] mb-[var(--space-4)]">In The Spotlight</p>
        <button className="rounded-[var(--radius-lg)] bg-[var(--color-accent)] px-[var(--space-8)] py-[var(--space-3)] text-base font-medium text-white hover:opacity-90">
          Shop Now
        </button>
      </div>

      {/* In The Spotlight */}
      <div className="mb-[var(--space-8)]">
        <h2 className="mb-[var(--space-4)] text-2xl font-bold text-[var(--color-text-primary)]">IN THE SPOTLIGHT</h2>
        <p className="mb-[var(--space-6)] text-sm text-[var(--color-text-secondary)]">discover top brands</p>
        <div className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {spotlightBrands.map((brand, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-bg-white)] p-[var(--space-6)] text-center shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow cursor-pointer"
            >
              <div className="mb-[var(--space-3)] flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-surface)] text-xs font-bold text-[var(--color-text-primary)]">
                {brand.name.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{brand.name}</h3>
              <p className="mt-[var(--space-1)] text-xs text-[var(--color-text-secondary)]">{brand.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Luxe Treats */}
      <div className="mb-[var(--space-8)]">
        <h2 className="mb-[var(--space-2)] text-2xl font-bold text-[var(--color-text-primary)]">LUXE TREATS</h2>
        <p className="mb-[var(--space-6)] text-sm text-[var(--color-text-secondary)]">from the premium beauty world</p>
        <div className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 md:grid-cols-6">
          {luxeBrands.map((brand, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-bg-white)] p-[var(--space-4)] text-center shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow cursor-pointer"
            >
              <div className="mb-[var(--space-2)] flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-surface-warm)] text-xs font-bold text-[var(--color-text-primary)]">
                {brand.name.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="text-xs font-semibold text-[var(--color-text-primary)]">{brand.name}</h3>
              <p className="mt-[var(--space-1)] text-[10px] text-[var(--color-text-secondary)]">{brand.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* New on Global Store */}
      <div className="mb-[var(--space-8)]">
        <h2 className="mb-[var(--space-2)] text-2xl font-bold text-[var(--color-text-primary)]">NEW ON GLOBAL STORE</h2>
        <p className="mb-[var(--space-6)] text-sm text-[var(--color-text-secondary)]">fresh brands just landed</p>
        <div className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-4">
          {newLaunchBrands.map((brand, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-bg-white)] p-[var(--space-6)] text-center shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow cursor-pointer"
            >
              <div className="mb-[var(--space-3)] flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-surface)] text-xs font-bold text-[var(--color-text-primary)]">
                {brand.name.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{brand.name}</h3>
              <p className="mt-[var(--space-1)] text-xs text-[var(--color-text-secondary)]">{brand.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Brands */}
      <div className="mb-[var(--space-8)]">
        <h2 className="mb-[var(--space-2)] text-2xl font-bold text-[var(--color-text-primary)]">FEATURED BRANDS</h2>
        <p className="mb-[var(--space-6)] text-sm text-[var(--color-text-secondary)]">deals you can&apos;t scroll past</p>
        <div className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 md:grid-cols-6">
          {featuredBrands.map((brand, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-bg-white)] p-[var(--space-4)] text-center shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow cursor-pointer"
            >
              <div className="mb-[var(--space-2)] flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-surface-warm)] text-xs font-bold text-[var(--color-text-primary)]">
                {brand.name.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="text-xs font-semibold text-[var(--color-text-primary)]">{brand.name}</h3>
              <p className="mt-[var(--space-1)] text-[10px] text-[var(--color-text-secondary)]">{brand.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Brands */}
      <div className="mb-[var(--space-8)]">
        <h2 className="mb-[var(--space-6)] text-2xl font-bold text-[var(--color-text-primary)]">Top Brands</h2>
        <div className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 md:grid-cols-6">
          {topBrands.map((brand, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-bg-white)] p-[var(--space-6)] text-center shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow cursor-pointer"
            >
              <div className="mb-[var(--space-3)] flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-surface)] text-sm font-bold text-[var(--color-text-primary)]">
                {brand.name.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{brand.name}</h3>
              <p className="mt-[var(--space-1)] text-xs font-medium text-[var(--color-accent)]">{brand.discount}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}