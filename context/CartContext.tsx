"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type CartItem = { id: string | number; title: string; price: number; image: string; qty: number };
type CartCtx = {
  items: CartItem[];
  total: number;
  add: (p: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: CartItem["id"]) => void;
  updateQty: (id: CartItem["id"], qty: number) => void;
  clear: () => void;
  checkout: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart.v1");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart.v1", JSON.stringify(items));
    } catch {}
  }, [items]);

  const add: CartCtx["add"] = (p, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === p.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
        return copy;
      }
      return [...prev, { ...p, qty }];
    });
  };

  const remove: CartCtx["remove"] = (id) => setItems((prev) => prev.filter((x) => x.id !== id));
  const updateQty: CartCtx["updateQty"] = (id, qty) =>
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x)));
  const clear = () => setItems([]);
  const checkout = () => alert("Commande confirmée ! (démo)");

  const total = useMemo(() => items.reduce((s, it) => s + Number(it.price) * Number(it.qty), 0), [items]);

  return (
    <Ctx.Provider value={{ items, total, add, remove, updateQty, clear, checkout }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
