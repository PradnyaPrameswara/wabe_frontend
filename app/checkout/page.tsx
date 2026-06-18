import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { products } from "@/data/products";
import { CheckoutRequestClient } from "./CheckoutRequestClient";

export const metadata = {
  title: "Checkout | Widhi Asih Bali Export"
};

const summaryProducts = products.slice(0, 3);

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <section className="section first b2b-plan-overview">
        <div className="section-headline b2b-plan-overview-card">
          <div className="block">
            <h1>Checkout</h1>
            <div className="space _8px" />
            <p className="b2b-plan-intro">
              Confirm your buyer details, delivery requirements, and selected assortment. Our team
              reviews the request and follows up with final freight, availability, and payment terms
              before production begins.
            </p>
          </div>
        </div>
      </section>

      <CheckoutRequestClient summaryProducts={summaryProducts} />
      <Footer />
    </>
  );
}
