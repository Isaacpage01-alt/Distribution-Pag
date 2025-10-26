// @ts-nocheck
// app/products/[id]/page.tsx
import { products } from "@/lib/products";

function find(id) {
  return id ? products.find((p) => p?.id === id) ?? null : null;
}

export default function Page({ params, searchParams }) {
  const idFromParams = params?.id;             // /products/out-001  -> "out-001"
  const idFromQuery =
    (typeof searchParams?.id === "string" && searchParams.id) ||
    (typeof searchParams?.sku === "string" && searchParams.sku) ||
    (typeof searchParams?.product === "string" && searchParams.product) ||
    undefined;

  // 1) format normal /products/[id]
  let product = find(idFromParams);
  // 2) compat /products/id?id=xxx
  if (!product && idFromParams === "id") product = find(idFromQuery);

  if (!product) {
    return (
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl font-semibold">Produit introuvable</h1>
          <p className="text-gray-600 mt-2">
            URL : <code>/products/{idFromParams}{idFromQuery ? `?id=${idFromQuery}` : ""}</code>
          </p>
          <p className="text-gray-600">Vérifie que l’ID existe dans <code>lib/products.ts</code>.</p>
        </div>
      </section>
    );
  }

  const img = product.image ? (product.image.startsWith("/") ? product.image : `/${product.image}`) : "/vercel.svg";
  const money = (v) => new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD" }).format(v);
  const hasCompare = typeof product.compareAt === "number" && product.compareAt > product.price;

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 items-stretch">
          <div className="relative h-[420px] sm:h-[520px] bg-white">
            <img src={img} alt={product.title} className="absolute inset-0 h-full w-full object-contain" />
          </div>

          <div className="bg-white border-l border-gray-200 p-4 sm:p-6 md:p-10 flex flex-col justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">{product.title}</h1>
              <p className="mt-2 text-base sm:text-lg md:text-xl font-medium">
                {money(product.price)}
                {hasCompare && <span className="ml-2 text-sm text-gray-500 line-through">{money(product.compareAt)}</span>}
              </p>
              {product.description && (
                <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>
              )}
            </div>

            <form action="#" className="mt-6 flex items-center gap-3 sm:gap-4">
              <label htmlFor="qty" className="text-sm font-medium text-gray-700">Quantité</label>
              <input id="qty" name="qty" type="number" min={1} max={999} defaultValue={1}
                     className="w-20 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
              <button type="submit"
                      className="ml-auto inline-flex items-center justify-center rounded-xl px-5 py-3 text-base font-medium text-white bg-teal-500 hover:bg-teal-600">
                Ajouter au panier
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
