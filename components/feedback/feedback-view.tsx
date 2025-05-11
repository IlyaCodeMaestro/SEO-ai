"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../provider/language-provider";

export function FeedbackView() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleOpenFeedbackPanel = (panel: string) => {
    setActiveTab(panel);
    if (window.openFeedbackPanel) {
      window.openFeedbackPanel(panel);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center py-4">
        <h1 className="text-xl font-medium text-blue-600">Отзыв</h1>
      </div>

      {/* Blue feedback button */}
      <div className="px-6 py-4">
        <button className="w-full bg-gradient-to-r from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white  text-white text-lg font-normal py-4 rounded-[24px] shadow-md">
          Отзыв для разработчиков
        </button>
      </div>

      <div className="text-sm text-gray-500 mb-2 px-6">Вид обратной связи</div>

      <div className="px-6 space-y-3">
        {/* Часто задаваемые вопросы */}
        <button
          onClick={() => handleOpenFeedbackPanel("faq")}
          className="w-full rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] p-4 flex justify-between items-center bg-white"
        >
          <span className="text-base font-normal">
            Часто задаваемые вопросы
          </span>
          <ChevronRight className="h-5 w-5 text-black" />
        </button>

        {/* Рекомендации */}
        <button
          onClick={() => handleOpenFeedbackPanel("recommendations")}
          className="w-full rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] p-4 flex justify-between items-center bg-white"
        >
          <span className="text-base font-normal">Рекомендации</span>
          <ChevronRight className="h-5 w-5 text-black" />
        </button>

        {/* Пожаловаться */}
        <button
          onClick={() => handleOpenFeedbackPanel("complaint")}
          className="w-full rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] p-4 flex justify-between items-center bg-white"
        >
          <span className="text-base font-normal">Пожаловаться</span>
          <ChevronRight className="h-5 w-5 text-black" />
        </button>

        {/* Другое */}
        <button
          onClick={() => handleOpenFeedbackPanel("other")}
          className="w-full rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] p-4 flex justify-between items-center bg-white"
        >
          <span className="text-base font-normal">Другое</span>
          <ChevronRight className="h-5 w-5 text-black" />
        </button>
      </div>
    </div>
  );
}
