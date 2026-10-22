import React, { useState } from "react";
import Link from "next/link";

const healthProducts = [
  {
    name: "Mountainor Liposomal Glutathione Tablets for Glowing Skin",
    price: 849,
    original: 1199,
    discount: 29,
    brand: "Mountainor",
    image: "https://images-static.nykaa.com/media/catalog/product/tr:w-220,h-220,cm-pad_resize/7/d/7daa03b8904417322507_1.jpg"
  },
  {
    name: "Nutrova Collagen+ Antioxidants, Marine Collagen supplement",
    price: 2575,
    original: 2999,
    discount: 14,
    brand: "Nutrova",
    image: "https://images-static.nykaa.com/media/catalog/product/tr:w-220,h-220,cm-pad_resize/4/8/480b2a7CERAV00000010_1.jpg"
  },
  {
    name: "Oziva Advanced Hair Growth Actives & Biotin",
    price: 1849,
    original: 2099,
    discount: 11,
    brand: "Oziva",
    image: "https://images-static.nykaa.com/media/catalog/product/tr:w-220,h-220,cm-pad_resize/8/3/836fd53FOXTA00000081_1.jpg"
  },
  {
    name: "Chicnutrix Mighty Collagen Japanese Marine Collagen",
    price: 999,
    original: 1800,
    discount: 44,
    brand: "Chicnutrix",
    image: "https://images-static.nykaa.com/media/catalog/product/tr:w-220,h-220,cm-pad_resize/e/9/e9e5b79DOTKE00000213l_1.jpg"
  },
  {
    name: "Chicnutrix Glow Advanced Glutathione Fizzy Tabs",
    price: 909,
    original: 1399,
    discount: 35,
    brand: "Chicnutrix",
    image: "https://images-static.nykaa.com/media/catalog/product/tr:w-220,h-220,cm-pad_resize/c/0/c050529INSIG00000812_01.jpg"
  },
  {
    name: "Oziva Bioactive Gluta Fizzy Effervescent Tablets",
    price: 2375,
    original: 4200,
    discount: 43,
    brand: "Oziva",
    image: "https://images-static.nykaa.com/media/catalog/product/tr:w-220,h-220,cm-pad_resize/4/5/4556818STAZE00000102_1.jpg"
  },
];

const giftProducts = [
  {
    name: "L'Oréal Paris Golden Glam Festive Gift Set",
    price: 1718,
    original: 2147,
    discount: 20,
    brand: "L'Oréal Paris",
    image: "https://images-static.nykaa.com/media/catalog/product/tr:w-220,h-220,cm-pad_resize/8/d/8d07f53FACES00000523_1.jpg"
  },
  {
    name: "PIXI On-The-Glow Mini Blush Duo Kit",
    price: 2200,
    original: 2500,
    discount: 12,
    brand: "PIXI",
    image: "https://images-static.nykaa.com/media/catalog/product/tr:w-220,h-220,cm-pad_resize/c/5/c591c1a8809516795705x_1.jpg"
  },
  {
    name: "MORYELLE Gifting Self Care Radiance Kit",
    price: 3499,
    original: 4999,
    discount: 30,
    brand: "MORYELLE Gifting",
    image: "https://images-static.nykaa.com/media/catalog/product/tr:w-220,h-220,cm-pad_resize/2/7/2783ca3NYKAF00000028p.jpg"
  },
  {
    name: "inde wild Ice And Spice Dewy Lip Treatment Set",
    price: 1528,
    original: 1798,
    discount: 15,
    brand: "inde wild",
    image: "https://images-static.nykaa.com/media/catalog/product/tr:w-220,h-220,cm-pad_resize/6/7/673a1e8SWIAC00000247_s1.jpg"
  },
  {
    name: "MORYELLE Perfumes Aura Fragrance Luxe Gift Set",
    price: 2210,
    original: 3299,
    discount: 33,
    brand: "MORYELLE Perfumes",
    image: "https://images-static.nykaa.com/media/catalog/product/tr:w-220,h-220,cm-pad_resize/e/1/e100d9e8904245702540_1.jpg"
  },
  {
    name: "GUESS Seductive Eau de Toilette Festive Gift Set",
    price: 4875,
    original: 6500,
    discount: 25,
    brand: "GUESS",
    image: "https://images-static.nykaa.com/media/catalog/product/tr:w-220,h-220,cm-pad_resize/5/4/5445facCONAC00000023ab_ab1.png"
  },
];

function ProductCard({ product }: { product: any }) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-white)] shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]">
      <div>
        <div className="relative aspect-square bg-white p-2 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {product.discount && (
            <span className="absolute top-[var(--space-2)] left-[var(--space-2)] rounded-full bg-[var(--color-accent)] px-[var(--space-2)] py-[var(--space-1)] text-[10px] font-bold text-white">
              {product.discount}% Off
            </span>
          )}
        </div>
        <div className="p-[var(--space-3)]">
          <p className="mb-[var(--space-1)] text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
            {product.brand}
          </p>
          <h3
            className="mb-[var(--space-2)] text-xs font-medium text-[var(--color-text-primary)] line-clamp-2 min-h-[32px]"
            style={{ lineHeight: "var(--leading-sm)" }}
            title={product.name}
          >
            {product.name}
          </h3>
          <div className="flex items-center gap-[var(--space-2)] flex-wrap">
            <span className="text-sm font-bold text-[var(--color-text-primary)]">
              ₹{product.price.toLocaleString()}
            </span>
            {product.original && (
              <span className="text-xs text-[var(--color-text-secondary)] line-through">
                ₹{product.original.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="p-[var(--space-3)] pt-0">
        <button
          onClick={handleAdd}
          className={`w-full rounded-[var(--radius-md)] border py-[var(--space-2)] text-xs font-semibold transition-all ${
            added
              ? "bg-green-600 border-green-600 text-white"
              : "border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white"
          }`}
        >
          {added ? "✓ Added to Bag" : "Add to Bag"}
        </button>
      </div>
    </div>
  );
}

export default function ProductSections() {
  return (
    <>
      {/* Health & Wellness section */}
      <section className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-8)]">
        <div className="mb-[var(--space-6)] flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
              Health &amp; Wellness
            </h2>
            <p className="mt-[var(--space-1)] text-sm text-[var(--color-text-secondary)]">
              Nutritional beauty &amp; daily vitality
            </p>
          </div>
          <Link
            href="/category/health-wellness"
            className="text-sm font-medium text-[var(--color-text-link)] hover:underline"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {healthProducts.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </section>

      {/* Gift sets section */}
      <section className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-8)]">
        <div className="mb-[var(--space-6)] flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
              MORYELLE Gifting Studio
            </h2>
            <p className="mt-[var(--space-1)] text-sm text-[var(--color-text-secondary)]">
              Curated luxury kits for special occasions
            </p>
          </div>
          <Link
            href="/category/gifting"
            className="text-sm font-medium text-[var(--color-text-link)] hover:underline"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {giftProducts.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}