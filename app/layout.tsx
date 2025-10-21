import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distribution Pagé",
  description: "Outils, quincaillerie, plomberie, électricité, intérieur, extérieur",
};

// >>> force du 100% statique côté Edge (pas de serverless Node)
export const dynamic = "force-static";
export const runtime = "edge";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen text-white relative overflow-x-hidden">
        {/* Fond image FIXE derrière tout */}
        <div className="fixed inset-0 -z-10">
          <img src="/bg.jpg?v=8" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
