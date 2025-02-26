'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  category: string
  onApply: (filters: any) => void
}

export default function FilterModal({
  isOpen,
  onClose,
  category,
  onApply,
}: FilterModalProps) {
  const [priceRange, setPriceRange] = useState(5000)
  const [groupSize, setGroupSize] = useState(100)
  const [selectedTheme, setSelectedTheme] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [location, setLocation] = useState('')
  const [localCategory, setLocalCategory] = useState(category || 'Tours')

  if (!isOpen) return null

  const categories: Array<string> = ['Tours', 'Tickets', 'Rent', 'Transfer']

  const themes = {
    Tours: ['Island Tour', 'Land Tour', 'Safari'],
    Tickets: ['Attraction', 'Show', 'Park'],
  }

  const vehicles = {
    Rent: ['Car', 'Bike', 'Boat', 'Yacht'],
    Transfer: ['Airport', 'Hotel', 'Port'],
  }

  const allThemes = Object.values(themes).flat()
  const allVehicles = Object.values(vehicles).flat()

  const activities = [
    'Swimming',
    'Running',
    'Elephant care',
    'Snorkelling',
    'Yüzme',
    'Şnorkelli Dalış',
    'Fotoğraf Çekimi',
    'Tarihi Gezi',
    'Müze Ziyareti',
    'Şehir Turu',
    'Havalimanı Transferi',
    'Deniz Turu',
    'Balık Tutma',
    'Safari',
    'Vahşi Yaşam Gözlemi',
    'Konser',
    'Festival',
    'Bisiklet Turu',
    'Doğa Yürüyüşü',
  ]
  const features = [
    'Transfer',
    'Halal Food',
    'Vegetarian food',
    'Öğle Yemeği',
    'Rehber',
    'Hızlı Giriş',
    'Sesli Rehber',
    'Full Sigorta',
    'Ücretsiz Otopark',
    'Wi-Fi',
    'Su İkramı',
    'Kahvaltı',
    'Fotoğraf Paketi',
    'Kaptan',
    'Yemek',
    'VIP Alan',
    'Hediye Paketi',
    'Kask',
    'Harita',
    'Profesyonel Rehber',
    'Giriş Ücreti Dahil',
  ]

  const handleApply = () => {
    onApply({
      category: localCategory,
      location: location,
      theme: selectedTheme,
      features: selectedFeatures,
      activities: selectedActivities,
      vehicle: selectedVehicle,
      price: priceRange,
      groupSize: groupSize,
    })
  }

  return (
    <div className=" text-black">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
      ></div>
      <div className="fixed inset-y-0 left-0 w-full sm:w-[400px] bg-white overflow-y-auto z-50">
        <div className="p-4 h-full">
          <div className="flex flex-col gap-3 h-full">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Filter</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Categories */}
            <div className="flex gap-2 h-">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setLocalCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap
                    ${
                      localCategory === cat
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Location */}
            <div className="space-y-1">
              <label className="font-medium">Location</label>
              <input
                type="text"
                placeholder="Where you wanna visit?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Theme */}
            {(localCategory === 'Tours' || localCategory === 'Tickets') && (
              <div className="space-y-1">
                <label className="font-medium">Theme</label>
                <div className="flex flex-wrap gap-2">
                  {(themes[localCategory as keyof typeof themes] || []).map(
                    (theme) => (
                      <button
                        key={theme}
                        onClick={() =>
                          setSelectedTheme((prev) =>
                            prev.includes(theme)
                              ? prev.filter((t) => t !== theme)
                              : [...prev, theme]
                          )
                        }
                        className={`px-3 py-1 rounded-lg text-sm ${
                          selectedTheme.includes(theme)
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {theme}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Vehicle */}
            {(localCategory === 'Rent' || localCategory === 'Transfer') && (
              <div className="">
                <label className="font-medium">Vehicle</label>
                <div className="flex flex-wrap gap-2">
                  {allVehicles.map((vehicle) => (
                    <button
                      key={vehicle}
                      onClick={() =>
                        setSelectedVehicle((prev) =>
                          prev === vehicle ? '' : vehicle
                        )
                      }
                      className={`px-3 py-1 rounded-lg text-sm ${
                        selectedVehicle === vehicle
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {vehicle}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Activities */}
            <div className="space-y-1">
              <label className="font-medium">Activity</label>
              <div className="flex flex-wrap gap-2 h-20 md:h-32 overflow-y-auto">
                {activities.map((activity) => (
                  <button
                    key={activity}
                    onClick={() =>
                      setSelectedActivities((prev) =>
                        prev.includes(activity)
                          ? prev.filter((a) => a !== activity)
                          : [...prev, activity]
                      )
                    }
                    className={`px-3 py-1 rounded-lg text-sm ${
                      selectedActivities.includes(activity)
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {activity}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <div className="">
                <label className="font-medium">Price</label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-right text-gray-600">{priceRange}</div>
              </div>

              {/* Group Size */}
              <div className="">
                <label className="font-medium">Group size</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={groupSize}
                  onChange={(e) => setGroupSize(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-right text-gray-600">{groupSize}</div>
              </div>
            </div>

            {/* Features */}
            <div className="flex-1 space-y-1">
              <label className="font-medium">Features</label>
              <div className="flex flex-wrap gap-2 h-20 md:h-32 overflow-y-auto">
                {features.map((feature) => (
                  <button
                    key={feature}
                    onClick={() =>
                      setSelectedFeatures((prev) =>
                        prev.includes(feature)
                          ? prev.filter((f) => f !== feature)
                          : [...prev, feature]
                      )
                    }
                    className={`px-3 py-1 rounded-lg text-sm ${
                      selectedFeatures.includes(feature)
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {feature}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pb-4">
              <button
                onClick={() => {
                  setLocation('')
                  setSelectedTheme([])
                  setSelectedVehicle('')
                  setSelectedFeatures([])
                  setSelectedActivities([])
                  setPriceRange(5000)
                  setGroupSize(100)
                  setLocalCategory('Tours')
                }}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium"
              >
                Reset
              </button>
              <button
                onClick={() => {
                  handleApply()
                  onClose()
                }}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
