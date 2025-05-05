"use client"

import { X } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import Image from "next/image"

interface FeedbackRecommendationsPanelProps {
  onClose: () => void
}

export function FeedbackRecommendationsPanel({ onClose }: FeedbackRecommendationsPanelProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div className="h-full flex flex-col">
      {/* Заголовок */}
      <div className="flex items-center justify-between p-4">
        <div className="w-8"></div> {/* Для центрирования заголовка */}
        <h2 className="text-lg font-medium flex-1 text-center">Отзыв</h2>
        <button onClick={onClose} className="p-1 mr-2">
          <X size={24} className="text-gray-400" />
        </button>
      </div>

      {/* Подзаголовок - синяя кнопка */}
      <div className="px-4 py-3">
        <div className="bg-[#4C6FFF] text-white rounded-full py-3 text-center font-medium">Рекомендации</div>
      </div>

      {/* Содержимое */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-8 text-center">
          Если у вас есть рекомендации по улучшению нашего сервиса, пожалуйста, напишите нам в Телеграм.
        </p>

        {/* Кнопка Телеграм */}
        <a
          href="https://t.me/seoai_support"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#4C6FFF] hover:bg-[#3b5de9] text-white rounded-full py-3 px-6 transition-colors"
        >
          <span>Написать в</span>
          <Image src="/telegram-logo.png" alt="Telegram" width={24} height={24} />
        </a>
      </div>
    </div>
  )
}
