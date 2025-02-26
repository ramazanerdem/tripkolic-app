import Image from 'next/image'
import { Heart, Users, Car, MapPin } from 'lucide-react'
import { useFavorites } from '@/context/FavoriteContext'

interface TourCardProps {
  tour: {
    id: number
    title: string
    location: string
    rating: number
    reviews: number
    price: number
    discountedPrice: number
    discount: number
    image: string
    category: string
    theme: string | null
    vehicle: string | null
    features: string[]
    activities: string[]
    groupSize: number
  }
}

export default function TourCard({ tour }: TourCardProps) {
  const { favorites, toggleFavorite } = useFavorites()

  return (
    <div className="bg-white text-black rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div>
        <div className="relative">
          <Image
            src={tour.image || '/placeholder.svg'}
            alt={tour.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />

          {/* Üst Bilgiler */}
          <div className="absolute bottom-3 left-3 flex gap-2">
            <div className="bg-primary-500 px-3 py-1 rounded-lg shadow-md text-white font-bold text-sm flex items-center gap-1">
              <span>{tour.category}</span>
            </div>
            {tour.vehicle && (
              <div className="bg-white px-3 py-1 rounded-lg shadow-md text-blue-500 font-bold text-sm flex items-center gap-1">
                <Car className="w-4 h-4" />
                <span>{tour.vehicle}</span>
              </div>
            )}
          </div>

          {/* İndirim ve Favori */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
            <div className="bg-white px-3 py-1 rounded-lg shadow-md text-primary-500 font-bold text-sm">
              {tour.discount}% OFF
            </div>
            <button
              onClick={() => toggleFavorite(tour.id)}
              className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100"
            >
              <Heart
                className="w-5 h-5"
                fill={favorites.includes(tour.id) ? 'red' : 'transparent'}
                stroke={favorites.includes(tour.id) ? 'red' : 'black'}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3 h-72">
        {/* Başlık ve Lokasyon */}
        <div>
          <h3 className="font-bold text-lg line-clamp-1 mb-1">{tour.title}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="w-4 h-4 stroke-primary-500" />
            <span>{tour.location}</span>
          </div>
        </div>

        {/* Rating ve Grup Büyüklüğü */}
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 -translate-y-[1px]">★</span>
            <span className="font-semibold">{tour.rating}</span>
            <span className="text-gray-500">({tour.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Users className="w-4 h-4" />
            <span>Max {tour.groupSize} kişi</span>
          </div>
        </div>

        {/* Özellikler ve Aktiviteler */}
        <div className="space-y-2 flex-1">
          {tour.features.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tour.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary-100 text-primary-600 rounded-full text-xs"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}

          {tour.activities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tour.activities.map((activity, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                >
                  {activity}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Fiyat ve Buton */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex flex-col">
            <span className="text-red-500 line-through text-sm">
              TRY {tour.price}
            </span>
            <div className="text-lg font-bold text-primary-500">
              TRY {tour.discountedPrice}
            </div>
          </div>
          <button className="bg-primary-500 text-white px-4 py-2 rounded-lg md:text-sm font-bold hover:bg-primary-600 transition-colors">
            Hemen Rezerve Et
          </button>
        </div>
      </div>
    </div>
  )
}
