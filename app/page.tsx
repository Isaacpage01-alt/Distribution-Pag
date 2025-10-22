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

  const TOP = CAT_PILLS.slice(0, 3);
  const BOTTOM = CAT_PILLS.slice(3);

  const Pill = ({ label, slug }: { label: string; slug: string }) => (
    <Link href={`/products?cat=${slug}`} style={{ WebkitTapHighlightColor: "transparent" }}>
      <div
        className="
          inline-flex items-center justify-center select-none
          rounded-full border-[3px] border-black
          bg-black text-white font-semibold
          px-14 py-6 text-3xl min-w-[360px]
          shadow-[0_2px_0_0_#000]
          transition-transform hover:-translate-y-0.5 active:translate-y-0
        "
      >
        {label}
      </div>
    </Link>
  );

  return (
    <div className="space-y-12">
      {/* Barre de recherche centrée */}
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

      {/* Catégories — deux rangées bien séparées */}
      <section className="mx-auto max-w-[1300px] px-4 pt-10 pb-20">
        <h2 className="text-lg font-semibold text-white mb-8">Catégories</h2>

        <div className="flex flex-col items-center gap-y-32 sm:gap-y-36 lg:gap-y-40">
          <div className="cat-grid flex items-center justify-center gap-x-12">
            {TOP.map((c) => (
              <Pill key={c.slug} label={c.label} slug={c.slug} />
            ))}
          </div>
          <div className="cat-grid flex items-center justify-center gap-x-12">
            {BOTTOM.map((c) => (
              <Pill key={c.slug} label={c.label} slug={c.slug} />
            ))}
          </div>
        </div>
      </section>

      {/* Populaires */}
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

      {/* En rabais */}
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
