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
      <div className="mx-auto max-w-3xl px-4 py-12 text-white">
        Produit introuvable.
      </div>
    );
  }

  const unitPrice = Number(product.price) || 0;
  const total = unitPrice * qty;

  const addToCart = () => {
    add(
      {
        id: product.id,
        title: product.title,
        price: unitPrice,
        image: product.image,
      },
      qty
    );
    // Retour à la liste (ou remplace par ouverture tiroir panier si tu veux)
    router.push("/products");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 text-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="rounded-xl border border-black/50 bg-white/95 p-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Infos */}
        <div className="space-y-5">
          <button
            onClick={() => router.back()}
            className="rounded-full border border-black px-3 py-1 text-sm hover:bg-black hover:text-white"
          >
            ← Retour
          </button>

          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <div className="text-sm text-gray-700">{product.category}</div>

          {/* Description + Prix + Quantité */}
          <div className="rounded-xl border border-black/30 bg-white/95 p-4 space-y-4">
            <div className="text-gray-800 leading-relaxed">
              {product.description ?? "Description à venir."}
            </div>

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

            {/* Total */}
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
