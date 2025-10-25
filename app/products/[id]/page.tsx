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

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-white">
        Produit introuvable.
      </div>
    );
  }

  // Packs définis sur le produit ou défaut
  const packOptions = product.packOptions && product.packOptions.length > 0
    ? product.packOptions
    : [50, 75, 100, 200];

  const [pack, setPack] = useState<number>(packOptions[0]);
  const [packsQty, setPacksQty] = useState<number>(1);

  // On considère product.price = prix / unité
  const pricePerUnit = Number(product.price) || 0;
  const pricePerPack = pricePerUnit * pack;
  const total = pricePerPack * packsQty;

  const addToCart = () => {
    // id unique par pack pour bien distinguer les lignes dans le panier
    const lineId = `${product.id}-p${pack}`;

    add(
      {
        id: lineId,
        title: `${product.title} × ${pack}`,
        price: pricePerPack,
        image: product.image,
      },
      packsQty
    );

    // Option : retourner à la liste produits
    router.push("/products");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 text-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visuel */}
        <div className="rounded-xl border border-black/50 bg-white/95 p-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Infos + options */}
        <div className="space-y-5">
          <button
            onClick={() => router.back()}
            className="rounded-full border border-black px-3 py-1 text-sm hover:bg-black hover:text-white"
          >
            ← Retour
          </button>

          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <div className="text-sm text-gray-700">{product.category}</div>

          <div className="rounded-xl border border-black/30 bg-white/95 p-4 space-y-4">
            {/* Choix du pack */}
            <div>
              <div className="font-medium mb-2">Choisir un conditionnement</div>
              <div className="flex flex-wrap gap-2">
                {packOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setPack(opt)}
                    className={`h-9 rounded-full border px-4 text-sm font-medium ${
                      pack === opt
                        ? "bg-cyan-400 text-black border-black"
                        : "bg-white text-black border-black hover:bg-black hover:text-white"
                    }`}
                  >
                    {opt}x
                  </button>
                ))}
              </div>
            </div>

            {/* Quantité de packs */}
            <div>
              <div className="font-medium mb-2">Quantité de packs</div>
              <div className="inline-flex items-center gap-2">
                <button
                  onClick={() => setPacksQty((q) => Math.max(1, q - 1))}
                  className="h-9 w-9 rounded-full border border-black text-lg hover:bg-black hover:text-white"
                  aria-label="Diminuer"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  value={packsQty}
                  onChange={(e) => setPacksQty(Math.max(1, Number(e.target.value) || 1))}
                  className="h-9 w-16 rounded-lg border border-black text-center"
                />
                <button
                  onClick={() => setPacksQty((q) => q + 1)}
                  className="h-9 w-9 rounded-full border border-black text-lg hover:bg-black hover:text-white"
                  aria-label="Augmenter"
                >
                  +
                </button>
              </div>
            </div>

            {/* Récap prix */}
            <div className="space-y-1">
              <div className="text-sm text-gray-700">
                Prix unitaire: <span className="font-medium">{pricePerUnit.toFixed(2)} $</span> / unité
              </div>
              <div className="text-sm text-gray-700">
                Prix / pack {pack}x:{" "}
                <span className="font-medium">{pricePerPack.toFixed(2)} $</span>
              </div>
              <div className="text-lg font-semibold">
                Total: {total.toFixed(2)} $
              </div>
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
