import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JournalCard } from "@/components/sections/JournalCard";
import { getArticleBySlug, journalArticles } from "@/data/journal";

export function generateStaticParams() {
  return journalArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: any }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  return {
    title: article ? `${article.title} | Widhi Asih Bali Export` : "Journal"
  };
}

export default async function JournalArticlePage({ params }: { params: any }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const relatedArticles = journalArticles.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <>
      <Header />
      <section className="section first">
        <div className="_12-column centre">
          <div className="block centre">
            <h1>{article.title}</h1>
            <div className="space _32px" />
            <div className="journal-caterogies">
              <Link className="text-link inline-block" href={`/journal-categories/${article.category.toLowerCase()}`}>
                <h6>{article.category}</h6>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="_12-column">
          <img alt="" className="journal-article-image" loading="lazy" src={article.image} />
        </div>
        <div className="space _128px" />
        <div className="_12-column">
          <div className="rich-text centre rich-text">
            <p>
              {article.excerpt} Our team works closely with artisans across Bali to balance
              material knowledge, buyer requirements, and production consistency for export-ready
              ceramic ranges.
            </p>
            <figure className="rich-text-align-center rich-text-figure-image">
              <div>
                <img alt="" loading="lazy" src="/media/6a2680f03f3745a0ac723d9a_Journal_placeholder03.jpg" />
              </div>
              <figcaption>Image Caption</figcaption>
            </figure>
            <h2>Headline</h2>
            <p>
              Handmade ceramics carry the marks of process: shaping, drying, firing, finishing, and
              inspection. For B2B buyers, that process becomes most valuable when it is supported by
              clear production standards, reliable communication, and flexible custom development.
            </p>
            <figure className="rich-text-align-center rich-text-figure-image">
              <div>
                <img alt="" loading="lazy" src="/media/6a2680f03f3745a0ac723dbe_Product_placeholder_image_04.jpg" />
              </div>
              <figcaption>Image Caption</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-headline">
          <h4>Related journals</h4>
          <Link className="button-text inline-block" href="/journal">
            <h6>See All</h6>
            <div className="underline" style={{ width: "0%" }} />
          </Link>
        </div>
        <div className="journal-wrapper collection-list">
          <div className="journal-gird collection-items" role="list">
            {relatedArticles.map((relatedArticle) => (
              <JournalCard article={relatedArticle} key={relatedArticle.slug} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
