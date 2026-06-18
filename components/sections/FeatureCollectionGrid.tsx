import Link from "next/link";
import type { Category } from "@/data/categories";

export function FeatureCollectionGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="feature-collection collection-list">
      <div className="_2-column collection-items" role="list">
        {categories.map((category) => (
          <div className="feature-item collection-item" key={category.slug} role="listitem">
            <Link className="feature-item-link inline-block" href={`/category/${category.slug}`}>
              <img
                alt={category.name}
                className="feature-collection-item"
                loading="lazy"
                src={category.image}
              />
              <div className="feature-item-block" style={{ color: "hsla(0, 0%, 100%, 1)" }}>
                <h1>{category.name}</h1>
                <div className="text-link" style={{ borderColor: "hsla(0, 0%, 100%, 1)" }}>
                  {category.cta}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
