import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import BrandSpotlight from "@/components/BrandSpotlight";
import ProductSections from "@/components/ProductSections";
import PromoGrid from "@/components/PromoGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <BrandSpotlight />
      <ProductGrid />
      <ProductSections />
      <PromoGrid />
      <Footer />
    </main>
  );
}