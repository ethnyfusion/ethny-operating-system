"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, WineProduct } from "@/types";

interface CartContextValue {
  items: CartItem[];
  bottleCount: number;
  subtotalCents: number;
  addWine: (wine: WineProduct, quantity?: number, pairingNote?: string, serviceLabel?: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "vinaria-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) setItems(JSON.parse(saved) as CartItem[]);
      } catch {
        window.localStorage.removeItem(storageKey);
      }
      setHydrated(true);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [hydrated, items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      bottleCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotalCents: items.reduce(
        (sum, item) => sum + item.quantity * item.unitPriceCents,
        0,
      ),
      addWine: (wine, quantity = 1, pairingNote, serviceLabel) =>
        setItems((current) => {
          const existing = current.find((item) => item.productId === wine.id);
          if (existing) {
            return current.map((item) =>
              item.productId === wine.id
                ? {
                    ...item,
                    quantity: item.quantity + quantity,
                    pairingNote: pairingNote ?? item.pairingNote,
                    serviceLabel: serviceLabel ?? item.serviceLabel,
                    storytelling: wine.storytelling ?? item.storytelling,
                  }
                : item,
            );
          }
          return [
            ...current,
            {
              productId: wine.id,
              name: wine.name,
              producer: wine.producer,
              unitPriceCents: wine.priceCents,
              quantity,
              pairingNote,
              serviceLabel,
              storytelling: wine.storytelling,
            },
          ];
        }),
      updateQuantity: (productId, quantity) =>
        setItems((current) =>
          quantity <= 0
            ? current.filter((item) => item.productId !== productId)
            : current.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
        ),
      removeItem: (productId) =>
        setItems((current) => current.filter((item) => item.productId !== productId)),
      clearCart: () => setItems([]),
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart doit être utilisé dans CartProvider.");
  return context;
}
