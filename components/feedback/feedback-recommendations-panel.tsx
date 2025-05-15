"use client";

import { X, ArrowLeft } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import Image from "next/image";

interface FeedbackRecommendationsPanelProps {
  onClose: () => void;
}

export function FeedbackRecommendationsPanel({
  onClose,
}: FeedbackRecommendationsPanelProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Заголовок */}
      <div className="flex items-center justify-between p-4 relative">
        {isMobile ? (
          <>
            <button
              onClick={onClose}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            >
              <ArrowLeft size={24} className="text-gray-400" />
            </button>
            <h2 className="text-lg font-medium mx-auto text-center text-blue-600 pl-6">
              Отзыв
            </h2>
            <div className="w-6" /> {/* Заглушка справа для симметрии */}
          </>
        ) : (
          <>
            <div className="w-8" />
            <h2 className="text-lg font-medium flex-1 text-center text-blue-600">
               
            </h2>
            <button onClick={onClose} className="p-1 mr-2">
              <X size={24} className="text-gray-400" />
            </button>
          </>
        )}
      </div>

      {/* Подзаголовок - синяя кнопка */}
      <div className="px-4 py-3 flex justify-center">
        <div className="bg-gradient-to-r from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white text-white rounded-full py-3 w-[450px] text-center font-medium">
          Рекомендации
        </div>
      </div>

      {/* Содержимое */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-6 shadow-md border">
          <p className="text-gray-600 mb-6 text-center text-sm">
            Если у вас есть рекомендации по улучшению нашего сервиса,
            пожалуйста, напишите нам в Телеграм.
          </p>

          {/* Кнопка Телеграм */}
          <div className="flex justify-center">
            <a
              href="https://t.me/seoai_support"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 shadow-md bg-gradient-to-r from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white text-white rounded-full py-2 px-5 transition-colors text-sm"
            >
              <span>Написать в</span>
              <Image
                 src="icons//telegram-logo.png"
                alt="Telegram"
                width={20}
                height={20}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
