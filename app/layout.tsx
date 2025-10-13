"use client";

import "./globals.css";
import { type ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-black antialiased">
        {/* BANNIÈRE */}
        <div className="relative w-full">
          <img
            src="/logo.png"
            alt="Distribution Pagé"
            className="w-full h-32 md:h-48 lg:h-56 object-cover"
          />
        </div>

        {/* BARRE SOUS BANNIÈRE (même couleur) */}
        <div
          className="max-w-6xl mx-auto w-full px-4 py-3 flex items-center justify-end border-b"
          style={{ borderColor: "#18CFE6" }}
        >
          <a
            href="#"
            className="rounded-lg px-4 py-2 text-white"
            style={{ backgroundColor: "#18CFE6" }}
          >
            🛒 Panier (test)
          </a>
        </div>

        {/* CONTENU */}
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
