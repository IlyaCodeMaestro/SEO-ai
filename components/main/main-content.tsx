"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "../provider/language-provider";
import { useProcessingContext } from "./processing-provider";

interface MainContentProps {
  onOpenPanel: (panel: "product-analysis" | "product-description") => void;
  onOpenProcessing: () => void;
}

export function MainContent({
  onOpenPanel,
  onOpenProcessing,
}: MainContentProps) {
  const { processingItems } = useProcessingContext();
  const { t } = useLanguage();

  return (
    <div className="flex flex-col h-full">
      <div className="pt-4 pb-0 px-6">
        <h2 className="text-[#1950DF] font-medium mb-4  text-center text-lg md:text-md uppercase tracking-wide">
          Главная
        </h2>
        <h1 className="text-[25px] md:text-xl font-normal mb-4">
          Здравствуйте, Ерлан!
        </h1>

        {/* First card */}
        <div className="rounded-[24px] p-6 mb-5 bg-gradient-to-r from-[#6BBBC7] to-[#4169E1] text-white shadow-bottom-only">
          <h2 className="text-[22px]  font-medium mb-3 ml-2">
            Анализ карточки товара
          </h2>
          <p className="text-base md:text-sm mb-1 ml-2 font-medium">
            Проверьте качество SEO и текста
          </p>
          <p className="text-base md:text-sm mb-5 ml-2 font-thin">
            Доступно 25 анализов
          </p>
          <div className="ml-2">
            <Button
              variant="secondary"
              className="bg-white text-black hover:bg-gray-100 rounded-full text-base md:text-sm px-8 py-1  w-[160px]"
              onClick={() => onOpenPanel("product-analysis")}
            >
              Перейти
            </Button>
          </div>
        </div>

        {/* Second card */}
        <div className="rounded-[24px] p-6 bg-[#4169E1] text-white shadow-bottom-only">
          <h2 className="text-[22px]  font-medium mb-3 ml-2">
            Описание карточки товара
          </h2>
          <p className="text-base mb-1 ml-2 text-[15px] md:text-sm font-medium">
            Качественное SEO и текст за пару кликов
          </p>
          <p className="text-base mb-5 ml-2 text-[15px] md:text-sm font-thin">
            Доступно 30 описаний
          </p>
          <div className="ml-2">
            <Button
              variant="secondary"
              className="bg-white text-black hover:bg-gray-100 rounded-full text-base md:text-sm px-8 py-1  w-[160px]"
              onClick={() => onOpenPanel("product-description")}
            >
              Перейти
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 pb-2  mt-6">
        {processingItems.length > 0 && (
          <Button
            className="w-full h-[72px] rounded-[25px] bg-[rgba(38,99,255,1)] hover:bg-[rgba(38,99,255,0.85)] text-white  text-xl md:text-base"
            onClick={onOpenProcessing}
          >
            В обработке...
          </Button>
        )}
      </div>
    </div>
  );
}
