import Link from "next/link";
import { categories } from "@/lib/products";

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Bannière (ton logo dessus est déjà bon) */}
      <section className="-mx-4 sm:-mx-6 lg:-mx-8">
        <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[380px]">
          <img src="/banniere.png" alt="Distribution Pagé" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </section>

      {/* Barre de recherche centrée */}
      <section className="flex justify-center">
        <form action="/search" className="w-full max-w-xl flex gap-2 px-4">
          <input
            name="q"
            placeholder="Rechercher un produit…"
            className="flex-1 h-11 rounded-full px-4 border border-white/20 bg-white/90 text-black"
          />
          <button className="rounded-full bg-cyan-400 text-black px-5 font-semibold">Chercher</button>
        </form>
      </section>

      {/* 6 catégories sous la bannière */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-white text-xl font-semibold mb-3">Catégories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((c) => (
            <Link key={c.slug} href={`/products?cat=${c.slug}`} className="rounded-xl border border-white/20 bg-neutral-900/70 text-white p-4 text-center hover:shadow">
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-gray-300">{c.count} produits</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
