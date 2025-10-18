import Link from "next/link";
import Price from "@/components/Price";
import type { Product } from "@/lib/products";

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
        <Price price={product.price} compareAt={product.compareAt} />
      </div>
    </Link>
  );
}
