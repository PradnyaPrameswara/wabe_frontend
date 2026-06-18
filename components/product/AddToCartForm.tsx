"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import type { Product } from "@/data/products";

const sizeOptions = ["Small", "Medium", "Large"];

export function AddToCartForm({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState("");

  return (
    <div className="add-to-cart">
      <form
        className="shop-addtocartform default-state"
        data-loading-text="Adding to cart..."
        onSubmit={(event) => {
          event.preventDefault();
          addItem({
            details: [
              { label: "Collection", value: product.collection },
              { label: "Category", value: product.categoryName },
              { label: "Material", value: "Ceramic" },
              { label: "Size", value: product.size },
              { label: "Color", value: product.color }
            ],
            image: product.image.src,
            name: product.name,
            option: size || undefined,
            slug: product.slug
          });
        }}
      >
        <div className="options" data-preselect-default-variant="false" role="group">
          <div className="option" role="group">
            <select
              className="select-field select-control"
              onChange={(event) => setSize(event.target.value)}
              required
              value={size}
            >
              <option value="">Select Size</option>
              {sizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <label className="label-hidden">Quantity</label>
        <input
          aria-busy="false"
          aria-haspopup="dialog"
          className="shop-addtocartbutton add-to-cart-button"
          data-loading-text="Adding to cart..."
          type="submit"
          value="Add to Cart"
        />
      </form>
      <div className="shop-addtocartoutofstock" style={{ display: "none" }} tabIndex={0}>
        <div>This product is out of stock.</div>
      </div>
      <div aria-live="assertive" className="shop-addtocarterror" style={{ display: "none" }}>
        <div>Product is not available in this quantity.</div>
      </div>
    </div>
  );
}
