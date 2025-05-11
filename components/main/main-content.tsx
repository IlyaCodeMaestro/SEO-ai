"use client";

import { Button } from "@/components/ui/button";
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
        <div className="rounded-[24px] p-4 mb-5 bg-gradient-to-r from-[#64cada] to-[#4169E1] border text-white shadow-bottom-only">
          <h2 className="text-[24px]  font-medium mb-3 ml-2">
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
              className="bg-white text-black hover:bg-gray-100 font-light rounded-full text-base md:text-sm px-8 py-1 h-[32px]  w-[120px]"
              onClick={() => onOpenPanel("product-analysis")}
            >
              Перейти
            </Button>
          </div>
        </div>

        {/* Second card */}
        <div className="rounded-[24px] p-4 bg-gradient-to-r from-[#0d52ff] to-[rgba(11,60,187,1)] border text-white shadow-bottom-only">
          <h2 className="text-[22px]  font-medium mb-3 ml-2">
            Описание карточки товара
          </h2>
          <p className="text-base mb-1 ml-2 text-[14px] md:text-sm font-medium">
            Качественное SEO и текст за пару кликов
          </p>
          <p className="text-base mb-5 ml-2 text-[15px] md:text-sm font-thin">
            Доступно 30 описаний
          </p>
          <div className="ml-2">
            <Button
              variant="secondary"
              className="bg-white font-light text-black hover:bg-gray-100 rounded-full text-base md:text-sm px-8 py-1 h-[32px] w-[120px]"
              onClick={() => onOpenPanel("product-description")}
            >
              Перейти
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center px-4 pb-2 mt-6 w-full">
        {processingItems.length > 0 && (
          <Button
            className="bg-gradient-to-r h-[60px] w-80 rounded-[25px] shadow-custom from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white text-white  text-2xl md:text-xl"
            onClick={onOpenProcessing}
          >
            В обработке...
          </Button>
        )}
      </div>
    </div>
  );
}
