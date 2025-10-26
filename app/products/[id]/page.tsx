// app/products/[id]/page.tsx
// Route dynamique: /products/:id  (lecture via params.id)
// Layout: image à gauche, infos à droite sur bande blanche pleine largeur.

type Product = {
  id: string;
  name: string;
  price: number; // CAD
  description?: string;
  imageUrl: string;
  imageAlt?: string;
  inStock?: boolean;
};

// 🔧 Remplace ce “catalogue” par ton fetch réel (DB/API). Il sert juste d’exemple.
const CATALOG: Record<string, Product> = {
  "vis-traitees-8x": {
    id: "vis-traitees-8x",
    name: "Vis traitées 8×",
    price: 4,
    description: "Vis traitées 8 mm, longueur 2''\nIdéales pour projets de quincaillerie.",
    imageUrl: "/images/vis-traitees.jpg",
    imageAlt: "Sac de vis traitées 8 mm",
    inStock: true,
  },
  "marteau-pro": {
    id: "marteau-pro",
    name: "Marteau Pro",
    price: 19.99,
    description: "Marteau tête acier trempé. Poignée anti-glisse.",
    imageUrl: "/images/marteau.jpg",
    imageAlt: "Marteau professionnel",
    inStock: true,
  },
  "tournevis-plat": {
    id: "tournevis-plat",
    name: "Tournevis plat",
    price: 6.49,
    description: "Tournevis plat 5 mm, manche ergonomique.",
    imageUrl: "/images/tournevis-plat.jpg",
    imageAlt: "Tournevis plat",
    inStock: true,
  },
};

async function getProductById(id: string): Promise<Product | null> {
  // 👉 Mets ici ton vrai fetch (Prisma/fetch/server action). Le reste du layout ne change pas.
  return CATALOG[id] ?? null;
}

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  // En production, on peut renvoyer 404 si pas trouvé. Ici, on garde une page simple.
  if (!product) {
    return (
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl font-semibold">Produit introuvable</h1>
          <p className="text-gray-600 mt-2">
            L’ID <code>{params.id}</code> n’a pas été trouvé.
          </p>
        </div>
      </section>
    );
  }

  return (
    // Bande blanche pleine largeur (sur toute la page)
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* côte à côte (2 colonnes) => texte vraiment à droite de l'image */}
        <div className="grid grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* IMAGE GAUCHE */}
          <div className="relative h-[420px] sm:h-[520px] bg-white">
            {/* object-contain = pas de crop ; object-cover si tu veux remplir */}
            <img
              src={product.imageUrl}
              alt={product.imageAlt || product.name}
              className="absolute inset-0 h-full w-full object-contain"
              loading="eager"
            />
          </div>

          {/* DÉTAILS DROITE — même hauteur que l'image */}
          <div className="bg-white border-l border-gray-200 p-4 sm:p-6 md:p-10 flex flex-col justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
                {product.name}
              </h1>

              <p className="mt-2 text-base sm:text-lg md:text-xl font-medium">
                {new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD" }).format(
                  product.price
                )}
              </p>

              {product.description && (
                <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              )}

              {product.inStock === false ? (
                <p className="mt-3 text-sm text-red-600">Rupture de stock</p>
              ) : (
                <p className="mt-3 text-sm text-green-700">En stock</p>
              )}
            </div>

            {/* CTA: quantité + bouton turquoise (à droite) */}
            <form action="#" className="mt-6 flex items-center gap-3 sm:gap-4">
              <label htmlFor="qty" className="text-sm font-medium text-gray-700">
                Quantité
              </label>
              <input
                id="qty"
                name="qty"
                type="number"
                min={1}
                max={999}
                defaultValue={1}
                className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />

              <button
                type="submit"
                className="ml-auto inline-flex items-center justify-center rounded-xl px-5 py-3 text-base font-medium text-white bg-teal-500 hover:bg-teal-600 active:bg-teal-700 shadow-sm transition-colors"
              >
                Ajouter au panier
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
