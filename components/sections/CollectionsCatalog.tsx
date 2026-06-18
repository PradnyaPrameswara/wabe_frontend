"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CollectionPageResult, ShopCollection } from "@/lib/catalog/collections";

const collectionPageSize = 6;

type CollectionsCatalogProps = {
  collections: ShopCollection[];
  initialData: CollectionPageResult;
};

function getClientPage(collections: ShopCollection[], page: number, limit: number): CollectionPageResult {
  const safeLimit = Math.max(1, Math.min(collectionPageSize, Math.floor(limit) || collectionPageSize));
  const totalItems = collections.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safeLimit));
  const safePage = Math.min(Math.max(1, Math.floor(page) || 1), totalPages);
  const start = (safePage - 1) * safeLimit;

  return {
    collections: collections.slice(start, start + safeLimit),
    limit: safeLimit,
    page: safePage,
    totalItems,
    totalPages
  };
}

function CollectionCard({ collection }: { collection: ShopCollection }) {
  return (
    <div className="feature-item collection-item" role="listitem">
      <Link className="feature-item-link inline-block" href={collection.href}>
        <img
          alt={collection.title}
          className="feature-collection-item"
          loading="lazy"
          src={collection.image}
        />
        <div className="feature-item-block collections-catalog-card-copy">
          <h1>{collection.title}</h1>
          <p>{collection.description}</p>
          <div className="text-link">{collection.cta}</div>
        </div>
      </Link>
    </div>
  );
}

export function CollectionsCatalog({ collections, initialData }: CollectionsCatalogProps) {
  const [pageData, setPageData] = useState(initialData);
  const limit = Math.min(initialData.limit || collectionPageSize, collectionPageSize);

  const visibleCollections = useMemo(
    () => pageData.collections.slice(0, collectionPageSize),
    [pageData.collections]
  );
  const showPagination = pageData.totalPages > 1;

  const goToPage = (page: number) => {
    const nextData = getClientPage(collections, page, limit);
    setPageData(nextData);

    const url = new URL(window.location.href);
    if (nextData.page > 1) {
      url.searchParams.set("page", String(nextData.page));
    } else {
      url.searchParams.delete("page");
    }
    window.history.replaceState({}, "", url);
  };

  return (
    <>
      <div
        aria-live="polite"
        className="feature-collection collection-list collections-catalog"
      >
        <div className="_2-column collection-items" role="list">
          {visibleCollections.map((collection) => (
            <CollectionCard collection={collection} key={collection.slug} />
          ))}
        </div>
      </div>

      <nav
        aria-label="Collection pages"
        className={`collections-pagination-section${showPagination ? " is-visible" : ""}`}
      >
        <div className="collections-pagination">
          <button
            aria-label="Previous collections page"
            className="collections-page-button collections-page-arrow"
            disabled={pageData.page === 1}
            onClick={() => goToPage(pageData.page - 1)}
            type="button"
          >
            &lt;
          </button>
          {Array.from({ length: pageData.totalPages }, (_, index) => {
            const page = index + 1;

            return (
              <button
                aria-current={page === pageData.page ? "page" : undefined}
                className={`collections-page-button${page === pageData.page ? " is-active" : ""}`}
                key={page}
                onClick={() => goToPage(page)}
                type="button"
              >
                {page}
              </button>
            );
          })}
          <button
            aria-label="Next collections page"
            className="collections-page-button collections-page-arrow"
            disabled={pageData.page === pageData.totalPages}
            onClick={() => goToPage(pageData.page + 1)}
            type="button"
          >
            &gt;
          </button>
        </div>
      </nav>
    </>
  );
}
