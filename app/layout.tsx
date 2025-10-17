export const dynamic = "force-static";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";

export const metadata = {
  title: "Distribution Pagé",
  description: "Boutique — outils, quincaillerie, plomberie, extérieur, électricité",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full bg-gray-50">
      <body className="min-h-screen text-gray-900">
        <CartProvider>
          <Header />
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">{children}</main>
          <footer className="border-t py-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Distribution Pagé
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
