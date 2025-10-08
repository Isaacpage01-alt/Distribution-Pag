export const CATEGORIES = [
  { slug: 'quincaillerie', label: 'Quincaillerie' },
  { slug: 'outils', label: 'Outils' },
  { slug: 'plomberie', label: 'Plomberie' },
  { slug: 'electricite', label: 'Électricité' },
] as const;

export type CategorySlug = typeof CATEGORIES[number]['slug'];

export type Product = {
  id: string;         // sans espaces ni accents
  titre: string;
  prix: number;       // utiliser le point pour les décimales
  categorie: CategorySlug;
  populaire?: boolean;
  rabais?: boolean;
  image?: string;     // ex: '/images/marteau.jpg'
};

export const PRODUCTS: Product[] = [
  { id: 'vis-traitees-2-8mm',      titre: 'Vis traitées 2’’ 8 mm',     prix: 4.00,  categorie: 'quincaillerie', image: '/images/vis.jpg' },
  { id: 'marteau-charpentier-325g', titre: 'Marteau charpentier 325 g', prix: 18.99, categorie: 'outils',        populaire: true,          image: '/images/mareteau.png' },
  { id: 'perceuse-compacte',        titre: 'Perceuse compacte 12V',     prix: 99.99, categorie: 'outils',        populaire: true, rabais: true, image: '/images/perceuse.jpg' },
  { id: 'ruban-teflon',             titre: 'Ruban téflon 1/2”',         prix: 1.99,  categorie: 'plomberie',     image: '/images/ruban.jpg' },
  { id: 'prise-exterieure-gfci',    titre: 'Prise extérieure GFCI',     prix: 22.50, categorie: 'electricite',   rabais: true,             image: '/images/prise.jpg' },
];
