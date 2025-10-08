'use client';

import { useCart } from '@/components/cart/CartContext';

export default function MiniCart() {
  const { items, total, remove } = useCart();

  return (
    <aside
      className="hidden md:block fixed left-4 z-40 w-60 rounded-2xl border bg-white/95 backdrop-blur p-3 shadow-sm"
      style={{ top: 'calc(20px + 18rem)' }}
    >
      <h3 className="font-semibold mb-2 text-center">🛒 Mon Panier</h3>

      <div className="space-y-2 max-h-80 overflow-auto">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">Aucun article</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-1"
            >
              <span className="text-sm">{item.titre}</span>
              <button
                onClick={() => remove(item.id)}
                className="text-xs text-red-500 hover:underline"
              >
                Retirer
              </button>
            </div>
          ))
        )}
      </div>

      <div className="border-t mt-2 pt-2 text-center">
        <p className="text-sm font-semibold">
          Total : {total().toFixed(2)} $
        </p>
      </div>
    </aside>
  );
}
