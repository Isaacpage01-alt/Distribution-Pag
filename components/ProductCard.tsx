"use client";
import Link from "next/link";
import Price from "@/components/Price";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <div className="rounded-2xl bg-neutral-900/70 text-white p-3 shadow-sm hover:shadow border border-white/10">
      <Link href={`/products/${product.slug}`}>
        <img src={product.image} alt={product.title} className="h-40 w-full rounded-xl object-cover" />
        <div className="mt-2 space-y-1">
          <div className="line-clamp-2 text-sm font-medium">{product.title}</div>
          <Price price={product.price} compareAt={product.compareAt} />
        </div>
      </Link>
      <button
        onClick={() => add(product, 1)}
        className="mt-3 w-full rounded-xl bg-cyan-400 px-4 py-2 text-black font-semibold hover:brightness-110"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
