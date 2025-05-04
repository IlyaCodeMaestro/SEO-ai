"use client"

import { ChevronRight } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "./language-provider"

export function FeedbackView() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<string | null>(null)

  const handleOpenFeedbackPanel = (panel: string) => {
    setActiveTab(panel)
    if (window.openFeedbackPanel) {
      window.openFeedbackPanel(panel)
    }
  }

  return (
    <div className="flex flex-col p-6 h-full">
      <h1 className="text-xl font-medium text-center mb-6">Отзывы</h1>

      <div className="text-sm text-gray-500 mb-2 px-2">Выберите вид обратной связи</div>

      <div className="space-y-4">
        {/* Часто задаваемые вопросы */}
        <button
          onClick={() => handleOpenFeedbackPanel("faq")}
          className={`w-full rounded-2xl shadow-md p-4 flex justify-between items-center ${
            activeTab === "faq" ? "bg-[#4C6FFF] text-white" : "bg-white"
          }`}
        >
          <span className="font-medium">Часто задаваемые вопросы</span>
          <ChevronRight className={`h-5 w-5 ${activeTab === "faq" ? "text-white" : "text-gray-400"}`} />
        </button>

        {/* Рекомендации */}
        <button
          onClick={() => handleOpenFeedbackPanel("recommendations")}
          className={`w-full rounded-2xl shadow-md p-4 flex justify-between items-center ${
            activeTab === "recommendations" ? "bg-[#4C6FFF] text-white" : "bg-white"
          }`}
        >
          <span className="font-medium">Рекомендации</span>
          <ChevronRight className={`h-5 w-5 ${activeTab === "recommendations" ? "text-white" : "text-gray-400"}`} />
        </button>

        {/* Пожаловаться */}
        <button
          onClick={() => handleOpenFeedbackPanel("complaint")}
          className={`w-full rounded-2xl shadow-md p-4 flex justify-between items-center ${
            activeTab === "complaint" ? "bg-[#4C6FFF] text-white" : "bg-white"
          }`}
        >
          <span className="font-medium">Пожаловаться</span>
          <ChevronRight className={`h-5 w-5 ${activeTab === "complaint" ? "text-white" : "text-gray-400"}`} />
        </button>

        {/* Другое */}
        <button
          onClick={() => handleOpenFeedbackPanel("other")}
          className={`w-full rounded-2xl shadow-md p-4 flex justify-between items-center ${
            activeTab === "other" ? "bg-[#4C6FFF] text-white" : "bg-white"
          }`}
        >
          <span className="font-medium">Другое</span>
          <ChevronRight className={`h-5 w-5 ${activeTab === "other" ? "text-white" : "text-gray-400"}`} />
        </button>
      </div>
    </div>
  )
}
