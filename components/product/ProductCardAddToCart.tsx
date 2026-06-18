"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import type { Product } from "@/data/products";

export function ProductCardAddToCart({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [isHiding, setIsHiding] = useState(false);

  return (
    <button
      className="product-card-add-to-cart"
      style={isHiding ? { transform: "translateY(100%)" } : undefined}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Step 1: Hide the button completely
        setIsHiding(true);
        
        // Step 2: Wait for button transition to finish before opening cart
        setTimeout(() => {
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
            slug: product.slug
          });
          openCart();
          
          // Reset hidden state after a delay in case the user re-hovers later
          setTimeout(() => setIsHiding(false), 300);
        }, 300);
      }}
    >
      <span>Add to cart</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    </button>
  );
}
