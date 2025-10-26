// @ts-nocheck
// app/products/[id]/page.tsx
import { products } from "@/lib/products";

// Trouve un produit par id dans lib/products.ts
function findById(id) {
  if (!id) return null;
  return products.find((p) => p?.id === id) ?? null;
}

// Prend en charge :
// 1) /products/out-001        -> params.id === "out-001"
// 2) /products/id?id=out-001  -> params.id === "id" ET searchParams.id === "out-001"
export default function Page({ params, searchParams }) {
  const idFromParams = params?.id;
  const idFromQuery =
    (typeof searchParams?.id === "string" && searchParams.id) ||
    (typeof searchParams?.sku === "string" && searchParams.sku) ||
    (typeof searchParams?.product === "string" && searchParams.product) ||
    undefined;

  // 1) Essai direct (route dynamique classique)
  let product = findById(idFromParams);

  // 2) Fallback pour l'ancien format /products/id?id=...
  if (!product && idFromParams === "id") {
    product = findById(idFromQuery);
  }

  // Normalise l'image (accepte "maretau.png" ou "/maretau.png")
  const raw = product?.image ?? "";
  const imageSrc = raw ? (raw.startsWith("/") ? raw : `/${raw}`) : "/vercel.svg";

  if (!product) {
    return (
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl font-semibold">Produit introuvable</h1>
          <p className="text-gray-600 mt-2">
            URL reçue : <code>/products/{idFromParams}{idFromQuery ? `?id=${idFromQuery}` : ""}</code>
          </p>
          <p className="text-gray-600 mt-2">
            Assure-toi que <code>{idFromParams === "id" ? idFromQuery : idFromParams}</code> existe bien dans <code>lib/products.ts</code>.
          </p>
        </div>
      </section>
    );
  }

  const money = (v) => new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD" }).format(v);
  const hasCompare = typeof product?.compareAt === "number" && product.compareAt > product.price;

  return (
    // Bande blanche pleine largeur
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* 2 colonnes = image gauche / infos droite */}
        <div className="grid grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* IMAGE GAUCHE */}
          <div className="relative h-[420px] sm:h-[520px] bg-white">
            <img
              src={imageSrc}
              alt={product.title}
              className="absolute inset-0 h-full w-full object-contain"
              loading="eager"
            />
          </div>

          {/* INFOS DROITE */}
          <div className="bg-white border-l border-gray-200 p-4 sm:p-6 md:p-10 flex flex-col justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
                {product.title}
              </h1>

              <p className="mt-2 text-base sm:text-lg md:text-xl font-medium">
                {money(product.price)}
                {hasCompare && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    {money(product.compareAt)}
                  </span>
                )}
              </p>

              {product?.description && (
                <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              )}
            </div>

            {/* CTA: quantité + bouton turquoise */}
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
