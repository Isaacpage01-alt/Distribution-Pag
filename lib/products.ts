// lib/products.ts

export type Product = {
  id: string;
  title: string;
  price: number;            // prix par unité
  image: string;
  category: string;         // libellé visible
  categorySlug: string;     // pour les filtres (ex: "outils")
  compareAt?: number;       // pour montrer un prix barré si > price
  packOptions?: number[];   // ex: [50, 75, 100, 200]
};

export const products: Product[] = [
  // =============== OUTILS ===============
  {
    id: "out-001",
    title: "Marteau 16 oz manche fibre",
    price: 19.99,
    compareAt: 24.99,
    image: "/vercel.svg",
    category: "outils",
    categorySlug: "outils",
  },
  {
    id: "out-002",
    title: "Tournevis cruciforme #2",
    price: 5.49,
    image: "/next.svg",
    category: "outils",
    categorySlug: "outils",
  },
  {
    id: "out-003",
    title: "Jeu de clés Allen (9 pcs)",
    price: 8.9,
    image: "/window.svg",
    category: "outils",
    categorySlug: "outils",
  },

  // ============ QUINCAILLERIE ===========
  {
    id: "qui-001",
    title: "Vis traitée 8×1 (acier zingué)",
    price: 0.04, // 4 cents/unité → pack 100 = 4.00$
    compareAt: 0.05,
    image: "/file.svg",
    category: "quincaillerie",
    categorySlug: "quincaillerie",
    packOptions: [50, 75, 100, 200],
  },
  {
    id: "qui-002",
    title: "Boulon M8 × 30 mm",
    price: 0.12,
    image: "/globe.svg",
    category: "quincaillerie",
    categorySlug: "quincaillerie",
    packOptions: [10, 25, 50, 100],
  },
  {
    id: "qui-003",
    title: "Écrous M8 (lot)",
    price: 0.09,
    image: "/thirteen.svg",
    category: "quincaillerie",
    categorySlug: "quincaillerie",
    packOptions: [25, 50, 100, 200],
  },

  // ============== PLOMBERIE =============
  {
    id: "plo-001",
    title: "Clé à tuyau 14\"",
    price: 14.5,
    image: "/next.svg",
    category: "plomberie",
    categorySlug: "plomberie",
  },
  {
    id: "plo-002",
    title: "Ruban téflon (12 m)",
    price: 1.99,
    image: "/vercel.svg",
    category: "plomberie",
    categorySlug: "plomberie",
  },
  {
    id: "plo-003",
    title: "Joint torique universel (x10)",
    price: 0.3,
    image: "/file.svg",
    category: "plomberie",
    categorySlug: "plomberie",
    packOptions: [10, 20, 50, 100],
  },

  // ============ ÉLECTRICITÉ =============
  {
    id: "ele-001",
    title: "Prise murale 15A blanche",
    price: 3.49,
    compareAt: 4.49,
    image: "/window.svg",
    category: "électricité",
    categorySlug: "electricite",
  },
  {
    id: "ele-002",
    title: "Interrupteur 3 positions",
    price: 6.99,
    image: "/globe.svg",
    category: "électricité",
    categorySlug: "electricite",
  },
  {
    id: "ele-003",
    title: "Serre-câble nylon (x100)",
    price: 0.05,
    image: "/file.svg",
    category: "électricité",
    categorySlug: "electricite",
    packOptions: [50, 100, 200, 500],
  },

  // ============== INTÉRIEUR =============
  {
    id: "int-001",
    title: "Peinture intérieure — blanc mat (1L)",
    price: 29.9,
    compareAt: 34.9,
    image: "/vercel.svg",
    category: "intérieur",
    categorySlug: "interieur",
  },
  {
    id: "int-002",
    title: "Poignée de porte noire (set)",
    price: 24.95,
    image: "/next.svg",
    category: "intérieur",
    categorySlug: "interieur",
  },
  {
    id: "int-003",
    title: "Butée de porte (x2)",
    price: 3.2,
    image: "/window.svg",
    category: "intérieur",
    categorySlug: "interieur",
  },

  // ============== EXTÉRIEUR =============
  {
    id: "ext-001",
    title: "Pelle aluminium",
    price: 24.9,
    image: "/vercel.svg",
    category: "extérieur",
    categorySlug: "exterieur",
  },
  {
    id: "ext-002",
    title: "Arrosoir 10L",
    price: 12.9,
    image: "/globe.svg",
    category: "extérieur",
    categorySlug: "exterieur",
  },
  {
    id: "ext-003",
    title: "Ruban d’étanchéité extérieur (5 m)",
    price: 8.5,
    compareAt: 10.5,
    image: "/file.svg",
    category: "extérieur",
    categorySlug: "exterieur",
  },
];

// Produits à mettre en avant (ex: page d’accueil — section “Populaires”)
export const featured: Product[] = [
  products[0],  // Marteau
  products[3],  // Vis 8x1
  products[9],  // Prise murale
  products[12], // Peinture intérieure
  products[15], // Pelle
  products[1],  // Tournevis
  products[4],  // Boulon
  products[10], // Interrupteur
  products[7],  // Ruban téflon
  products[13], // Poignée de porte
  products[5],  // Écrous
  products[2],  // Allen
];

// Produits en rabais (compareAt > price)
export const discounted: Product[] = products.filter(
  (p) => typeof p.compareAt === "number" && (p.compareAt as number) > p.price
);
