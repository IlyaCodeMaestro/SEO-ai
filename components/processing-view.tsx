"use client"

import { useLanguage } from "./language-provider"
import { X } from "lucide-react"
import { useProcessingContext } from "./processing-provider"
import { formatDistanceToNow } from "date-fns"
import { ru, kk, enUS } from "date-fns/locale"

interface ProcessingViewProps {
  onClose: () => void
}

export function ProcessingView({ onClose }: ProcessingViewProps) {
  const { language, t } = useLanguage()
  const { processingItems } = useProcessingContext()

  // Добавляем переводы для страницы "В обработке"
  const translations = {
    ru: {
      "processing.title": "В обработке...",
      "processing.today": "Сегодня",
      "processing.empty": "Нет товаров в обработке",
      "processing.product.name": "Товар",
      "processing.analysis": "Анализ",
      "processing.description": "Описание",
    },
    kz: {
      "processing.title": "Өңделуде...",
      "processing.today": "Бүгін",
      "processing.empty": "Өңделуде тауарлар жоқ",
      "processing.product.name": "Тауар",
      "processing.analysis": "Талдау",
      "processing.description": "Сипаттама",
    },
    en: {
      "processing.title": "In processing...",
      "processing.today": "Today",
      "processing.empty": "No products in processing",
      "processing.product.name": "Product",
      "processing.analysis": "Analysis",
      "processing.description": "Description",
    },
  }

  // Функция для получения перевода
  const translate = (key: string) => {
    return translations[language][key] || key
  }

  // Выбор локали для форматирования даты
  const getLocale = () => {
    switch (language) {
      case "ru":
        return ru
      case "kz":
        return kk
      case "en":
        return enUS
      default:
        return ru
    }
  }

  // Форматирование времени
  const formatTime = (timestamp: number) => {
    return formatDistanceToNow(new Date(timestamp), {
      addSuffix: true,
      locale: getLocale(),
    })
  }

  return (
    <div className="h-full flex flex-col">
      {/* Заголовок с кнопкой закрытия */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">{translate("processing.title")}</h2>
          <button onClick={onClose} className="p-2" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Содержимое */}
      <div className="flex-1 overflow-auto p-6">
        {processingItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">{translate("processing.empty")}</div>
        ) : (
          <div className="space-y-4">
            {processingItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=40&width=40&query=product`}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-blue-600">
                      {item.type === "analysis"
                        ? translate("processing.analysis")
                        : item.type === "description"
                          ? translate("processing.description")
                          : translate("processing.analysis") + " и " + translate("processing.description")}
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-[rgba(38,99,255,1)] to-[rgba(11,60,187,1)] hover:opacity-90 h-2 rounded-full animate-pulse w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
