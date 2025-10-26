// app/products/page.tsx
// RENDU DYNAMIQUE pour lire searchParams (?cat=, ?q=, ?promo=)
export const dynamic = "force-dynamic";

import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

type Props = { searchParams?: { q?: string; cat?: string; promo?: string } };

// petite fonction pour normaliser les slugs
function norm(v?: string) {
  return decodeURIComponent((v || "").toLowerCase().trim());
}

export default function ProductsPage({ searchParams }: Props) {
  const q = norm(searchParams?.q);
  const cat = norm(searchParams?.cat);          // ex: "outils", "quincaillerie", "electricite", "interieur", "exterieur"
  const promo = norm(searchParams?.promo);      // "1" ou "true"

  // Filtrage
  const list = products
    // recherche plein texte
    .filter((p) =>
      q ? `${p.title} ${p.category} ${p.categorySlug}`.toLowerCase().includes(q) : true
    )
    // filtre catégorie via categorySlug
    .filter((p) => (cat ? p.categorySlug?.toLowerCase() === cat : true))
    // filtre promo si demandé
    .filter((p) => (promo ? (p.compareAt && p.compareAt > p.price) : true));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-4 flex items-end justify-between gap-3">
        <h1 className="text-xl font-semibold text-white">
          {cat
            ? `Catégorie : ${cat}`
            : q
            ? `Recherche : “${q}”`
            : "Tous les produits"}
        </h1>
        <div className="text-sm text-gray-300">{list.length} produit(s)</div>
      </div>

      {/* Grille 4 colonnes (2 mobile, 3 médium, 4 desktop) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {list
          // 1) évite qu'un item undefined ne passe
          .filter((p): p is typeof products[number] => !!p && typeof p.id === "string")
          // 2) normalise l'image ici (sans toucher ProductCard ni lib/products.ts)
          .map((p) => {
            const normalizedImage =
              p.image && typeof p.image === "string"
                ? (p.image.startsWith("/") ? p.image : `/${p.image}`)
                : "/placeholder.svg"; // -> crée un petit placeholder.svg dans /public si besoin

            const safeProduct = { ...p, image: normalizedImage };

            return <ProductCard key={p.id} product={safeProduct} />;
          })}
      </div>

      {list.length === 0 && (
        <div className="mt-10 text-gray-300">Aucun produit trouvé.</div>
      )}
    </div>
  );
}
