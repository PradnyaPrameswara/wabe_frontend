import Link from "next/link";
import type { JournalArticle } from "@/data/journal";

export function JournalCard({ article }: { article: JournalArticle }) {
  return (
    <div className="journal-item collection-item" role="listitem">
      <Link className="journal-link inline-block" href={`/journal/${article.slug}`}>
        <img alt={article.title} className="journal-image" loading="lazy" src={article.image} />
        <h6 className="grey">{article.category}</h6>
        <div className="space _8px" />
        <h2>{article.title}</h2>
        <p>{article.excerpt}</p>
        <div className="space _24px" />
        <div className="text-link">Read Article</div>
      </Link>
    </div>
  );
}
