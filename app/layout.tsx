import "./globals.css";
import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Bg from "@/components/Bg";

export const metadata: Metadata = {
  title: "Distribution Pagé",
  description: "Outils, quincaillerie, plomberie, électricité, intérieur et extérieur.",
};

export const dynamic = "force-static";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="relative min-h-screen overflow-x-hidden text-white">
        <Bg />
        <Banner />
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
