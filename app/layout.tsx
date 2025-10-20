import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distribution Pagé",
  description: "Outils, quincaillerie, plomberie, électricité, intérieur, extérieur",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen text-white relative overflow-x-hidden">
        {/* FOND IMAGE FIABLE */}
        <div className="fixed inset-0 -z-10">
          <img
            src="/bg.jpg?v=7"   // change v=7 si besoin pour casser le cache
            alt=""
            className="w-full h-full object-cover"
          />
          {/* voile pour la lisibilité, ajuste ou supprime si tu veux */}
          <div className="absolute inset-0 bg-black/25" />
        </div>

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
