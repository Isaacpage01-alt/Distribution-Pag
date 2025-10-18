export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  compareAt?: number;
  category: "outils" | "plomberie" | "quincaillerie" | "exterieur" | "electricite";
  image: string;
};

export const products: Product[] = [
  {
    id: "marteau-pro",
    slug: "marteau-pro",
    title: "Marteau 16 oz",
    description: "Poignée anti-vibration, tête acier trempé.",
    price: 19.99,
    compareAt: 24.99,
    category: "outils",
    image: "/maretau.png"
  },
  {
    id: "vis-8mm-100",
    slug: "vis-8mm-100",
    title: "Vis 8mm (100)",
    description: "Boîte de 100 vis traitées.",
    price: 4.0,
    category: "quincaillerie",
    image: "/maretau.png"
  },
  {
    id: "ruban-teflon",
    slug: "ruban-teflon",
    title: "Ruban téflon 1/2\"",
    description: "Étanchéité pour raccords.",
    price: 1.99,
    category: "plomberie",
    image: "/file.svg"
  }
];

export const categories = [
  { slug: "outils", name: "Outils", count: products.filter(p=>p.category==="outils").length },
  { slug: "plomberie", name: "Plomberie", count: products.filter(p=>p.category==="plomberie").length },
  { slug: "quincaillerie", name: "Quincaillerie", count: products.filter(p=>p.category==="quincaillerie").length },
  { slug: "exterieur", name: "Extérieur", count: products.filter(p=>p.category==="exterieur").length },
  { slug: "electricite", name: "Électricité", count: products.filter(p=>p.category==="electricite").length }
] as const;

export const featured = products;
export const discounted = products.filter(p => typeof p.compareAt === "number");
