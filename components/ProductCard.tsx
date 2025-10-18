// components/ProductCard.tsx
import Link from "next/link";

export type Product = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  price: number;
  compareAt?: number;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="rounded-2xl bg-white p-3 shadow-sm hover:shadow"
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-40 w-full rounded-xl object-cover"
      />
      <div className="mt-2 space-y-1">
        <div className="line-clamp-2 text-sm font-medium">{product.title}</div>
        {/* on affiche juste le prix brut pour isoler le bug Price */}
        <div className="text-sm font-semibold">{Number(product.price).toFixed(2)} $</div>
      </div>
    </Link>
  );
}
