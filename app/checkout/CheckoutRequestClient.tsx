"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import type { Product } from "@/data/products";

type AuthSession = {
  email?: string;
  name?: string;
};

type CheckoutFormState = {
  email: string;
  name: string;
  address_line1: string;
  address_city: string;
  address_zip: string;
  address_country: string;
  buyer_note: string;
};

type CheckoutSummaryItem = {
  id: string;
  name: string;
  image?: string;
  detail: string;
  option?: string;
  quantity: number;
  slug?: string;
};

const initialFormState: CheckoutFormState = {
  email: "",
  name: "",
  address_line1: "",
  address_city: "",
  address_zip: "",
  address_country: "",
  buyer_note: ""
};

const countryOptions = [
  { value: "", label: "Select country" },
  { value: "ID", label: "Indonesia" },
  { value: "AU", label: "Australia" },
  { value: "US", label: "United States" },
  { value: "SG", label: "Singapore" }
];

function readJson<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function CheckoutRequestClient({ summaryProducts }: { summaryProducts: Product[] }) {
  const { items, updateItemQuantity } = useCart();
  const [formState, setFormState] = useState<CheckoutFormState>(initialFormState);
  const [status, setStatus] = useState("Ready for review");
  const [sessionEmail, setSessionEmail] = useState("");

  const addressStorageKey = useMemo(
    () => `wabe_checkout_saved_address_${sessionEmail || "guest"}`,
    [sessionEmail]
  );

  const checkoutItems = useMemo<CheckoutSummaryItem[]>(() => {
    if (items.length) {
      return items.map((item) => ({
        detail:
          item.details
            ?.filter((detail) => detail.value)
            .map((detail) => `${detail.label}: ${detail.value}`)
            .join(" / ") || item.option || "Standard variant",
        id: `${item.slug}-${item.option || "default"}`,
        image: item.image,
        name: item.name,
        option: item.option,
        quantity: item.quantity,
        slug: item.slug
      }));
    }

    return summaryProducts.map((product) => ({
      detail: `Size: ${product.size} / Color: ${product.color}`,
      id: product.slug,
      image: product.image.src,
      name: product.name,
      quantity: 1
    }));
  }, [items, summaryProducts]);

  useEffect(() => {
    const session = readJson<AuthSession | null>("wabe_user_session", null);
    const email = session?.email || "";
    const savedAddress = readJson<Partial<CheckoutFormState>>(
      `wabe_checkout_saved_address_${email || "guest"}`,
      {}
    );

    setSessionEmail(email);
    setFormState((current) => ({
      ...current,
      email: current.email || email,
      name: current.name || session?.name || "",
      address_line1: current.address_line1 || savedAddress.address_line1 || "",
      address_city: current.address_city || savedAddress.address_city || "",
      address_zip: current.address_zip || savedAddress.address_zip || "",
      address_country: current.address_country || savedAddress.address_country || ""
    }));
    setStatus(email ? "Buyer details loaded from your account" : "Log in to auto-fill buyer details");
  }, []);

  const updateField = (name: keyof CheckoutFormState, value: string) => {
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const savedAddress = {
      address_line1: formState.address_line1,
      address_city: formState.address_city,
      address_zip: formState.address_zip,
      address_country: formState.address_country
    };

    window.localStorage.setItem(addressStorageKey, JSON.stringify(savedAddress));
    window.localStorage.setItem(
      "wabe_checkout_last_submission",
      JSON.stringify({
        buyer: formState,
        cartItems: items,
        submittedAt: new Date().toISOString(),
        submittedVia: "next-checkout-request-ui"
      })
    );
    setStatus("Your order request has been submitted");
  };

  return (
    <div className="shop-checkoutformcontainer b2b-plan-shell b2b-checkout-shell">
      <div className="shop-layoutcontainer container">
        <div className="shop-layoutmain">
          <form className="shop-checkoutcustomerinfowrapper b2b-checkout-flow" id="checkout-request-form" onSubmit={handleSubmit}>
            <div className="shop-checkoutblockheader">
              <h2>Order Request</h2>
              <div>Buyer Flow</div>
            </div>
            <div className="shop-checkoutblockcontent">
              <div className="b2b-plan-grid b2b-checkout-grid">
                <article className="b2b-plan-card b2b-checkout-step">
                  <div className="b2b-plan-card-header">
                    <div>
                      <h6>01 / Buyer</h6>
                      <h3>Contact Details</h3>
                    </div>
                    <div className="b2b-checkout-step-number">01</div>
                  </div>
                  <p className="truncate">
                    Confirm the account contact. Logged-in buyer details are filled automatically
                    and can be edited before submission.
                  </p>
                  <label className="shop-checkoutlabel" htmlFor="site-ecom-email">
                    Email *
                  </label>
                  <input
                    className="shop-checkoutemailinput"
                    id="site-ecom-email"
                    name="email"
                    onChange={(event) => updateField("email", event.target.value)}
                    required
                    type="email"
                    value={formState.email}
                  />
                  <label className="shop-checkoutlabel" htmlFor="site-ecom-buyer-name">
                    Buyer Name *
                  </label>
                  <input
                    className="shop-checkoutshippingfullname"
                    id="site-ecom-buyer-name"
                    name="name"
                    onChange={(event) => updateField("name", event.target.value)}
                    required
                    type="text"
                    value={formState.name}
                  />
                </article>

                <article className="b2b-plan-card b2b-checkout-step">
                  <div className="b2b-plan-card-header">
                    <div>
                      <h6>02 / Delivery</h6>
                      <h3>Shipping Context</h3>
                    </div>
                    <div className="b2b-checkout-step-number">02</div>
                  </div>
                  <p className="truncate">
                    Saved delivery details are loaded when available. Update them here and they
                    will be saved for your next request.
                  </p>
                  <label className="shop-checkoutlabel" htmlFor="site-ecom-shipping-address">
                    Street Address *
                  </label>
                  <input
                    className="shop-checkoutshippingstreetaddress"
                    id="site-ecom-shipping-address"
                    name="address_line1"
                    onChange={(event) => updateField("address_line1", event.target.value)}
                    required
                    type="text"
                    value={formState.address_line1}
                  />
                  <div className="shop-checkoutrow">
                    <div className="shop-checkoutcolumn">
                      <label className="shop-checkoutlabel" htmlFor="site-ecom-shipping-city">
                        City *
                      </label>
                      <input
                        className="shop-checkoutshippingcity"
                        id="site-ecom-shipping-city"
                        name="address_city"
                        onChange={(event) => updateField("address_city", event.target.value)}
                        required
                        type="text"
                        value={formState.address_city}
                      />
                    </div>
                    <div className="shop-checkoutcolumn">
                      <label className="shop-checkoutlabel" htmlFor="site-ecom-shipping-zip">
                        Zip/Postal Code *
                      </label>
                      <input
                        className="shop-checkoutshippingzippostalcode"
                        id="site-ecom-shipping-zip"
                        name="address_zip"
                        onChange={(event) => updateField("address_zip", event.target.value)}
                        required
                        type="text"
                        value={formState.address_zip}
                      />
                    </div>
                  </div>
                  <label className="shop-checkoutlabel" htmlFor="site-ecom-shipping-country">
                    Country *
                  </label>
                  <select
                    className="shop-checkoutshippingcountryselector"
                    id="site-ecom-shipping-country"
                    name="address_country"
                    onChange={(event) => updateField("address_country", event.target.value)}
                    required
                    value={formState.address_country}
                  >
                    {countryOptions.map((country) => (
                      <option key={country.value || "empty"} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                </article>

                <article className="b2b-plan-card b2b-checkout-step">
                  <div className="b2b-plan-card-header">
                    <div>
                      <h6>03 / Review</h6>
                      <h3>Request Notes</h3>
                    </div>
                    <div className="b2b-checkout-step-number">03</div>
                  </div>
                  <p className="truncate">
                    Add quantity, packaging, deadline, or customization notes before submitting
                    this checkout request.
                  </p>
                  <label className="shop-checkoutlabel" htmlFor="buyer-note">
                    Buyer Note
                  </label>
                  <textarea
                    className="input-control b2b-plan-crm-note b2b-checkout-note"
                    id="buyer-note"
                    maxLength={1000}
                    name="buyer_note"
                    onChange={(event) => updateField("buyer_note", event.target.value)}
                    placeholder="Add order notes, target delivery date, packaging requirements, or custom requests"
                    rows={6}
                    spellCheck
                    value={formState.buyer_note}
                  />
                </article>
              </div>
            </div>
          </form>
        </div>

        <div className="shop-layoutsidebar b2b-plan-sidebar">
          <div className="b2b-checkout-order-column">
            <div className="shop-checkoutordersummarywrapper">
              <div className="shop-checkoutsummaryblockheader">
                <h2>Order Items</h2>
              </div>
              <fieldset className="shop-checkoutblockcontent b2b-checkout-order-items-panel">
                <div className="b2b-plan-selected-list b2b-checkout-items-list">
                  {checkoutItems.map((item) => (
                    <div className="b2b-plan-selected-item b2b-checkout-item" key={item.id}>
                      {item.image ? (
                        <img alt="" className="b2b-checkout-item-image" src={item.image} />
                      ) : null}
                      <div className="b2b-plan-selected-copy">
                        <strong>{item.name}</strong>
                        <div className="b2b-plan-selected-spec">{item.detail}</div>
                      </div>
                      {item.slug ? (
                        <div className="b2b-checkout-item-quantity-controls" aria-label={`Quantity for ${item.name}`}>
                          <button
                            aria-label={`Decrease ${item.name} quantity`}
                            className="b2b-checkout-quantity-button"
                            onClick={() => updateItemQuantity(item.slug || "", item.option, item.quantity - 1)}
                            type="button"
                          >
                            -
                          </button>
                          <span className="b2b-checkout-item-quantity" aria-live="polite">
                            {item.quantity}
                          </span>
                          <button
                            aria-label={`Increase ${item.name} quantity`}
                            className="b2b-checkout-quantity-button"
                            onClick={() => updateItemQuantity(item.slug || "", item.option, item.quantity + 1)}
                            type="button"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <div className="b2b-checkout-item-quantity">{item.quantity}</div>
                      )}
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="b2b-checkout-submit-column">
                <Link className="b2b-checkout-add-more" href="/shop">
                  Add More Items
                </Link>
                <button className="submit-button button-control b2b-plan-send b2b-checkout-submit" form="checkout-request-form" type="submit">
                  Submit Order Request
                </button>
                <div className="b2b-plan-crm-status b2b-checkout-status">{status}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
