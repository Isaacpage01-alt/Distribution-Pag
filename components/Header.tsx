"use client";
import Link from "next/link";
import { useState } from "react";
import CartDrawer from "@/components/CartDrawer";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.svg" alt="Distribution Pagé" className="h-8 w-auto" />
        </Link>

        <div className="flex-1">
          <input
            type="search"
            placeholder="Rechercher un produit…"
            className="w-full h-10 rounded-full bg-white/95 text-gray-900 px-4 outline-none border border-cyan-400/60 focus:border-cyan-400"
          />
        </div>

        <nav className="flex items-center gap-3">
          <Link href="/products" className="hidden sm:inline text-sm hover:underline">Boutique</Link>
          <button
            onClick={() => setOpen(true)}
            className="rounded-full bg-cyan-400 text-black px-4 py-2 text-sm font-medium hover:brightness-110"
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
