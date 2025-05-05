"use client";

import { useLanguage } from "../provider/language-provider";
import { ArrowLeft, X } from "lucide-react";

interface ProductDescriptionProcessingProps {
  onClose: () => void;
  onBack: () => void;
  productData: {
    sku: string;
    competitorSku: string;
  };
}

export function ProductDescriptionProcessing({
  onClose,
  onBack,
  productData,
}: ProductDescriptionProcessingProps) {
  const { language } = useLanguage();

  // Добавляем переводы для страницы "В обработке"
  const translations = {
    ru: {
      "processing.title": "В обработке...",
      "processing.today": "Сегодня",
      "processing.product.name": "Название товара",
      "processing.analysis": "Анализ",
      "processing.description": "Описание",
    },
    kz: {
      "processing.title": "Өңделуде...",
      "processing.today": "Бүгін",
      "processing.product.name": "Тауар атауы",
      "processing.analysis": "Талдау",
      "processing.description": "Сипаттама",
    },
    en: {
      "processing.title": "In processing...",
      "processing.today": "Today",
      "processing.product.name": "Product name",
      "processing.analysis": "Analysis",
      "processing.description": "Description",
    },
  };

  // Функция для получения перевода
  const translate = (key: string) => {
    return translations[language][key] || key;
  };

  // Моковые данные для списка товаров в обработке
  const processingItems = [
    { id: 1, name: "Название товара", sku: "SKU1", type: "description" },
    { id: 2, name: "Название товара", sku: "SKU2", type: "analysis" },
    { id: 3, name: "Название товара", sku: "SKU3", type: "description" },
    { id: 4, name: "Название товара", sku: "SKU4", type: "analysis" },
    { id: 5, name: "Название товара", sku: "SKU5", type: "description" },
  ];

  return (
    <div className="h-full relative bg-[url('/grid-pattern.png')] bg-repeat">
      <div className="max-w-md mx-auto p-6">
        {/* Заголовок с кнопками назад и закрыть */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-2" aria-label="Back">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-medium">
              {translate("processing.title")}
            </h2>
          </div>
          <button onClick={onClose} className="p-2" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Дата */}
        <div className="mb-4">
          <p className="text-sm font-medium">{translate("processing.today")}</p>
        </div>

        {/* Список товаров в обработке */}
        <div className="space-y-3">
          {processingItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-3 shadow-sm flex items-center"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 overflow-hidden">
                <img
                  src="/placeholder.svg?height=48&width=48"
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">
                  {translate("processing.product.name")}
                </p>
                <p className="text-sm text-gray-500">SKU: {item.sku}</p>
              </div>
              <button
                className={`text-sm px-3 py-1 rounded-full ${
                  item.type === "analysis"
                    ? "text-blue-600 bg-blue-50"
                    : "text-blue-500 bg-blue-50"
                }`}
              >
                {item.type === "analysis"
                  ? translate("processing.analysis")
                  : translate("processing.description")}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
