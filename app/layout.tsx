import './globals.css'
import Image from 'next/image'
import Providers from './providers'
import { Suspense } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Distribution Pagé - Quincaillerie en ligne',
  description: 'Boutique d’outils et de quincaillerie moderne en ligne.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-100 text-gray-900">
        {/* En-tête / Bande noire */}
        <header className="bg-black text-white py-4 flex justify-center items-center">
          <div className="flex items-center space-x-3">
            <Image
              src="/Distribution (3).png"
              alt="Logo Distribution Pagé"
              width={180}
              height={60}
              className="object-contain"
              priority
            />
          </div>
        </header>

        {/* Contenu principal : layout serveur, mais enfants client via <Providers> */}
        <main className="min-h-screen">
          <Providers>
            <Suspense fallback={<p className="text-center p-8 text-gray-500">Chargement...</p>}>
              {children}
            </Suspense>
          </Providers>
        </main>

        {/* Pied de page */}
        <footer className="bg-gray-900 text-gray-300 text-center py-4 mt-8 text-sm">
          © {new Date().getFullYear()} Distribution Pagé — Tous droits réservés
        </footer>
      </body>
    </html>
  )
}
