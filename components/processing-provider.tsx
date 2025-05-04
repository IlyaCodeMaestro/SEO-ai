"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

// Определяем тип элемента истории обработки
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

type ProcessingContextType = {
  processingItems: ProcessingHistoryItem[]
  archivedItems: ProcessingHistoryItem[]
  hasNewItems: boolean
  addProcessingItem: (type: "analysis" | "description" | "both", data: { sku: string; competitorSku: string }) => void
  clearNewItems: () => void
  updateItemType: (sku: string, newType: "analysis" | "description" | "both") => void
  markItemAsRead: (id: string) => void
}

const ProcessingContext = createContext<ProcessingContextType | undefined>(undefined)

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

// Моковые данные для истории обработки
const mockArchivedItems: ProcessingHistoryItem[] = [
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

// Изменяем логику обработки и добавления в архив

export function ProcessingProvider({ children }: { children: React.ReactNode }) {
  const [processingItems, setProcessingItems] = useState<ProcessingHistoryItem[]>([])
  const [archivedItems, setArchivedItems] = useState<ProcessingHistoryItem[]>(mockArchivedItems)
  const [hasNewItems, setHasNewItems] = useState(false)

  const addProcessingItem = async (
    type: "analysis" | "description" | "both",
    data: { sku: string; competitorSku: string },
  ) => {
    // Проверяем, есть ли уже элемент с таким SKU в обработке
    const existingProcessingItem = processingItems.find((item) => item.sku === data.sku)

    // Проверяем, есть ли уже элемент с таким SKU в архиве
    const existingArchivedItem = archivedItems.find((item) => item.sku === data.sku)

    // Если элемент с таким SKU уже есть в обработке
    if (existingProcessingItem) {
      // Если тип совпадает, ничего не делаем
      if (existingProcessingItem.type === type) {
        return
      }

      // Если тип не совпадает, обновляем тип на "both"
      setProcessingItems((prev) => prev.map((item) => (item.sku === data.sku ? { ...item, type: "both" } : item)))
      return
    }

    // Если элемент с таким SKU уже есть в архиве
    if (existingArchivedItem) {
      // Удаляем из архива
      setArchivedItems((prev) => prev.filter((item) => item.sku !== data.sku))

      // Определяем новый тип
      let newType = type
      if (existingArchivedItem.type !== type && existingArchivedItem.type !== "both") {
        newType = "both"
      }

      // Создаем новый элемент в обработке
      const newItem: ProcessingHistoryItem = {
        id: Date.now().toString(),
        sku: data.sku,
        competitorSku: data.competitorSku,
        type: newType,
        status: "processing",
        timestamp: Date.now(),
        name: existingArchivedItem.name,
      }

      setProcessingItems((prev) => [...prev, newItem])

      // Имитация завершения обработки через 5 секунд
      setTimeout(() => {
        // Удаляем из обработки
        setProcessingItems((prev) => prev.filter((item) => item.id !== newItem.id))

        // Добавляем в архив
        const completedItem = { ...newItem, status: "completed", isNew: true }
        setArchivedItems((prev) => [completedItem, ...prev])

        // Устанавливаем флаг новых элементов
        if (window.location.hash !== "#archive") {
          setHasNewItems(true)
        }
      }, 5000)

      return
    }

    // Если элемента с таким SKU нет ни в обработке, ни в архиве
    const newItem: ProcessingHistoryItem = {
      id: Date.now().toString(),
      sku: data.sku,
      competitorSku: data.competitorSku,
      type,
      status: "processing",
      timestamp: Date.now(),
      name: generateProductName(),
    }

    setProcessingItems((prev) => [...prev, newItem])

    // Имитация завершения обработки через 5 секунд
    setTimeout(() => {
      // Удаляем из обработки
      setProcessingItems((prev) => prev.filter((item) => item.id !== newItem.id))

      // Добавляем в архив
      const completedItem = { ...newItem, status: "completed", isNew: true }
      setArchivedItems((prev) => [completedItem, ...prev])

      // Устанавливаем флаг новых элементов
      if (window.location.hash !== "#archive") {
        setHasNewItems(true)
      }
    }, 5000)
  }

  // Остальные функции остаются без изменений
  const clearNewItems = () => {
    setHasNewItems(false)
  }

  const updateItemType = (sku: string, newType: "analysis" | "description" | "both") => {
    setArchivedItems((prev) => prev.map((item) => (item.sku === sku ? { ...item, type: newType } : item)))
  }

  const markItemAsRead = (id: string) => {
    setArchivedItems((prev) => prev.map((item) => (item.id === id ? { ...item, isNew: false } : item)))
  }

  return (
    <ProcessingContext.Provider
      value={{
        processingItems,
        archivedItems,
        hasNewItems,
        addProcessingItem,
        clearNewItems,
        updateItemType,
        markItemAsRead,
      }}
    >
      {children}
    </ProcessingContext.Provider>
  )
}

export function useProcessingContext() {
  const context = useContext(ProcessingContext)
  if (context === undefined) {
    throw new Error("useProcessingContext must be used within a ProcessingProvider")
  }
  return context
}
