// app/page.tsx
export const dynamic = "force-static";

export default function HomePage() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Accueil — route OK ✅</h1>
      <p>Si tu vois cette page en ligne, la route / est bonne.</p>
      <p><a href="/products" style={{ textDecoration: "underline", color: "#67e8f9" }}>Aller à /products</a></p>
    </div>
  );
}
