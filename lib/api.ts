// Моковые данные для истории обработки
export type ProcessingHistoryItem = {
  id: string
  sku: string
  competitorSku: string
  type: "analysis" | "description" | "both"
  status: "processing" | "completed"
  timestamp: number
  name: string
  isNew?: boolean
}

// Функция для генерации случайного названия товара
const generateProductName = () => {
  const types = ["Футболка", "Куртка", "Джинсы", "Рубашка", "Свитер"]
  const genders = ["мужская", "женская", "детская", "унисекс"]
  const colors = ["синяя", "черная", "белая", "красная", "зеленая"]

  const type = types[Math.floor(Math.random() * types.length)]
  const gender = genders[Math.floor(Math.random() * genders.length)]
  const color = colors[Math.floor(Math.random() * colors.length)]

  return `${type} ${gender} ${color}`
}

// Моковые данные для продукта
export interface Product {
  article: string
  name: string
  brand: string
  mark?: string
  image?: string
  characteristics?: { name: string; value: string }[]
}

// Моковые данные для анализа
export interface AnalysisData {
  rating: number
  visibility: string
  keywordsPresence: string
  missedKeywords: number
  missedCoverage: number | string
  keywords: { word: string; frequency: string | number }[]
}

// Моковые данные для истории обработки
export const getProcessingHistory = (): ProcessingHistoryItem[] => {
  return [
    {
      id: "1",
      sku: "36545961",
      competitorSku: "16962800",
      type: "description",
      status: "completed",
      timestamp: Date.now() - 86400000, // 1 day ago
      name: "Тапочки домашние чуни закрытые",
    },
    {
      id: "2",
      sku: "258466777",
      competitorSku: "51588463",
      type: "analysis",
      status: "completed",
      timestamp: Date.now() - 172800000, // 2 days ago
      name: "Утюг паровой для глажки с отпаривателем EEI-2402 2400Вт",
    },
  ]
}

// Моковые данные для продукта
export const getProductBySku = (sku: string): Product => {
  // Моковые данные для продукта
  if (sku === "36545961") {
    return {
      article: sku,
      name: "Тапочки домашние чуни закрытые",
      brand: "Тепло рядом",
      mark: "Standard",
      image: `/placeholder.svg?height=96&width=96&query=product ${sku}`,
      characteristics: [
        { name: "Материал", value: "Хлопок" },
        { name: "Цвет", value: "Синий" },
        { name: "Размер", value: "M" },
      ],
    }
  } else if (sku === "258466777") {
    return {
      article: sku,
      name: "Утюг паровой для глажки с отпаривателем EEI-2402 2400Вт",
      brand: "Eurostek",
      mark: "Premium",
      image: `/placeholder.svg?height=96&width=96&query=product ${sku}`,
      characteristics: [
        { name: "Мощность", value: "2400 Вт" },
        { name: "Цвет", value: "Белый" },
        { name: "Вес", value: "1.2 кг" },
      ],
    }
  } else {
    return {
      article: sku,
      name: generateProductName(),
      brand: "Бренд",
      mark: "Standard",
      image: `/placeholder.svg?height=96&width=96&query=product ${sku}`,
      characteristics: [
        { name: "Материал", value: "Хлопок" },
        { name: "Цвет", value: "Синий" },
        { name: "Размер", value: "M" },
      ],
    }
  }
}

// Моковые данные для анализа
export const getProductAnalysis = (sku: string): AnalysisData => {
  return {
    rating: 3.1,
    visibility: "60",
    keywordsPresence: "70",
    missedKeywords: 10,
    missedCoverage: 45342432,
    keywords: [
      { word: "Пенная", frequency: 44125 },
      { word: "Мягкая", frequency: 41567 },
      { word: "Рубашка", frequency: 40634 },
      { word: "Элегантная", frequency: 35643 },
      { word: "Черная", frequency: 33423 },
    ],
  }
}
