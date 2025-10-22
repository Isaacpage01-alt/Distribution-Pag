"use client";
import { useCart } from "@/context/CartContext";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, total, remove, updateQty, checkout } = useCart();

  if (!open) return null;

  return (
    <>
      {/* overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* panel */}
      <aside
        className="
          fixed right-0 top-0 z-50 h-full w-[90%] sm:w-[420px]
          bg-white text-black shadow-xl
          pt-6              /* <<< tire le contenu un peu plus bas */
          overflow-y-auto
        "
        role="dialog"
        aria-label="Tiroir panier"
      >
        <div className="px-4 sm:px-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Votre panier</h2>
            <button
              onClick={onClose}
              className="rounded-md border px-2 py-1 text-sm hover:bg-gray-100"
            >
              Fermer
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {items.length === 0 ? (
              <div className="text-sm text-gray-600">Votre panier est vide.</div>
            ) : (
              items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={it.image}
                      alt={it.title}
                      className="h-14 w-14 rounded object-cover"
                    />
                    <div>
                      <div className="font-medium">{it.title}</div>
                      <div className="text-xs text-gray-600">
                        Qté:{" "}
                        <input
                          type="number"
                          min={1}
                          value={it.qty}
                          onChange={(e) =>
                            updateQty(it.id, Number(e.target.value || 1))
                          }
                          className="w-14 border rounded px-1 py-0.5 ml-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold">
                      {(Number(it.price) * Number(it.qty)).toFixed(2)} $
                    </div>
                    <button
                      onClick={() => remove(it.id)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-5 border-t pt-4 flex items-center justify-between">
            <div className="text-lg font-semibold">Total</div>
            <div className="text-lg font-semibold">
              {Number(total || 0).toFixed(2)} $
            </div>
          </div>

          <button
            onClick={() => {
              checkout();
              onClose();
            }}
            className="mt-4 w-full rounded-xl bg-cyan-400 px-5 py-3 text-black font-semibold hover:brightness-110"
          >
            Passer au paiement
          </button>
        </div>
      </aside>
    </>
  );
}
