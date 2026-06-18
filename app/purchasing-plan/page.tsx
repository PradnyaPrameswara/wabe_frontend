import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { products } from "@/data/products";

export const metadata = {
  title: "Purchasing Plan | Widhi Asih Bali Export"
};

const planProducts = products.slice(0, 6);

export default function PurchasingPlanPage() {
  return (
    <>
      <Header />
      <section className="section first">
        <div className="_2-column">
          <div className="block">
            <h1>Purchasing Plan</h1>
            <div className="space _8px" />
            <p className="b2b-plan-intro">
              Review your logged-in assortment, compare product details, and keep only the items
              that fit your current buying plan.
            </p>
          </div>
        </div>
      </section>

      <div className="shop-checkoutformcontainer b2b-plan-shell">
        <div className="shop-layoutcontainer container">
          <div className="shop-layoutmain">
            <div className="shop-checkoutcustomerinfowrapper">
              <div className="shop-checkoutblockheader">
                <h2>Selected Assortment</h2>
                <div>Logged-In Buyer View</div>
              </div>
              <div className="shop-checkoutblockcontent">
                <div className="b2b-plan-grid purchasing-plan-selection">
                  {planProducts.map((product) => (
                    <article className="b2b-plan-card is-selected" key={product.slug}>
                      <div className="b2b-plan-card-header">
                        <div>
                          <h6>{product.categoryName} / {product.collection}</h6>
                          <h3>
                            <Link className="b2b-plan-link" href={`/product/${product.slug}`}>
                              {product.name}
                            </Link>
                          </h3>
                        </div>
                        <label className="b2b-plan-toggle">
                          <input className="b2b-plan-checkbox" defaultChecked type="checkbox" />
                          <span>Included</span>
                        </label>
                      </div>
                      <Link className="b2b-plan-link" href={`/product/${product.slug}`}>
                        <img alt={product.name} className="b2b-plan-image" loading="lazy" src={product.image.src} />
                      </Link>
                      <p className="truncate">{product.description}</p>
                      <div className="b2b-plan-meta">
                        <div>
                          <span>Size</span>
                          <strong>{product.size}</strong>
                        </div>
                        <div>
                          <span>Color</span>
                          <strong>{product.color}</strong>
                        </div>
                        <div className="b2b-plan-meta-wide">
                          <span>Product Details</span>
                          <strong>{product.usage}</strong>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="shop-layoutsidebar b2b-plan-sidebar">
            <div className="shop-checkoutordersummarywrapper">
              <div className="shop-checkoutsummaryblockheader">
                <h2>Selection Summary</h2>
              </div>
              <fieldset className="shop-checkoutblockcontent">
                <div className="shop-checkoutsummarylineitem">
                  <div>Included Items</div>
                  <div className="shop-checkoutsummarytotal">{planProducts.length}</div>
                </div>
                <div className="shop-checkoutsummarylineitem">
                  <div>Status</div>
                  <div>Saved automatically</div>
                </div>
                <div className="shop-checkoutsummarylineitem">
                  <div>Review</div>
                  <div>Uncheck unsuitable items</div>
                </div>
              </fieldset>
            </div>

            <div className="shop-checkoutordersummarywrapper">
              <div className="shop-checkoutsummaryblockheader">
                <h2>Buyer Note</h2>
              </div>
              <fieldset className="shop-checkoutblockcontent">
                <form className="b2b-plan-contact b2b-plan-note-form">
                  <div>Your product selections are already linked to your buyer profile.</div>
                  <div>Selections update as you review products, details, and fit.</div>
                  <textarea
                    className="input-control b2b-plan-crm-note"
                    id="crm-buyer-note"
                    maxLength={1000}
                    name="crm-buyer-note"
                    placeholder="Add a buyer note for your CRM record"
                    rows={5}
                    spellCheck
                  />
                  <div className="b2b-plan-note-actions">
                    <button className="submit-button button-control b2b-plan-send" type="submit">
                      Submit
                    </button>
                    <div className="b2b-plan-crm-status" />
                  </div>
                </form>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
