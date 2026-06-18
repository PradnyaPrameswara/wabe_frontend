import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { AddToCartForm } from "@/components/product/AddToCartForm";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ClientShowcase } from "@/components/sections/ClientShowcase";
import { FeatureCollectionGrid } from "@/components/sections/FeatureCollectionGrid";
import { HeroSection } from "@/components/sections/HeroSection";
import { categories } from "@/data/categories";
import { featuredProduct, products } from "@/data/products";

const aboutCards = [
  {
    category: "Origins",
    href: "/about",
    image: "/media/6a2680f03f3745a0ac723d9c_Journal_placeholder06.jpg",
    title: "From a family workshop in Gianyar to a growing artisan collective.",
    text:
      "Our story began with handmade work, family values, and a deep respect for Balinese craft traditions."
  },
  {
    category: "Craft",
    href: "/about",
    image: "/media/6a2680f03f3745a0ac723d9b_Journal_placeholder05.jpg",
    title: "More than 100 local artisans shape each piece with care.",
    text:
      "Traditional skill, material sensitivity, and contemporary design come together in every collection."
  },
  {
    category: "Heritage",
    href: "/about",
    image: "/media/6576f7f6b14eb68a7d6250e0_Journal_placeholder04.jpg",
    title: "Every rattan knot and teak carving carries heritage and heart.",
    text:
      "Each hand-finished surface reflects patience, memory, and the lasting beauty of honest craftsmanship."
  }
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="section padding-top">
        <FeatureCollectionGrid categories={categories.slice(0, 2)} />
      </section>

      <section className="section">
        <div className="section-headline">
          <h4>Shop Latest</h4>
          <Link className="button-text inline-block" href="/shop">
            <h6>EXPLORE ALL</h6>
            <div className="underline" />
          </Link>
        </div>
        <ProductGrid products={products.slice(0, 10)} />
      </section>

      <section className="section featured-product">
        <div className="feature-product-container collection-list">
          <div className="feature-product-list collection-items" role="list">
            <div className="feature-product collection-item" role="listitem">
              <img
                alt=""
                className="image"
                loading="lazy"
                sizes="100vw"
                src="/media/6a2680f03f3745a0ac723d9d_Featured_Image_Placeholder.jpg"
                srcSet={[
                  "/media/6a2680f03f3745a0ac723d9d_Featured_Image_Placeholder-p-500.jpg 500w",
                  "/media/6a2680f03f3745a0ac723d9d_Featured_Image_Placeholder-p-800.jpg 800w",
                  "/media/6a2680f03f3745a0ac723d9d_Featured_Image_Placeholder-p-1080.jpg 1080w",
                  "/media/6a2680f03f3745a0ac723d9d_Featured_Image_Placeholder.jpg 1176w"
                ].join(", ")}
              />
              <div className="feature-product-wrapper">
                <Link className="product-item inline-block" href={`/product/${featuredProduct.slug}`}>
                  <div className="image-container square">
                    <img
                      alt={featuredProduct.name}
                      className="product-image"
                      loading="lazy"
                      sizes="100vw"
                      src={featuredProduct.image.src}
                    />
                  </div>
                </Link>
                <div className="space _8px" />
                <h6 className="product-information">{featuredProduct.collection}</h6>
                <div className="space _8px" />
                <div className="product-text">
                  <h1>{featuredProduct.name}</h1>
                </div>
                <div className="product-text">
                  <div>{featuredProduct.description}</div>
                </div>
                <div className="space _24px" />
                <AddToCartForm product={featuredProduct} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="custom-request-section block outline">
          <div className="custom-request-copy">
            <h4>Custom Design Request</h4>
            <p>Want something unique? Our artisans can create custom designs just for you.</p>
          </div>
          <Link className="button-text inline-block custom-request-link" href="/contact-us">
            <h6>Request Custom Design</h6>
            <div className="underline" />
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-headline">
          <h4>About</h4>
          <Link className="button-text inline-block" href="/about">
            <h6>See Our Story</h6>
            <div className="underline" />
          </Link>
        </div>

          <div className="journal-wrapper collection-list">
            <div className="journal-gird collection-items" role="list">
              {aboutCards.map((card) => (
                <div className="journal-item collection-item" key={card.title} role="listitem">
                  <Link className="journal-link inline-block" href={card.href}>
                    <img alt={card.title} className="journal-image" loading="lazy" src={card.image} />
                    <h6 className="grey">{card.category}</h6>
                    <div className="space _8px" />
                    <h2>{card.title}</h2>
                    <p>{card.text}</p>
                    <div className="space _24px" />
                    <div className="text-link">Read More</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
      </section>
      <ClientShowcase />
      <Footer />
    </>
  );
}
