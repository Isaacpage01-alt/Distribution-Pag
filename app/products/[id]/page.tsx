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

  // Sécuriser le chemin d'image
  const imgSrc = (product.image || "/placeholder.png").startsWith("/")
    ? (product.image || "/placeholder.png")
    : `/${product.image}`;

  const unitPrice = Number(product.price) || 0;
  const total = unitPrice * qty;

  const addToCart = () => {
    add({ id: product.id, title: product.title, price: unitPrice, image: imgSrc }, qty);
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

        {/* ====== TOUJOURS 2 COLONNES (PAS DE lg:) ====== */}
        <div className="grid grid-cols-[380px,1fr] gap-10 items-start">
          {/* Colonne gauche : image bien à gauche */}
          <div className="flex justify-start">
            <div className="w-[380px] aspect-square rounded-lg overflow-hidden bg-gray-100 border border-black/20">
              <img
                src={imgSrc}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Colonne droite : titre, description, prix, quantité, bouton */}
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-semibold">{product.title}</h1>
              <div className="text-sm text-gray-700">{product.category}</div>
            </div>

            <p className="text-gray-800 leading-relaxed">
              {product.description ?? "Description à venir."}
            </p>

            <div
