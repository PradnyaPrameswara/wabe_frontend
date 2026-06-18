import type { Product } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export function ProductGrid({
  products,
  gridClassName = "product-wrapper-masonry",
  shopGrid = false,
  forceImageShape
}: {
  products: Product[];
  gridClassName?: string;
  shopGrid?: boolean;
  forceImageShape?: "square" | "vertical";
}) {
  return (
    <div className="product-wrapper collection-list">
      <div
        className={`${gridClassName} collection-items${products.length === 1 ? " has-single-visible" : ""}`}
        data-shop-v1-grid={shopGrid ? "" : undefined}
        data-visible-count={products.length}
        role="list"
      >
        {products.map((product) => (
          <ProductCard forceImageShape={forceImageShape} key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
