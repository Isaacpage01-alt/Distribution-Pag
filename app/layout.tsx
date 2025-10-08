import './globals.css'
import { Suspense } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Distribution Pagé',
  description: 'Boutique en ligne de quincaillerie moderne – outils, plomberie, électricité et plus.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-100 text-gray-900">
        {/* --- Bande noire du haut avec logo --- */}
        <header className="bg-black text-white py-4 shadow-md flex items-center justify-center">
          <img
            src="/Distribution (3).png"
            alt="Logo Distribution Pagé"
            className="h-12 mr-3"
          />
          <h1 className="text-2xl font-bold tracking-wide">Distribution Pagé</h1>
        </header>

        {/* --- Contenu principal entouré d’un Suspense --- */}
        <main className="min-h-screen">
          <Suspense fallback={<p className="text-center p-8 text-gray-500">Chargement...</p>}>
            {children}
          </Suspense>
        </main>

        {/* --- Pied de page --- */}
        <footer className="bg-black text-white text-center py-4 mt-10">
          <p className="text-sm">© {new Date().getFullYear()} Distribution Pagé. Tous droits réservés.</p>
        </footer>
      </body>
    </html>
  )
}
