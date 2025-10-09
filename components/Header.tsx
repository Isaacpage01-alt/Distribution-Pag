'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [search, setSearch] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(search)}`
    }
  }

  return (
    <header className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

        {/* Logo à gauche */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo Distribution Pagé"
            width={160}
            height={50}
            priority
            className="object-contain"
          />
        </Link>

        {/* Barre de recherche au centre */}
        <form
          onSubmit={handleSearch}
          className="hidden sm:flex flex-1 justify-center mx-6"
        >
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 text-black rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </form>

        {/* Panier à droite */}
        <div className="flex items-center gap-4">
          <Link href="/checkout" className="relative">
            <Image
              src="/panier.svg"
              alt="Panier"
              width={28}
              height={28}
              className="cursor-pointer hover:scale-110 transition-transform"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}
