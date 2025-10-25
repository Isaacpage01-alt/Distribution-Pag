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

export const dynamic = "force-static";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen text-white relative overflow-x-hidden">
        {/* Fond */}
        <Bg />

        {/* Bannière tout en haut */}
        <Banner />

        {/* Header + Panier juste sous la bannière */}
        <CartProvider>
          <Header />

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
