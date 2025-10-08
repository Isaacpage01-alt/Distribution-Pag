// notepad .\app\checkout\page.tsx
'use client'
import { useCart } from '@/components/cart/CartContext'
import { useState } from 'react'

export default function CheckoutPage() {
  const { items, total, clear } = useCart()
  const [done, setDone] = useState(false)

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // ici on connecterait Stripe + backend; pour l’instant on simule
    setDone(true)
    clear()
  }

  if (done) {
    return (
      <div className="container mx-auto px-4 py-10 space-y-4">
        <h1 className="text-2xl font-bold">Merci pour votre commande!</h1>
        <p>Nous vous contacterons pour la livraison. (Démo — paiement à venir.)</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      <form onSubmit={submit} className="space-y-3">
        <h2 className="text-xl font-bold">Informations de livraison</h2>
        <input required placeholder="Prénom" className="border rounded-lg px-3 py-2 w-full" />
        <input required placeholder="Nom" className="border rounded-lg px-3 py-2 w-full" />
        <input required type="email" placeholder="Adresse courriel" className="border rounded-lg px-3 py-2 w-full" />
        <input required placeholder="Téléphone" className="border rounded-lg px-3 py-2 w-full" />
        <input required placeholder="Adresse" className="border rounded-lg px-3 py-2 w-full" />
        <div className="grid grid-cols-2 gap-3">
          <input required placeholder="Ville" className="border rounded-lg px-3 py-2 w-full" />
          <input required placeholder="Code postal" className="border rounded-lg px-3 py-2 w-full" />
        </div>
        <button className="mt-2 px-4 py-2 rounded-xl bg-teal-500 text-white">Envoyer la commande</button>
      </form>

      <div className="space-y-3">
        <h2 className="text-xl font-bold">Votre panier</h2>
        <div className="space-y-2">
          {items.map(i => (
            <div key={i.id} className="flex justify-between border-b py-2">
              <span>{i.titre} × {i.qty}</span>
              <span>{(i.prix * i.qty).toFixed(2)} $</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span><span>{total().toFixed(2)} $</span>
        </div>
        <p className="text-xs text-gray-500">Taxes et frais réels à configurer plus tard.</p>
      </div>
    </div>
  )
}
