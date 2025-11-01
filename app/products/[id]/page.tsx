// app/products/[id]/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { products } from "@/lib/products";

// ---------- Utils ----------
const money = (v: number) =>
  new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD" }).format(v);

function findById(id: string) {
  return products.find((p) => p?.id === id) ?? null;
}

type CartItem = { id: string; title: string; price: number; image: string; qty: number };
const CART_KEY = "dp_cart";

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function writeCart(next: CartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("cart:updated", { detail: next }));
}
function addToCart(item: CartItem) {
  const cart = readCart();
  const i = cart.findIndex((x) => x && x.id === item.id);
  if (i >= 0) cart[i].qty = Math.min(999, Number(cart[i].qty || 0) + item.qty);
  else cart.push(item);
  writeCart(cart);
}
function removeFromCart(id: string) {
  writeCart(readCart().filter((x) => x.id !== id));
}

// ---------- Panier latéral (drawer) + bouton turquoise unique ----------
function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Charger le panier + écouter les updates
  useEffect(() => {
    setCart(readCart());
    const onUpdate = (e: any) => setCart(e?.detail ?? readCart());
    const onOpen = () => setOpen(true);
    window.addEventListener("cart:updated", onUpdate as any);
    window.addEventListener("cart:open", onOpen as any);
    return () => {
      window.removeEventListener("cart:updated", onUpdate as any);
      window.removeEventListener("cart:open", onOpen as any);
    };
  }, []);

  // Masquer tout autre bouton texte "Panier" (blanc) pour garder seulement le turquoise
  useEffect(() => {
    const hidden: Array<HTMLElement & { __prev?: string }> = [];
    const buttons = Array.from(document.querySelectorAll("button")) as HTMLButtonElement[];
    buttons.forEach((b) => {
      const label = (b.textContent || "").trim().toLowerCase();
      if (b.id === "dp-cart-trigger") return;
      if (label.startsWith("panier")) {
        (b as any).__prev = b.style.display;
        b.style.display = "none";
        hidden.push(b as any);
      }
    });
    return () => hidden.forEach((b) => (b.style.display = b.__prev ?? ""));
  }, []);

  const total = useMemo(() => cart.reduce((acc, it) => acc + it.price * it.qty, 0), [cart]);
  const count = useMemo(() => cart.reduce((n, it) => n + it.qty, 0), [cart]);

  return (
    <>
      {/* Bouton turquoise (unique) pour ouvrir le panier */}
      <button
        id="dp-cart-trigger"
        type="button"
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 50,
          appearance: "none",
          padding: "10px 16px",
          borderRadius: 12,
          backgroundColor: "#14b8a6",
          color: "#ffffff",
          fontWeight: 700,
          border: "none",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          cursor: "pointer",
        }}
        onMouseOver={(e) => ((e.currentTarget.style.backgroundColor = "#0d9488"))} // teal-600
        onMouseOut={(e) => ((e.currentTarget.style.backgroundColor = "#14b8a6"))}  // teal-500
      >
        Panier ({count})
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            zIndex: 40,
          }}
        />
      )}

      {/* Drawer à droite */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: 320,
          maxWidth: "85vw",
          background: "#ffffff",
          borderLeft: "1px solid #e5e7eb",
          boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
          transform: `translateX(${open ? "0%" : "100%"})`,
          transition: "transform 200ms ease",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "14px 16px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <strong style={{ fontSize: 18 }}>Votre panier</strong>
          <button
            type="button"
            onClick={() => setOpen(false)}
            style={{
              appearance: "none",
              border: "none",
              background: "transparent",
              fontSize: 22,
              cursor: "pointer",
              lineHeight: 1,
            }}
            aria-label="Fermer"
          >
            ×
          </button>
        </div>

        <div
          style={{
            padding: 16,
            overflowY: "auto",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {cart.length === 0 && <div style={{ color: "#6b7280" }}>Panier vide.</div>}

          {cart.map((it) => (
            <div
              key={it.id}
              style={{
                display: "grid",
                gridTemplateColumns: "64px 1fr auto",
                gap: 10,
                alignItems: "center",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 8,
              }}
            >
              <img
                src={it.image?.startsWith("/") ? it.image : `/${it.image}`}
                alt={it.title}
                style={{ width: 64, height: 64, objectFit: "contain" }}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{it.title}</div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>
                  {it.qty} × {money(it.price)}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700 }}>{money(it.price * it.qty)}</div>
                <button
                  type="button"
                  onClick={() => removeFromCart(it.id)}
                  style={{
                    marginTop: 6,
                    appearance: "none",
                    border: "none",
                    background: "transparent",
                    color: "#ef4444",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  Retirer
                </button>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            padding: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontWeight: 700 }}>Total</div>
          <div style={{ fontWeight: 800 }}>{money(total)}</div>
        </div>
      </aside>
    </>
  );
}

// ---------- Page produit ----------
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
  const total = useMemo(
    () => Math.max(1, Math.min(999, Number(qty) || 1)) * product.price,
    [qty, product.price]
  );

  const handleAdd = (e: any) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: img,
      qty: Math.max(1, Math.min(999, Number(qty) || 1)),
    });
    // ouvrir le tiroir après l’ajout
    window.dispatchEvent(new Event("cart:open"));
  };

  return (
    <section style={{ background: "#ffffff" }}>
      {/* Tiroir panier (avec bouton turquoise unique) */}
      <CartDrawer />

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
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Zone blanche pour tout le texte */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              padding: "32px",
              color: "#111827",
              boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
            }}
          >
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

            {"description" in product && (product as any).description && (
              <p style={{ marginTop: 16, color: "#374151", whiteSpace: "pre-line", lineHeight: 1.6 }}>
                {(product as any).description}
              </p>
            )}

            {/* LIGNE 1 : Quantité */}
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
                  if (Number.isFinite(n)) setQty(Math.max(1, Math.min(999, n)));
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

            {/* ESPACE */}
            <div style={{ height: 12 }} />

            {/* LIGNE 2 : Total */}
            <div style={{ fontSize: 18, fontWeight: 600, color: "#111827" }}>
              Total : <span>{money(total)}</span>
            </div>

            {/* ESPACE */}
            <div style={{ height: 12 }} />

            {/* LIGNE 3 : Bouton turquoise Ajouter au panier */}
            <button
              type="button"
              onClick={handleAdd}
              style={{
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px 28px",
                borderRadius: 12,
                fontSize: 18,
                fontWeight: 700,
                backgroundColor: "#14b8a6",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
              onMouseOver={(e) => ((e.currentTarget.style.backgroundColor = "#0d9488"))}
              onMouseOut={(e) => ((e.currentTarget.style.backgroundColor = "#14b8a6"))}
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
