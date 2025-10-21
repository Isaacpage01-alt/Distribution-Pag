import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distribution Pagé",
  description: "Outils, quincaillerie, plomberie, électricité, intérieur, extérieur",
};

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
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
