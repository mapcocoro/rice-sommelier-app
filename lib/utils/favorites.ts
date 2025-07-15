import { Rice } from '@/lib/data/rice-types'

const FAVORITES_KEY = 'rice-favorites'

export function getFavoriteRiceIds(): string[] {
  if (typeof window === 'undefined') return []
  
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY)
    return favorites ? JSON.parse(favorites) : []
  } catch {
    return []
  }
}

export function addToFavorites(riceId: string): void {
  if (typeof window === 'undefined') return
  
  const favorites = getFavoriteRiceIds()
  if (!favorites.includes(riceId)) {
    favorites.push(riceId)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }
}

export function removeFromFavorites(riceId: string): void {
  if (typeof window === 'undefined') return
  
  const favorites = getFavoriteRiceIds()
  const updatedFavorites = favorites.filter(id => id !== riceId)
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))
}

export function isFavorite(riceId: string): boolean {
  return getFavoriteRiceIds().includes(riceId)
}

export function toggleFavorite(riceId: string): boolean {
  const isCurrentlyFavorite = isFavorite(riceId)
  
  if (isCurrentlyFavorite) {
    removeFromFavorites(riceId)
  } else {
    addToFavorites(riceId)
  }
  
  return !isCurrentlyFavorite
}