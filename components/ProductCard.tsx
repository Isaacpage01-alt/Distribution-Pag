'use client';

import { useCart } from '@/components/cart/CartContext';
import type { Product } from '@/lib/products';

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <div className="border rounded-xl p-4 flex flex-col gap-3 hover:shadow-sm bg-white">
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden grid place-items-center text-gray-500">
        {product.image
          ? <img src={product.image} alt={product.titre} className="w-full h-full object-cover" />
          : <span>Image</span>}
      </div>
      <div className="flex-1">
        <div className="text-xs text-gray-500 capitalize">{product.categorie}</div>
        <h3 className="font-semibold">{product.titre}</h3>
        <div className="flex gap-2 text-xs mt-1">
          {product.populaire && <span className="px-2 py-0.5 rounded-full bg-gray-900 text-white">Populaire</span>}
          {product.rabais && <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-700">Rabais</span>}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="font-semibold">{product.prix.toFixed(2)} $</div>
        <button onClick={() => add(product)} className="px-3 py-1.5 rounded-lg bg-black text-white text-sm">
          Ajouter
        </button>
      </div>
    </div>
  );
}
