export const dynamic = "force-static";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-white text-center py-20 space-y-6">
      <h1 className="text-4xl font-bold">Distribution Pagé</h1>
      <p className="text-gray-300 text-sm max-w-md mx-auto">
        Outils, quincaillerie, plomberie, électricité, intérieur et extérieur.
      </p>

      <Link
        href="/products"
        className="inline-block bg-cyan-400 text-black px-6 py-3 rounded-full font-semibold hover:brightness-110 transition"
      >
        Voir les produits
      </Link>
    </div>
  );
}
