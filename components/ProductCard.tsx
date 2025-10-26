// components/ProductCard.tsx
import Link from "next/link";
import type { Product } from "@/lib/products";

const money = (v: number) =>
  new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD" }).format(v);

export default function ProductCard({ product }: { product: Product | undefined }) {
  // Garde-fous si jamais product est undefined pendant le prerender
  const id = product?.id ?? "unknown";
  const title = product?.title ?? "Produit";
  const price = typeof product?.price === "number" ? product!.price : 0;

  // Normalise l'URL d'image et fallback
  const raw = product?.image ?? "";
  const normalized = raw.startsWith("/") ? raw : raw ? `/${raw}` : "";
  const imageSrc = normalized || "/placeholder.svg"; // ← ajoute ce fichier dans /public

  const hasCompare = typeof product?.compareAt === "number" && (product!.compareAt as number) > price;

  return (
    <div className="w-full max-w-[260px] bg-white rounded-xl border border-gray-200 p-4 flex flex-col">
      <div className="w-full h-40 relative">
        <img
          src={imageSrc}
          alt={title}
          className="absolute inset-0 w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      <h3 className="mt-3 font-semibold text-gray-900 line-clamp-2">{title}</h3>

      <div className="mt-1 text-gray-700">
        <span className="font-medium">{money(price)}</span>
        {hasCompare && (
          <span className="ml-2 text-sm text-gray-500 line-through">
            {money(product!.compareAt as number)}
          </span>
        )}
      </div>

      <div className="mt-4">
        <Link
          href={`/products/${id}`}
          className="inline-flex w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 active:bg-teal-700 shadow-sm transition-colors"
        >
          Choisir
        </Link>
      </div>
    </div>
  );
}
