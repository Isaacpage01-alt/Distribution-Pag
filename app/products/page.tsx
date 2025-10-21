export const dynamic = "force-static";

import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { cat?: string; promo?: string };
}) {
  const { cat, promo } = searchParams || {};
  let list = products;

  if (cat) list = list.filter((p) => p.category === cat);
  if (promo === "1") list = list.filter((p) => p.compareAt && p.compareAt > p.price);

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Produits {cat ? `— ${cat}` : ""}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
