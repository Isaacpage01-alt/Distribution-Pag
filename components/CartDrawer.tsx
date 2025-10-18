"use client";
import { useCart } from "@/context/CartContext";
import Price from "@/components/Price";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, total, remove, updateQty, checkout } = useCart();

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      <div className={`absolute inset-0 bg-black/60 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-neutral-900 text-white shadow-xl transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h2 className="text-lg font-semibold">Votre panier</h2>
          <button onClick={onClose} className="text-sm text-cyan-400 hover:underline">Fermer</button>
        </div>

        <div className="p-4 space-y-3 max-h-[calc(100%-160px)] overflow-y-auto">
          {items.length === 0 && <div className="text-sm text-gray-300">Votre panier est vide.</div>}
          {items.map((it) => (
            <div key={it.id} className="flex gap-3 border border-white/10 rounded-xl p-2">
              <img src={it.image} alt={it.title} className="h-16 w-16 rounded-lg object-cover" />
              <div className="flex-1">
                <div className="font-medium line-clamp-1">{it.title}</div>
                <Price price={it.price} className="text-sm" />
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number" min={1} value={it.qty}
                    onChange={(e) => updateQty(it.id, parseInt(e.target.value || "1", 10))}
                    className="w-16 rounded-lg border border-white/20 bg-transparent px-2 py-1 text-sm"
                  />
                  <button onClick={() => remove(it.id)} className="text-xs text-red-400 hover:underline">Retirer</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Total</span>
            <span className="font-semibold">{(Number.isFinite(total) ? total : 0).toFixed(2)} $</span>
          </div>
          <button
            onClick={checkout}
            disabled={items.length === 0}
            className="w-full rounded-xl bg-cyan-400 px-5 py-3 text-black font-semibold hover:brightness-110 disabled:opacity-50"
          >
            Passer au paiement
          </button>
        </div>
      </aside>
    </div>
  );
}
