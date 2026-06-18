import { getAvailableProductCatalogs, getProductCatalog } from "@/data/catalogs";
import { products as shopProducts } from "@/data/products";
import type { Product } from "@/data/products";

export const COLLECTION_PAGE_SIZE = 6;

export type ShopCollection = {
  cta: string;
  description: string;
  href: string;
  image: string;
  productCount: number;
  slug: string;
  title: string;
};

export type CollectionPageResult = {
  collections: ShopCollection[];
  limit: number;
  page: number;
  totalItems: number;
  totalPages: number;
};

function pluralizeProduct(count: number) {
  return count === 1 ? "1 product" : `${count} products`;
}

function buildCollectionDescription(products: Product[], fallbackName: string) {
  const [featuredProduct] = products;

  if (!featuredProduct) {
    return `${fallbackName} is ready for new catalog records.`;
  }

  return featuredProduct.description;
}

export function getShopCollections(sourceProducts: Product[] = shopProducts): ShopCollection[] {
  const availableCatalogs = getAvailableProductCatalogs(sourceProducts);

  return availableCatalogs.map((catalog) => {
    const catalogProducts = sourceProducts.filter((product) => getProductCatalog(product)?.slug === catalog.slug);
    const featuredProduct = catalogProducts[0];
    const productCount = catalogProducts.length;

    return {
      cta: `View ${pluralizeProduct(productCount)}`,
      description: buildCollectionDescription(catalogProducts, catalog.name),
      href: `/shop?catalog=${encodeURIComponent(catalog.slug)}`,
      image: featuredProduct?.image.src ?? "/media/6576f14bb6f27bd61de934d9_Product_placeholder_image_01.jpg",
      productCount,
      slug: catalog.slug,
      title: catalog.name
    };
  });
}

export function getPaginatedShopCollections({
  limit = COLLECTION_PAGE_SIZE,
  page = 1,
  sourceProducts = shopProducts
}: {
  limit?: number;
  page?: number;
  sourceProducts?: Product[];
} = {}): CollectionPageResult {
  const safeLimit = Math.max(1, Math.min(COLLECTION_PAGE_SIZE, Math.floor(limit) || COLLECTION_PAGE_SIZE));
  const allCollections = getShopCollections(sourceProducts);
  const totalItems = allCollections.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safeLimit));
  const safePage = Math.min(Math.max(1, Math.floor(page) || 1), totalPages);
  const start = (safePage - 1) * safeLimit;

  return {
    collections: allCollections.slice(start, start + safeLimit),
    limit: safeLimit,
    page: safePage,
    totalItems,
    totalPages
  };
}
