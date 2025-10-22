"use client";

import Link from "next/link";
import { useState } from "react";
import CartDrawer from "@/components/CartDrawer";
import BackButton from "@/components/BackButton";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-black/70 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BackButton />
            <Link href="/" className="text-white font-semibold hover:underline">
              Distribution Pagé
            </Link>
          </div>

          <nav className="flex items-center gap-6">
            <Link href="/products" className="text-white hover:underline">Produits</Link>
            <button
              onClick={() => setOpen(true)}
              className="rounded-full bg-cyan-400 text-black font-semibold px-4 py-2 hover:brightness-110"
            >
              Panier
            </button>
          </nav>
        </div>
      </header>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
