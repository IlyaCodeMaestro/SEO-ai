"use client"

import { X } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface BalanceHistoryPanelProps {
  onClose: () => void
}

// Моковые данные для истории транзакций
const transactions = [
  {
    date: "17 Июня",
    items: [
      { id: 1, type: "payment", amount: -500, time: "13:55" },
      { id: 2, type: "topup", amount: 1500, time: "13:55" },
    ],
  },
  {
    date: "15 Июня",
    items: [{ id: 3, type: "payment", amount: -1500, time: "13:55" }],
  },
  // Добавим больше транзакций для проверки скролла
  {
    date: "10 Июня",
    items: [
      { id: 4, type: "payment", amount: -2000, time: "10:30" },
      { id: 5, type: "topup", amount: 3000, time: "09:15" },
    ],
  },
  {
    date: "5 Июня",
    items: [
      { id: 6, type: "payment", amount: -750, time: "14:20" },
      { id: 7, type: "payment", amount: -1200, time: "16:45" },
    ],
  },
]

export function BalanceHistoryPanel({ onClose }: BalanceHistoryPanelProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div className="h-full flex flex-col justify-start bg-white">
      {/* Заголовок с кнопкой закрытия - без подчеркивания */}
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
            <span className="text-lg font-medium">Выписка по балансу</span>
          </div>
        </div>

        {/* История транзакций */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
          {transactions.map((group) => (
            <div key={group.date} className="mb-6 last:mb-0">
              <h3 className="text-sm font-medium text-gray-500 mb-2">{group.date}</h3>

              {group.items.map((transaction) => (
                <div key={transaction.id} className="mb-3 last:mb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{transaction.type === "payment" ? "Платеж" : "Пополнение"}</p>
                      <p className="text-xs text-gray-500">{transaction.time}</p>
                    </div>
                    <span className={`font-medium ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount} тг.
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
