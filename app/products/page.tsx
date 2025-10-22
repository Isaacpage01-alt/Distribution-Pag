// app/products/page.tsx
export const dynamic = "force-static";

// --------- Remplace ceci par ton vrai import si tu veux ---------
// import { products } from "@/lib/products";
type P = {
  id: string | number;
  title: string;
  image: string;
  price: number;
  compareAt?: number;
  category?: string;
  categorySlug?: string;
};
// Mini dataset de secours si l'import n'existe pas (évite un build cassé)
const products: P[] = [
  { id: 1, title: "Marteau 16
