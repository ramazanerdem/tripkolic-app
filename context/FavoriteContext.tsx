'use client'

import { createContext, useContext, useState } from 'react'

type FavoriteContextType = {
  favorites: number[]
  toggleFavorite: (tourId: number) => void
  showFavorites: boolean
  setShowFavorites: (show: boolean) => void
}

const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  toggleFavorite: () => {},
  showFavorites: false,
  setShowFavorites: () => {},
})

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([])
  const [showFavorites, setShowFavorites] = useState(false)

  const toggleFavorite = (tourId: number) => {
    setFavorites((prev) =>
      prev.includes(tourId)
        ? prev.filter((id) => id !== tourId)
        : [...prev, tourId]
    )
  }

  return (
    <FavoriteContext.Provider
      value={{ favorites, toggleFavorite, showFavorites, setShowFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoriteContext)
