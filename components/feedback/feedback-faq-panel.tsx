"use client"

import { useState } from "react"
import { X, ChevronUp, ChevronDown } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface FeedbackFaqPanelProps {
  onClose: () => void
}

interface FaqItem {
  question: string
  answer: string
  isOpen: boolean
}

export function FeedbackFaqPanel({ onClose }: FeedbackFaqPanelProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [faqItems, setFaqItems] = useState<FaqItem[]>([
    {
      question: "Как тебя зовут?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.",
      isOpen: false,
    },
    {
      question: "Как твоя фамилия?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      isOpen: false,
    },
    {
      question: "Как твоя фамилия?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      isOpen: false,
    },
    {
      question: "Как твоя фамилия?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      isOpen: false,
    },
    {
      question: "Как твоя фамилия?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      isOpen: false,
    },
    {
      question: "Как твоя фамилия?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      isOpen: false,
    },
  ])

  const toggleFaqItem = (index: number) => {
    setFaqItems(faqItems.map((item, i) => (i === index ? { ...item, isOpen: !item.isOpen } : item)))
  }

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
        <div className="bg-[#4C6FFF] text-white rounded-full py-3 text-center font-medium">
          Часто задаваемые вопросы
        </div>
      </div>

      {/* Содержимое - аккордеон */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {faqItems.map((item, index) => (
          <div key={index} className="rounded-xl bg-gray-100">
            <button
              className="w-full flex justify-between items-center p-4 hover:bg-gray-200 transition-colors rounded-xl"
              onClick={() => toggleFaqItem(index)}
            >
              <span className="font-medium text-left">{item.question}</span>
              {item.isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {item.isOpen && (
              <div className="p-4 pt-0">
                <p className="text-gray-700">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
