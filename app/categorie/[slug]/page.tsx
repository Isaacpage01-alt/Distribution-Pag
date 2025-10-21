export const dynamic = "force-static";

import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const list = products.filter((p) => p.category === slug);

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Catégorie — {slug}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
