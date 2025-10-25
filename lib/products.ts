export type Product = {
  id: string;
  title: string;
  price: number;
  compareAt?: number;
  image: string;
  category: string;
  categorySlug: string;
};

export const products: Product[] = [
  { id: "m01", title: "Marteau 16 oz", price: 19.99, compareAt: 23.99, image: "/maretau.png", category: "outils", categorySlug: "outils" },
  { id: "v01", title: "Vis 8×1 (100)", price: 4.0, image: "/file.svg", category: "quincaillerie", categorySlug: "quincaillerie" },
  { id: "p01", title: "Clé à tuyau", price: 14.5, image: "/globe.svg", category: "plomberie", categorySlug: "plomberie" },
  { id: "e01", title: "Prise murale", price: 6.49, image: "/next.svg", category: "électricité", categorySlug: "electricite" },
  { id: "i01", title: "Peinture intérieure", price: 29.9, compareAt: 34.9, image: "/window.svg", category: "intérieur", categorySlug: "interieur" },
  { id: "x01", title: "Pelle extérieure", price: 24.9, image: "/vercel.svg", category: "extérieur", categorySlug: "exterieur" },
];

export const featured = products; // démo
export const discounted = products.filter((p) => p.compareAt && p.compareAt > p.price);
