// app/layout.tsx
import "./globals.css";

export const dynamic = "force-static";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body
        style={{
          minHeight: "100vh",
          color: "#fff",
          backgroundColor: "#000",
        }}
      >
        {children}
      </body>
    </html>
  );
}
