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
  const initialQ = params.get("q") ?? "";
  const [q, setQ] = useState<string>(initialQ);

  useEffect(() => { setQ(initialQ); }, [initialQ]);

  const results: Product[] = useMemo(() => {
    const query = norm(q.trim());
    if (!query) return products;
    return products.filter((p) => norm(`${p.title} ${p.description} ${p.category} ${p.slug}`).includes(query));
  }, [q]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : "/search";
    router.push(url);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="w-full max-w-xl mx-auto flex gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un produit…" className="flex-1 h-11 rounded-full px-4 border border-white/20 bg-white/90 text-black" />
        <button className="rounded-full bg-cyan-400 text-black px-5 font-semibold">Chercher</button>
      </form>

      <div className="text-sm text-gray-200 text-center">
        {results.length} résultat{results.length > 1 ? "s" : ""}{q.trim() ? <> pour « {q.trim()} »</> : null}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
