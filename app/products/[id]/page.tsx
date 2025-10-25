"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { add } = useCart();

  const product = useMemo(
    () => products.find((p) => String(p.id) === String(id)),
    [id]
  );

  const [qty, setQty] = useState<number>(1);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-black">
        Produit introuvable.
      </div>
    );
  }

  // -- Chemin image sécurisé : si pas de "/" on l'ajoute.
  const imgSrc = (product.image || "/placeholder.png").startsWith("/")
    ? (product.image || "/placeholder.png")
    : `/${product.image}`;

  const unitPrice = Number(product.price) || 0;
  const total = unitPrice * qty;

  const addToCart = () => {
    add(
      {
        id: product.id,
        title: product.title,
        price: unitPrice,
        image: imgSrc,
      },
      qty
    );
    router.push("/products");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 text-black">
      {/* Grille: colonne gauche fixe (320px), droite fluide */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-8">
        {/* Colonne gauche : image plus petite */}
        <div className="rounded-xl border border-black/30 bg-white/95 p-4 flex items-center justify-center">
          <div className="w-full max-w-[300px] aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={imgSrc}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Colonne droite : infos */}
        <div className="space-y-5">
          <button
            onClick={() => router.back()}
            className="rounded-full border border-black px-3 py-1 text-sm hover:bg-black hover:text-white"
          >
            ← Retour
          </button>

          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <div className="text-sm text-gray-700">{product.category}</div>

          <div className="rounded-xl border border-black/30 bg-white/95 p-4 space-y-5">
            {/* Description */}
            <div className="text-gray-800 leading-relaxed">
              {product.description ?? "Description à venir."}
            </div>

            {/* Prix */}
            <div className="flex items-center gap-4">
              <div className="text-lg font-semibold">
                {unitPrice.toFixed(2)} $ / unité
              </div>
              {product.compareAt && product.compareAt > unitPrice && (
                <div className="text-sm text-gray-400 line-through">
                  {product.compareAt.toFixed(2)} $
                </div>
              )}
            </div>

            {/* Quantité */}
            <div>
              <div className="font-medium mb-2">Quantité</div>
              <div className="inline-flex items-center gap-2">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-9 w-9 rounded-full border border-black text-lg hover:bg-black hover:text-white"
                  aria-label="Diminuer"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) =>
                    setQty(Math.max(1, Number(e.target.value) || 1))
                  }
                  className="h-9 w-16 rounded-lg border border-black text-center"
                />
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="h-9 w-9 rounded-full border border-black text-lg hover:bg-black hover:text-white"
                  aria-label="Augmenter"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total + CTA */}
            <div className="text-lg font-semibold">
              Total : {total.toFixed(2)} $
            </div>
            <button
              onClick={addToCart}
              className="w-full h-11 rounded-xl bg-cyan-400 text-black font-semibold hover:brightness-110"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
