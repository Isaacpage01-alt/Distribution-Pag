"use client";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";

export default function ProductTile({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <div className="w-full max-w-[220px] mx-auto rounded-xl border border-black bg-white/95 p-3 shadow-sm hover:shadow-md transition">
      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
        <img src={product.image} alt={product.title} className="w-full h-full object-contain" loading="lazy" />
      </div>
      <div className="mt-3 space-y-1">
        <div className="text-[12px] text-gray-600">{product.category}</div>
        <div className="text-sm font-medium text-black truncate" title={product.title}>{product.title}</div>
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-black">{product.price.toFixed(2)} $</span>
          {product.compareAt && product.compareAt > product.price ? (
            <span className="text-[11px] text-gray-400 line-through">{product.compareAt.toFixed(2)} $</span>
          ) : null}
        </div>
        <button
          onClick={() => add({ id: product.id, title: product.title, price: product.price, image: product.image }, 1)}
          className="mt-2 h-8 w-full rounded-lg bg-cyan-400 text-black text-[12px] font-semibold hover:brightness-110"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}
