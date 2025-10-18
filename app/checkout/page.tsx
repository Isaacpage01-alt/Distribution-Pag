"use client";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, total } = useCart();

  // Sécurité contre undefined/NaN
  const safeTotal = Number.isFinite(total) ? total : 0;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl font-semibold">Résumé du panier</h1>

      {items.length === 0 ? (
        <div className="text-gray-600">Votre panier est vide.</div>
      ) : (
        <>
          <ul className="space-y-3">
            {items.map((it) => {
              const line = Number(it.price) * Number(it.qty || 0);
              const safeLine = Number.isFinite(line) ? line : 0;
              return (
                <li key={it.id} className="flex items-center justify-between border rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={it.image}
                      alt={it.title}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                    <div>
                      <div className="font-medium">{it.title}</div>
                      <div className="text-sm text-gray-500">Qté : {it.qty}</div>
                    </div>
                  </div>
                  <div className="font-semibold">{safeLine.toFixed(2)} $</div>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center justify-between text-lg pt-4 border-t">
            <span>Total</span>
            <span className="font-semibold">{safeTotal.toFixed(2)} $</span>
          </div>

          <p className="text-sm text-gray-500">
            (Paiement à configurer plus tard — Stripe)
          </p>
        </>
      )}
    </div>
  );
}
