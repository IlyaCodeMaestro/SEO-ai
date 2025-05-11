"use client";

import { X, ArrowLeft } from "lucide-react";
import { useProcessingContext } from "./processing-provider";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ProcessingViewProps {
  onClose: () => void;
}

export function ProcessingView({ onClose }: ProcessingViewProps) {
  const { processingItems } = useProcessingContext();
  const isMobile = useMediaQuery("(max-width: 768px)");

  
  return (
    <div className="h-full flex flex-col">
      {/* Заголовок с кнопкой закрытия */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between relative">
          {isMobile && (
            <button
              onClick={onClose}
              className="absolute left-0"
              aria-label="Назад"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}

          <h2 className="text-lg font-medium w-full text-center">
            В обработке...
          </h2>

          {!isMobile && (
            <button
              onClick={onClose}
              className="absolute right-0"
              aria-label="Закрыть"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Содержимое */}
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-4 font-medium text-gray-800">Сегодня</div>
        {processingItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Нет товаров в обработке
          </div>
        ) : (
          <div className="space-y-4">
            {processingItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 shadow-sm border"
              >
                <div className="flex items-center">
                  <div className="w-10 h-16 bg-gray-200 rounded-full mr-3 overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=40&width=40&query=product`}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.sku}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-blue-600">
                      {item.type === "analysis"
                        ? "Анализ"
                        : item.type === "description"
                        ? "Описание"
                        : "Анализ и Описание"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
