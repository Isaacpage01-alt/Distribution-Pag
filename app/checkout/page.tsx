"use client";
export const dynamic = "force-dynamic";
import { useCart } from "../../context/CartContext";

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  return (
    <div style={{padding:20,fontFamily:"sans-serif"}}>
      <h1>Paiement</h1>
      {items.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul>
            {items.map((p) => (
              <li key={p.id}>{p.title} × {p.qty} — {(p.price * p.qty).toFixed(2)} $</li>
            ))}
          </ul>
          <div>Total: {totalPrice.toFixed(2)} $</div>
        </>
      )}
    </div>
  );
}
