// notepad .\components\SearchBar.tsx
'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SearchBar({ placeholder='Rechercher des produits...' }: { placeholder?: string }) {
  const router = useRouter()
  const sp = useSearchParams()
  const [q, setQ] = useState(sp.get('q') ?? '')

  useEffect(() => { setQ(sp.get('q') ?? '') }, [sp])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <form onSubmit={submit} className="w-full max-w-xl flex gap-2">
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        className="flex-1 border rounded-xl px-3 py-2"
        placeholder={placeholder}
      />
      <button className="px-4 py-2 rounded-xl bg-teal-500 text-white">Rechercher</button>
    </form>
  )
}
