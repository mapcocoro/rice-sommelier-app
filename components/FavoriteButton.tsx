'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { toggleFavorite, isFavorite } from '@/lib/utils/favorites'

interface FavoriteButtonProps {
  riceId: string
  className?: string
}

export default function FavoriteButton({ riceId, className = '' }: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setFavorite(isFavorite(riceId))
  }, [riceId])

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const newFavoriteState = toggleFavorite(riceId)
    setFavorite(newFavoriteState)
  }

  if (!mounted) {
    return (
      <button className={`${className} opacity-50`} disabled>
        <Heart className="w-5 h-5 text-gray-400" />
      </button>
    )
  }

  return (
    <button 
      onClick={handleToggle}
      className={`transition-colors hover:scale-110 transform duration-200 ${className}`}
      title={favorite ? 'お気に入りから削除' : 'お気に入りに追加'}
    >
      <Heart 
        className={`w-5 h-5 ${
          favorite 
            ? 'text-red-500 fill-current' 
            : 'text-gray-400 hover:text-red-400'
        }`} 
      />
    </button>
  )
}