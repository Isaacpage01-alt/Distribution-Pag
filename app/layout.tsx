import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distribution Pagé",
  description: "Outils, quincaillerie, plomberie, électricité, intérieur, extérieur",
};

// Pages statiques (pas de serverless) → évite 504 et 404
export const dynamic = "force-static";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body
        style={{
          backgroundImage: "url('/bg.jpg?v=1')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#000",
        }}
        className="min-h-screen text-white"
      >
        <CartProvider>
          <Header />
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
