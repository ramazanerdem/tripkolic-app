import { Heart, Menu, ShoppingCart, User } from 'lucide-react'
import Image from 'next/image'
import { useFavorites } from '@/context/FavoriteContext'

interface NavbarProps {
  onFilterClick: () => void
}

export default function Navbar({ onFilterClick }: NavbarProps) {
  const { favorites, setShowFavorites } = useFavorites()

  return (
    <>
      <nav className="w-full grid grid-cols-3 p-4">
        <div className="flex items-center justify-start">
          <Menu
            onClick={onFilterClick}
            className="w-8 h-8 cursor-pointer text-black"
          />
        </div>
        <div className="flex justify-center">
          <Image
            src="/logotrip.png"
            alt="logo"
            width={100}
            height={100}
            className="w-8 h-10 object-cover"
          />
        </div>
        <div className="flex justify-end items-center gap-4">
          <div
            onClick={() => setShowFavorites(true)}
            className="relative flex items-center gap-1"
          >
            <Heart className="w-6 h-6 text-red-500 fill-red-500 cursor-pointer" />
            <span className="text-white font-bold text-xs absolute -bottom-2 -right-1 w-4 h-4 bg-black rounded-full flex items-center justify-center">
              {favorites.length}
            </span>
          </div>
          <ShoppingCart className="w-6 h-6 text-black" />
          <User className="w-6 h-6 text-black" />
        </div>
      </nav>
    </>
  )
}
