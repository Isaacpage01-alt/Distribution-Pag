// app/products/[id]/page.tsx
import { products } from "@/lib/products";

function findProductById(id: string) {
  return products.find((p) => p?.id === id) ?? null;
}

export default function Page({ params }: { params: { id: string } }) {
  const product = findProductById(params.id);

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
  const money = (v: number) =>
    new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD" }).format(v);
  const hasCompare =
    typeof (product as any).compareAt === "number" &&
    (product as any).compareAt > product.price;

  return (
    // BANDE BLANCHE pleine largeur
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* côte à côte (2 colonnes) => texte vraiment à droite de l'image */}
        <div className="grid grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* IMAGE GAUCHE (hauteur fixe => la colonne droite a la même hauteur) */}
          <div className="relative h-[420px] sm:h-[520px] bg-white">
            <img
              src={img}
              alt={product.title}
              className="absolute inset-0 h-full w-full object-contain"
              loading="eager"
            />
          </div>

          {/* INFOS DROITE — même hauteur que l'image */}
          <div className="bg-white border-l border-gray-200 p-4 sm:p-6 md:p-10 flex flex-col justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
                {product.title}
              </h1>

              <p className="mt-2 text-base sm:text-lg md:text-xl font-medium">
                {money(product.price)}
                {hasCompare && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    {money((product as any).compareAt as number)}
                  </span>
                )}
              </p>

              {"description" in product && (product as any).description ? (
                <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">
                  {(product as any).description}
                </p>
              ) : null}
            </div>

            {/* LIGNE CTA : quantité + bouton turquoise à DROITE */}
            <form action="#" className="mt-6 flex items-center gap-4">
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
