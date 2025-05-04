"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { ArrowLeft, X } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { getProductBySku } from "@/lib/api"

interface ProductAnalysisDetailsProps {
  onClose: () => void
  onBack: () => void
  onStartAnalysis: () => void
  productData: {
    sku: string
    competitorSku: string
  }
}

export function ProductAnalysisDetails({ onClose, onBack, onStartAnalysis, productData }: ProductAnalysisDetailsProps) {
  const { language } = useLanguage()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isAnalysisStarted, setIsAnalysisStarted] = useState(false)
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Добавляем переводы для деталей анализа товара
  const translations = {
    ru: {
      "details.title": "Анализ карточки товара",
      "details.sku": "SKU (артикул товара):",
      "details.name": "Название:",
      "details.brand": "Бренд:",
      "details.mark": "Марка:",
      "details.characteristics": "Характеристика:",
      "details.start": "Начать анализ",
      "details.loading": "Загрузка данных...",
      "details.error": "Ошибка при загрузке товара",
      "details.try.another": "Попробуйте другой SKU",
    },
    kz: {
      "details.title": "Тауар карточкасын талдау",
      "details.sku": "SKU (тауар артикулы):",
      "details.name": "Атауы:",
      "details.brand": "Бренд:",
      "details.mark": "Марка:",
      "details.characteristics": "Сипаттама:",
      "details.start": "Талдауды бастау",
      "details.loading": "Деректерді жүктеу...",
      "details.error": "Тауарды жүктеу кезінде қате",
      "details.try.another": "Басқа SKU қолданып көріңіз",
    },
    en: {
      "details.title": "Product Card Analysis",
      "details.sku": "SKU (product article):",
      "details.name": "Name:",
      "details.brand": "Brand:",
      "details.mark": "Mark:",
      "details.characteristics": "Characteristics:",
      "details.start": "Start Analysis",
      "details.loading": "Loading data...",
      "details.error": "Error loading product",
      "details.try.another": "Try another SKU",
    },
  }

  // Функция для получения перевода
  const translate = (key: string) => {
    return translations[language][key] || key
  }

  // Загрузка данных о товаре при монтировании компонента
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productData.sku) {
        setError(translate("details.error"))
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)
      try {
        const fetchedProduct = await getProductBySku(productData.sku)
        setProduct(fetchedProduct)
      } catch (error) {
        console.error("Error fetching product:", error)
        setError(translate("details.error"))
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productData.sku, language])

  const handleStartAnalysis = () => {
    setIsAnalysisStarted(true)
    onStartAnalysis()
  }

  // Отображение загрузки
  if (loading) {
    return (
      <div className="h-full relative flex items-center justify-center">
        <div className="text-center">
          <p>{translate("details.loading")}</p>
        </div>
      </div>
    )
  }

  // Отображение ошибки
  if (error) {
    return (
      <div className="h-full relative flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <Button onClick={onBack} className="mt-4">
            {translate("details.try.another")}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full relative">
      <div className="max-w-md mx-auto p-6">
        {/* Заголовок с кнопками назад и закрыть */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-2" aria-label="Back">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-medium">{translate("details.title")}</h2>
          </div>
          {/* Кнопка закрытия только для десктопа */}
          {!isMobile && (
            <button onClick={onClose} className="p-2" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          {product ? (
            <>
              {/* Изображение товара */}
              <div className="flex mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-lg mr-4 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg?height=96&width=96"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">{translate("details.sku")}</p>
                    <p className="font-medium">{product.article}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">{translate("details.name")}</p>
                    <p className="font-medium">{product.name}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">{translate("details.brand")}</p>
                    <p className="font-medium">{product.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{translate("details.mark")}</p>
                    <p className="font-medium">{product.mark || "-"}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">{translate("details.characteristics")}</p>
                {product.characteristics && product.characteristics.length > 0 ? (
                  <div className="space-y-1">
                    {product.characteristics.map((char, index) => (
                      <p key={index} className="font-medium">
                        {char.name}: {char.value}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="font-medium">-</p>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p>{translate("details.error")}</p>
            </div>
          )}
        </div>

        {!isAnalysisStarted && product && (
          <div className="mt-auto pt-6">
            <Button
              onClick={handleStartAnalysis}
              className="w-full bg-blue-400 hover:bg-blue-500 text-white rounded-full"
            >
              {translate("details.start")}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
