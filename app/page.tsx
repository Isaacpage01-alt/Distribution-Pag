export const dynamic = "force-static";
export const runtime = "edge";
import Link from "next/link";
import { categories, featured, discounted } from "@/lib/products";
import ProductTile from "@/components/ProductTile";

export default function HomePage() {
  return (
    <div className="space-y-14">
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
        <form action="/search" className="w-full max-w-sm flex gap-2 px-4">
          <input
            name="q"
            placeholder="Rechercher un produit…"
            className="flex-1 h-9 rounded-full px-3 border border-black bg-white text-black text-sm"
          />
          <button className="h-9 rounded-full bg-cyan-400 px-3 text-black text-sm font-semibold hover:brightness-110">
            Chercher
          </button>
        </form>
      </section>

      {/* 6 catégories — plus séparées et plus petites */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-semibold text-white mb-3">Catégories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/products?cat=${c.slug}`}
              className="rounded-lg border border-black bg-white p-2 text-center hover:shadow transition max-w-[160px] mx-auto"
            >
              <div className="font-medium text-black text-[12px]">{c.name}</div>
              <div className="text-[11px] text-gray-600 mt-1">{c.count} produits</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Populaires — très espacées + cartes compactes */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-white">Populaires</h2>
          <Link href="/products" className="text-sm text-cyan-300 hover:underline">
            Voir tout
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-14">
          {featured.slice(0, 8).map((p) => (
            <ProductTile key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* En rabais — mêmes réglages */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-white">En rabais</h2>
          <Link href="/products?promo=1" className="text-sm text-cyan-300 hover:underline">
            Voir les rabais
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-14">
          {discounted.slice(0, 8).map((p) => (
            <ProductTile key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
