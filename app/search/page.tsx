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
    ? products.filter(p =>
        norm(`${p.title} ${p.description} ${p.category} ${p.slug}`).includes(norm(q))
      )
    : products;

  return (
    <div className="space-y-6">
      {/* Formulaire GET vers /search (pas de hook nécessaire) */}
      <form action="/search" className="w-full max-w-xl mx-auto flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Rechercher un produit…"
          className="flex-1 h-11 rounded-full px-4 border border-white/20 bg-white/90 text-black"
        />
        <button className="rounded-full bg-cyan-400 text-black px-5 font-semibold">
          Chercher
        </button>
      </form>

      <div className="text-sm text-gray-200 text-center">
        {results.length} résultat{results.length > 1 ? "s" : ""}{q ? <> pour « {q} »</> : null}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
