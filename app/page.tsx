// app/page.tsx
export const dynamic = "force-static";

const CATS = [
  { label: "quincaillerie", slug: "quincaillerie" },
  { label: "outils", slug: "outils" },
  { label: "plomberie", slug: "plomberie" },
  { label: "électricité", slug: "electricite" },
  { label: "intérieur", slug: "interieur" },
  { label: "extérieur", slug: "exterieur" },
];

export default function HomePage() {
  return (
    <div style={{ padding: "16px 0 48px" }}>
      {/* Bannière en haut, fond “fondu” (supprime l’impression de blanc) */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <img
          src="/banniere.png"
          alt="Distribution Pagé"
          style={{
            height: "220px",
            objectFit: "contain",
            mixBlendMode: "multiply",
            opacity: 0.95,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      </div>

      {/* Recherche centrée */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
        <form action="/products" style={{ display: "flex", gap: 8, width: "100%", maxWidth: 420, padding: "0 16px" }}>
          <input
            name="q"
            placeholder="Rechercher un produit…"
            style={{
              flex: 1,
              height: 36,
              borderRadius: 9999,
              padding: "0 12px",
              border: "1px solid #000",
              background: "#fff",
              color: "#000",
              fontSize: 14,
            }}
          />
          <button
            style={{
              height: 36,
              borderRadius: 9999,
              background: "#22d3ee",
              color: "#000",
              fontWeight: 700,
              padding: "0 12px",
            }}
          >
            Chercher
          </button>
        </form>
      </div>

      {/* Catégories — 3 en haut / 3 en bas, pills NOIRS */}
      <section style={{ maxWidth: 1300, margin: "32px auto 0", padding: "0 16px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Catégories</h2>

        {/* deux rangées séparées avec gros gap vertical */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: 48 }}>
          {/* Rangée du haut */}
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
            {CATS.slice(0, 3).map((c) => (
              <a key={c.slug} href={`/products?cat=${c.slug}`} style={{ WebkitTapHighlightColor: "transparent" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 9999,
                    border: "3px solid #000",
                    background: "#000",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 22,
                    padding: "16px 28px",
                    minWidth: 320,
                  }}
                >
                  {c.label}
                </div>
              </a>
            ))}
          </div>

          {/* Rangée du bas */}
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
            {CATS.slice(3).map((c) => (
              <a key={c.slug} href={`/products?cat=${c.slug}`} style={{ WebkitTapHighlightColor: "transparent" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 9999,
                    border: "3px solid #000",
                    background: "#000",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 22,
                    padding: "16px 28px",
                    minWidth: 320,
                  }}
                >
                  {c.label}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
