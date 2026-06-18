import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ShopProductFilters } from "@/components/product/ShopProductFilters";
import { products } from "@/data/products";

export const metadata = {
  title: "Shop | Widhi Asih Bali Export"
};

export default function ShopPage() {
  return (
    <>
      <Header />
      <section className="section first shop-v1-section">
        <ShopProductFilters products={products} />
      </section>
      <Footer />
    </>
  );
}
