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

  // Sécurise le chemin image (si "marteau.png" -> "/marteau.png")
  const imgSrc = (product.image || "/placeholder.png").startsWith("/")
    ? (product.image || "/placeholder.png")
    : `/${product.image}`;

  const unitPrice = Number(product.price) || 0;
  const total = unitPrice * qty;

  const addToCart = () => {
    add(
      { id: product.id, title: product.title, price: unitPrice, image: imgSrc },
      qty
    );
    router.push("/products");
  };

  return (
    /* ====== BANDE BLANCHE PLEINE LARGEUR ====== */
    <section className="w-full bg-white border-y border-black/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 text-black">
        <button
          onClick={() => router.back()}
          className="mb-6 rounded-full border border-black px-3 py-1 text-sm hover:bg-black hover:text-white"
        >
          ← Retour
        </button>

        {/* ====== TOUJOURS 2 COLONNES (image à gauche, contenu à droite) ====== */}
        <div className="grid grid-cols-[380px,1fr] gap-10 items-start">
          {/* Colonne gauche : image */}
          <div className="flex justify-start">
            <div className="w-[380px] aspect-square rounded-lg overflow-hidden bg-gray-100 border border-black/20">
              <img
                src={imgSrc}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Colonne droite : infos + quantité + bouton */}
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-semibold">{product.title}</h1>
              <div className="text-sm text-gray-700">{product.category}</div>
            </div>

            {/* Description */}
            <p className="text-gray-800 leading-relaxed">
              {product.description ?? "Description à venir."}
            </p>

            {/* Prix */}
            <div className="flex items-baseline gap-3">
              <div className="text-xl font-semibold">
                {unitPrice.toFixed(2)} $ <span className="text-sm">/ unité</span>
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

            <div className="max-w-sm">
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
    </section>
  );
}
