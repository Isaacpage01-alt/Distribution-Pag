// app/products/[id]/page.tsx
type Product = {
  id: string;
  name: string;
  price: number; // CAD
  description?: string;
  imageUrl: string;
  imageAlt?: string;
  inStock?: boolean;
};

// Simule un “catalogue” pour la démo — remplace par ton fetch réel
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
  return CATALOG[id] ?? null; // remplace par DB/API au besoin
}

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-semibold">Produit introuvable</h1>
        <p className="text-gray-600 mt-2">Vérifie l’identifiant du produit.</p>
      </div>
    );
  }

  return (
    // Bande blanche PLEINE largeur
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* 2 colonnes dès mobile pour forcer “à côté” */}
        <div className="grid grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* IMAGE GAUCHE */}
          <div className="relative h-[420px] sm:h-[520px] bg-white">
            {/* object-contain = pas de crop ; mets object-cover si tu veux remplir */}
            <img
              src={product.imageUrl}
              alt={product.imageAlt || product.name}
              className="absolute inset-0 h-full w-full object-contain"
              loading="eager"
            />
          </div>

          {/* DETAILS DROITE — même hauteur que l'image grâce à items-stretch */}
          <div className="bg-white border-l border-gray-200 p-4 sm:p-6 md:p-10 flex flex-col justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
                {product.name}
              </h1>

              <p className="mt-2 text-base sm:text-lg md:text-xl font-medium">
                {new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD" }).format(product.price)}
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

            {/* CTA: quantité + bouton turquoise à DROITE */}
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
