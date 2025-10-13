"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string | number;
  title: string;
  price: number;
  image?: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  addItem: (p: Omit<CartItem,"qty">, qty?: number) => void;
  removeItem: (id: CartItem["id"]) => void;
  setQty: (id: CartItem["id"], qty: number) => void;
  clear: () => void;
  totalQty: number;
  totalPrice: number;
};

const CartContext = createContext<CartCtx | null>(null);
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("CartContext indisponible");
  return ctx;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Charge depuis localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart:v1");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  // Sauvegarde dans localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart:v1", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem: CartCtx["addItem"] = (p, qty = 1) => {
    setItems((curr) => {
      const i = curr.findIndex((it) => it.id === p.id);
      if (i >= 0) {
        const next = [...curr];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...curr, { ...p, qty }];
    });
  };

  const removeItem: CartCtx["removeItem"] = (id) =>
    setItems((curr) => curr.filter((it) => it.id !== id));

  const setQty: CartCtx["setQty"] = (id, qty) =>
    setItems((curr) =>
      curr.map((it) => (it.id === id ? { ...it, qty: Math.max(1, qty) } : it))
    );

  const clear = () => setItems([]);

  const { totalQty, totalPrice } = useMemo(() => {
    const totalQty = items.reduce((s, it) => s + it.qty, 0);
    const totalPrice = items.reduce((s, it) => s + it.qty * it.price, 0);
    return { totalQty, totalPrice };
  }, [items]);

  const value: CartCtx = { items, addItem, removeItem, setQty, clear, totalQty, totalPrice };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
