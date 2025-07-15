import { SimpleQuestion, simpleQuestions } from '../data/simple-questionnaire'
import { getRiceById } from './rice-utils'

export interface SimpleDiagnosisResult {
  primaryRice: string
  alternativeRices: string[]
  reasoning: string
  matchingPoints: string[]
  usageTips: string[]
}

export function getSimpleQuestion(id: string): SimpleQuestion | undefined {
  return simpleQuestions[id]
}

export function getNextSimpleQuestion(currentId: string, answer: boolean): SimpleQuestion | null {
  const currentQuestion = simpleQuestions[currentId]
  if (!currentQuestion) return null
  
  const nextId = answer ? currentQuestion.yesNext : currentQuestion.noNext
  if (!nextId) return null
  
  return simpleQuestions[nextId] || null
}

export function hasSimpleRecommendations(questionId: string): boolean {
  const question = simpleQuestions[questionId]
  return !!(question?.yesRecommendations || question?.noRecommendations)
}

export function getSimpleRecommendations(questionId: string, answer: boolean): string[] {
  const question = simpleQuestions[questionId]
  if (!question) return []
  
  const recommendations = answer ? question.yesRecommendations : question.noRecommendations
  return recommendations || []
}

export function generateSimpleResult(
  recommendations: string[],
  questionHistory: Array<{questionId: string, answer: boolean, questionText: string}>
): SimpleDiagnosisResult {
  if (recommendations.length === 0) {
    return {
      primaryRice: 'hitomebore',
      alternativeRices: ['akitakomachi', 'hinohikari'],
      reasoning: 'バランスの良い万能タイプのお米をおすすめします。',
      matchingPoints: ['どんな料理にも合う', '毎日食べても飽きない', '安定した美味しさ'],
      usageTips: ['和食全般に最適', 'お弁当にもおすすめ']
    }
  }

  const primaryRice = recommendations[0]
  const alternativeRices = recommendations.slice(1).length > 0 
    ? recommendations.slice(1) 
    : getSimpleAlternatives(primaryRice, questionHistory)

  const rice = getRiceById(primaryRice)
  if (!rice) {
    return {
      primaryRice: 'hitomebore',
      alternativeRices: ['akitakomachi'],
      reasoning: 'エラーが発生しました。バランスの良いお米をおすすめします。',
      matchingPoints: ['安定した品質'],
      usageTips: ['万能でおすすめ']
    }
  }

  const reasoning = generateSimpleReasoning(rice, questionHistory)
  const matchingPoints = generateSimpleMatchingPoints(rice, questionHistory)
  const usageTips = generateUsageTips(rice, questionHistory)

  return {
    primaryRice,
    alternativeRices,
    reasoning,
    matchingPoints,
    usageTips
  }
}

function getSimpleAlternatives(primaryRiceId: string, questionHistory: Array<{questionId: string, answer: boolean}>): string[] {
  // 質問履歴から好みを分析して代替案を提案
  const hasTexturePreference = questionHistory.find(q => q.questionId === 'texture_start')
  const isMochiType = hasTexturePreference?.answer === true
  
  const alternatives: Record<string, string[]> = {
    // もちもち系
    'yumepirika': ['koshihikari-uonuma', 'milky-queen', 'kumasan-no-kagayaki'],
    'koshihikari-uonuma': ['yumepirika', 'shinnosuke', 'datemasayume'],
    'milky-queen': ['yumepirika', 'tsuyahime', 'koshihikari-chiba'],
    'tsuyahime': ['ichihomare', 'shinnosuke', 'sakihokore'],
    'shinnosuke': ['koshihikari-uonuma', 'tsuyahime', 'koshihikari-tanba'],
    'ichihomare': ['tsuyahime', 'koshihikari-tanba', 'sagabiyori'],
    'koshihikari-tanba': ['koshihikari-uonuma', 'shinnosuke', 'datemasayume'],
    'datemasayume': ['koshihikari-uonuma', 'kumasan-no-kagayaki', 'sagabiyori'],
    'sakihokore': ['tsuyahime', 'ichihomare', 'akitakomachi'],
    'kumasan-no-kagayaki': ['yumepirika', 'datemasayume', 'koshihikari-uonuma'],
    'sagabiyori': ['ichihomare', 'datemasayume', 'shinnosuke'],
    'fukkurinko': ['yumepirika', 'koshihikari-uonuma', 'milky-queen'],
    'yudai21': ['yumepirika', 'kumasan-no-kagayaki', 'koshihikari-uonuma'],
    'niji-no-kirameki': ['sagabiyori', 'shinnosuke', 'datemasayume'],
    
    // もちもち×おかず系
    'koshihikari-ibaraki': ['hitomebore', 'koshihikari-chiba', 'mori-no-kumasan'],
    'koshihikari-chiba': ['koshihikari-ibaraki', 'milky-queen', 'fukusmile'],
    'hitomebore': ['akitakomachi', 'ginga-no-shizuku', 'mori-no-kumasan'],
    'akitakomachi': ['hitomebore', 'hinohikari', 'sakihokore'],
    'mori-no-kumasan': ['hitomebore', 'koshihikari-ibaraki', 'fukusmile'],
    'fukusmile': ['mori-no-kumasan', 'koshihikari-chiba', 'tobibikko'],
    'haenuki': ['hitomebore', 'akitakomachi', 'ten-no-tsubu'],
    'ten-no-tsubu': ['haenuki', 'akitakomachi', 'hitomebore'],
    
    // あっさり系
    'nanatsuboshi': ['seiten-no-hekireki', 'ginga-no-shizuku', 'mizukagami'],
    'yukiwakamaru': ['nanatsuboshi', 'seiten-no-hekireki', 'konjiki-no-kaze'],
    'seiten-no-hekireki': ['nanatsuboshi', 'ginga-no-shizuku', 'yukiwakamaru'],
    'ginga-no-shizuku': ['hitomebore', 'akitakomachi', 'konjiki-no-kaze'],
    'konjiki-no-kaze': ['ginga-no-shizuku', 'yukiwakamaru', 'mizukagami'],
    'hinohikari': ['hitomebore', 'akitakomachi', 'tobibikko'],
    'mizukagami': ['nanatsuboshi', 'konjiki-no-kaze', 'sasanishiki'],
    'tobibikko': ['hinohikari', 'fukusmile', 'nanatsuboshi'],
    'oboroduki': ['mizukagami', 'sasanishiki', 'nanatsuboshi'],
    
    // 寿司系
    'sasanishiki': ['nanatsuboshi', 'seiten-no-hekireki', 'mizukagami']
  }

  return alternatives[primaryRiceId] || ['hitomebore', 'akitakomachi']
}

function generateSimpleReasoning(rice: any, questionHistory: Array<{questionId: string, answer: boolean, questionText: string}>): string {
  const answers = questionHistory.map(q => ({ id: q.questionId, answer: q.answer }))
  
  // 食感の好みを取得
  const textureAnswer = answers.find(a => a.id === 'texture_start')
  const isMochiType = textureAnswer?.answer === true
  
  // 用途の好みを取得
  const usageAnswers = answers.filter(a => a.id.includes('usage_'))
  const dishesAnswers = answers.filter(a => a.id.includes('dishes_'))
  
  let reasoning = `${rice.prefecture}産の${rice.name}は、`
  
  if (isMochiType) {
    reasoning += `もちもちとした食感がお好みのあなたにぴったりです。`
  } else {
    reasoning += `あっさりとした食感がお好みのあなたにぴったりです。`
  }
  
  // 用途に応じた理由を追加
  if (usageAnswers.some(a => a.id === 'usage_mochi_type' && a.answer)) {
    reasoning += `${rice.simpleDescription}で、白米やおにぎりで食べると特に美味しさが際立ちます。`
  } else if (dishesAnswers.some(a => a.id.includes('light'))) {
    reasoning += `${rice.simpleDescription}で、様々な料理との相性が良いのが特徴です。`
  } else {
    reasoning += `${rice.simpleDescription}。`
  }
  
  return reasoning
}

function generateSimpleMatchingPoints(rice: any, questionHistory: Array<{questionId: string, answer: boolean}>): string[] {
  const points: string[] = []
  const answers = questionHistory.map(q => ({ id: q.questionId, answer: q.answer }))
  
  // 食感に基づくポイント
  if (rice.texture.stickiness === 'very-high') {
    points.push('もちもち食感で満足感がある')
  } else if (rice.texture.stickiness === 'low') {
    points.push('あっさりして食べやすい')
  }
  
  // 用途に基づくポイント
  if (rice.bestUses.whitRice) {
    points.push('白米で食べても美味しい')
  }
  if (rice.bestUses.bento && rice.bestUses.onigiri) {
    points.push('お弁当やおにぎりに最適')
  }
  if (rice.bestUses.curry && rice.bestUses.donburi) {
    points.push('カレーや丼物との相性が良い')
  }
  if (rice.bestUses.sushi) {
    points.push('寿司米として優秀')
  }
  
  // 品質に基づくポイント
  if (rice.quality.hasSpecialA) {
    points.push('特A評価の確かな品質')
  }
  
  // 価格・入手性に基づくポイント
  if (rice.priceRange === 'standard' && rice.availability === 'common') {
    points.push('コストパフォーマンスが良い')
  }
  if (rice.priceRange === 'premium') {
    points.push('特別感のある高級米')
  }
  
  // タグから追加ポイント
  if (rice.tags.includes('冷めても美味しい')) {
    points.push('冷めても美味しさが続く')
  }
  if (rice.tags.includes('万能型')) {
    points.push('どんな料理にも合わせやすい')
  }
  
  // 最低3つのポイントを保証
  while (points.length < 3) {
    if (rice.characteristics && rice.characteristics.length > 0) {
      points.push(rice.characteristics[0])
    } else {
      points.push('安定した美味しさ')
    }
    break
  }
  
  return points.slice(0, 4) // 最大4つまで
}

function generateUsageTips(rice: any, questionHistory: Array<{questionId: string, answer: boolean}>): string[] {
  const tips: string[] = []
  const answers = questionHistory.map(q => ({ id: q.questionId, answer: q.answer }))
  
  // 推奨料理から使い方のヒント
  if (rice.recommendedDishes && rice.recommendedDishes.length > 0) {
    rice.recommendedDishes.slice(0, 2).forEach((dish: string) => {
      tips.push(`${dish}におすすめ`)
    })
  }
  
  // 質問の回答に基づいた具体的なアドバイス
  const textureAnswer = answers.find(a => a.id === 'texture_start')
  if (textureAnswer?.answer === true) { // もちもち派
    tips.push('炊き立てが特に美味しい')
  } else { // あっさり派
    tips.push('食材の味を引き立てる')
  }
  
  // 冷めても美味しい場合
  if (rice.tags.includes('冷めても美味しい')) {
    tips.push('お弁当に入れても美味しい')
  }
  
  // 寿司向きの場合
  if (rice.bestUses.sushi) {
    tips.push('酢飯にすると真価を発揮')
  }
  
  // 炊き方のコツ
  if (rice.texture.stickiness === 'very-high') {
    tips.push('少し硬めに炊くのがコツ')
  } else if (rice.texture.stickiness === 'low') {
    tips.push('普通の水加減で美味しく炊ける')
  }
  
  return tips.slice(0, 3) // 最大3つまで
}

export function calculateSimpleProgress(answeredQuestions: number): number {
  // シンプル診断は通常3-5質問程度で完了
  const maxQuestions = 5
  return Math.min((answeredQuestions / maxQuestions) * 100, 100)
}