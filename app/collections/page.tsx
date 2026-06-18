import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CollectionsCatalog } from "@/components/sections/CollectionsCatalog";
import {
  COLLECTION_PAGE_SIZE,
  getPaginatedShopCollections,
  getShopCollections
} from "@/lib/catalog/collections";

export const metadata = {
  title: "Collections | Widhi Asih Bali Export"
};

function readPage(value: unknown) {
  const page = typeof value === "string" ? Number.parseInt(value, 10) : 1;

  return Number.isFinite(page) && page > 0 ? page : 1;
}

export default async function CollectionsPage({ searchParams }: { searchParams?: any }) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const collections = getShopCollections();
  const initialData = getPaginatedShopCollections({
    limit: COLLECTION_PAGE_SIZE,
    page: readPage(resolvedSearchParams.page)
  });

  return (
    <>
      <Header />
      <section className="section first">
        <div className="_2-column">
          <h4 id="layout-node-_5ca6f8f4-633f-d7c4-ee59-b43a52bf5662-ac723d5e">
            Collections
          </h4>
          <p id="layout-node-c3196c43-ab9c-6a82-1c08-343d75a44ea6-ac723d5e">
            Here, you&apos;ll find an array of exclusive drops and limited-edition releases that
            stand at the forefront of contemporary trends. These collections are not just products;
            they are unique experiences crafted for buyers who appreciate the essence of exclusivity.
          </p>
        </div>
      </section>
      <section className="section">
        <CollectionsCatalog collections={collections} initialData={initialData} />
      </section>
      <Footer />
    </>
  );
}
