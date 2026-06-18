import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <section className="section first">
        <div className="block outline">
          <h4>Page not found</h4>
          <p>The page you are looking for is not available in this Next.js storefront.</p>
          <Link className="button-text inline-block" href="/shop">
            <h6>Return to Shop</h6>
            <div className="underline" style={{ width: "0%" }} />
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
