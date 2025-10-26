// app/products/[id]/page.tsx
"use client";

import { useMemo, useState } from "react";
import { products } from "@/lib/products";

function findProductById(id: string) {
  return products.find((p) => p?.id === id) ?? null;
}

const money = (v: number) =>
  new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD" }).format(v);

export default function Page({ params }: { params: { id: string } }) {
  const product = findProductById(params.id);
  const [qty, setQty] = useState<number>(1);

  if (!product) {
    return (
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl font-semibold">Produit introuvable</h1>
          <p className="text-gray-600 mt-2">ID: <code>{params.id}</code></p>
        </div>
      </section>
    );
  }

  // Accepte "maretau.png" ou "/maretau.png"
  const img = product.image?.startsWith("/") ? product.image : `/${product.image}`;

  const total = useMemo(() => {
    const q = Math.max(1, Math.min(999, Number(qty) || 1));
    return product.price * q;
  }, [qty, product.price]);

  return (
    // BANDE BLANCHE DE FOND (pleine largeur)
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* 2 colonnes côte à côte */}
        <div className="grid grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* IMAGE GAUCHE (hauteur fixe) */}
          <div className="relative h-[420px] sm:h-[520px] bg-white">
            <img
              src={img}
              alt={product.title}
              className="absolute inset-0 h-full w-full object-contain"
              loading="eager"
            />
          </div>

          {/* CARTE BLANCHE À DROITE (bande/carré blanc) */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 md:p-10 shadow-sm flex flex-col">
            {/* Titre + prix */}
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
                {product.title}
              </h1>

              <div className="mt-2 flex items-baseline gap-3">
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                  {money(product.price)}
                </p>
                {"compareAt" in product &&
                  typeof (product as any).compareAt === "number" &&
                  (product as any).compareAt > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {money((product as any).compareAt as number)}
                    </span>
                  )}
              </div>

              {/* Description (facultatif) */}
              {"description" in product && (product as any).description ? (
                <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">
                  {(product as any).description}
                </p>
              ) : null}
            </div>

            {/* Contrôles d'achat */}
            <div className="mt-6">
              {/* Quantité (PLUS HAUT) */}
              <div className="flex items-center gap-3">
                <label htmlFor="qty" className="text-sm font-medium text-gray-700">
                  Quantité
                </label>
                <input
                  id="qty"
                  name="qty"
                  type="number"
                  min={1}
                  max={999}
                  value={qty}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    if (Number.isFinite(n)) setQty(Math.max(1, Math.min(999, n)));
                  }}
                  className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              {/* MONTANT TOTAL sous la quantité */}
              <div className="mt-3 text-base sm:text-lg font-medium text-gray-900">
                Total : <span>{money(total)}</span>
              </div>

              {/* GROS BOUTON TURQUOISE sous le total */}
              <div className="mt-5">
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center rounded-xl px-6 py-4 text-base md:text-lg font-semibold text-white bg-teal-500 hover:bg-teal-600 active:bg-teal-700 shadow-md transition-colors"
                  onClick={() => {
                    // branche ici ton ajout au panier
                    console.log("Ajouter au panier:", product.id, qty);
                  }}
                >
                  Ajouter au panier
                </button>
              </div>
            </div>

            {/* Petit indicateur stock (optionnel) */}
            {"inStock" in product ? (
              (product as any).inStock === false ? (
                <p className="mt-4 text-sm text-red-600">Rupture de stock</p>
              ) : (
                <p className="mt-4 text-sm text-green-700">En stock</p>
              )
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
