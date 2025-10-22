export const dynamic = "force-static";

import Link from "next/link";
import ProductTile from "@/components/ProductTile";
import { featured, discounted } from "@/lib/products";

export default function HomePage() {
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
      {/* ====== MARQUEUR VISUEL v3 ====== */}
      <div className="text-center text-xs text-white/70">Home v3</div>

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

      {/* Catégories — 3 en haut / 3 en bas, pills NOIRS, ÉNORME espace vertical, AUCUN BLEU */}
      <section className="mx-auto max-w-[1100px] px-4 pt-12 pb-20">
        <h2 className="text-lg font-semibold text-white mb-10">Catégories</h2>

        <div className="grid grid-cols-3 gap-x-10 gap-y-28 place-items-center">
          {CAT_PILLS.map((c) => (
            <Link
              key={c.slug}
              href={`/products?cat=${c.slug}`}
              // supprime le tap-highlight bleu mobile
              style={{ WebkitTapHighlightColor: "transparent" }}
              className="
                inline-flex items-center justify-center select-none
                rounded-full border-[6px] border-black
                bg-black !text-white font-semibold
                px-12 py-5 text-xl min-w-[330px]
                shadow-[0_2px_0_0_#000]
                transition-transform hover:-translate-y-0.5 active:translate-y-0

                /* force aucune couleur bleue / violette */
                no-underline decoration-transparent
                hover:!text-white visited:!text-white active:!text-white focus:!text-white
                hover:!bg-black active:!bg-black focus:!bg-black

                /* supprime tout contour / ring navigateur */
                outline-none focus:outline-none focus-visible:outline-none
                ring-0 focus:ring-0 focus-visible:ring-0
                outline-offset-0
                appearance-none
              "
            >
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Populaires — cartes compactes + spacing */}
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
