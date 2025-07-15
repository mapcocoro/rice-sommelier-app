import { Rice, RiceTag } from '../data/rice-types'
import { riceDatabase } from '../data/rice-database'

export function searchRice(query: string): Rice[] {
  const normalizedQuery = query.toLowerCase()
  
  return riceDatabase.filter(rice => 
    rice.name.toLowerCase().includes(normalizedQuery) ||
    rice.nameReading.toLowerCase().includes(normalizedQuery) ||
    rice.prefecture.toLowerCase().includes(normalizedQuery) ||
    (rice.specificArea && rice.specificArea.toLowerCase().includes(normalizedQuery)) ||
    rice.characteristics.some(char => char.toLowerCase().includes(normalizedQuery)) ||
    rice.recommendedDishes.some(dish => dish.toLowerCase().includes(normalizedQuery)) ||
    rice.simpleDescription.toLowerCase().includes(normalizedQuery)
  )
}

export function filterByTags(tags: RiceTag[]): Rice[] {
  if (tags.length === 0) return riceDatabase
  
  return riceDatabase.filter(rice =>
    tags.every(tag => rice.tags.includes(tag))
  )
}

export function filterByRegion(region: string): Rice[] {
  return riceDatabase.filter(rice =>
    rice.prefecture.includes(region) ||
    (rice.specificArea && rice.specificArea.includes(region))
  )
}

export function filterByTexture(
  stickiness?: Rice['texture']['stickiness'],
  firmness?: Rice['texture']['firmness']
): Rice[] {
  return riceDatabase.filter(rice => {
    if (stickiness && rice.texture.stickiness !== stickiness) return false
    if (firmness && rice.texture.firmness !== firmness) return false
    return true
  })
}

export function filterByFlavor(
  sweetness?: Rice['flavor']['sweetness'],
  umami?: Rice['flavor']['umami']
): Rice[] {
  return riceDatabase.filter(rice => {
    if (sweetness && rice.flavor.sweetness !== sweetness) return false
    if (umami && rice.flavor.umami !== umami) return false
    return true
  })
}

export function getRiceById(id: string): Rice | undefined {
  return riceDatabase.find(rice => rice.id === id)
}

export function getRecommendations(preferences: {
  texture?: Partial<Rice['texture']>
  flavor?: Partial<Rice['flavor']>
  usage?: string[]
  tags?: RiceTag[]
}): Rice[] {
  let candidates = [...riceDatabase]
  
  // Filter by texture preferences
  if (preferences.texture) {
    if (preferences.texture.stickiness) {
      candidates = candidates.filter(rice => 
        rice.texture.stickiness === preferences.texture!.stickiness
      )
    }
    if (preferences.texture.firmness) {
      candidates = candidates.filter(rice => 
        rice.texture.firmness === preferences.texture!.firmness
      )
    }
  }
  
  // Filter by flavor preferences
  if (preferences.flavor) {
    if (preferences.flavor.sweetness) {
      candidates = candidates.filter(rice => 
        rice.flavor.sweetness === preferences.flavor!.sweetness
      )
    }
    if (preferences.flavor.umami) {
      candidates = candidates.filter(rice => 
        rice.flavor.umami === preferences.flavor!.umami
      )
    }
  }
  
  // Filter by tags
  if (preferences.tags && preferences.tags.length > 0) {
    candidates = candidates.filter(rice =>
      preferences.tags!.some(tag => rice.tags.includes(tag))
    )
  }
  
  // Score by usage match
  if (preferences.usage && preferences.usage.length > 0) {
    candidates = candidates.sort((a, b) => {
      const aScore = a.recommendedDishes.filter(dish =>
        preferences.usage!.some(use => dish.includes(use))
      ).length
      const bScore = b.recommendedDishes.filter(dish =>
        preferences.usage!.some(use => dish.includes(use))
      ).length
      return bScore - aScore
    })
  }
  
  // Return top 3 recommendations
  return candidates.slice(0, 3)
}

export function getAllTags(): RiceTag[] {
  const tagSet = new Set<string>()
  riceDatabase.forEach(rice => {
    rice.tags.forEach(tag => tagSet.add(tag))
  })
  return Array.from(tagSet).sort() as RiceTag[]
}

export function getAllRegions(): string[] {
  const regionSet = new Set<string>()
  riceDatabase.forEach(rice => {
    regionSet.add(rice.prefecture)
    if (rice.specificArea) {
      regionSet.add(rice.specificArea)
    }
  })
  return Array.from(regionSet).sort()
}

// Utility functions for best uses filtering
export function filterByBestUses(uses: (keyof Rice['bestUses'])[]): Rice[] {
  return riceDatabase.filter(rice =>
    uses.some(use => rice.bestUses[use])
  )
}

export function filterByPriceRange(priceRange: Rice['priceRange']): Rice[] {
  return riceDatabase.filter(rice => rice.priceRange === priceRange)
}

export function filterByAvailability(availability: Rice['availability']): Rice[] {
  return riceDatabase.filter(rice => rice.availability === availability)
}

export function filterByQuality(hasSpecialA?: boolean): Rice[] {
  return riceDatabase.filter(rice => 
    hasSpecialA === undefined || rice.quality.hasSpecialA === hasSpecialA
  )
}