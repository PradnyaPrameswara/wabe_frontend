import Link from "next/link";
import { getProductCatalog } from "@/data/catalogs";
import type { Product } from "@/data/products";
import { ProductCardAddToCart } from "./ProductCardAddToCart";

function formatSrcSet(product: Product) {
  return product.image.srcSet?.map((item) => `${item.src} ${item.width}w`).join(", ");
}

export function ProductCard({
  product,
  forceImageShape,
  wide = false
}: {
  product: Product;
  forceImageShape?: "square" | "vertical";
  wide?: boolean;
}) {
  const href = `/product/${product.slug}`;
  const shape = forceImageShape ?? product.imageShape ?? "square";
  const catalog = getProductCatalog(product);
  const displayCategory = catalog?.name ?? product.categoryName;
  const displayCategoryHref = catalog ? `/shop?catalog=${catalog.slug}` : `/category/${product.categorySlug}`;
  const cardClassName = [
    "product-wrapper-item collection-item",
    product.cardClassName,
    wide ? "is-wide" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClassName} role="listitem">
      <Link className="product-item inline-block" href={href}>
        <div className={`image-container ${shape}`}>
          <img
            alt={product.image.alt}
            className="product-image"
            loading="lazy"
            sizes="100vw"
            src={product.image.src}
            srcSet={formatSrcSet(product)}
          />
          <ProductCardAddToCart product={product} />
        </div>
      </Link>
      <div className="product-information">
        <div className="product-information-brand collection-list">
          <div className="product-information-brand-list collection-items" role="list">
            <div className="product-information-brand-item collection-item" role="listitem">
              <Link className="brand-link inline-block" href={displayCategoryHref}>
                <h6>{displayCategory}</h6>
              </Link>
            </div>
          </div>
        </div>
        <h6>/</h6>
        <h6>{product.collection}</h6>
      </div>
      <Link className="product-item inline-block" href={href}>
        <div className="product-text">
          <div>{product.name}</div>
        </div>
      </Link>
    </div>
  );
}
