export const dynamic = "force-static";

import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

type Props = { searchParams?: { q?: string; cat?: string; promo?: string } };

export default function ProductsPage({ searchParams }: Props) {
  const q = (searchParams?.q || "").toLowerCase().trim();
  const cat = (searchParams?.cat || "").toLowerCase().trim();
  const promo = (searchParams?.promo || "").trim();

  const list = products
    .filter((p) => (q ? `${p.title} ${p.category}`.toLowerCase().includes(q) : true))
    .filter((p) => (cat ? p.categorySlug?.toLowerCase() === cat : true))
    .filter((p) => (promo ? (p.compareAt && p.compareAt > p.price) : true));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-4 flex items-end justify-between gap-3">
        <h1 className="text-xl font-semibold text-white">
          {cat ? `Catégorie : ${cat}` : q ? `Recherche : “${q}”` : "Tous les produits"}
        </h1>
        <div className="text-sm text-gray-300">{list.length} produit(s)</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 sm:gap-7">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {list.length === 0 && (
        <div className="mt-10 text-gray-300">Aucun produit trouvé.</div>
      )}
    </div>
  );
}
