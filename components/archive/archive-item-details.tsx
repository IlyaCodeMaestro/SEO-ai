"use client";

import React from "react";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../provider/language-provider";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ShareMenu } from "../shared/share-menu";
import { useProcessingContext } from "../main/processing-provider";
import { ArchiveHeader } from "./archive-layout/archive-header";
import { ProductInfo } from "./archive-layout/product-info";
import { ResultsBlock } from "./archive-layout/results-block";
import { KeywordsTable } from "./archive-layout/keywords-table";
import { TopKeywords } from "./archive-layout/top-keywords";
import { DescriptionBlock } from "./archive-layout/description-block";
import { ConfirmationModal } from "./archive-layout/confirmation-modal";
import { IrrelevantKeywordsTable } from "./archive-layout/irrelevant-keywords";
import { MissedKeywordsTable } from "./archive-layout/missed-keywords-table";
import { Check, Copy, Share2, Star } from "lucide-react";
import { ArchiveItemDetailsModal } from "./archive-layout/block-modal";

interface ArchiveItemDetailsProps {
  onClose: () => void;
  item: {
    id: string;
    sku: string;
    competitorSku: string;
    type: "analysis" | "description" | "both";
    status: "processing" | "completed";
    timestamp: number;
    name: string;
  };
}

export function ArchiveItemDetails({ onClose, item }: ArchiveItemDetailsProps) {
  const { t } = useLanguage();
  const isMobile = useMediaQuery("(max-width: 1060px)");
  const { addProcessingItem } = useProcessingContext();
  const [showModal, setShowModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    results: false,
    topKeywords: false,
    usedKeywords: false,
    irrelevantKeywords: false,
    missedKeywords: false,
    description: false,
  });
  const [shareContent, setShareContent] = useState<{
    content: string;
    title?: string;
  } | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  const [modalTitle, setModalTitle] = useState("");
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  // Prevent scrolling of the archive-item-details when modal is open
  useEffect(() => {
    if (modalOpen && containerRef.current) {
      containerRef.current.style.overflow = "hidden";
    } else if (containerRef.current) {
      containerRef.current.style.overflow = "auto";
    }
  }, [modalOpen]);

  // Моковые данные для результатов анализа
  const analysisResults = {
    rating: 3.1,
    topKeywords: [
      { name: "Название товара", sku: "SKU1" },
      { name: "Название товара", sku: "SKU2" },
      { name: "Название товара 3", sku: "SKU3" },
      { name: "Название товара 4", sku: "SKU4" },
      { name: "Название товара 5", sku: "SKU5" },
    ],
    usedKeywords: [
      { word: "Вечерняя", frequency: "45.098" },
      { word: "Мягкая", frequency: "25.456" },
      { word: "Элегант", frequency: "17.988" },
      { word: "Рубашка", frequency: "40.634" },
      { word: "Черная", frequency: "33.423" },
      { word: "Стильная", frequency: "28.765" },
      { word: "Модная", frequency: "22.543" },
      { word: "Качественная", frequency: "19.876" },
    ],
    irrelevantKeywords: [
      { word: "Дешевая", frequency: "22.125" },
      { word: "Распродажа", frequency: "18.567" },
      { word: "Скидка", frequency: "15.634" },
      { word: "Акция", frequency: "12.987" },
      { word: "Уценка", frequency: "10.543" },
    ],
    missedKeywords: [
      { word: "Качественная", frequency: "55.125" },
      { word: "Стильная", frequency: "48.567" },
      { word: "Модная", frequency: "45.634" },
      { word: "Трендовая", frequency: "42.876" },
      { word: "Современная", frequency: "38.543" },
    ],
    description:
      "Мужская футболка, классического покроя, из высококачественного хлопка. Идеально подходит для повседневной носки. Приятная на ощупь ткань обеспечивает комфорт и удобство. Доступна в различных цветах и размерах. Легко стирается и быстро сохнет. Не теряет форму и цвет после многократных стирок. Подходит для любого сезона и случая. Отлично сочетается с джинсами, шортами и другой повседневной одеждой.",
  };

  // Функция для переключения состояния раскрытия секции
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleWriteDescription = () => {
    setShowModal(true);
  };

  const handleContinue = () => {
    setShowModal(false);
    // Добавляем элемент в обработку с типом "description"
    addProcessingItem("description", {
      sku: item.sku,
      competitorSku: item.competitorSku,
    });
    // Закрываем панель деталей и переходим на главную
    onClose();
    // Переключаемся на вкладку "main"
    window.location.hash = "main";
  };

  // Функция для копирования контента
  const handleCopy = (content: string, section: string) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setCopiedSection(section);
        setTimeout(() => setCopiedSection(null), 2000);
      })
      .catch((err) => {
        console.error("Ошибка при копировании текста: ", err);
      });
  };

  // Функция для шеринга ключевых слов
  const handleShareKeywords = (
    keywords: { word: string; frequency: string }[],
    title: string
  ) => {
    const keywordsText = keywords
      .map((keyword) => `${keyword.word}: ${keyword.frequency}`)
      .join("\n");

    setShareContent({
      title: `${item.name} - ${title}`,
      content: keywordsText,
    });
  };

  // Функция для шеринга описания товара
  const handleShareDescription = () => {
    setShareContent({
      title: `${item.name} - ${t("archive.details.description")}`,
      content: analysisResults.description,
    });
  };

  // Function to get color based on rating
  const getRatingColor = (rating: number) => {
    if (rating < 2.5) return "text-red-500";
    if (rating < 3.5) return "text-yellow-500";
    return "text-green-500";
  };

  const handleMaximize = (section: string, title: string) => {
    setModalTitle(title);
    setCurrentSection(section);

    // Set the content based on the section
    let content;
    switch (section) {
      case "topKeywords":
        content = (
          <div>
            <div className="bg-[#f9f8f8] rounded-[20px] shadow-md">
              <div className="p-6">
                <div className="space-y-4">
                  {analysisResults.topKeywords.map((keyword, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-[16px] p-4 flex items-start"
                    >
                      <div className="w-[80px] h-[80px] bg-gray-200 rounded-lg mr-4 overflow-hidden flex-shrink-0">
                        <img
                          src={`/placeholder.svg?height=80&width=80&query=hair dryer`}
                          alt="Product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-medium leading-tight mb-3">
                          {keyword.name}
                        </p>
                        <div className="flex items-center">
                          <p className="text-lg text-[#22C55E]">
                            {keyword.sku}
                          </p>
                          <button
                            onClick={() =>
                              handleCopy(keyword.sku, "topKeywords")
                            }
                            className="ml-2"
                            aria-label="Copy SKU"
                          >
                            {copiedSection === "topKeywords" ? (
                              <Check className="h-5 w-5 text-[#22C55E]" />
                            ) : (
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="4.5"
                                  y="4.5"
                                  width="15"
                                  height="15"
                                  rx="3"
                                  stroke="#22C55E"
                                  strokeWidth="1.5"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case "results":
        content = (
          <div className="bg-[#f9f8f8] rounded-[20px] shadow-md">
            <div className="p-6">
              <div className="flex items-center justify-center mb-6"></div>

              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-8 w-8 ${
                          star <= Math.round(analysisResults.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-2xl font-bold text-gray-600 dark:text-gray-400">
                    {analysisResults.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-[16px] p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300 text-lg">
                      Видимость:
                    </span>
                    <span className="font-medium text-lg">60 %</span>
                  </div>
                </div>

                <div className="bg-white rounded-[16px] p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300 text-lg">
                      Присутствие ключевых слов:
                    </span>
                    <span className="font-medium text-lg">70 %</span>
                  </div>
                </div>

                <div className="bg-white rounded-[16px] p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300 text-lg">
                      Упущено ключевых слов:
                    </span>
                    <span className="font-medium text-lg">10</span>
                  </div>
                </div>

                <div className="bg-white rounded-[16px] p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300 text-lg">
                      Упущенный охват:
                    </span>
                    <span className="font-medium text-lg">45 678 900</span>
                  </div>
                </div>

                <div className="bg-white rounded-[16px] p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300 text-lg">
                      Наличие нерелевантных слов:
                    </span>
                    <span className="font-medium text-lg">13</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case "usedKeywords":
        content = (
          <div>
            <div className="bg-[#f9f8f8] rounded-[20px] shadow-md">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="font-medium text-lg">Ключевые слова</div>
                  <div className="font-medium text-lg text-right">
                    Сумм. частотность
                  </div>
                  {analysisResults.usedKeywords.map((keyword, index) => (
                    <React.Fragment key={index}>
                      <div className="bg-white rounded-[16px] p-4">
                        <p className="text-lg">{keyword.word}</p>
                      </div>
                      <div className="bg-white rounded-[16px] p-4">
                        <p className="text-lg text-right text-gray-500">
                          {keyword.frequency}
                        </p>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case "irrelevantKeywords":
        content = (
          <div>
            <div className="bg-[#f9f8f8] rounded-[20px] shadow-md">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="font-medium text-lg">Нерелевант. слова</div>
                  <div className="font-medium text-lg text-right">
                    Сумм. частотность
                  </div>
                  {analysisResults.irrelevantKeywords.map((keyword, index) => (
                    <React.Fragment key={index}>
                      <div className="bg-white rounded-[16px] p-4">
                        <p className="text-lg text-blue-600">{keyword.word}</p>
                      </div>
                      <div className="bg-white rounded-[16px] p-4">
                        <p className="text-lg text-right text-gray-500">
                          {keyword.frequency}
                        </p>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case "missedKeywords":
        content = (
          <div>
            <div className="bg-[#f9f8f8] rounded-[20px] shadow-md">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="font-medium text-lg">Ключевые слова</div>
                  <div className="font-medium text-lg text-right">
                    Сумм. частотность
                  </div>
                  {analysisResults.missedKeywords.map((keyword, index) => (
                    <React.Fragment key={index}>
                      <div className="bg-white rounded-[16px] p-4">
                        <p className="text-lg text-blue-500">{keyword.word}</p>
                      </div>
                      <div className="bg-white rounded-[16px] p-4">
                        <p className="text-lg text-right text-gray-500">
                          {keyword.frequency}
                        </p>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case "description":
        content = (
          <div>
            <div className="bg-[#f9f8f8] rounded-[20px] shadow-md">
              <div className="p-6">
                <div className="bg-white rounded-[16px] p-6">
                  <p className="text-lg leading-relaxed whitespace-pre-wrap">
                    {analysisResults.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        break;
      default:
        content = null;
    }

    setModalContent(content);
    setModalOpen(true);
  };

  const renderDesktopLayout = () => {
    return (
      <div
        className="h-full overflow-auto bg-white dark:bg-gray-900"
        ref={containerRef}
      >
        <div className="p-3 sm:p-6">
          {/* Заголовок с кнопкой закрытия */}
          <ArchiveHeader
            onClose={onClose}
            isMobile={false}
            itemType={item.type}
          />

          {/* Верхний блок с информацией о товаре */}
          <ProductInfo item={item} isMobile={false} />

          {/* Основной контент в зависимости от типа */}
          {item.type === "analysis" && (
            <>
              {/* Двухколоночная сетка для анализа */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Левая колонка */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Результаты анализа */}
                  <ResultsBlock
                    title="Результаты анализа"
                    rating={analysisResults.rating}
                    isMobile={false}
                    isExpanded={expandedSections["results"]}
                    onToggle={toggleSection}
                    section="results"
                    onMaximize={(title) => handleMaximize("results", title)}
                  />
                </div>

                {/* Правая колонка */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Использованные нерелевантные слова */}
                  <MissedKeywordsTable
                    title="Упущенные ключевые слова"
                    keywords={analysisResults.missedKeywords}
                    section="missedKeywords"
                    isExpanded={expandedSections["missed-keywords"]}
                    onToggle={toggleSection}
                    onCopy={handleCopy}
                    onShare={handleShareKeywords}
                    copiedSection={copiedSection}
                    textColorClass="text-blue-500"
                    isMobile={false}
                    onMaximize={(title) =>
                      handleMaximize("missedKeywords", title)
                    }
                  />
                </div>
              </div>

              {/* Упущенные ключевые слова (на всю ширину внизу) */}
              <div className="mt-4 sm:mt-6">
                <IrrelevantKeywordsTable
                  title="Использованные нерелевантные слова"
                  keywords={analysisResults.irrelevantKeywords}
                  section="irrelevantKeywords"
                  isExpanded={expandedSections["irrelevantKeywords"]}
                  onToggle={toggleSection}
                  onCopy={handleCopy}
                  onShare={handleShareKeywords}
                  copiedSection={copiedSection}
                  textColorClass="text-red-500"
                  isMobile={false}
                  onMaximize={(title) =>
                    handleMaximize("irrelevantKeywords", title)
                  }
                />
              </div>

              {/* Кнопка "Написать описание" */}
              <div className="flex justify-center mt-4 sm:mt-6">
                <button
                  onClick={handleWriteDescription}
                  className="bg-gradient-to-r from-[#0d52ff] to-[rgba(11,60,187,1)] text-white rounded-full h-[40px] sm:h-[45px] border border-white shadow-around inline-block px-6 sm:px-8 text-sm sm:text-base"
                  style={{ width: "fit-content" }}
                >
                  {t("archive.write.description")}
                </button>
              </div>
            </>
          )}

          {item.type === "description" && (
            <>
              {/* Двухколоночная сетка для описания */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Левая колонка */}
                <div>
                  <TopKeywords
                    keywords={analysisResults.topKeywords}
                    section="topKeywords"
                    isExpanded={expandedSections["topKeywords"]}
                    onToggle={toggleSection}
                    isMobile={false}
                    onMaximize={(section, title) =>
                      handleMaximize(section, title)
                    }
                  />
                </div>

                {/* Правая колонка */}
                <div>
                  <KeywordsTable
                    title="Использованные ключевые слова"
                    keywords={analysisResults.usedKeywords}
                    section="usedKeywords"
                    isExpanded={expandedSections["usedKeywords"]}
                    onToggle={toggleSection}
                    onCopy={handleCopy}
                    onShare={handleShareKeywords}
                    copiedSection={copiedSection}
                    isMobile={false}
                    onMaximize={(title) =>
                      handleMaximize("usedKeywords", title)
                    }
                  />
                </div>
              </div>

              {/* Использованные ключевые слова (под двумя блоками) */}
              <div className="mt-4 sm:mt-6">
                <DescriptionBlock
                  title="Описание карточки товара"
                  description={analysisResults.description}
                  section="description"
                  isExpanded={expandedSections["description"]}
                  onToggle={toggleSection}
                  onCopy={handleCopy}
                  onShare={handleShareDescription}
                  copiedSection={copiedSection}
                  isMobile={false}
                  onMaximize={(title) => handleMaximize("description", title)}
                />
              </div>
            </>
          )}

          {item.type === "both" && (
            <>
              {/* Общая двухколоночная сетка 2x2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Результаты анализа */}
                <div className="space-y-4 sm:space-y-6">
                  <ResultsBlock
                    title="Результаты анализа"
                    rating={analysisResults.rating}
                    isMobile={false}
                    isExpanded={expandedSections["results"]}
                    onToggle={toggleSection}
                    section="results"
                    onMaximize={(title) => handleMaximize("results", title)}
                  />
                </div>

                {/* Ключевые слова ТОП позиций */}
                <div className="space-y-4 sm:space-y-6">
                  <TopKeywords
                    keywords={analysisResults.topKeywords}
                    section="topKeywords"
                    isExpanded={expandedSections["topKeywords"]}
                    onToggle={toggleSection}
                    isMobile={false}
                    onMaximize={(title) => handleMaximize("topKeywords", title)}
                  />
                </div>

                {/* Использованные ключевые слова */}
                <div className="space-y-4 sm:space-y-6">
                  <KeywordsTable
                    title="Использованные ключевые слова"
                    keywords={analysisResults.usedKeywords}
                    section="usedKeywords"
                    isExpanded={expandedSections["usedKeywords"]}
                    onToggle={toggleSection}
                    onCopy={handleCopy}
                    onShare={handleShareKeywords}
                    copiedSection={copiedSection}
                    isMobile={false}
                    onMaximize={(title) =>
                      handleMaximize("usedKeywords", title)
                    }
                  />
                </div>

                {/* Описание карточки товара */}
                <div className="space-y-4 sm:space-y-6">
                  <DescriptionBlock
                    title="Описание карточки товара"
                    description={analysisResults.description}
                    section="description"
                    isExpanded={expandedSections["description"]}
                    onToggle={toggleSection}
                    onCopy={handleCopy}
                    onShare={handleShareDescription}
                    copiedSection={copiedSection}
                    fullWidth={false} // убираем fullWidth, чтобы заняло только половину
                    isMobile={false}
                    onMaximize={(title) => handleMaximize("description", title)}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // Мобильная версия (обновленная)
  const renderMobileLayout = () => {
    return (
      <div
        className="h-full overflow-auto bg-white dark:bg-gray-900"
        ref={containerRef}
      >
        <div className="p-4">
          {/* Заголовок с кнопкой закрытия */}
          <ArchiveHeader
            onClose={onClose}
            isMobile={true}
            itemType={item.type}
          />

          {/* Верхний блок с информацией о товаре */}
          <ProductInfo item={item} isMobile={true} />

          {item.type === "description" && (
            <div className="space-y-4">
              {/* Ключевые слова TOP позиций */}
              <TopKeywords
                keywords={analysisResults.topKeywords}
                section="topKeywords"
                isExpanded={expandedSections["topKeywords"]}
                onToggle={toggleSection}
                isMobile={true}
              />

              {/* Использованные ключевые слова */}
              <KeywordsTable
                title="Использованные ключевые слова"
                keywords={analysisResults.usedKeywords}
                section="usedKeywords"
                isExpanded={expandedSections["usedKeywords"]}
                onToggle={toggleSection}
                onCopy={handleCopy}
                onShare={handleShareKeywords}
                copiedSection={copiedSection}
                isMobile={true}
              />

              {/* Описание карточки товара */}
              <DescriptionBlock
                title="Описание карточки товара"
                description={analysisResults.description}
                section="description"
                isExpanded={expandedSections["description"]}
                onToggle={toggleSection}
                onCopy={handleCopy}
                onShare={handleShareDescription}
                copiedSection={copiedSection}
                isMobile={true}
              />
            </div>
          )}

          {item.type === "analysis" && (
            <div className="space-y-4">
              {/* Результаты анализа */}
              <ResultsBlock
                title="Результаты анализа"
                rating={analysisResults.rating}
                isMobile={true}
                isExpanded={expandedSections["results"]}
                onToggle={toggleSection}
                section="results"
              />

              {/* Использованные нерелевантные слова */}

              {/* Упущенные ключевые слова */}
              <MissedKeywordsTable
                title="Упущенные ключевые слова"
                keywords={analysisResults.missedKeywords}
                section="missedKeywords"
                isExpanded={expandedSections["missedKeywords"]}
                onToggle={toggleSection}
                onCopy={handleCopy}
                onShare={handleShareKeywords}
                copiedSection={copiedSection}
                textColorClass="text-blue-500"
                isMobile={true}
              />
              <IrrelevantKeywordsTable
                title="Использованные нерелевантные слова"
                keywords={analysisResults.irrelevantKeywords}
                section="irrelevantKeywords"
                isExpanded={expandedSections["irrelevantKeywords"]}
                onToggle={toggleSection}
                onCopy={handleCopy}
                onShare={handleShareKeywords}
                copiedSection={copiedSection}
                textColorClass="text-red-500"
                isMobile={true}
              />
              {/* Кнопка "Написать описание" */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleWriteDescription}
                  className="bg-gradient-to-r from-[#0d52ff] to-[rgba(11,60,187,1)] text-white rounded-full h-[45px] border border-white shadow-around inline-block px-8"
                  style={{ width: "fit-content" }}
                >
                  {t("archive.write.description")}
                </button>
              </div>
            </div>
          )}

          {item.type === "both" && (
            <div className="space-y-4">
              {/* Результаты анализа */}
              <ResultsBlock
                title="Результаты анализа"
                rating={analysisResults.rating}
                isMobile={true}
                isExpanded={expandedSections["results"]}
                onToggle={toggleSection}
                section="results"
              />

              {/* Ключевые слова TOP позиций */}
              <TopKeywords
                keywords={analysisResults.topKeywords}
                section="topKeywords"
                isExpanded={expandedSections["topKeywords"]}
                onToggle={toggleSection}
                isMobile={true}
              />

              {/* Использованные ключевые слова */}
              <KeywordsTable
                title="Использованные ключевые слова"
                keywords={analysisResults.usedKeywords}
                section="usedKeywords"
                isExpanded={expandedSections["usedKeywords"]}
                onToggle={toggleSection}
                onCopy={handleCopy}
                onShare={handleShareKeywords}
                copiedSection={copiedSection}
                isMobile={true}
              />

              {/* Описание карточки товара */}
              <DescriptionBlock
                title="Описание карточки товара"
                description={analysisResults.description}
                section="description"
                isExpanded={expandedSections["description"]}
                onToggle={toggleSection}
                onCopy={handleCopy}
                onShare={handleShareDescription}
                copiedSection={copiedSection}
                isMobile={true}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen">
      {/* Основной контент */}
      {isMobile ? renderMobileLayout() : renderDesktopLayout()}

      {/* Pop-up окно с затемнением фона */}
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleContinue}
      />

      {/* Меню шеринга */}
      {shareContent && (
        <ShareMenu
          content={shareContent.content}
          title={shareContent.title}
          onClose={() => setShareContent(null)}
        />
      )}

      {/* Modal for maximized content */}
      <ArchiveItemDetailsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
      >
        {modalContent}
      </ArchiveItemDetailsModal>
    </div>
  );
}
