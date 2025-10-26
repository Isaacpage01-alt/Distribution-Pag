// components/ProductCard.tsx
import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  // Accepte "maretau.png" ou "/maretau.png"
  const imageSrc = product.image?.startsWith("/") ? product.image : `/${product.image}`;

  return (
    <div className="w-full max-w-[260px] bg-white rounded-xl border border-gray-200 p-4 flex flex-col">
      <div className="w-full h-40 relative">
        <img
          src={imageSrc}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      <h3 className="mt-3 font-semibold text-gray-900 line-clamp-2">{product.title}</h3>

      <div className="mt-1 text-gray-700">
        <span className="font-medium">
          {new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD" }).format(product.price)}
        </span>
        {typeof product.compareAt === "number" && product.compareAt > product.price && (
          <span className="ml-2 text-sm text-gray-500 line-through">
            {new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD" }).format(product.compareAt)}
          </span>
        )}
      </div>

      <div className="mt-4">
        {/* LIEN CORRECT → /products/[id] */}
        <Link
          href={`/products/${product.id}`}
          className="inline-flex w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 active:bg-teal-700 shadow-sm transition-colors"
        >
          Choisir
        </Link>
      </div>
    </div>
  );
}
