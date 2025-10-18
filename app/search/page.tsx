"use client";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { products, type Product } from "@/lib/products";

function norm(s: string) {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

export default function SearchPage() {
  const params = useSearchParams();
  const router = useRouter();

  // q depuis l'URL, sinon chaîne vide
  const initialQ = params.get("q") ?? "";
  const [q, setQ] = useState<string>(initialQ);

  // Synchroniser l’input quand l’URL change (navigation)
  useEffect(() => {
    setQ(initialQ);
  }, [initialQ]);

  const results: Product[] = useMemo(() => {
    const query = norm(q.trim());
    if (!query) return products;
    return products.filter((p) => {
      const hay =
        `${p.title} ${p.description} ${p.category} ${p.slug}`.toString();
      return norm(hay).includes(query);
    });
  }, [q]);

  // Soumission → met à jour l’URL ?q=...
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : "/search";
    router.push(url);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Recherche</h1>

      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher un produit…"
          className="flex-1 h-10 rounded-lg border px-3"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 text-white font-medium"
        >
          Chercher
        </button>
      </form>

      <div className="text-sm text-gray-600">
        {results.length} résultat{results.length > 1 ? "s" : ""}
        {q.trim() ? <> pour « {q.trim()} »</> : null}
      </div>

      {results.length === 0 ? (
        <div className="text-gray-600">
          Aucun résultat. Essaye un autre mot-clé (ex : “marteau”, “plomberie”, “vis”).
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
