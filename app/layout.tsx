import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distribution Pagé",
  description: "Boutique — outils, quincaillerie, plomberie, extérieur, électricité",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen text-white relative overflow-x-hidden">
        {/* ===== Image de fond ===== */}
        <img
          src="/bg.jpg?v=3"
          alt="Fond du site"
          className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        />
        <div className="fixed top-0 left-0 w-full h-full bg-black/30 -z-10" />
        {/* ========================= */}

        <CartProvider>
          <Header />
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
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
