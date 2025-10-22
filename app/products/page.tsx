// app/products/page.tsx
export const dynamic = "force-static";

export default function ProductsPage() {
  return (
    <div style={{ padding: 24, color: "white" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Produits — route OK ✅</h1>
      <p>Si tu vois cette page en ligne, la route /products existe bien.</p>
    </div>
  );
}
