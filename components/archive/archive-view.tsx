"use client";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { FileText, Inbox } from "lucide-react";
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
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Функция для безопасной проверки пустого архива
  const isArchiveEmpty = () => {
    return (
      !archivedItems ||
      !Array.isArray(archivedItems) ||
      archivedItems.length === 0
    );
  };

  // Группировка элементов по дате, если архив не пуст
  const groupedItems = !isArchiveEmpty()
    ? archivedItems.reduce((acc, item) => {
        const date = format(new Date(item.timestamp), "d MMMM", { locale: ru });
        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
      }, {} as Record<string, typeof archivedItems>)
    : {};

  // Сортировка дат, если архив не пуст
  const sortedDates = !isArchiveEmpty()
    ? Object.keys(groupedItems).sort((a, b) => {
        const dateA = new Date(groupedItems[a][0].timestamp);
        const dateB = new Date(groupedItems[b][0].timestamp);
        return dateB.getTime() - dateA.getTime();
      })
    : [];

  const getItemStatus = (item: any) => {
    if (item.type === "both") return "Анализ и\nописание\nвыполнены";
    if (item.type === "analysis") return "Анализ\nвыполнен";
    return "Описание\nвыполнено";
  };

  const handleItemClick = (item: any) => {
    if (item.isNew) markItemAsRead(item.id);
    setSelectedItemId(item.id);
    if (onSelectItem) onSelectItem(item);
  };

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current;
      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(scrollTop + clientHeight < scrollHeight);
      setShowScrollButtons(scrollHeight > clientHeight);
    }
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [archivedItems]);

  const handleScroll = () => {
    checkScrollability();
  };

  const formatStatusText = (text: string) => {
    return text.split("\n").map((line, i) => (
      <span key={i} className="block">
        {line}
      </span>
    ));
  };

  // Функция для разделения текста на две строки
  const formatProductName = (name: string) => {
    const words = name.split(" ");
    const midpoint = Math.ceil(words.length / 2);

    const firstLine = words.slice(0, midpoint).join(" ");
    const secondLine = words.slice(midpoint).join(" ");

    return (
      <>
        <span className="block">{firstLine}</span>
        {secondLine && <span className="block">{secondLine}</span>}
      </>
    );
  };

  // Функция для определения стиля элемента в зависимости от его состояния
  const getItemStyle = (itemId: string) => {
    // Базовые классы, которые всегда применяются
    const baseClasses =
      "bg-white rounded-2xl p-4 shadow-md flex items-start cursor-pointer mb-4 relative transition-all duration-200";

    // Только для десктопа (md:)
    if (selectedItemId === itemId) {
      // Если элемент выбран - синяя граница всегда видна
      return `${baseClasses} md:border-2 md:border-blue-600`;
    } else {
      // Если элемент не выбран - прозрачная граница по умолчанию, синяя при наведении
      return `${baseClasses} md:border-2 md:border-transparent md:hover:border-blue-600`;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="py-4">
        <h2 className="text-blue-600 font-medium text-center text-xl">Архив</h2>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-auto px-4"
        onScroll={handleScroll}
      >
        {isArchiveEmpty() ? (
          <div className="text-center py-8 text-[#161616] flex flex-col items-center justify-center">
            <Inbox className="w-12 h-12 text-gray-400 mb-3" />
            <p className="font-medium text-base">В архиве пока нет элементов</p>
          </div>
        ) : (
          <div>
            {sortedDates.map((date) => (
              <div key={date} className="mb-6">
                <h3 className="text-[#333333] font-medium mb-4 text-lg md:text-lg sm:text-base">
                  {date}
                </h3>

                {groupedItems[date].map((item) => (
                  <div
                    key={item.id}
                    className={getItemStyle(item.id)}
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="w-16 h-16 rounded-md mr-4 overflow-hidden flex-shrink-0">
                      <img
                        src={`/placeholder.svg?height=64&width=64&query=product`}
                        alt="Product"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="font-normal md:text-md sm:text-md text-md text-black leading-tight mb-2">
                        {formatProductName(item.name)}
                      </div>

                      <div className="flex items-center mt-1">
                        <p className="text-blue-600 md:text-base sm:text-md text-md">
                          {item.sku}
                        </p>
                        <FileText className="md:h-5 md:w-5 md:ml-2 sm:h-3 sm:w-3 sm:ml-1 h-3 w-3 ml-1 text-blue-600" />
                      </div>
                    </div>

                    <div className="text-blue-600 text-right mt-3 md:text-md sm:text-md text-md font-normal ml-2 md:w-28 sm:w-24 w-24">
                      {formatStatusText(getItemStatus(item))}
                    </div>

                    {item.isNew && (
                      <div className="absolute right-1 top-1 w-6 h-6 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
