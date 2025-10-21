"use client";

import { createContext, useContext, useMemo, useState, useEffect } from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  total: number;
  add: (p: Omit<CartItem, "qty">, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  checkout: () => Promise<void>;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart:v1");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("cart:v1", JSON.stringify(items));
    } catch {}
  }, [items]);

  const total = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);

  const add: CartCtx["add"] = (p, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === p.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...prev, { ...p, qty }];
    });
  };
  const updateQty: CartCtx["updateQty"] = (id, qty) =>
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty } : x)));
  const remove: CartCtx["remove"] = (id) => setItems((prev) => prev.filter((x) => x.id !== id));
  const clear: CartCtx["clear"] = () => setItems([]);

  const checkout = async () => Promise.resolve();

  const value = useMemo<CartCtx>(
    () => ({ items, total, add, updateQty, remove, clear, checkout }),
    [items, total]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

// ✅ SSR-safe: ne casse pas au build si pas de Provider pendant le prerender
export const useCart = () => {
  const ctx = useContext(Ctx);
  if (!ctx) {
    if (typeof window === "undefined") {
      return {
        items: [],
        total: 0,
        add: () => {},
        updateQty: () => {},
        remove: () => {},
        clear: () => {},
        checkout: async () => {},
      } as CartCtx;
    }
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
};
