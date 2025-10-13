"use client";

import "./globals.css";
import { useState, type ReactNode } from "react";
import { Suspense } from "react";
import { CartProvider, useCart } from "../context/CartContext";

/** Tiroir Panier */
function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, totalPrice, setQty, removeItem, clear } = useCart();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-[360px] bg-white shadow-xl p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Mon panier</h2>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded text-white"
            style={{ backgroundColor: "#18CFE6" }}
          >
            Fermer
          </button>
        </div>

        <div className="flex-1 overflow-auto space-y-3">
          {items.length === 0 && <p className="text-sm text-gray-600">Aucun produit ajouté.</p>}

          {items.map((it) => (
            <div key={it.id} className="flex gap-3 border-b pb-3">
              {it.image && (
                <img src={it.image} alt={it.title} className="w-16 h-16 object-cover rounded" />
              )}
              <div className="flex-1">
                <div className="font-medium">{it.title}</div>
                <div className="text-sm text-gray-500">
                  {(it.price * it.qty).toFixed(2)} $
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <button className="px-2 border rounded" onClick={() => setQty(it.id, it.qty - 1)}>-</button>
                  <span>{it.qty}</span>
                  <button className="px-2 border rounded" onClick={() => setQty(it.id, it.qty + 1)}>+</button>
                  <button className="ml-auto text-red-600 text-sm" onClick={() => removeItem(it.id)}>
                    Retirer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{totalPrice.toFixed(2)} $</span>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="flex-1 border rounded px-3 py-2" onClick={clear}>
              Vider
            </button>
            <a
              href="/checkout"
              className="flex-1 text-center rounded px-3 py-2 text-white"
              style={{ backgroundColor: "#18CFE6" }}
            >
              Payer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-black antialiased">
        <CartProvider>
          {/* BANNIÈRE */}
          <div className="relative w-full">
            <img
              src="/logo.png"
              alt="Distribution Pagé"
              className="w-full h-32 md:h-48 lg:h-56 object-cover"
            />
          </div>

          {/* BARRE SOUS BANNIÈRE + BOUTON PANIER */}
          <div
            className="max-w-6xl mx-auto w-full px-4 py-3 flex items-center justify-end border-b"
            style={{ borderColor: "#18CFE6" }}
          >
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-lg px-4 py-2 text-white hover:opacity-90"
              style={{ backgroundColor: "#18CFE6" }}
            >
              🛒 Panier
            </button>
          </div>

          {/* CONTENU */}
          <main className="max-w-6xl mx-auto px-4 py-8">
            <Suspense fallback={null}>{children}</Suspense>
          </main>

          {/* TIROIR */}
          <CartDrawer open={open} onClose={() => setOpen(false)} />
        </CartProvider>
      </body>
    </html>
  );
}
