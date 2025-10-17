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
    id: "vis-8mm-zinc-100",
    slug: "vis-traite-8mm-100",
    title: "Vis traitée 8mm (100 pcs)",
    description: "Boîte de 100 vis traitées, parfaites pour projets extérieurs.",
    price: 4.0,
    category: "quincaillerie",
    image: "/maretau.png", // remplace par ta vraie image
  },
  {
    id: "marteau-pro",
    slug: "marteau-pro",
    title: "Marteau professionnel 16 oz",
    description: "Poignée anti-vibration, tête acier trempé.",
    price: 19.99,
    compareAt: 24.99,
    category: "outils",
    image: "/maretau.png",
  },
  {
    id: "ruban-teflon",
    slug: "ruban-teflon",
    title: "Ruban téflon 1/2\"",
    description: "Étanchéité pour raccords de plomberie.",
    price: 1.99,
    category: "plomberie",
    image: "/file.svg",
  },
  {
    id: "rallonge-exterieur",
    slug: "rallonge-exterieur",
    title: "Rallonge extérieure 25m",
    description: "Câble résistant aux intempéries, calibre 14.",
    price: 34.9,
    category: "exterieur",
    image: "/window.svg",
  },
  {
    id: "prise-15a",
    slug: "prise-15a",
    title: "Prise électrique 15A — blanc",
    description: "Installation facile, vis incluses.",
    price: 2.49,
    category: "electricite",
    image: "/globe.svg",
  },
];

export const categories = [
  { slug: "outils", name: "Outils", count: products.filter(p => p.category === "outils").length },
  { slug: "plomberie", name: "Plomberie", count: products.filter(p => p.category === "plomberie").length },
  { slug: "quincaillerie", name: "Quincaillerie", count: products.filter(p => p.category === "quincaillerie").length },
  { slug: "exterieur", name: "Extérieur", count: products.filter(p => p.category === "exterieur").length },
  { slug: "electricite", name: "Électricité", count: products.filter(p => p.category === "electricite").length },
];

export const featured = products;              // pour la section "Populaires"
export const discounted = products.filter(p => p.compareAt); // pour "En rabais"
