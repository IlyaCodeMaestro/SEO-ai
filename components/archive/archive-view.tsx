"use client";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ChevronUp, ChevronDown, FileText } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useProcessingContext } from "../main/processing-provider";

interface ArchiveViewProps {
  onSelectItem?: (item: any) => void;
}

export function ArchiveView({ onSelectItem }: ArchiveViewProps) {
  const { archivedItems, markItemAsRead } = useProcessingContext();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  // Группировка элементов по дате
  const groupedItems = archivedItems.reduce((acc, item) => {
    const date = format(new Date(item.timestamp), "d MMMM", { locale: ru });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, typeof archivedItems>);

  // Сортировка дат (сначала новые)
  const sortedDates = Object.keys(groupedItems).sort((a, b) => {
    const dateA = new Date(groupedItems[a][0].timestamp);
    const dateB = new Date(groupedItems[b][0].timestamp);
    return dateB.getTime() - dateA.getTime();
  });

  // Функция для определения статуса элемента
  const getItemStatus = (item: any) => {
    if (item.type === "both") {
      return "Анализ и описание Выполнены";
    } else if (item.type === "analysis") {
      return "Анализ Выполнен";
    } else {
      return "Описание Выполнено";
    }
  };

  // Функция для обработки клика по элементу
  const handleItemClick = (item: any) => {
    if (item.isNew) {
      markItemAsRead(item.id);
    }
    if (onSelectItem) {
      onSelectItem(item);
    }
  };

  // Функции для скролла
  const scrollUp = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop -= 100;
    }
  };

  const scrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop += 100;
    }
  };

  // Проверка возможности скролла
  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current;
      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(scrollTop + clientHeight < scrollHeight);
      setShowScrollButtons(scrollHeight > clientHeight);
    }
  };

  // Проверка при монтировании и изменении элементов
  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [archivedItems]);

  // Обработчик события скролла
  const handleScroll = () => {
    checkScrollability();
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-[20px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="py-6">
        <h2 className="text-[#1950df] font-medium text-center text-xl">
          Архив
        </h2>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-auto px-4"
        onScroll={handleScroll}
      >
        {sortedDates.length === 0 ? (
          <div className="text-center py-8 text-[#959699]">
            В архиве пока нет элементов
          </div>
        ) : (
          <div>
            {sortedDates.map((date) => (
              <div key={date} className="mb-6">
                <h3 className="text-sm font-medium mb-4 ml-2">{date}</h3>

                {groupedItems[date].map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-4 shadow-around flex items-center cursor-pointer hover:bg-gray-50 mb-4 relative"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="w-8 h-8 bg-[#d9d9d9] rounded-full mr-3 overflow-hidden flex-shrink-0">
                      <img
                        src={`/placeholder.svg?height=32&width=32&query=clothing`}
                        alt="Product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-[#000000]">
                        {item.name}
                      </p>
                      <div className="flex items-center">
                        <p className="text-xs text-[#959699]">{item.sku}</p>
                        <FileText className="h-3 w-3 ml-2 text-[#afafaf]" />
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-[#1950df] whitespace-nowrap">
                        {getItemStatus(item)}
                      </span>
                    </div>
                    {item.isNew && (
                      <div className="absolute right-1 top-1 w-6 h-6 bg-[#1950df] rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Кнопки навигации */}
      {showScrollButtons && (
        <div className="flex justify-center py-3">
          <button
            onClick={scrollUp}
            className={`p-1 mx-2 rounded-full ${
              canScrollUp
                ? "text-[#1950df] hover:bg-blue-50"
                : "text-[#d9d9d9] cursor-not-allowed"
            }`}
            disabled={!canScrollUp}
          >
            <ChevronUp className="h-5 w-5" />
          </button>
          <button
            onClick={scrollDown}
            className={`p-1 mx-2 rounded-full ${
              canScrollDown
                ? "text-[#1950df] hover:bg-blue-50"
                : "text-[#d9d9d9] cursor-not-allowed"
            }`}
            disabled={!canScrollDown}
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
