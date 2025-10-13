"use client";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product }: { product: { id: string|number; title: string; price: number; image?: string } }) {
  const { addItem } = useCart();

  return (
    <div className="border rounded-xl p-3 space-y-2">
      {product.image && (
        <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded-lg" />
      )}
      <div className="font-semibold">{product.title}</div>
      <div className="text-sm text-gray-600">{product.price.toFixed(2)} $</div>
      <button
        type="button"
        onClick={() => addItem({ id: product.id, title: product.title, price: product.price, image: product.image })}
        className="w-full rounded-lg px-3 py-2 bg-teal-500 text-white hover:bg-teal-600"
      >
        Ajouter
      </button>
    </div>
  );
}
