'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Product } from '@/lib/products';

export type CartItem = { id: string; titre: string; prix: number; qty: number; image?: string };

type CartCtx = {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('dp_cart');
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('dp_cart', JSON.stringify(items));
    } catch {}
  }, [items]);

  const api = useMemo<CartCtx>(() => ({
    items,
    add: (p) =>
      setItems((prev) => {
        const i = prev.findIndex((x) => x.id === p.id);
        if (i >= 0) {
          const copy = [...prev];
          copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
          return copy;
        }
        return [...prev, { id: p.id, titre: p.titre, prix: p.prix, qty: 1, image: p.image }];
      }),
    remove: (id) => setItems((prev) => prev.filter((x) => x.id !== id)),
    clear: () => setItems([]),
    total: () => items.reduce((a, b) => a + b.prix * b.qty, 0),
    count: () => items.reduce((a, b) => a + b.qty, 0),
  }), [items]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('CartContext indisponible');
  return ctx;
}
