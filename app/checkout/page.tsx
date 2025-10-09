'use client'
export const dynamic = 'force-dynamic'

import { useCart } from '@/components/cart/CartContext'

export default function CheckoutPage() {
  // On lit le panier mais on ne déclenche aucune fonction pendant le rendu
  const { items, total } = useCart()

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Paiement</h1>

      <section className="bg-white rounded-xl shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Votre commande</h2>
        {items.length === 0 ? (
          <p className="text-gray-500">Votre panier est vide.</p>
        ) : (
          <ul className="space-y-2">
            {items.map((it) => (
              <li key={it.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {it.image ? (
                    // image simple <img> pour éviter config Next/Image
                    <img src={it.image} alt={it.titre} className="w-12 h-12 object-cover rounded" />
                  ) : null}
                  <span className="font-medium">{it.titre}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {it.qty} × {it.prix.toFixed(2)} $ CAD
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 text-right font-semibold">
          Total: {total.toFixed(2)} $ CAD
        </div>
      </section>

      <section className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3">Adresse de livraison</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input className="border rounded p-2" placeholder="Prénom" />
          <input className="border rounded p-2" placeholder="Nom" />
          <input className="border rounded p-2 md:col-span-2" placeholder="Adresse" />
          <input className="border rounded p-2" placeholder="Ville" />
          <input className="border rounded p-2" placeholder="Code postal" />
          <input className="border rounded p-2 md:col-span-2" placeholder="Téléphone" />
          <input className="border rounded p-2 md:col-span-2" placeholder="Courriel" />
          <button
            type="button"
            className="mt-2 md:col-span-2 bg-black text-white rounded p-3 disabled:opacity-50"
            disabled={items.length === 0}
            onClick={() => alert('Mode démo: paiement non activé')}
          >
            Passer la commande
          </button>
        </form>
      </section>
    </div>
  )
}
