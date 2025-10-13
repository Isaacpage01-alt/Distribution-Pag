"use client";

import { useCart } from "@/context/CartContext"; // si l'alias @ ne marche pas: import { useCart } from "../context/CartContext";

type Product = {
  id: string | number;
  title: string;
  price: number;          // en dollars CAD
  image?: string;         // chemin vers /public/...
};

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const priceLabel = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  }).format(product.price);

  const imgSrc = product.image && product.image.trim() !== ""
    ? product.image
    : "/placeholder.png"; // ajoute un placeholder dans /public si tu veux

  const brand = "#18CFE6"; // turquoise de ta bannière

  return (
    <article className="border rounded-xl p-3 space-y-3 shadow-sm hover:shadow transition">
      {/* Image */}
      <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-50">
        <img
          src={imgSrc}
          alt={product.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Titre + prix */}
      <header className="space-y-1">
        <h3 className="font-semibold leading-tight line-clamp-2">{product.title}</h3>
        <p className="text-sm text-gray-600">{priceLabel}</p>
      </header>

      {/* CTA */}
      <button
        type="button"
        onClick={() =>
          addItem(
            { id: product.id, title: product.title, price: product.price, image: product.image },
            1
          )
        }
        aria-label={`Ajouter ${product.title} au panier`}
        className="w-full rounded-lg px-3 py-2 text-white font-medium hover:opacity-90 active:opacity-80"
        style={{ backgroundColor: brand }}
      >
        Ajouter
      </button>
    </article>
  );
}
