"use client";
import { useParams } from "next/navigation";
import { products } from "@/lib/products";
import Price from "@/components/Price";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === params.slug);
  const { add } = useCart();

  if (!product) return <div>Produit introuvable.</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <img src={product.image} alt={product.title} className="w-full rounded-xl object-cover" />
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <Price price={product.price} compareAt={product.compareAt} />
        <p className="text-gray-700">{product.description}</p>
        <button
          onClick={() => add(product, 1)}
          className="rounded-xl bg-blue-600 px-5 py-3 text-white shadow hover:bg-blue-700"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
