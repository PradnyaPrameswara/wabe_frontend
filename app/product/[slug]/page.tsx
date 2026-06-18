import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AddToCartForm } from "@/components/product/AddToCartForm";
import { ProductImageLightboxGallery } from "@/components/product/ProductImageLightboxGallery";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProductCatalog } from "@/data/catalogs";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: any }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  return {
    title: product ? `${product.name} | Widhi Asih Bali Export` : "Product"
  };
}

export default async function ProductPage({ params }: { params: any }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const catalog = getProductCatalog(product);
  const relatedProducts = getRelatedProducts(product);

  return (
    <>
      <Header />
      <section className="section product">
        <div className="product-page-grid">
          <div className="block-sticky" id="layout-node-f98ff4f3-d2a7-cac1-973f-e6ce546f033e-ac723d3b">
            <div className="category-wrapper collection-list">
              <div className="category-list collection-items" role="list">
                <div className="category-item collection-item" role="listitem">
                  <h3>{catalog?.name ?? product.categoryName}</h3>
                </div>
              </div>
            </div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <div className="rich-text rich-text">
              <p>
                {product.details.map((detail) => (
                  <span key={detail}>
                    - {detail}
                    <br />
                  </span>
                ))}
              </p>
              <p>Elevate your assortment with a piece where functionality meets artistry.</p>
            </div>
          </div>

          <ProductImageLightboxGallery
            images={[product.image, product.image, product.image]}
            productName={product.name}
          />

          <div className="block-sticky" id="layout-node-d48ad1fd-b11e-7ea5-d4c7-7e6f4304c96f-ac723d3b">
            <AddToCartForm product={product} />
            <div className="space _24px" />
            <h6 className="light-text">Shipping terms are confirmed with your buyer order.</h6>
          </div>
        </div>
      </section>
      <section className="section related-products-section">
        <div className="section-headline">
          <h4>Related products</h4>
          <Link className="button-text inline-block" href="/shop">
            <h6>See All</h6>
            <div className="underline" style={{ width: "0%" }} />
          </Link>
        </div>
        <ProductGrid gridClassName="related-products-grid" products={relatedProducts} />
      </section>
      <Footer />
    </>
  );
}
