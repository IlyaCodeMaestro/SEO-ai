"use client"

import { useState } from "react"
import { X, ChevronDown, ChevronUp } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface BonusStatementPanelProps {
  onClose: () => void
}

// Моковые данные для истории бонусов
const bonusTransactions = [
  {
    date: "17 Июня",
    items: [
      { id: 1, type: "transfer", description: "Перевод на карту", amount: -500, time: "13:55" },
      { id: 2, type: "bonus", description: "Бонус от Артема", amount: 500, time: "13:55" },
    ],
  },
  {
    date: "15 Июня",
    items: [{ id: 3, type: "exchange", description: "Обмен на описание", amount: -1500, time: "13:55" }],
  },
  // Дополнительные транзакции, которые будут видны при расширении
  {
    date: "10 Июня",
    items: [
      { id: 4, type: "bonus", description: "Бонус за регистрацию", amount: 1000, time: "10:30" },
      { id: 5, type: "exchange", description: "Обмен на анализ", amount: -200, time: "09:15" },
    ],
  },
  {
    date: "5 Июня",
    items: [
      { id: 6, type: "bonus", description: "Бонус от реферала", amount: 300, time: "14:20" },
      { id: 7, type: "exchange", description: "Обмен на описание", amount: -800, time: "16:45" },
    ],
  },
]

export function BonusStatementPanel({ onClose }: BonusStatementPanelProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [expanded, setExpanded] = useState(false)

  // Определяем, сколько групп транзакций показывать
  const visibleTransactions = expanded ? bonusTransactions : bonusTransactions.slice(0, 2)

  return (
    <div className="h-full flex flex-col justify-start bg-white">
      {/* Заголовок с кнопкой закрытия */}
      <div className="flex items-center justify-between p-4">
        {isMobile && (
          <div className="flex-1 text-center">
            <h2 className="text-lg font-medium">Личный кабинет</h2>
          </div>
        )}
        <button onClick={onClose} className={`p-1 ${isMobile ? "" : "ml-auto"}`} aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 p-0 pt-0 max-w-md mx-auto w-full">
        {/* Заголовок выписки */}
        <div className="bg-blue-600 rounded-xl p-4 mb-6 text-white text-center">
          <div className="flex justify-center items-center">
            <span className="text-lg font-medium">Выписка по бонусам</span>
          </div>
        </div>

        {/* История бонусов */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm relative">
          {visibleTransactions.map((group) => (
            <div key={group.date} className="mb-6 last:mb-0">
              <h3 className="text-sm font-medium text-gray-500 mb-2">{group.date}</h3>

              {group.items.map((transaction) => (
                <div key={transaction.id} className="mb-3 last:mb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-xs text-gray-500">{transaction.time}</p>
                    </div>
                    <span className={`font-medium ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount} баллов
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Кнопка расширения/сворачивания */}
          <div className="flex justify-center mt-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-red-500 p-1 rounded-full hover:bg-gray-100"
              aria-label={expanded ? "Свернуть" : "Развернуть"}
            >
              {expanded ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
