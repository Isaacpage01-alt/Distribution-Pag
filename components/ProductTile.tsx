"use client";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";
import Price from "@/components/Price";
import Link from "next/link";

export default function ProductTile({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <div className="rounded-md border border-black bg-white p-1 shadow-sm hover:shadow transition max-w-[180px] mx-auto">
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image TRÈS compacte */}
        <img
          src={product.image}
          alt={product.title}
          className="h-20 w-full rounded-[8px] object-cover"
        />
        <div className="mt-1">
          <div className="line-clamp-2 text-[11px] leading-snug font-medium text-black">
            {product.title}
          </div>
          <Price
            price={product.price}
            compareAt={product.compareAt}
            className="!text-[11px] text-black"
          />
        </div>
      </Link>

      <button
        onClick={() => add(product, 1)}
        className="mt-1 w-full rounded-[8px] bg-cyan-400 px-2 py-1 text-[11px] text-black font-semibold hover:brightness-110"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
