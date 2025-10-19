"use client";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";
import Price from "@/components/Price";
import Link from "next/link";

export default function ProductTile({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <div className="rounded-2xl border border-black bg-white p-3 shadow-sm hover:shadow transition">
      <Link href={`/products/${product.slug}`} className="block">
        <img
          src={product.image}
          alt={product.title}
          className="h-40 w-full rounded-xl object-cover"
        />
        <div className="mt-2">
          <div className="line-clamp-2 text-sm font-medium text-black">
            {product.title}
          </div>
          <div className="mt-1">
            <Price price={product.price} compareAt={product.compareAt} className="text-black" />
          </div>
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
