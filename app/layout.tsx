import './globals.css';
import type { Metadata } from 'next';
import { CartProvider } from '@/components/cart/CartContext';
import MiniCart from '@/components/MiniCart';
import MobileCart from '@/components/MobileCart'
export const metadata: Metadata = {
  title: 'Distribution Pagé — Quincaillerie en ligne',
  description: 'Boutique de quincaillerie — Populaires, rabais, catégories.',
};

const BANNER_SRC = '/banniere.png'; // mets le bon nom si différent

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-white text-black">
        <CartProvider>
          {/* Bannière plein largeur */}
          <header className="relative w-full">
            <img
              src={BANNER_SRC}
              alt="Bannière Distribution Pagé"
              className="block w-full h-56 md:h-72 lg:h-80 object-cover"
            />
          </header>

          {/* Mini-cart fixe à gauche (desktop) */}
          <MiniCart />
<MiniCart />     {/* visible à partir de md (bureau) */}
<MobileCart />   {/* bouton + tiroir (mobile) */}

          {/* Décale le contenu pour ne pas passer sous le mini-cart sur desktop */}
          <main className="md:pl-72">
            {children}
          </main>

          <footer className="mt-16 border-t">
            <div className="container mx-auto px-4 py-8 text-sm text-gray-600">
              © {new Date().getFullYear()} Distribution Pagé — $CAD
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
