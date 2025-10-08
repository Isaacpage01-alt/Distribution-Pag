// notepad .\app\categorie\[slug]\page.tsx
import { PRODUCTS, CATEGORIES } from '@/lib/products'
import { ProductCard } from '@/components/ProductCard'
import Link from 'next/link'

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = CATEGORIES.find(c => c.slug === params.slug)
  const list = PRODUCTS.filter(p => p.categorie === params.slug)

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center gap-3 text-sm text-gray-600">
        <Link href="/">Accueil</Link>
        <span>/</span>
        <span className="capitalize">{cat?.label ?? params.slug}</span>
      </div>
      <h1 className="text-2xl font-bold">{cat?.label ?? params.slug}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {list.map(p => <ProductCard key={p.id} product={p} />)}
        {list.length === 0 && <div className="text-gray-500">Aucun produit dans cette catégorie.</div>}
      </div>
    </div>
  )
}
