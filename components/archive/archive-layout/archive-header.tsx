"use client";

import { ArrowLeft, X } from "lucide-react";

interface ArchiveHeaderProps {
  onClose: () => void;
  isMobile: boolean;
  itemType?: "analysis" | "description" | "both";
}

export function ArchiveHeader({
  onClose,
  isMobile,
  itemType = "description",
}: ArchiveHeaderProps) {
  // Функция для определения подзаголовка в зависимости от типа элемента
  const getSubtitle = () => {
    switch (itemType) {
      case "analysis":
        return "Анализ карточки товара";
      case "description":
        return "Описание карточки товара";
      case "both":
        return "Анализ и описание карточки товара";
      default:
        return "Описание карточки товара";
    }
  };

  if (isMobile) {
    return (
      <div className="flex flex-col items-center mb-4 text-center">
        <div className="flex items-center w-full">
          <button onClick={onClose} className="mr-3" aria-label="Back">
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </button>
          <h2 className="text-blue-600 font-medium text-xl mx-auto">Архив</h2>
        </div>
        <h3 className="text-gray-700 font-medium text-md mt-2">
          {getSubtitle()}
        </h3>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between mb-3">
      <div className="w-5"></div> {/* Пустой элемент для выравнивания */}
      <button onClick={onClose} className="p-1" aria-label="Close">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
