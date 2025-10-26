// app/products/[id]/page.tsx
// Page produit: image à gauche, infos à droite sur bande blanche pleine largeur
// (Tailwind requis)

type Product = {
  id: string;
  name: string;
  price: number; // CAD
  description?: string;
  imageUrl: string;
  imageAlt?: string;
  inStock?: boolean;
};

// Exemple de “fetch” produit (remplace par ton fetch réel: DB, API, etc.)
async function getProductById(id: string): Promise<Product | null> {
  // TODO: branche ici ton vrai data fetching (prisma, fetch(), etc.)
  // Valeur de démo pour vérifier le layout:
  if (!id) return null;
  return {
    id,
    name: "Vis traitées 8×",
    price: 4,
    description:
      "Vis traitées 8 mm, longueur 2''\nIdéales pour projets de quincaillerie.",
    imageUrl: "/images/vis-traitees.jpg", // mets le fichier dans /public/images/…
    imageAlt: "Sac de vis traitées 8 mm",
    inStock: true,
  };
}

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-semibold">Produit introuvable</h1>
        <p className="text-gray-600 mt-2">
          Vérifie l’identifiant du produit ou réessaie plus tard.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Image gauche / Infos droite — même hauteur grâce à items-stretch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* IMAGE GAUCHE */}
          <div className="relative md:h-[520px] bg-white">
            {/* object-contain = pas de crop ; si tu veux remplir, mets object-cover */}
            <img
              src={product.imageUrl}
              alt={product.imageAlt || product.name}
              className="absolute inset-0 h-full w-full object-contain"
              loading="eager"
            />
          </div>

          {/* DETAILS DROITE sur la même bande blanche */}
          <div className="bg-white border-l border-gray-200 p-6 md:p-10 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                {product.name}
              </h1>

              <p className="mt-2 text-lg md:text-xl font-medium">
                {new Intl.NumberFormat("fr-CA", {
                  style: "currency",
                  currency: "CAD",
                }).format(product.price)}
              </p>

              {product.description ? (
                <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              ) : null}

              {product.inStock === false ? (
                <p className="mt-3 text-sm text-red-600">Rupture de stock</p>
              ) : (
                <p className="mt-3 text-sm text-green-700">En stock</p>
              )}
            </div>

            {/* Ligne CTA: quantité + bouton turquoise à DROITE de l'image */}
            <form
              action="#"
              className="mt-6 flex items-center gap-4"
              // TODO: remplace action par une server action ou un POST vers ton panier
            >
              <label
                htmlFor="qty"
                className="text-sm font-medium text-gray-700"
              >
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
