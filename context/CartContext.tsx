"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Item = { id: string; title: string; price: number; image?: string; qty: number };

type CartCtx = {
  items: Item[];
  addItem: (p: Omit<Item, "qty">, qty?: number) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  totalQty: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
} | null;

const CartContext = createContext<CartCtx>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Charger / Sauvegarder localStorage (côté client)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart_v1");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("cart_v1", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (product: Omit<Item, "qty">, qty = 1) => {
    setItems(prev => {
      const i = prev.findIndex(p => p.id === product.id);
      if (i !== -1) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
        return copy;
      }
      return [...prev, { ...product, qty }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => setItems(prev => prev.filter(p => p.id !== id));
  const setQty = (id: string, qty: number) =>
    setItems(prev => prev.map(p => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p)));
  const clear = () => setItems([]);

  const totalQty = useMemo(() => items.reduce((a, b) => a + b.qty, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((a, b) => a + b.qty * (b.price || 0), 0), [items]);

  const value = { items, addItem, removeItem, setQty, clear, totalQty, totalPrice, isOpen, setIsOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ✅ Fallback SANS throw pour éviter l'erreur au prérendu
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    return {
      items: [],
      addItem: () => {},
      removeItem: () => {},
      setQty: () => {},
      clear: () => {},
      totalQty: 0,
      totalPrice: 0,
      isOpen: false,
      setIsOpen: () => {},
    };
  }
  return ctx;
}
