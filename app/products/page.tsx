import { Suspense } from "react";
import ProductsView from "./products-view";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-white p-4">Chargement…</div>}>
      <ProductsView />
    </Suspense>
  );
}
