"use client";
import Link from "next/link";
import { useState } from "react";
import CartDrawer from "@/components/CartDrawer";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-black/80 backdrop-blur text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          {/* ton logo est dans la bannière; ici on laisse un lien Accueil minimal */}
          <span className="font-semibold">Distribution Pagé</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/products" className="hover:underline">Produits</Link>
          <button
            onClick={() => setOpen(true)}
            className="rounded-full bg-cyan-400 text-black px-4 py-2 font-medium hover:brightness-110"
            aria-label="Ouvrir le panier"
          >
            Panier
          </button>
        </nav>
      </div>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
