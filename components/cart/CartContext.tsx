'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type CartItem = {
  id: string
  titre: string
  prix: number
  qty: number
  image?: string
}

type CartCtx = {
  items: CartItem[]
  total: number
  add: (item: CartItem) => void
  remove: (id: string) => void
  clear: () => void
  setQty: (id: string, qty: number) => void
}

const Ctx = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Charger depuis localStorage (côté client uniquement)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('dp_cart')
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  // Sauvegarder à chaque changement
  useEffect(() => {
    try {
      localStorage.setItem('dp_cart', JSON.stringify(items))
    } catch {}
  }, [items])

  const add = (item: CartItem) => {
    setItems(prev => {
      const i = prev.findIndex(p => p.id === item.id)
      if (i >= 0) {
        const copy = [...prev]
        copy[i] = { ...copy[i], qty: copy[i].qty + item.qty }
        return copy
      }
      return [...prev, item]
    })
  }

  const remove = (id: string) => setItems(prev => prev.filter(p => p.id !== id))
  const clear = () => setItems([])
  const setQty = (id: string, qty: number) =>
    setItems(prev => prev.map(p => (p.id === id ? { ...p, qty } : p)))

  const total = useMemo(
    () => items.reduce((sum, it) => sum + it.prix * it.qty, 0),
    [items]
  )

  const value = useMemo(() => ({ items, total, add, remove, clear, setQty }), [items, total])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('CartContext indisponible')
  return ctx
}
