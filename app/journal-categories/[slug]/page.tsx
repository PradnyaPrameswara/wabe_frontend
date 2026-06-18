import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JournalCard } from "@/components/sections/JournalCard";
import { getArticlesByCategory, journalCategories } from "@/data/journal";

export function generateStaticParams() {
  return journalCategories
    .filter((category) => category !== "All")
    .map((category) => ({ slug: category.toLowerCase() }));
}

export default async function JournalCategoryPage({ params }: { params: any }) {
  const { slug } = await params;
  const category = journalCategories.find((item) => item.toLowerCase() === slug);

  if (!category || category === "All") notFound();

  const articles = getArticlesByCategory(category);

  return (
    <>
      <Header />
      <section className="section first">
        <div className="section-headline">
          <div className="journal-filters">
            {journalCategories.map((filter) => (
              <Link
                aria-current={filter === category ? "page" : undefined}
                className={`button-text inline-block${filter === category ? " is-current" : ""}`}
                href={filter === "All" ? "/journal" : `/journal-categories/${filter.toLowerCase()}`}
                key={filter}
              >
                <h6>{filter}</h6>
                <div className="underline" style={{ width: "0%" }} />
              </Link>
            ))}
          </div>
        </div>
        <div className="journal-wrapper collection-list">
          <div className="journal-gird collection-items" role="list">
            {articles.length > 0 ? (
              articles.map((article) => <JournalCard article={article} key={article.slug} />)
            ) : (
              <div className="block outline">
                <h4>No articles yet</h4>
                <p>This journal category is ready for CMS or Odoo website content later.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
