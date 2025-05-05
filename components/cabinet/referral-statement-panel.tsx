"use client"

import { useState } from "react"
import { X, ChevronDown, ChevronUp } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface ReferralStatementPanelProps {
  onClose: () => void
}

// Моковые данные для рефералов
const referrals = [
  {
    date: "07 декабря 2024",
    items: [{ id: 1, email: "erlan.seo1@gmail.com", phone: "+7********0", status: "Активен" }],
  },
  {
    date: "05 декабря 2024",
    items: [
      { id: 2, email: "user2@example.com", phone: "+7********1", status: "Активен" },
      { id: 3, email: "user3@example.com", phone: "+7********2", status: "Неактивен" },
    ],
  },
  // Дополнительные рефералы, которые будут видны при расширении
  {
    date: "01 декабря 2024",
    items: [
      { id: 4, email: "user4@example.com", phone: "+7********3", status: "Активен" },
      { id: 5, email: "user5@example.com", phone: "+7********4", status: "Активен" },
    ],
  },
  {
    date: "25 ноября 2024",
    items: [
      { id: 6, email: "user6@example.com", phone: "+7********5", status: "Неактивен" },
      { id: 7, email: "user7@example.com", phone: "+7********6", status: "Активен" },
    ],
  },
]

export function ReferralStatementPanel({ onClose }: ReferralStatementPanelProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [expanded, setExpanded] = useState(false)

  // Определяем, сколько групп рефералов показывать
  const visibleReferrals = expanded ? referrals : referrals.slice(0, 1)

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
            <span className="text-lg font-medium">Выписка по рефералам</span>
          </div>
        </div>

        {/* Список рефералов */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm relative">
          {visibleReferrals.map((group) => (
            <div key={group.date} className="mb-6 last:mb-0">
              <h3 className="text-sm font-medium text-gray-500 mb-2">{group.date}</h3>

              {group.items.map((referral) => (
                <div key={referral.id} className="mb-3 last:mb-0 bg-white rounded-lg p-3 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{referral.email}</p>
                      <p className="text-xs text-gray-500">{referral.phone}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        referral.status === "Активен" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {referral.status}
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
