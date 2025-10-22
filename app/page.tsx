export const dynamic = "force-static";

import Link from "next/link";
import ProductTile from "@/components/ProductTile";
import { featured, discounted } from "@/lib/products";

export default function HomePage() {
  // Catégories figées (libellés avec accents, slugs sans accents)
  const CAT_PILLS = [
    { label: "quincaillerie", slug: "quincaillerie" },
    { label: "outils", slug: "outils" },
    { label: "plomberie", slug: "plomberie" },
    { label: "électricité", slug: "electricite" },
    { label: "intérieur", slug: "interieur" },
    { label: "extérieur", slug: "exterieur" },
  ];

  return (
    <div className="space-y-12">
      {/* Bannière */}
      <section className="-mx-4 sm:-mx-6 lg:-mx-8">
        <div className="relative w-full h-[220px] sm:h-[280px] lg:h-[320px]">
          <img
            src="/banniere.png"
            alt="Distribution Pagé"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </section>

      {/* Barre de recherche centrée, étroite */}
      <section className="flex justify-center">
        <form action="/search" className="w-full max-w-[420px] flex gap-2 px-4">
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

      {/* Catégories en pills - 2 rangées x 3, bordure noire épaisse */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-base sm:text-lg font-semibold text-white mb-4">Catégories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-10 place-items-center">
          {CAT_PILLS.map((c) => (
            <Link
              key={c.slug}
              href={`/products?cat=${c.slug}`}
              className="
                inline-flex items-center justify-center
                rounded-full border-[3px] md:border-[4px] border-black
                bg-white text-black font-medium
                px-8 md:px-10 py-2.5 md:py-3
                min-w-[240px] md:min-w-[260px]
                shadow-[0_2px_0_0_#000]
                hover:translate-y-[-1px] active:translate-y-0 transition-transform
              "
            >
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Populaires — cartes compactes + bon spacing */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base sm:text-lg font-semibold text-white">Populaires</h2>
          <Link href="/products" className="text-sm text-cyan-300 hover:underline">
            Voir tout
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-8 sm:gap-10 xl:gap-12">
          {featured.slice(0, 10).map((p) => (
            <ProductTile key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* En rabais — mêmes réglages */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base sm:text-lg font-semibold text-white">En rabais</h2>
          <Link href="/products?promo=1" className="text-sm text-cyan-300 hover:underline">
            Voir les rabais
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-8 sm:gap-10 xl:gap-12">
          {discounted.slice(0, 10).map((p) => (
            <ProductTile key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
