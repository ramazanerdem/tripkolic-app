'use client'

import { useState } from 'react'
import FilterModal from '@/components/filter-modal'
import TourCard from '@/components/tour-card'
import Navbar from '@/components/navbar'
import tours from '@/lib/data.json'
import FavoritesModal from '@/components/favorites-modal'

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Tours')
  const [selectedFilters, setSelectedFilters] = useState<{
    location: string
    vehicle: string
    features: string[]
    activities: string[]
    theme: string[]
    price: number
    groupSize: number
  }>({
    location: '',
    vehicle: '',
    features: [],
    activities: [],
    theme: [],
    price: 10000,
    groupSize: 100,
  })

  const handleFilterApply = (filters: any) => {
    setSelectedCategory(filters.category || 'Tours')
    setSelectedFilters({
      location: filters.location || '',
      vehicle: filters.vehicle || '',
      features: filters.features || [],
      activities: filters.activities || [],
      theme: filters.theme || [],
      price: filters.price || 10000,
      groupSize: filters.groupSize || 100,
    })
  }

  const filteredTours = tours.filter((tour) => {
    const categoryMatch = selectedCategory
      ? tour.category === selectedCategory
      : true
    const locationMatch = selectedFilters.location
      ? tour.location
          .toLowerCase()
          .includes(selectedFilters.location.toLowerCase())
      : true
    const vehicleMatch = selectedFilters.vehicle
      ? tour.vehicle === selectedFilters.vehicle
      : true
    const featuresMatch = selectedFilters.features.length
      ? selectedFilters.features.some((feature) =>
          tour.features.includes(feature)
        )
      : true
    const activitiesMatch = selectedFilters.activities.length
      ? selectedFilters.activities.some((activity) =>
          tour.activities.includes(activity)
        )
      : true
    const themeMatch = selectedFilters.theme.length
      ? selectedFilters.theme.some((theme) =>
          (Array.isArray(tour.theme)
            ? tour.theme
            : [tour.theme].filter(Boolean)
          ).includes(theme)
        )
      : true
    const priceMatch = tour.price <= selectedFilters.price
    const groupSizeMatch = tour.groupSize <= selectedFilters.groupSize

    return (
      categoryMatch &&
      locationMatch &&
      vehicleMatch &&
      featuresMatch &&
      activitiesMatch &&
      themeMatch &&
      priceMatch &&
      groupSizeMatch
    )
  })

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar onFilterClick={() => setIsFilterOpen(true)} />

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        category={selectedCategory}
        onApply={handleFilterApply}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
      <FavoritesModal tours={tours} />
    </main>
  )
}
