'use client'

import { useState, useEffect } from 'react'
import { SimpleQuestion, getSimpleStartQuestion } from '@/lib/data/simple-questionnaire'
import { 
  getSimpleQuestion, 
  getNextSimpleQuestion, 
  hasSimpleRecommendations, 
  getSimpleRecommendations,
  generateSimpleResult,
  calculateSimpleProgress,
  SimpleDiagnosisResult
} from '@/lib/utils/simple-diagnosis'
import { getRiceById } from '@/lib/utils/rice-utils'
import { Rice } from '@/lib/data/rice-types'
import FavoriteButton from './FavoriteButton'

interface QuestionHistory {
  questionId: string
  answer: boolean
  questionText: string
}

export default function SimpleRiceQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState<SimpleQuestion | null>(null)
  const [questionHistory, setQuestionHistory] = useState<QuestionHistory[]>([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [result, setResult] = useState<SimpleDiagnosisResult | null>(null)
  const [recommendedRices, setRecommendedRices] = useState<Rice[]>([])

  useEffect(() => {
    const startQuestion = getSimpleStartQuestion()
    setCurrentQuestion(startQuestion)
  }, [])

  const handleAnswer = (answer: boolean) => {
    if (!currentQuestion) return

    const newHistory = [
      ...questionHistory,
      {
        questionId: currentQuestion.id,
        answer,
        questionText: currentQuestion.text
      }
    ]
    setQuestionHistory(newHistory)

    // 推薦があるかチェック
    if (hasSimpleRecommendations(currentQuestion.id)) {
      const recommendations = getSimpleRecommendations(currentQuestion.id, answer)
      completeQuiz(recommendations, newHistory)
      return
    }

    // 次の質問に進む
    const nextQuestion = getNextSimpleQuestion(currentQuestion.id, answer)
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion)
    } else {
      // 質問が終了したが推薦がない場合
      completeQuiz([], newHistory)
    }
  }

  const completeQuiz = (recommendations: string[], history: QuestionHistory[]) => {
    const diagnosisResult = generateSimpleResult(recommendations, history)
    setResult(diagnosisResult)

    // 推薦されたお米の詳細情報を取得
    const riceDetails: Rice[] = []
    const allRiceIds = [diagnosisResult.primaryRice, ...diagnosisResult.alternativeRices]
    
    for (const riceId of allRiceIds) {
      const rice = getRiceById(riceId)
      if (rice) {
        riceDetails.push(rice)
      }
    }
    
    setRecommendedRices(riceDetails)
    setIsCompleted(true)
  }

  const resetQuiz = () => {
    setCurrentQuestion(getSimpleStartQuestion())
    setQuestionHistory([])
    setIsCompleted(false)
    setResult(null)
    setRecommendedRices([])
  }

  const progress = calculateSimpleProgress(questionHistory.length)

  if (isCompleted && result) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        {/* 結果ヘッダー */}
        <div className="text-center space-y-2 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800">あなたにおすすめのお米</h2>
          <p className="text-base sm:text-lg text-gray-600">診断完了！</p>
        </div>

        {/* メイン推薦 */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 sm:p-6 border-2 border-green-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-4">
            <span className="bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">最適</span>
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-bold text-green-800">
                {recommendedRices[0]?.name || 'お米が見つかりませんでした'}
              </h3>
              {recommendedRices[0] && (
                <FavoriteButton 
                  riceId={recommendedRices[0].id} 
                  className="flex-shrink-0 ml-3"
                />
              )}
            </div>
          </div>
          
          {recommendedRices[0] && (
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-gray-700">{recommendedRices[0].simpleDescription}</p>
              
              <div className="bg-white rounded-lg p-3 sm:p-4">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">選んだ理由</h4>
                <p className="text-sm sm:text-base text-gray-600">{result.reasoning}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white rounded-lg p-3 sm:p-4">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">おすすめポイント</h4>
                  <ul className="space-y-1">
                    {result.matchingPoints.map((point, index) => (
                      <li key={index} className="text-xs sm:text-sm text-gray-600 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mt-1 flex-shrink-0"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-3 sm:p-4">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">おすすめの使い方</h4>
                  <ul className="space-y-1">
                    {result.usageTips.map((tip, index) => (
                      <li key={index} className="text-xs sm:text-sm text-gray-600 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full mt-1 flex-shrink-0"></span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-3 sm:p-4 border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2 text-sm sm:text-base">この米の特徴</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-yellow-700 font-medium">食感：</span>
                    <span className="text-gray-600">{recommendedRices[0].texture.description}</span>
                  </div>
                  <div>
                    <span className="text-yellow-700 font-medium">味わい：</span>
                    <span className="text-gray-600">{recommendedRices[0].flavor.description}</span>
                  </div>
                  <div>
                    <span className="text-yellow-700 font-medium">産地：</span>
                    <span className="text-gray-600">{recommendedRices[0].prefecture}</span>
                  </div>
                  <div>
                    <span className="text-yellow-700 font-medium">価格帯：</span>
                    <span className="text-gray-600">
                      {recommendedRices[0].priceRange === 'luxury' ? '高級' :
                       recommendedRices[0].priceRange === 'premium' ? 'プレミアム' :
                       recommendedRices[0].priceRange === 'standard' ? '標準' : 'お手頃'}
                    </span>
                  </div>
                </div>
              </div>

              {/* アフィリエイトリンク */}
              {recommendedRices[0].affiliateLink && (
                <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-200 text-center">
                  <h4 className="font-semibold text-green-800 mb-2 sm:mb-3 text-sm sm:text-base">このお米を購入</h4>
                  <div className="affiliate-link-container" dangerouslySetInnerHTML={{ __html: recommendedRices[0].affiliateLink }} />
                </div>
              )}
            </div>
          )}
        </div>

        {/* 代替案 */}
        {recommendedRices.length > 1 && (
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">こちらもおすすめ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {recommendedRices.slice(1).map((rice, index) => (
                <div key={index} className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 hover:border-green-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{rice.name}</h4>
                    <FavoriteButton 
                      riceId={rice.id} 
                      className="flex-shrink-0 ml-2"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{rice.simpleDescription}</p>
                  <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                    {rice.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-gray-100 text-gray-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* アフィリエイトリンク */}
                  {rice.affiliateLink && (
                    <div className="border-t pt-2 sm:pt-3 text-center">
                      <p className="text-xs text-gray-500 mb-1 sm:mb-2">購入はこちら</p>
                      <div className="affiliate-link-container scale-90 sm:scale-100" dangerouslySetInnerHTML={{ __html: rice.affiliateLink }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* アクション */}
        <div className="text-center space-y-4">
          <button 
            onClick={resetQuiz}
            className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base"
          >
            もう一度診断する
          </button>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* プログレスバー */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs sm:text-sm text-gray-600">
          <span>質問 {questionHistory.length + 1}</span>
          <span>{Math.round(progress)}% 完了</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* 質問カード */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-100">
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center">
            <span className="inline-block bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
              {currentQuestion.category === 'texture' ? '食感の好み' :
               currentQuestion.category === 'usage' ? '用途について' :
               currentQuestion.category === 'dishes' ? '料理の好み' :
               currentQuestion.category === 'taste' ? '味の好み' :
               '最終確認'}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-center leading-relaxed px-2">
            {currentQuestion.text}
          </h2>

          {currentQuestion.description && (
            <p className="text-sm sm:text-base text-gray-600 text-center px-2">
              {currentQuestion.description}
            </p>
          )}

          <div className="grid grid-cols-1 gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={() => handleAnswer(true)}
              className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-300 rounded-xl p-4 sm:p-5 md:p-6 text-left transition-all duration-200 group"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm sm:text-base text-green-800 font-semibold group-hover:text-green-900 flex-1">
                  {currentQuestion.yesLabel}
                </span>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-200 group-hover:bg-green-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-800 font-bold text-sm sm:text-base">A</span>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleAnswer(false)}
              className="bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 hover:border-blue-300 rounded-xl p-4 sm:p-5 md:p-6 text-left transition-all duration-200 group"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm sm:text-base text-blue-800 font-semibold group-hover:text-blue-900 flex-1">
                  {currentQuestion.noLabel}
                </span>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-200 group-hover:bg-blue-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-800 font-bold text-sm sm:text-base">B</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 質問履歴（小さく表示） */}
      {questionHistory.length > 0 && (
        <div className="text-center">
          <button 
            onClick={resetQuiz}
            className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 underline"
          >
            最初からやり直す
          </button>
        </div>
      )}
    </div>
  )
}