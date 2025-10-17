"use client";
import Link from "next/link";
import { useState } from "react";
import CartDrawer from "@/components/CartDrawer";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Distribution Pagé" className="h-8" />
            <span className="hidden sm:block font-semibold">Distribution Pagé</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm text-gray-700">
            <Link href="/products?cat=outils" className="hover:text-blue-600">Outils</Link>
            <Link href="/products?cat=plomberie" className="hover:text-blue-600">Plomberie</Link>
            <Link href="/products?cat=quincaillerie" className="hover:text-blue-600">Quincaillerie</Link>
            <Link href="/products?cat=exterieur" className="hover:text-blue-600">Extérieur</Link>
            <Link href="/products?cat=electricite" className="hover:text-blue-600">Électricité</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/products" className="text-sm hover:underline">Boutique</Link>
          <button onClick={() => setOpen(true)} className="rounded-xl border px-3 py-2 text-sm hover:shadow">Panier</button>
        </div>
      </div>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
