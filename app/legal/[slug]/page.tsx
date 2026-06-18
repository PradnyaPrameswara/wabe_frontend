import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getLegalPageBySlug, legalPages } from "@/data/legal";

export function generateStaticParams() {
  return legalPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: any }) {
  const { slug } = await params;
  const page = getLegalPageBySlug(slug);

  return {
    title: page ? `${page.title} | Widhi Asih Bali Export` : "Legal"
  };
}

export default async function LegalPage({ params }: { params: any }) {
  const { slug } = await params;
  const page = getLegalPageBySlug(slug);

  if (!page) notFound();

  return (
    <>
      <Header />
      <section className="section first">
        <div className="_2-column">
          <div className="block">
            <h4>{page.title}</h4>
          </div>
          <div className="block">
            <div className="rich-text rich-text">
              {page.sections.map((section) => (
                <section key={section.heading}>
                  <h4>{section.heading}</h4>
                  <p>{section.body}</p>
                  {section.items ? (
                    <ol role="list">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
