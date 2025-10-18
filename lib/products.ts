export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  compareAt?: number;
  category: "outils" | "quincaillerie" | "plomberie" | "electricite" | "interieur" | "exterieur";
  image: string;
};

export const products: Product[] = [
  { id: "marteau-pro", slug: "marteau-pro", title: "Marteau 16 oz", description: "Poignée anti-vibration.", price: 19.99, compareAt: 24.99, category: "outils", image: "/maretau.png" },
  { id: "vis-8mm-100", slug: "vis-8mm-100", title: "Vis 8mm (100)", description: "Boîte de 100 vis traitées.", price: 4.00, category: "quincaillerie", image: "/maretau.png" },
  { id: "ruban-teflon", slug: "ruban-teflon", title: "Ruban téflon 1/2\"", description: "Étanchéité raccords.", price: 1.99, category: "plomberie", image: "/file.svg" },
  { id: "prise-15a", slug: "prise-15a", title: "Prise 15A", description: "Branchement facile.", price: 2.49, category: "electricite", image: "/globe.svg" },
  { id: "peinture-mate", slug: "peinture-mate", title: "Peinture intérieure mate", description: "1 L — haute couvrance.", price: 18.90, category: "interieur", image: "/window.svg" },
  { id: "rallonge-ext", slug: "rallonge-ext", title: "Rallonge extérieure 25m", description: "Résistante aux intempéries.", price: 34.90, category: "exterieur", image: "/window.svg" },
];

export const categories = [
  { slug: "outils", name: "Outils", count: products.filter(p=>p.category==="outils").length },
  { slug: "quincaillerie", name: "Quincaillerie", count: products.filter(p=>p.category==="quincaillerie").length },
  { slug: "plomberie", name: "Plomberie", count: products.filter(p=>p.category==="plomberie").length },
  { slug: "electricite", name: "Électricité", count: products.filter(p=>p.category==="electricite").length },
  { slug: "interieur", name: "Intérieur", count: products.filter(p=>p.category==="interieur").length },
  { slug: "exterieur", name: "Extérieur", count: products.filter(p=>p.category==="exterieur").length },
] as const;

export const featured = products;
export const discounted = products.filter(p => typeof p.compareAt === "number");
