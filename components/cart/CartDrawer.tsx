"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

export function CartDrawer() {
  const { closeCart, isCartOpen, items, removeItem, updateItemQuantity } = useCart();
  const hasItems = items.length > 0;

  return (
    <div
      aria-hidden={!isCartOpen}
      className="shop-cartcontainerwrapper shop-cartcontainerwrapper--cartType-rightSidebar cart-container"
      onClick={closeCart}
    >
      <div 
        aria-label="Your bag" 
        aria-modal="true" 
        className="shop-cartcontainer cart-content" 
        role="dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shop-cartheader cart-header">
          <h6 className="shop-cartheading">YOUR BAG</h6>
          <button
            aria-label="Close cart"
            className="shop-cartcloselink close inline-block header-action-button"
            onClick={closeCart}
            type="button"
          >
            <img
              alt=""
              className="close-image"
              loading="lazy"
              src="/media/6a2680f03f3745a0ac723d17_Close_icon.svg"
            />
          </button>
        </div>

        <div className="shop-cartformwrapper">
          {hasItems ? (
            <div className="shop-cartform">
              <div className="shop-cartlist list">
                {items.map((item) => (
                  <div className="shop-cartitem cart-item" key={`${item.slug}-${item.option ?? "default"}`}>
                    <div className="product-image-container">
                      <img alt={item.name} className="shop-cartitemimage image" src={item.image} />
                    </div>
                    <div className="shop-cartiteminfo cart-text">
                      <div className="block">
                        <div className="shop-cartproductname">{item.name}</div>
                        <ul className="shop-cartoptionlist cart-item-details" aria-label={`${item.name} details`}>
                          {item.option ? (
                            <li>
                              <span>Variant</span>
                              <span>: </span>
                              <span>{item.option}</span>
                            </li>
                          ) : null}
                          {item.details?.map((detail) => (
                            <li key={`${item.slug}-${detail.label}`}>
                              <span>{detail.label}</span>
                              <span>: </span>
                              <span>{detail.value}</span>
                            </li>
                          ))}
                        </ul>
                        <button
                          className="header-action-button inline-block"
                          onClick={() => removeItem(item.slug, item.option)}
                          type="button"
                        >
                          <div>Remove</div>
                        </button>
                      </div>
                      <div className="cart-quantity-controls" aria-label={`Quantity for ${item.name}`}>
                        <button
                          aria-label={`Decrease ${item.name} quantity`}
                          className="cart-quantity-button"
                          onClick={() => updateItemQuantity(item.slug, item.option, item.quantity - 1)}
                          type="button"
                        >
                          -
                        </button>
                        <span className="cart-quantity-value" aria-live="polite">
                          {item.quantity}
                        </span>
                        <button
                          aria-label={`Increase ${item.name} quantity`}
                          className="cart-quantity-button"
                          onClick={() => updateItemQuantity(item.slug, item.option, item.quantity + 1)}
                          type="button"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="shop-cartfooter cart-footer">
                <div className="cart-checkout-column-box">
                  <Link className="shop-checkoutbutton" href="/checkout" onClick={closeCart}>
                    Continue to Checkout
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="shop-cartemptystate">
              <div>No items found.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
