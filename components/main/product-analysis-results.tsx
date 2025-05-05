"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, X, Info, Star } from "lucide-react";
import { getProductBySku, getProductAnalysis } from "@/lib/api";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "../provider/language-provider";

interface ProductAnalysisResultsProps {
  onClose: () => void;
  onBack: () => void;
  productData: {
    sku: string;
    competitorSku: string;
  };
}

export function ProductAnalysisResults({
  onClose,
  onBack,
  productData,
}: ProductAnalysisResultsProps) {
  const { language } = useLanguage();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [product, setProduct] = useState<any>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Добавляем переводы для результатов анализа
  const translations = {
    ru: {
      "results.title": "Анализ карточки товара",
      "results.product.name": "Название товара",
      "results.analysis": "Результаты анализа",
      "results.visibility": "Видимость карточки:",
      "results.keywords.presence": "Наличие ключевых слов:",
      "results.keywords.missed": "Упущенно ключевых слов:",
      "results.coverage.missed": "Упущенный охват:",
      "results.keywords.missed.words": "Упущенные ключевые слова",
      "results.keywords": "Ключевые слова",
      "results.frequency": "Частотность",
      "results.loading": "Загрузка результатов анализа...",
      "results.error": "Не удалось загрузить результаты анализа",
      "results.retry": "Повторить попытку",
      "results.no.data": "Нет данных для отображения",
      "results.back": "Назад",
    },
    kz: {
      "results.title": "Тауар карточкасын талдау",
      "results.product.name": "Тауар атауы",
      "results.analysis": "Талдау нәтижелері",
      "results.visibility": "Карточка көрінісі:",
      "results.keywords.presence": "Кілт сөздердің болуы:",
      "results.keywords.missed": "Жіберіп алған кілт сөздер:",
      "results.coverage.missed": "Жіберіп алған қамту:",
      "results.keywords.missed.words": "Жіберіп алған кілт сөздер",
      "results.keywords": "Кілт сөздер",
      "results.frequency": "Жиілік",
      "results.loading": "Талдау нәтижелерін жүктеу...",
      "results.error": "Талдау нәтижелерін жүктеу мүмкін болмады",
      "results.retry": "Қайталап көру",
      "results.no.data": "Көрсетілетін деректер жоқ",
      "results.back": "Артқа",
    },
    en: {
      "results.title": "Product Card Analysis",
      "results.product.name": "Product name",
      "results.analysis": "Analysis results",
      "results.visibility": "Card visibility:",
      "results.keywords.presence": "Presence of keywords:",
      "results.keywords.missed": "Missed keywords:",
      "results.coverage.missed": "Missed coverage:",
      "results.keywords.missed.words": "Missed keywords",
      "results.keywords": "Keywords",
      "results.frequency": "Frequency",
      "results.loading": "Loading analysis results...",
      "results.error": "Failed to load analysis results",
      "results.retry": "Retry",
      "results.no.data": "No data to display",
      "results.back": "Back",
    },
  };

  // Функция для получения перевода
  const translate = (key: string) => {
    return translations[language][key] || key;
  };

  // Функция для загрузки данных
  const fetchData = async () => {
    setLoading(true);
    // Добавляем небольшую задержку для имитации загрузки
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const [productInfo, analysisInfo] = await Promise.all([
        getProductBySku(productData.sku),
        getProductAnalysis(productData.sku),
      ]);
      setProduct(productInfo);
      setAnalysisData(analysisInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // Загрузка данных о товаре и результатов анализа при монтировании компонента
  useEffect(() => {
    fetchData();
  }, [productData.sku, language]);

  // Отображение загрузки
  if (loading) {
    return (
      <div className="h-full relative flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
          <p>{translate("results.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      <div className="max-w-md mx-auto p-6">
        {/* Заголовок с кнопками назад и закрыть */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-2" aria-label="Back">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-medium">
              {translate("results.title")}
            </h2>
          </div>
          {/* Кнопка закрытия только для десктопа */}
          {!isMobile && (
            <button onClick={onClose} className="p-2" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          {/* Название товара */}
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 overflow-hidden">
              <img
                src={product?.image || "/placeholder.svg?height=48&width=48"}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{product?.name}</p>
              <p className="text-sm text-gray-500">SKU: {product?.article}</p>
            </div>
            <button className="ml-auto">
              <Info className="h-5 w-5 text-blue-500" />
            </button>
          </div>

          {/* Результаты анализа */}
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">
                {translate("results.analysis")}
              </h3>
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= analysisData?.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 font-medium">{analysisData?.rating}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>{translate("results.visibility")}</span>
                <span className="font-medium">
                  {analysisData?.visibility} %
                </span>
              </div>
              <div className="flex justify-between">
                <span>{translate("results.keywords.presence")}</span>
                <span className="font-medium">
                  {analysisData?.keywordsPresence} %
                </span>
              </div>
              <div className="flex justify-between">
                <span>{translate("results.keywords.missed")}</span>
                <span className="font-medium">
                  {analysisData?.missedKeywords}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{translate("results.coverage.missed")}</span>
                <span className="font-medium">
                  {typeof analysisData?.missedCoverage === "number"
                    ? analysisData?.missedCoverage.toLocaleString()
                    : analysisData?.missedCoverage}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm text-gray-500 mb-2">
                {translate("results.keywords.missed.words")}
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-blue-500">
                    {translate("results.keywords")}
                  </span>
                  <span className="font-medium">
                    {translate("results.frequency")}
                  </span>
                </div>
                {analysisData?.keywords?.map((keyword, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-blue-500">{keyword.word}</span>
                    <span>
                      {typeof keyword.frequency === "number"
                        ? keyword.frequency.toLocaleString()
                        : keyword.frequency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
