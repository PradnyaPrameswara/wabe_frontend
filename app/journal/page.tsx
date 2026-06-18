import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JournalCard } from "@/components/sections/JournalCard";
import { journalArticles, journalCategories } from "@/data/journal";

export const metadata = {
  title: "Journal | Widhi Asih Bali Export"
};

export default function JournalPage() {
  return (
    <>
      <Header />
      <section className="section first">
        <div className="section-headline">
          <div className="journal-filters">
            {journalCategories.map((category) => (
              <Link
                aria-current={category === "All" ? "page" : undefined}
                className={`button-text inline-block${category === "All" ? " is-current" : ""}`}
                href={category === "All" ? "/journal" : `/journal-categories/${category.toLowerCase()}`}
                key={category}
              >
                <h6>{category}</h6>
                <div className="underline" style={{ width: "0%" }} />
              </Link>
            ))}
          </div>
        </div>
        <div className="journal-wrapper collection-list">
          <div className="journal-gird collection-items" role="list">
            {journalArticles.map((article) => (
              <JournalCard article={article} key={article.slug} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
