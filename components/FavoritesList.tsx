'use client'

import { useState, useEffect } from 'react'
import { Heart, Star, ChefHat } from 'lucide-react'
import { getFavoriteRiceIds } from '@/lib/utils/favorites'
import { getRiceById } from '@/lib/utils/rice-utils'
import { Rice } from '@/lib/data/rice-types'
import FavoriteButton from './FavoriteButton'

export default function FavoritesList() {
  const [favoriteRices, setFavoriteRices] = useState<Rice[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadFavorites()
  }, [])

  const loadFavorites = () => {
    const favoriteIds = getFavoriteRiceIds()
    const rices = favoriteIds
      .map(id => getRiceById(id))
      .filter((rice): rice is Rice => rice !== null)
    setFavoriteRices(rices)
  }

  const getStickinessLabel = (stickiness: Rice['texture']['stickiness']) => {
    const labels = {
      'very-low': 'あっさり',
      'low': 'やや控えめ',
      'medium': '普通',
      'high': '強い',
      'very-high': '非常に強い'
    }
    return labels[stickiness]
  }

  const getSweetnessLabel = (sweetness: Rice['flavor']['sweetness']) => {
    const labels = {
      'mild': 'ほのかな甘み',
      'moderate': '程よい甘み',
      'strong': '豊かな甘み',
      'very-strong': '濃厚な甘み'
    }
    return labels[sweetness]
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    )
  }

  if (favoriteRices.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <Heart className="w-12 sm:w-16 h-12 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">お気に入りがありません</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-4">
          お米図鑑や診断結果からお気に入りのお米を追加してみましょう
        </p>
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500">
          <Heart className="w-4 h-4" />
          <span>ハートマークをタップしてお気に入りに追加</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-4 sm:mb-6">
        <Heart className="w-10 sm:w-12 h-10 sm:h-12 text-red-500 mx-auto mb-2 sm:mb-3" />
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-1">お気に入りのお米</h2>
        <p className="text-sm sm:text-base text-gray-600">
          {favoriteRices.length}種類のお米をお気に入り登録中
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {favoriteRices.map(rice => (
          <div key={rice.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{rice.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">{rice.nameReading}</p>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  {rice.quality.hasSpecialA && (
                    <div className="flex items-center gap-0.5 sm:gap-1 bg-yellow-100 text-yellow-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs flex-shrink-0">
                      <Star className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                      特A
                    </div>
                  )}
                  <FavoriteButton 
                    riceId={rice.id} 
                    className="flex-shrink-0"
                  />
                </div>
              </div>

              <div className="mb-3 sm:mb-4 space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-xs bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex-shrink-0">産地</span>
                  <span className="text-xs sm:text-sm text-gray-700">{rice.prefecture} {rice.specificArea}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-xs bg-blue-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex-shrink-0">食感</span>
                  <span className="text-xs sm:text-sm text-gray-700">{getStickinessLabel(rice.texture.stickiness)}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-xs bg-amber-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded flex-shrink-0">甘み</span>
                  <span className="text-xs sm:text-sm text-gray-700">{getSweetnessLabel(rice.flavor.sweetness)}</span>
                </div>
              </div>

              <div className="mb-3 sm:mb-4">
                <p className="text-xs sm:text-sm text-gray-700 line-clamp-2 sm:line-clamp-3">
                  {rice.simpleDescription}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                {rice.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
                {rice.tags.length > 3 && (
                  <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-gray-400 text-xs">
                    +{rice.tags.length - 3}
                  </span>
                )}
              </div>

              {/* アフィリエイトリンク */}
              {rice.affiliateLink && (
                <div className="border-t pt-3 sm:pt-4 text-center">
                  <p className="text-xs text-gray-500 mb-1.5 sm:mb-2">購入はこちら</p>
                  <div className="affiliate-link-container scale-90 sm:scale-100" dangerouslySetInnerHTML={{ __html: rice.affiliateLink }} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}