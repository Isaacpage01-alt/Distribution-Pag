"use client";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [form, setForm] = useState({ prenom: "", nom: "", adresse: "", ville: "", telephone: "" });

  const safeTotal = Number.isFinite(total) ? total : 0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.prenom || !form.nom || !form.adresse || !form.ville || !form.telephone) {
      alert("Merci de remplir tous les champs.");
      return;
    }
    alert(`Commande confirmée pour ${form.prenom} ${form.nom} — Total: ${safeTotal.toFixed(2)} $`);
    clear();
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 grid gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-white">Informations de paiement</h1>
        <form onSubmit={submit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className="rounded-lg px-3 py-2 bg-white/90 text-black" placeholder="Prénom" value={form.prenom} onChange={(e)=>setForm({...form, prenom: e.target.value})} />
            <input className="rounded-lg px-3 py-2 bg-white/90 text-black" placeholder="Nom" value={form.nom} onChange={(e)=>setForm({...form, nom: e.target.value})} />
          </div>
          <input className="rounded-lg px-3 py-2 bg-white/90 text-black w-full" placeholder="Adresse" value={form.adresse} onChange={(e)=>setForm({...form, adresse: e.target.value})} />
          <input className="rounded-lg px-3 py-2 bg-white/90 text-black w-full" placeholder="Ville" value={form.ville} onChange={(e)=>setForm({...form, ville: e.target.value})} />
          <input className="rounded-lg px-3 py-2 bg-white/90 text-black w-full" placeholder="Téléphone" value={form.telephone} onChange={(e)=>setForm({...form, telephone: e.target.value})} />
          <button className="w-full rounded-xl bg-cyan-400 px-5 py-3 text-black font-semibold hover:brightness-110">Confirmer ma commande</button>
        </form>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Résumé</h2>
        <div className="space-y-2">
          {items.map(it => (
            <div key={it.id} className="flex items-center justify-between rounded-lg border border-white/20 bg-neutral-900/70 text-white p-3">
              <div className="flex items-center gap-3">
                <img src={it.image} alt={it.title} className="h-12 w-12 rounded object-cover" />
                <div>
                  <div className="font-medium">{it.title}</div>
                  <div className="text-xs text-gray-300">Qté: {it.qty}</div>
                </div>
              </div>
              <div className="font-semibold">{(Number(it.price) * Number(it.qty)).toFixed(2)} $</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-lg text-white">
          <span>Total</span>
          <span className="font-semibold">{safeTotal.toFixed(2)} $</span>
        </div>
      </div>
    </div>
  );
}
