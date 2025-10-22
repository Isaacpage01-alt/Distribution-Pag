import "./globals.css";
import type { Metadata } from "next";

import Bg from "@/components/Bg";
import Banner from "@/components/Banner";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Distribution Pagé",
  description:
    "Outils, quincaillerie, plomberie, électricité, intérieur et extérieur.",
};

// Génération statique (évite les erreurs edge/dynamic)
export const dynamic = "force-static";

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen text-white relative overflow-x-hidden">
        {/* Fond plein écran */}
        <Bg />

        {/* 1) Bannière tout en haut */}
        <Banner />

        {/* 2) Header (avec Panier) sous la bannière + contexte panier */}
        <CartProvider>
          <Header />

          {/* Contenu principal */}
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-300">
            © {new Date().getFullYear()} Distribution Pagé
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
