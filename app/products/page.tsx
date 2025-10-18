"use client";
import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function ProductsPage() {
  const params = useSearchParams();
  const router = useRouter();
  const cat = params.get("cat");

  const filtered = useMemo(() => {
    if (!cat) return products;
    return products.filter((p) => p.category === cat);
  }, [cat]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="rounded-lg border border-white/20 bg-neutral-900/70 text-white px-3 py-2 text-sm hover:shadow">
          ← Retour
        </button>
        <h1 className="text-2xl font-semibold text-white">Produits {cat ? `— ${cat}` : ""}</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
