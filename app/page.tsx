import Link from "next/link";
import { products, categories, featured, discounted } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* BANNIÈRE FULL-WIDTH */}
      <section className="-mx-4 sm:-mx-6 lg:-mx-8">
        <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[380px]">
          <img
            src="/banniere.png"
            alt="Distribution Pagé"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-white text-2xl sm:text-3xl font-semibold">
                Bienvenue chez Distribution Pagé
              </h1>
              <p className="text-white/90 mt-2">
                Outils, quincaillerie, plomberie, extérieur et électricité — livrés chez vous.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* … laisse tes sections Catégories / Populaires / En rabais comme avant … */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Populaires</h2>
          <Link href="/products" className="text-sm text-blue-600 hover:underline">
            Voir plus
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">En rabais</h2>
          <Link href="/products?promo=1" className="text-sm text-blue-600 hover:underline">
            Voir plus
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {discounted.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
