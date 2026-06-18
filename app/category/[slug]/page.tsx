import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProductGrid } from "@/components/product/ProductGrid";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: any }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  return {
    title: category ? `${category.name} | Widhi Asih Bali Export` : "Collection"
  };
}

export default async function CategoryPage({ params }: { params: any }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const categoryProducts = getProductsByCategory(category.slug);

  return (
    <>
      <Header />
      <section className="section first">
        <div className="_2-column">
          <h4>{category.name}</h4>
          <div className="block">
            <p>{category.description}</p>
          </div>
        </div>
      </section>
      <section className="section">
        {categoryProducts.length > 0 ? (
          <ProductGrid forceImageShape="vertical" gridClassName="large-product-grid" products={categoryProducts} />
        ) : (
          <div className="block outline">
            <h4>No products in this collection yet</h4>
            <p>This route is ready for Odoo category records once the catalog API is connected.</p>
            <Link className="button-text inline-block" href="/shop">
              <h6>Browse Shop</h6>
              <div className="underline" style={{ width: "0%" }} />
            </Link>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
