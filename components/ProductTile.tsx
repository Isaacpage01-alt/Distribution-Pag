"use client";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";
import Price from "@/components/Price";
import Link from "next/link";

export default function ProductTile({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <div className="rounded-xl border border-black bg-white p-2 shadow-sm hover:shadow transition">
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image plus petite */}
        <img
          src={product.image}
          alt={product.title}
          className="h-32 w-full rounded-lg object-cover"
        />
        <div className="mt-2">
          <div className="line-clamp-2 text-[13px] font-medium text-black">
            {product.title}
          </div>
          <Price price={product.price} compareAt={product.compareAt} className="text-black" />
        </div>
      </Link>

      <button
        onClick={() => add(product, 1)}
        className="mt-2 w-full rounded-lg bg-cyan-400 px-3 py-2 text-[13px] text-black font-semibold hover:brightness-110"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
