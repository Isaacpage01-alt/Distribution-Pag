"use client";

import "./globals.css";
import { useState, type ReactNode } from "react";
import { Suspense } from "react";
import { CartProvider } from "../context/CartContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-black antialiased">
        <CartProvider>
          {/* ===== BANNIÈRE PLEINE LARGEUR ===== */}
          <div className="relative w-full">
            {/* Remplace /logo.png par /banner.jpg ou /banner.png si tu uploades une image de bannière */}
            <img
              src="/logo.png"
              alt="Distribution Pagé"
              className="w-full h-32 md:h-48 lg:h-56 object-cover"
            />
          </div>

          {/* ===== BARRE D’ACTION SOUS LA BANNIÈRE ===== */}
          <div className="max-w-6xl mx-auto w-full px-4 py-3 flex items-center justify-end border-b">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le panier"
              aria-expanded={open}
              className="rounded-lg px-4 py-2 bg-teal-500 text-white hover:bg-teal-600"
            >
              🛒 Panier
            </button>
          </div>

          {/* ===== CONTENU ===== */}
          <main className="max-w-6xl mx-auto px-4 py-8">
            <Suspense fallback={null}>{children}</Suspense>
          </main>

          {/* ===== TIROIR PANIER ===== */}
          {open && (
            <div className="fixed inset-0 z-50">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setOpen(false)}
              />
              <div className="absolute right-0 top-0 h-full w-[320px] bg-white shadow-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Mon panier</h2>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-3 py-1 rounded-md bg-teal-500 text-white"
                  >
                    Fermer
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  Aucun produit ajouté pour l’instant.
                </p>
              </div>
            </div>
          )}
        </CartProvider>
      </body>
    </html>
  );
}
