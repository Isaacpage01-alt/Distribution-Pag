"use client";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";
import Price from "@/components/Price";
import Link from "next/link";

export default function ProductTile({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <div className="rounded-lg border border-black bg-white p-1.5 shadow-sm hover:shadow transition">
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image ~2x plus petite */}
        <img
          src={product.image}
          alt={product.title}
          className="h-24 w-full rounded-md object-cover"
        />
        <div className="mt-1">
          <div className="line-clamp-2 text-[12px] leading-tight font-medium text-black">
            {product.title}
          </div>
          <Price
            price={product.price}
            compareAt={product.compareAt}
            className="!text-[12px] text-black"
          />
        </div>
      </Link>

      <button
        onClick={() => add(product, 1)}
        className="mt-1.5 w-full rounded-md bg-cyan-400 px-2 py-1.5 text-[12px] text-black font-semibold hover:brightness-110"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
