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
    <div className="flex flex-col h-full ">
      <div className="px-4 py-6 flex-1">
        <h2 className="text-[rgba(25,80,223,1)] font-medium mb-4 text-center">
          {t("common.main")}
        </h2>

        <div className="bg-[#F6F6F6] rounded-[24px] shadow-sm p-4">
          <p className="mb-5">{t("common.greeting")}</p>

          <div className="space-y-5">
            {/* Первая карточка */}
            <div className="rounded-xl p-5 bg-gradient-to-r from-[rgba(0,131,172,0.71)] to-[rgba(52,96,209,1)] text-white">
              <h3 className="font-medium mb-1">
                {t("product.analysis.title")}
              </h3>
              <p className="text-xs mb-3 opacity-90">
                {t("product.analysis.desc")}
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-black hover:bg-gray-100 rounded-full text-xs px-5 py-1 h-auto"
                onClick={() => onOpenPanel("product-analysis")}
              >
                {t("common.start")}
              </Button>
            </div>

            {/* Вторая карточка */}
            <div className="rounded-xl p-5 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <h3 className="font-medium mb-1">
                {t("product.description.title")}
              </h3>
              <p className="text-xs mb-3 opacity-90">
                {t("product.description.desc")}
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-black hover:bg-gray-100 rounded-full text-xs px-5 py-1 h-auto"
                onClick={() => onOpenPanel("product-description")}
              >
                {t("common.start")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-6 mt-auto">
        {processingItems.length > 0 && (
          <Button
            className="w-full bg-[rgba(38,99,255,1)] hover:bg-blue-700 text-white rounded-full"
            onClick={onOpenProcessing}
          >
            {t("common.processing")}
          </Button>
        )}
      </div>
    </div>
  );
}
