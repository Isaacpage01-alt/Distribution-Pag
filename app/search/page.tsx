// notepad .\app\search\page.tsx
import { PRODUCTS } from '@/lib/products'
import { ProductCard } from '@/components/ProductCard'

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q ?? '').toLowerCase().trim()
  const list = PRODUCTS.filter(p =>
    !q ||
    p.titre.toLowerCase().includes(q) ||
    p.categorie.toLowerCase().includes(q) ||
    (q === 'populaire' && p.populaire) ||
    (q === 'rabais' && p.rabais)
  )
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Recherche : {q || 'tous les produits'}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {list.map(p => <ProductCard key={p.id} product={p} />)}
        {list.length === 0 && <div className="text-gray-500">Aucun résultat…</div>}
      </div>
    </div>
  )
}
