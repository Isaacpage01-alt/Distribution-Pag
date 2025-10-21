import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distribution Pagé",
  description: "Outils, quincaillerie, plomberie, électricité, intérieur, extérieur",
};

// On garde l'accueil statique pour éviter tout 504
export const dynamic = "force-static";
export const runtime = "edge";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body
        // 👇 Fond imposé en inline style (impossible à “purger”/ignorer)
        style={{
          backgroundImage: "url('/bg.jpg?v=10')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          // couleur fallback si l'image ne charge pas
          backgroundColor: "#000000",
        }}
        className="min-h-screen text-white"
      >
        <CartProvider>
          <Header />
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            {/* Petit bloc debug : lien direct vers l'image (n'apparaît qu'aux lecteurs d'écran, n'affecte pas le design) */}
            <a href="/bg.jpg?v=10" className="sr-only">Voir l'image de fond</a>
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
