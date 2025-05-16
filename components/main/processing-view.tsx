"use client";

import { X, ArrowLeft } from "lucide-react";
import { useProcessingContext } from "./processing-provider";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useGetProcessListQuery } from "@/store/services/main";
import { Button } from "@/components/ui/button";

interface ProcessingViewProps {
  onClose: () => void;
}

export function ProcessingView({ onClose }: ProcessingViewProps) {
  const {
    data: apiProcessData,
    isLoading,
    error,
    refetch: refetchProcessList,
  } = useGetProcessListQuery(undefined, {
    pollingInterval: 5000, // Poll every 5 seconds
  });
  const { processingItems: contextProcessingItems } = useProcessingContext();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Check if there are any items to display
  const hasApiItems =
    apiProcessData &&
    apiProcessData.card_dates !== null &&
    apiProcessData.card_dates.length > 0;
  const hasContextItems =
    contextProcessingItems && contextProcessingItems.length > 0;
  const hasNoItems = !hasApiItems && !hasContextItems;

  // Function to get the type text based on the type
  const getTypeText = (type: string | number) => {
    if (typeof type === "string") {
      return type === "analysis" ? "Анализ" : "Описание";
    } else {
      return type === 1
        ? "Описание"
        : type === 2
        ? "Анализ"
        : "Анализ и Описание";
    }
  };

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
        {isLoading ? (
          <div className="text-center py-8">
            <p>Загрузка данных...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            <p>Ошибка при загрузке данных</p>
            <Button
              onClick={() => refetchProcessList()}
              variant="outline"
              size="sm"
              className="mt-4"
            >
              Попробовать снова
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-4 font-medium text-gray-800">Сегодня</div>

            {hasNoItems ? (
              <div className="text-center py-8 text-gray-500">
                Нет товаров в обработке
              </div>
            ) : (
              <div className="space-y-4">
                {/* Display items from context */}
                {hasContextItems &&
                  contextProcessingItems.map((item) => {
                    // Skip items without card data
                    if (!item.cardData) return null;

                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl p-4 shadow-sm border mb-4"
                      >
                        <div className="flex items-center">
                          <div className="w-16 h-16 bg-gray-200 rounded-md mr-3 overflow-hidden">
                            {item.cardData.images &&
                            item.cardData.images.length > 0 ? (
                              <img
                                src={`https://upload.seo-ai.kz/test/images/${item.cardData.images[0].image}`}
                                alt="Product"
                                className="w-full h-full object-cover"
                              />
                            ) : null}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.cardData.name}</p>
                            <p className="text-sm text-gray-500">
                              SKU: {item.cardData.article}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm text-blue-600">
                              {getTypeText(item.type)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {/* Display items from API */}
                {hasApiItems &&
                  apiProcessData.card_dates.map((dateGroup) => (
                    <div key={dateGroup.id}>
                      {dateGroup.cards.map((card) => (
                        <div
                          key={card.id}
                          className="bg-white rounded-xl p-4 shadow-sm border mb-4"
                        >
                          <div className="flex items-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-md mr-3 overflow-hidden">
                              {card.images && card.images.length > 0 ? (
                                <img
                                  src={`https://upload.seo-ai.kz/test/images/${card.images[0].image}`}
                                  alt="Product"
                                  className="w-full h-full object-cover"
                                />
                              ) : null}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{card.name}</p>
                              <p className="text-sm text-gray-500">
                                SKU: {card.article}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-blue-600">
                                {getTypeText(card.type_id)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
