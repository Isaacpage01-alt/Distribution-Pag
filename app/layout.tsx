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
          {/* Remplace /banner.png par le fichier voulu dans /public (par ex. /logo.png) */}
          <div className="relative w-full">
            <img
              src="/logo.png"           // ← mets /banner.png si tu as une image de bannière séparée
              alt="Distribution Pagé"
              className="w-full h-32 md:h-48 lg:h-56 object-cover"
            />
          </div>

          {/* ===== BARRE D’ACTION SOUS LA BANNIÈRE ===== */}
          <div
            className="max-w-6xl mx-auto w-full px-4 py-3 flex items-center justify-end border-b"
            style={{ borderColor: "#18CFE6" }} // même couleur que la ligne turquoise
          >
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le panier"
              aria-expanded={open}
              className="rounded-lg px-4 py-2 text-white hover:opacity-90"
              style={{ backgroundColor: "#18CFE6" }} // bouton = même couleur
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
              {/* fond sombre */}
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setOpen(false)}
              />
              {/* panneau */}
              <div className="absolute right-0 top-0 h-full w-[320px] bg-white shadow-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Mon panier</h2>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-3 py-1 rounded-md text-white"
                    style={{ backgroundColor: "#18CFE6" }}
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

          {/* Sécurité si d’anciens styles globaux trainent */}
          <style>{`header,.top-banner,.site-header{background:#fff!important}`}</style>
        </CartProvider>
      </body>
    </html>
  );
}
