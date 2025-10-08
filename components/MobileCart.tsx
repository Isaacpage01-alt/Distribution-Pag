'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/cart/CartContext';

export default function MobileCart() {
  const { items, total, remove, clear, count } = useCart();
  const [open, setOpen] = useState(false);

  const qty = count();

  return (
    <>
      {/* Bouton flottant mobile avec badge */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed bottom-4 right-4 z-50 rounded-full shadow-lg bg-gray-800 text-white px-4 py-3 active:scale-95 transition"
        aria-label="Ouvrir le panier"
      >
        <span className="text-lg">🛒</span>
        <span className="ml-1 text-sm">( {qty} )</span>

        {/* Badge rond en haut à droite */}
        <span
          className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-teal-500 text-white text-xs grid place-items-center"
          aria-hidden
        >
          {qty}
        </span>
      </button>

      {/* Overlay + tiroir latéral */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* fond assombri */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          {/* panneau */}
          <aside
            className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-xl p-4 flex flex-col animate-[slideIn_.18s_ease-out]"
            role="dialog"
            aria-modal="true"
            aria-label="Panier"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Mon panier</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-2xl leading-none px-2"
                aria-label="Fermer"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 overflow-auto flex-1 pr-1">
              {items.length === 0 ? (
                <p className="text-sm text-gray-500">Votre panier est vide.</p>
              ) : (
                items.map((i) => (
                  <div key={i.id} className="flex gap-2 items-center border-b pb-2">
                    <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden grid place-items-center">
                      {i.image ? (
                        <img
                          src={i.image}
                          alt={i.titre}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[10px] text-gray-500">
                          Aucune image
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {i.titre}
                      </div>
                      <div className="text-xs text-gray-600">
                        × {i.qty} — {(i.prix * i.qty).toFixed(2)} $
                      </div>
                    </div>
                    <button
                      onClick={() => remove(i.id)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Retirer
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="border-t pt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span>Total</span>
                <span className="font-semibold">{total().toFixed(2)} $</span>
              </div>
              <div className="flex gap-2">
                <Link
                  href="/checkout"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center px-4 py-2 rounded-lg bg-black text-white"
                >
                  Commander
                </Link>
                <button onClick={clear} className="px-4 py-2 rounded-lg border">
                  Vider
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* petite animation utilitaire */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(16px);
            opacity: 0.8;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
