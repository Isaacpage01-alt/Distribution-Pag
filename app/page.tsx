import Link from "next/link";
import { products, categories, featured, discounted } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl shadow-sm">
        <img
          src="/banniere.png"
          alt="Distribution Pagé"
          className="w-full h-56 sm:h-72 lg:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="px-6 sm:px-8 lg:px-10">
            <h1 className="text-white text-2xl sm:text-3xl font-semibold">Bienvenue chez Distribution Pagé</h1>
            <p className="text-white/90 mt-2">
              Outils, quincaillerie, plomberie, extérieur et électricité — livrés chez vous.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Populaires</h2>
          <Link href="/products" className="text-sm text-blue-600 hover:underline">Voir tout</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">En rabais</h2>
          <Link href="/products?promo=1" className="text-sm text-blue-600 hover:underline">Voir les rabais</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {discounted.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Catégories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {categories.map((c) => (
            <Link key={c.slug} href={`/products?cat=${c.slug}`} className="rounded-xl border p-4 text-center hover:shadow">
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-gray-500">{c.count} produits</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
