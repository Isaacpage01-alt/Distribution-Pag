"use client";
import { useCart } from "../../context/CartContext";
export default function CheckoutBody() {
  const { items, totalPrice } = useCart();
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Paiement</h1>
      {items.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {items.map((p) => (
              <li key={p.id} className="flex items-center justify-between border-b py-2">
                <span>{p.title} × {p.qty}</span>
                <span>{(p.price * p.qty).toFixed(2)} $</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-semibold text-lg pt-4">
            <span>Total</span>
            <span>{totalPrice.toFixed(2)} $</span>
          </div>
        </>
      )}
    </div>
  );
}
