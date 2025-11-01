// components/CartDrawer.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type CartItem = { id: string; title: string; price: number; image: string; qty: number };
const CART_KEY = "dp_cart";
const money = (v: number) => new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD" }).format(v);

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try { const raw = localStorage.getItem(CART_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}
function writeCart(next: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("cart:updated", { detail: next }));
}
export function addToCart(item: CartItem) {
  const cart = readCart();
  const i = cart.findIndex((x) => x && x.id === item.id);
  if (i >= 0) cart[i].qty = Math.min(999, Number(cart[i].qty || 0) + item.qty);
  else cart.push(item);
  writeCart(cart);
  window.dispatchEvent(new Event("cart:open")); // ouvrir automatiquement
}
function removeFromCart(id: string) {
  writeCart(readCart().filter((x) => x.id !== id));
}

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Charger + écouter maj
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

  // Masquer les autres boutons “Panier” (blancs) du header si présents
  useEffect(() => {
    const hidden: Array<HTMLElement & { __prev?: string }> = [];
    const buttons = Array.from(document.querySelectorAll("button")) as HTMLButtonElement[];
    buttons.forEach((b) => {
      const txt = (b.textContent || "").trim().toLowerCase();
      if (b.id === "dp-cart-trigger") return;         // garder notre bouton turquoise
      if (txt.startsWith("panier")) {
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
      {/* Bouton turquoise fixe en haut-droite */}
      <button
        id="dp-cart-trigger"
        type="button"
        onClick={() => setOpen(true)}
        style={{
          position: "fixed", top: 16, right: 16, zIndex: 50,
          appearance: "none", padding: "10px 16px", borderRadius: 12,
          backgroundColor: "#14b8a6", color: "#fff", fontWeight: 700,
          border: "none", boxShadow: "0 2px 6px rgba(0,0,0,0.15)", cursor: "pointer",
        }}
        onMouseOver={(e) => ((e.currentTarget.style.backgroundColor = "#0d9488"))}
        onMouseOut={(e) => ((e.currentTarget.style.backgroundColor = "#14b8a6"))}
      >
        Panier ({count})
      </button>

      {/* Overlay */}
      {open && (
        <div onClick={() => setOpen(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 40,
        }} />
      )}

      {/* Drawer */}
      <aside style={{
        position: "fixed", top: 0, right: 0, height: "100vh", width: 320, maxWidth: "85vw",
        background: "#fff", borderLeft: "1px solid #e5e7eb", boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
        transform: `translateX(${open ? "0%" : "100%"})`, transition: "transform 200ms ease",
        zIndex: 50, display: "flex", flexDirection: "column",
      }}>
        <div style={{
          padding: "14px 16px", borderBottom: "1px solid #e5e7eb",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <strong style={{ fontSize: 18 }}>Votre panier</strong>
          <button type="button" onClick={() => setOpen(false)} style={{
            appearance: "none", border: "none", background: "transparent", fontSize: 22, cursor: "pointer", lineHeight: 1,
          }}>×</button>
        </div>

        <div style={{ padding: 16, overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
          {cart.length === 0 && <div style={{ color: "#6b7280" }}>Panier vide.</div>}
          {cart.map((it) => (
            <div key={it.id} style={{
              display: "grid", gridTemplateColumns: "64px 1fr auto", gap: 10, alignItems: "center",
              border: "1px solid #e5e7eb", borderRadius: 12, padding: 8,
            }}>
              <img src={it.image?.startsWith("/") ? it.image : `/${it.image}`} alt={it.title}
                   style={{ width: 64, height: 64, objectFit: "contain" }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{it.title}</div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>{it.qty} × {money(it.price)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700 }}>{money(it.price * it.qty)}</div>
                <button type="button" onClick={() => removeFromCart(it.id)} style={{
                  marginTop: 6, appearance: "none", border: "none", background: "transparent",
                  color: "#ef4444", cursor: "pointer", fontSize: 12, fontWeight: 600,
                }}>Retirer</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: "1px solid #e5e7eb", padding: 16,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ fontWeight: 700 }}>Total</div>
          <div style={{ fontWeight: 800 }}>{money(total)}</div>
        </div>
      </aside>
    </>
  );
}
