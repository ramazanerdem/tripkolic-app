'use client'

import { useFavorites } from '@/context/FavoriteContext'
import { X, Heart } from 'lucide-react'

interface FavoritesModalProps {
  tours: Array<{
    id: number
    title: string
    // Diğer tur özellikleri...
  }>
}

export default function FavoritesModal({ tours }: FavoritesModalProps) {
  const { showFavorites, setShowFavorites, favorites } = useFavorites()

  // Favori ID'lerine göre turları filtrele
  const favoriteTours = tours.filter((tour) => favorites.includes(tour.id))

  if (!showFavorites) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        onClick={() => setShowFavorites(false)}
        className="fixed inset-0 bg-black/50"
      ></div>
      <div className="relative z-10 text-black bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center gap-4 mb-4">
          <Heart className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-bold flex-1">Favori Turlar</h2>
          <button
            onClick={() => setShowFavorites(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          {favoriteTours.length === 0 ? (
            <p className="text-gray-500">Henüz favori turunuz yok.</p>
          ) : (
            favoriteTours.map((tour) => (
              <div key={tour.id} className="border-b pb-2">
                {tour.title}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
