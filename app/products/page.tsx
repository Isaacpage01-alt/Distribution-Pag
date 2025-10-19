import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import BackButton from "@/components/BackButton";

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { cat?: string };
}) {
  const cat = searchParams?.cat;
  const filtered = cat ? products.filter(p => p.category === cat) : products;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <BackButton />
        <h1 className="text-2xl font-semibold text-white">
          Produits {cat ? `— ${cat}` : ""}
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
