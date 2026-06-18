"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import type { AddCartItemInput, CartItem } from "@/lib/cart/types";

type CartContextValue = {
  items: CartItem[];
  isCartOpen: boolean;
  itemCount: number;
  addItem: (item: AddCartItemInput) => void;
  removeItem: (slug: string, option?: string) => void;
  updateItemQuantity: (slug: string, option: string | undefined, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const CART_KEY = "wabe_cart";

function readStoredCart(): CartItem[] {
  try {
    const value = window.localStorage.getItem(CART_KEY);
    const storedItems = value ? (JSON.parse(value) as Array<Partial<CartItem> & { id?: string; options?: Array<{ label: string; value: string }> }>) : [];
    return storedItems
      .filter((item) => item.name && item.image)
      .map((item) => ({
        details:
          item.details ||
          item.options
            ?.filter((option) => option.value)
            .map((option) => ({ label: option.label, value: option.value })),
        image: item.image || "",
        name: item.name || "Selected item",
        option: item.option,
        quantity: Math.max(1, Number(item.quantity) || 1),
        slug: item.slug || item.id || item.name || "selected-item"
      }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hasLoadedStoredCart, setHasLoadedStoredCart] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
    setHasLoadedStoredCart(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedStoredCart) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [hasLoadedStoredCart, items]);

  useEffect(() => {
    document.body.classList.toggle("cart-open", isCartOpen);

    return () => document.body.classList.remove("cart-open");
  }, [isCartOpen]);

  const addItem = useCallback((item: AddCartItemInput) => {
    setItems((currentItems) => {
      const existing = currentItems.find(
        (currentItem) => currentItem.slug === item.slug && currentItem.option === item.option
      );

      if (!existing) {
        return [
          ...currentItems,
          {
            ...item,
            quantity: item.quantity ?? 1
          }
        ];
      }

      return currentItems.map((currentItem) =>
        currentItem.slug === item.slug && currentItem.option === item.option
          ? { ...currentItem, quantity: currentItem.quantity + (item.quantity ?? 1) }
          : currentItem
      );
    });
    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback((slug: string, option?: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.slug !== slug || item.option !== option)
    );
  }, []);

  const updateItemQuantity = useCallback((slug: string, option: string | undefined, quantity: number) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.slug === slug && item.option === option
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isCartOpen,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      addItem,
      removeItem,
      updateItemQuantity,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      clearCart: () => setItems([])
    }),
    [addItem, isCartOpen, items, removeItem, updateItemQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
