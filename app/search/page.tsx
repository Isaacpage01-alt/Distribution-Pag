export const dynamic = "force-static";

import ProductCard from "@/components/ProductCard";
import { products, type Product } from "@/lib/products";

function norm(s: string) {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = (searchParams?.q ?? "").trim();
  const results: Product[] = q
    ? products.filter((p) =>
        norm(`${p.title} ${p.description} ${p.category} ${p.slug}`).includes(norm(q))
      )
    : products;

  return (
    <div className="space-y-6">
      <form action="/search" className="w-full max-w-md mx-auto flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Rechercher un produit…"
          className="flex-1 h-10 rounded-full px-4 border border-black bg-white text-black text-sm"
        />
        <button className="h-10 rounded-full bg-cyan-400 px-4 text-black text-sm font-semibold hover:brightness-110">
          Chercher
        </button>
      </form>

      <div className="text-sm text-gray-200 text-center">
        {results.length} résultat{results.length > 1 ? "s" : ""}{q ? <> pour « {q} »</> : null}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
