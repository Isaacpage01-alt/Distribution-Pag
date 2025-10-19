import Link from "next/link";
import { categories, featured, discounted } from "@/lib/products";
import ProductTile from "@/components/ProductTile";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Bannière en haut */}
      <section className="-mx-4 sm:-mx-6 lg:-mx-8">
        <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[380px]">
          <img
            src="/banniere.png"
            alt="Distribution Pagé"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </section>

      {/* Barre de recherche centrée (étroite) */}
      <section className="flex justify-center">
        <form action="/search" className="w-full max-w-md flex gap-2 px-4">
          <input
            name="q"
            placeholder="Rechercher un produit…"
            className="flex-1 h-10 rounded-full px-4 border border-black bg-white text-black text-sm"
          />
          <button className="h-10 rounded-full bg-cyan-400 px-4 text-black text-sm font-semibold hover:brightness-110">
            Chercher
          </button>
        </form>
      </section>

      {/* 6 catégories — taille modérée, bien séparées */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-white mb-4">Catégories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/products?cat=${c.slug}`}
              className="rounded-xl border border-black bg-white p-3 text-center hover:shadow transition"
            >
              <div className="font-medium text-black text-sm">{c.name}</div>
              <div className="text-xs text-gray-600 mt-1">{c.count} produits</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Populaires — cartes plus espacées */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-white">Populaires</h2>
          <Link href="/products" className="text-sm text-cyan-300 hover:underline">
            Voir tout
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
          {featured.slice(0, 8).map((p) => (
            <ProductTile key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* En rabais — mêmes espacements */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-white">En rabais</h2>
          <Link href="/products?promo=1" className="text-sm text-cyan-300 hover:underline">
            Voir les rabais
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
          {discounted.slice(0, 8).map((p) => (
            <ProductTile key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
