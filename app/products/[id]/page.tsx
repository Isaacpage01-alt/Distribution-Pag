// app/products/[id]/page.tsx
"use client";

import { useState, useMemo } from "react";
import { products } from "@/lib/products";

const money = (v: number) =>
  new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD" }).format(v);

function findById(id: string) {
  return products.find((p) => p?.id === id) ?? null;
}

export default function Page({ params }: { params: { id: string } }) {
  const product = findById(params.id);
  const [qty, setQty] = useState<number>(1);

  if (!product) {
    return (
      <section style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 24px" }}>
          <h1 style={{ fontSize: 24, fontWeight: 600 }}>Produit introuvable</h1>
          <p style={{ color: "#4b5563", marginTop: 8 }}>ID: {params.id}</p>
        </div>
      </section>
    );
  }

  const img = product.image?.startsWith("/") ? product.image : `/${product.image}`;
  const total = useMemo(() => Math.max(1, Math.min(999, Number(qty) || 1)) * product.price, [qty, product.price]);

  return (
    // Bande blanche derrière toute la section
    <section style={{ background: "#ffffff" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 24px" }}>
        {/* 2 colonnes */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            alignItems: "stretch",
          }}
        >
          {/* IMAGE GAUCHE */}
          <div style={{ position: "relative", height: 520, background: "#fff" }}>
            <img
              src={img}
              alt={product.title}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>

          {/* Panneau blanc pour TOUT le texte (forcé en blanc) */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              padding: "32px",
              color: "#111827",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
            }}
          >
            {/* Titre + prix */}
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.2 }}>{product.title}</h1>

              {/* Prix avec libellé */}
              <div style={{ marginTop: 12, display: "flex", alignItems: "baseline", gap: 12 }}>
                <p style={{ fontSize: 22, fontWeight: 600 }}>
                  <span style={{ fontWeight: 500, marginRight: 8 }}>Prix :</span>
                  {money(product.price)}
                </p>
                {"compareAt" in product &&
                  typeof (product as any).compareAt === "number" &&
                  (product as any).compareAt > product.price && (
                    <span style={{ fontSize: 14, color: "#6b7280", textDecoration: "line-through" }}>
                      {money((product as any).compareAt as number)}
                    </span>
                  )}
              </div>

              {/* Description */}
              {"description" in product && (product as any).description && (
                <p style={{ marginTop: 16, color: "#374151", whiteSpace: "pre-line", lineHeight: 1.6 }}>
                  {(product as any).description}
                </p>
              )}

              {/* Ligne 1 : Quantité (placée juste sous le prix) */}
              <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 12 }}>
                <label htmlFor="qty" style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>
                  Quantité
                </label>
                <input
                  id="qty"
                  type="number"
                  min={1}
                  max={999}
                  value={qty}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    if (Number.isFinite(n)) {
                      const clamped = Math.max(1, Math.min(999, n));
                      setQty(clamped);
                    }
                  }}
                  style={{
                    width: 96,
                    padding: "8px 12px",
                    borderRadius: 10,
                    border: "1px solid #d1d5db",
                    outline: "none",
                    fontSize: 16,
                  }}
                />
              </div>

              {/* Espace clair entre quantité et total */}
              <div style={{ height: 12 }} />

              {/* Ligne 2 : Total */}
              <div style={{ fontSize: 18, fontWeight: 600, color: "#111827" }}>
                Total : <span>{money(total)}</span>
              </div>

              {/* Espace clair entre total et bouton */}
              <div style={{ height: 12 }} />

              {/* Ligne 3 : Bouton turquoise, moins large, plus haut */}
              <button
                type="button"
                onClick={() => console.log("Ajouter au panier:", product.id, qty)}
                // On FORCE turquoise et le style bouton (si ton CSS global écrase Tailwind)
                style={{
                  appearance: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 28px", // plus haut
                  borderRadius: 12,
                  fontSize: 18,
                  fontWeight: 700,
                  backgroundColor: "#14b8a6", // teal-500
                  color: "#ffffff",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
                onMouseOver={(e) => ((e.currentTarget.style.backgroundColor = "#0d9488"))}  // teal-600
                onMouseOut={(e) => ((e.currentTarget.style.backgroundColor = "#14b8a6"))}   // teal-500
              >
                Ajouter au panier
              </button>
            </div>

            {/* Stock (facultatif) */}
            {"inStock" in product &&
              ((product as any).inStock === false ? (
                <p style={{ marginTop: 16, fontSize: 14, color: "#dc2626" }}>Rupture de stock</p>
              ) : (
                <p style={{ marginTop: 16, fontSize: 14, color: "#047857" }}>En stock</p>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
