import type { Product } from "@/data/products";

export type Catalog = {
  name: string;
  slug: string;
};

const catalogNames = [
  "ALBAZIA 2025",
  "BAMBOO 2025",
  "CAPIZ 2025",
  "COCONUT 2025",
  "DRIFTWOOD 2025",
  "GLASS",
  "HANGING",
  "INSTRUMENT",
  "RATTAN 2025",
  "SHELL 2025",
  "STONE 2025",
  "TASSEL 2025",
  "TEAK 2025",
  "TERRACOTTA 2025",
  "WATERHYACINTH&SEAGRASS 2025"
];

export const slugifyCatalog = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const catalogs: Catalog[] = catalogNames.map((name) => ({
  name,
  slug: slugifyCatalog(name)
}));

export const productCatalogMap: Record<string, string> = {
  "Whimsy Candle Holder": "TERRACOTTA 2025",
  "Eclipse Coffee Cup": "GLASS",
  "Harmony Dinner Plate": "STONE 2025",
  "Aurora Tea Mug": "BAMBOO 2025",
  "Celestial Serving Platter": "CAPIZ 2025",
  "Cascade Water Pitcher": "DRIFTWOOD 2025",
  "Nebula Salad Bowl": "COCONUT 2025",
  "Meadow Dessert Plate": "SHELL 2025",
  "Serenity Soup Bowl": "RATTAN 2025",
  "Eden Flower Vase": "TEAK 2025",
  "Luna Snack Plate": "ALBAZIA 2025"
};

export function getCatalogBySlug(slug: string) {
  return catalogs.find((catalog) => catalog.slug === slugifyCatalog(slug));
}

export function getProductCatalog(product: Pick<Product, "name">) {
  const catalogName = productCatalogMap[product.name];
  return catalogs.find((catalog) => catalog.name === catalogName) ?? null;
}

export function getAvailableProductCatalogs(products: Array<Pick<Product, "name">>) {
  const availableCatalogNames = new Set(
    products.map((product) => productCatalogMap[product.name]).filter(Boolean)
  );

  return catalogs.filter((catalog) => availableCatalogNames.has(catalog.name));
}
