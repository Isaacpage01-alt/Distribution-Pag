"use client";
import { useState, type ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        <header
          style={{
            background: "#fff",
            borderBottom: "1px solid #eee",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 50
          }}
        >
          <img src="/logo.png" alt="Distribution Pagé" style={{ height: 50 }} />
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: "#00c2a8",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              cursor: "pointer"
            }}
          >
            🛒 Panier
          </button>
        </header>

        <main>{children}</main>

        {open && (
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: 300,
              height: "100%",
              background: "#fff",
              boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
              padding: 20
            }}
          >
            <h2>Mon panier</h2>
            <p>Aucun produit ajouté pour l’instant.</p>
            <button
              onClick={() => setOpen(false)}
              style={{
                marginTop: 20,
                background: "#00c2a8",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "8px 16px",
                cursor: "pointer"
              }}
            >
              Fermer
            </button>
          </div>
        )}

        <style>{`header,.top-banner,.site-header{background:#fff!important}`}</style>
      </body>
    </html>
  );
}
