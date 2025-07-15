export interface Question {
  id: string
  text: string
  yesNext?: string
  noNext?: string
  yesRecommendations?: string[]
  noRecommendations?: string[]
}

export interface UserPreferences {
  texture?: 'soft' | 'firm'
  dishes?: 'japanese' | 'curry-meat' | 'sushi-light'
  sweetness?: 'sweet' | 'mild'
  usage?: 'bento' | 'fresh'
  grain?: 'large' | 'small'
  special?: 'premium' | 'daily'
}

export interface RecommendationResult {
  primary: string
  alternatives: string[]
  reasoning: string
}