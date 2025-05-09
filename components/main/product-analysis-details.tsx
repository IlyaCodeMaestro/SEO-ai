"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { getProductBySku } from "@/lib/api";

interface ProductAnalysisDetailsProps {
  onClose: () => void;
  onBack: () => void;
  onStartAnalysis: () => void;
  productData: {
    sku: string;
    competitorSku: string;
  };
}

export function ProductAnalysisDetails({
  onClose,
  onBack,
  onStartAnalysis,
  productData,
}: ProductAnalysisDetailsProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isAnalysisStarted, setIsAnalysisStarted] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка данных о товаре при монтировании компонента
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productData.sku) {
        setError("Ошибка при загрузке товара");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const fetchedProduct = await getProductBySku(productData.sku);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Ошибка при загрузке товара");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productData.sku]);

  const handleStartAnalysis = () => {
    setIsAnalysisStarted(true);
    onStartAnalysis();
  };

  // Отображение загрузки
  if (loading) {
    return (
      <div className="h-full relative flex items-center justify-center">
        <div className="text-center">
          <p>Загрузка данных...</p>
        </div>
      </div>
    );
  }

  // Отображение ошибки
  if (error) {
    return (
      <div className="h-full relative flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <Button onClick={onBack} className="mt-4">
            Попробуйте другой SKU
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      <div className="max-w-md mx-auto p-6">
        {/* Заголовок с кнопкой назад */}
        <div className="relative mb-6">
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <button onClick={onBack} aria-label="Назад">
              <ArrowLeft className="h-6 w-6 text-blue-500" />
            </button>
          </div>

          {isMobile ? (
            <div className="text-center">
              <span className="text-blue-500 font-medium text-xl">Главная</span>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div className="flex-1"></div>
              <h2 className="text-md font-normal text-center flex-1">
                Анализ карточки товара
              </h2>
              <div className="flex-1 flex justify-end">
                <button
                  onClick={onClose}
                  className="text-gray-500"
                  aria-label="Закрыть"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {isMobile && (
          <h2 className="text-xl font-normal mb-6 text-center">
            Анализ карточки товара
          </h2>
        )}

        <div className="bg-white rounded-[30px] p-6 shadow-custom mb-6">
          {product ? (
            <div className="flex">
              <div className="w-32 h-32 bg-gray-200 rounded-xl mr-4 overflow-hidden">
                <img
                  src="/placeholder.svg?height=128&width=128"
                  alt="Изображение товара"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="mb-2">
                  <p className="text-md font-medium">SKU: 379067832</p>
                </div>
                <div className="mb-2">
                  <p className="text-md">Название:</p>
                  <p className="text-md">
                    Фен для волос женский мощный с ионизацией
                  </p>
                </div>
                <div>
                  <p className="text-md">Бренд: ARD SHOP</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p>Ошибка при загрузке товара</p>
            </div>
          )}
        </div>

        {!isAnalysisStarted && product && (
          <div className="mt-40 pt-6 flex justify-center">
            <Button
              onClick={handleStartAnalysis}
              className="bg-gradient-to-r from-[#64cada] to-[#4169E1] text-white rounded-full h-[55px] w-[200px] border border-white shadow-custom inline-block px-8"
            >
              Начать анализ
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
