"use client";

import { useEffect, useMemo, useState } from "react";
import { getAvailableProductCatalogs, getCatalogBySlug, getProductCatalog } from "@/data/catalogs";
import type { Product } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";

const gridColumns = 5;
const maxVisibleRows = 3;
const pageSize = gridColumns * maxVisibleRows;

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function buildSearchText(product: Product) {
  const catalog = getProductCatalog(product);

  return normalizeText(
    [
      product.name,
      product.categoryName,
      product.collection,
      product.description,
      catalog?.name ?? ""
    ].join(" ")
  );
}

function parseCatalogParams() {
  if (typeof window === "undefined") return [];

  const url = new URL(window.location.href);
  return Array.from(
    new Set(
      [
        ...url.searchParams.getAll("catalog"),
        ...(url.searchParams.get("catalogs") || "").split(",")
      ]
        .map((value) => getCatalogBySlug(value)?.slug)
        .filter(Boolean) as string[]
    )
  );
}

export function ShopProductFilters({ products }: { products: Product[] }) {
  const availableCatalogs = useMemo(() => getAvailableProductCatalogs(products), [products]);
  const availableCatalogSlugs = useMemo(
    () => new Set(availableCatalogs.map((catalog) => catalog.slug)),
    [availableCatalogs]
  );
  const [activeCatalogs, setActiveCatalogs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    setSearchTerm(url.searchParams.get("search") || "");
    setActiveCatalogs(parseCatalogParams().filter((slug) => availableCatalogSlugs.has(slug)));

    const requestedPage = Number.parseInt(url.searchParams.get("page") || "1", 10);
    if (Number.isFinite(requestedPage) && requestedPage > 0) {
      setCurrentPage(requestedPage);
    }
  }, [availableCatalogSlugs]);

  const filteredProducts = useMemo(() => {
    const term = normalizeText(searchTerm);

    return products.filter((product) => {
      const catalog = getProductCatalog(product);
      const matchesCatalog =
        !activeCatalogs.length || (catalog ? activeCatalogs.includes(catalog.slug) : false);
      const matchesSearch = !term || buildSearchText(product).includes(term);

      return matchesCatalog && matchesSearch;
    });
  }, [activeCatalogs, products, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const visibleProducts = filteredProducts.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    url.searchParams.delete("catalog");
    url.searchParams.delete("catalogs");
    activeCatalogs.forEach((catalog) => url.searchParams.append("catalog", catalog));

    if (normalizeText(searchTerm)) {
      url.searchParams.set("search", normalizeText(searchTerm));
    } else {
      url.searchParams.delete("search");
    }

    if (safeCurrentPage > 1) {
      url.searchParams.set("page", String(safeCurrentPage));
    } else {
      url.searchParams.delete("page");
    }

    window.history.replaceState({}, "", url);
  }, [activeCatalogs, safeCurrentPage, searchTerm]);

  const toggleCatalog = (slug: string) => {
    setCurrentPage(1);
    setActiveCatalogs((currentCatalogs) =>
      currentCatalogs.includes(slug)
        ? currentCatalogs.filter((catalog) => catalog !== slug)
        : [...currentCatalogs, slug]
    );
  };

  const clearFilters = () => {
    setCurrentPage(1);
    setActiveCatalogs([]);
  };

  const selectedCatalogs = activeCatalogs
    .map((slug) => availableCatalogs.find((catalog) => catalog.slug === slug))
    .filter(Boolean);

  return (
    <>
      <div className="overlay" onClick={() => setIsDrawerOpen(false)} style={{ display: isDrawerOpen ? "block" : "none" }} />
      <div
        className="modal"
        style={{
          display: isDrawerOpen ? "flex" : "none",
          transform: isDrawerOpen ? "translate3d(0, 0, 0)" : "translate3d(100%, 0, 0)",
          WebkitTransform: isDrawerOpen ? "translate3d(0, 0, 0)" : "translate3d(100%, 0, 0)"
        }}
      >
        <div className="cart-header">
          <h6>FILTER</h6>
          <button
            aria-label="Close filters"
            className="inline-block header-action-button"
            onClick={() => setIsDrawerOpen(false)}
            type="button"
          >
            <img
              alt=""
              className="close"
              loading="lazy"
              src="/media/6a2680f03f3745a0ac723d17_Close_icon.svg"
            />
          </button>
        </div>
        <div className={`filter-dropdown${isDropdownOpen ? " is-open" : ""}`} data-filter-dropdown>
          <button
            aria-expanded={isDropdownOpen}
            className="filter-dropdown-toggle"
            onClick={() => setIsDropdownOpen((isOpen) => !isOpen)}
            type="button"
          >
            <span>Catalog Filters</span>
            <span className="filter-dropdown-icon">{isDropdownOpen ? "-" : "+"}</span>
          </button>
          <div className="filter-dropdown-panel" data-filter-dropdown-panel style={{ display: isDropdownOpen ? "block" : "none" }}>
            <div className="filter-title">
              <h6>Filter by Catalog</h6>
            </div>
            <div className="list collection-list">
              <div className="laundry-list-wrapper collection-items catalog-filter-list" role="list">
                {availableCatalogs.map((catalog) => (
                  <div className="laundry-list-item collection-item" key={catalog.slug} role="listitem">
                    <a
                      className={`filter-list inline-block${activeCatalogs.includes(catalog.slug) ? " is-active" : ""}`}
                      data-catalog={catalog.slug}
                      href={`/shop?catalog=${encodeURIComponent(catalog.slug)}`}
                      onClick={(event) => {
                        event.preventDefault();
                        toggleCatalog(catalog.slug);
                        setIsDropdownOpen(true);
                      }}
                    >
                      <h6>{catalog.name}</h6>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-headline shop-headline">
        <form
          action="/shop"
          className="search form-block"
          onSubmit={(event) => {
            event.preventDefault();
            setCurrentPage(1);
          }}
        >
          <img alt="" className="icon" loading="lazy" src="/media/6a2680f03f3745a0ac723d28_search.svg" />
          <input
            className="text-field search input-control"
            id="search"
            maxLength={256}
            name="query"
            onChange={(event) => {
              setCurrentPage(1);
              setSearchTerm(event.target.value);
            }}
            placeholder="SEARCH..."
            type="search"
            value={searchTerm}
          />
          <input className="search-button button-control" type="submit" value="Search" />
        </form>

        <div className="shop-toolbar-actions">
          <div
            aria-label="Selected filters"
            className={`shop-selected-filters${selectedCatalogs.length ? " is-visible" : ""}`}
            data-selected-filters
          >
            {selectedCatalogs.map((catalog) =>
              catalog ? (
                <button
                  className="shop-selected-filter-chip"
                  data-remove-catalog={catalog.slug}
                  key={catalog.slug}
                  onClick={() => toggleCatalog(catalog.slug)}
                  type="button"
                >
                  <span>{catalog.name}</span>
                  <span aria-hidden="true">x</span>
                </button>
              ) : null
            )}
            {selectedCatalogs.length ? (
              <button className="shop-selected-filter-clear" data-clear-filters onClick={clearFilters} type="button">
                Clear
              </button>
            ) : null}
          </div>

          <button
            className="filter inline-block header-action-button"
            onClick={() => {
              setIsDropdownOpen(false);
              setIsDrawerOpen(true);
            }}
            type="button"
          >
            <img alt="" className="icon" loading="lazy" src="/media/6a2680f03f3745a0ac723d27_controls.svg" />
            <h6>FILTER</h6>
          </button>
        </div>
      </div>

      <ProductGrid products={visibleProducts} shopGrid />

      <div className={`shop-search-empty${filteredProducts.length ? "" : " is-visible"}`}>
        No products match your search.
      </div>

      <div
        aria-label="Shop pagination"
        className={`collections-pagination-section pagination${totalPages > 1 ? " is-visible" : ""}`}
        data-shop-pagination-section
      >
        <div className="collections-pagination" data-shop-pagination>
          <button
            aria-label="Previous page"
            className="collections-page-button collections-page-arrow"
            disabled={safeCurrentPage === 1}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            type="button"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;

            return (
              <button
                className={`collections-page-button${page === safeCurrentPage ? " is-active" : ""}`}
                data-shop-page={page}
                key={page}
                onClick={() => setCurrentPage(page)}
                type="button"
              >
                {page}
              </button>
            );
          })}
          <button
            aria-label="Next page"
            className="collections-page-button collections-page-arrow"
            disabled={safeCurrentPage === totalPages}
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            type="button"
          >
            &gt;
          </button>
        </div>
      </div>
    </>
  );
}
