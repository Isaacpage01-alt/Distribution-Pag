
"use client";

import Link from "next/link";
// Si tes alias "@/..." ne fonctionnent pas en prod, utilise des imports relatifs:
import { ProductCard } from "../components/ProductCard";
import { CATEGORIES, PRODUCTS } from "../lib/products";

export default function HomeClient() {
  const populaires = PRODUCTS.filter(p => p.populaire).slice(0, 8);
  const rabais = PRODUCTS.filter(p => p.rabais).slice(0, 8);

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Catégories */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold mb-4">Catégories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CATEGORIES.map(c => (
            <Link
              key={c.slug}
              href={`/categorie/${c.slug}`}
              className="border rounded-xl p-4 text-center hover:shadow-sm bg-gray-50"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Populaires */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold">Populaires</h2>
          <Link href="/search?q=populaire" className="text-sm underline">Voir plus</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {populaires.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* En rabais */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold">En rabais</h2>
          <Link href="/search?q=rabais" className="text-sm underline">Voir plus</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rabais.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
