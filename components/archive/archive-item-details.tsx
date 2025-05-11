"use client";

import { useState } from "react";
import { useLanguage } from "../provider/language-provider";
import { X, Info, ArrowLeft, Share2, Copy, Maximize2 } from "lucide-react";
import { Star } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ShareMenu } from "../shared/share-menu";
import { useProcessingContext } from "../main/processing-provider";

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
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { addProcessingItem } = useProcessingContext();
  const [showModal, setShowModal] = useState(false);
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

  // Заменить эту функцию
  const getItemTitle = () => {
    return "Архив";
  };

  // Функция для определения статуса элемента
  const getItemStatus = (item: any) => {
    if (item.type === "both") {
      return t("archive.details.both.completed");
    } else if (item.type === "analysis") {
      return t("archive.details.analysis.completed");
    } else {
      return t("archive.details.description.completed");
    }
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

  // Функция для получения текста для копирования из секции
  const getContentForCopy = (section: string) => {
    switch (section) {
      case "usedKeywords":
        return analysisResults.usedKeywords
          .map((k) => `${k.word}: ${k.frequency}`)
          .join("\n");
      case "irrelevantKeywords":
        return analysisResults.irrelevantKeywords
          .map((k) => `${k.word}: ${k.frequency}`)
          .join("\n");
      case "missedKeywords":
        return analysisResults.missedKeywords
          .map((k) => `${k.word}: ${k.frequency}`)
          .join("\n");
      case "description":
        return analysisResults.description;
      default:
        return "";
    }
  };

  // Компонент блока с ключевыми словами
  const KeywordsBlock = ({
    title,
    keywords,
    section,
    textColorClass = "text-green-500",
  }: {
    title: string;
    keywords: { word: string; frequency: string }[];
    section: string;
    textColorClass?: string;
  }) => (
    <div className=" dark:bg-gray-800 rounded-xl shadow-around overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h3 className="font-medium ">{title}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleCopy(getContentForCopy(section), section)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={t("copy.keywords")}
          >
            <Copy
              className={`h-5 w-5 ${
                copiedSection === section ? "text-green-500" : "text-blue-500"
              }`}
            />
          </button>
          <button
            onClick={() => handleShareKeywords(keywords, title)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={t("share.keywords")}
          >
            <Share2 className="h-5 w-5 text-blue-500" />
          </button>
          <button
            onClick={() => toggleSection(section)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Maximize2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2 text-sm mb-2">
          <span className="font-medium">
            {t("archive.details.keywords.column")}
          </span>
          <span className="font-medium text-right">
            {t("archive.details.frequency.column")}
          </span>
        </div>
        {keywords
          .slice(0, expandedSections[section] ? undefined : 2)
          .map((keyword, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-2 text-sm py-1 border-b border-gray-100 dark:border-gray-700"
            >
              <span className={textColorClass}>{keyword.word}</span>
              <span className="text-right">{keyword.frequency}</span>
            </div>
          ))}
      </div>
    </div>
  );

  // Компонент блока с топ-позициями
  const TopKeywordsBlock = ({
    title,
    keywords,
    section,
  }: {
    title: string;
    keywords: any[];
    section: string;
  }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-around overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h3 className="font-medium">{title}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleSection(section)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Maximize2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {keywords
            .slice(0, expandedSections[section] ? undefined : 1)
            .map((keyword, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 flex items-center"
              >
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full mr-3 overflow-hidden">
                  <img
                    src={`/placeholder.svg?height=32&width=32&query=product`}
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{keyword.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SKU: {keyword.sku}
                  </p>
                </div>
                <button className="ml-auto">
                  <Info className="h-4 w-4 text-blue-500" />
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  // Компонент блока с описанием
  const DescriptionBlock = ({
    title,
    description,
    section,
    fullWidth = false,
  }: {
    title: string;
    description: string;
    section: string;
    fullWidth?: boolean;
  }) => (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-around overflow-hidden ${
        fullWidth ? "col-span-2" : ""
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h3 className="font-medium">{title}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleCopy(description, section)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={t("copy.description")}
          >
            <Copy
              className={`h-5 w-5 ${
                copiedSection === section ? "text-green-500" : "text-blue-500"
              }`}
            />
          </button>
          <button
            onClick={handleShareDescription}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={t("share.description")}
          >
            <Share2 className="h-5 w-5 text-blue-500" />
          </button>
          <button
            onClick={() => toggleSection(section)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Maximize2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <p
          className={`text-sm ${
            expandedSections[section] ? "" : "line-clamp-3"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );

  // Компонент блока с результатами анализа
  const ResultsBlock = ({ title }: { title: string }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-around overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= 3
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 font-medium">{analysisResults.rating}</span>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">
              {t("results.visibility")}:
            </span>
            <span className="font-medium ml-2">60 %</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">
              {t("results.keywords.presence")}:
            </span>
            <span className="font-medium ml-2">70 %</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">
              {t("results.keywords.missed")}:
            </span>
            <span className="font-medium ml-2">10</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">
              {t("results.coverage.missed")}:
            </span>
            <span className="font-medium ml-2">45 678 900</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDesktopLayout = () => {
    return (
      <div className="h-full overflow-auto bg-white dark:bg-gray-900">
        <div className="p-6">
          {/* Заголовок с кнопкой закрытия */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-5"></div> {/* Пустой элемент для центрирования */}
            <div className="w-5"></div> {/* Пустой элемент вместо заголовка */}
            <button onClick={onClose} className="p-2" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Верхний блок с информацией о товаре */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-around mb-6 flex items-center">
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full mr-3 overflow-hidden">
              <img
                src={`/placeholder.svg?height=40&width=40&query=product`}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.sku}
              </p>
            </div>
            <div className="flex items-center">
              <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                {getItemStatus(item)}
              </div>
            </div>
          </div>

          {/* Основной контент в зависимости от типа */}
          {item.type === "analysis" && (
            <>
              {/* Двухколоночная сетка для анализа */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Левая колонка */}
                <div className="space-y-6">
                  {/* Результаты анализа */}
                  <ResultsBlock title={t("archive.details.results")} />
                </div>

                {/* Правая колонка */}
                <div className="space-y-6">
                  {/* Использованные нерелевантные слова */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-around overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                      <h3 className="font-medium">
                        {t("archive.details.irrelevant.keywords")}
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                        <span className="font-medium">
                          {t("archive.details.keywords.column")}
                        </span>
                        <span className="font-medium text-right">
                          {t("archive.details.frequency.column")}
                        </span>
                      </div>
                      {analysisResults.irrelevantKeywords
                        .slice(
                          0,
                          expandedSections["irrelevantKeywords"] ? undefined : 2
                        )
                        .map((keyword, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-2 gap-2 text-sm py-1 border-b border-gray-100 dark:border-gray-700"
                          >
                            <span className="text-red-500">{keyword.word}</span>
                            <span className="text-right">
                              {keyword.frequency}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Упущенные ключевые слова (на всю ширину внизу) */}
              <div className="mt-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-around overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                    <h3 className="font-medium">
                      {t("archive.details.missed.keywords")}
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                      <span className="font-medium">
                        {t("archive.details.keywords.column")}
                      </span>
                      <span className="font-medium text-right">
                        {t("archive.details.frequency.column")}
                      </span>
                    </div>
                    {analysisResults.missedKeywords
                      .slice(
                        0,
                        expandedSections["missedKeywords"] ? undefined : 2
                      )
                      .map((keyword, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-2 gap-2 text-sm py-1 border-b border-gray-100 dark:border-gray-700"
                        >
                          <span className="text-blue-500">{keyword.word}</span>
                          <span className="text-right">
                            {keyword.frequency}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

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
            </>
          )}

          {item.type === "description" && (
            <>
              {/* Двухколоночная сетка для описания */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Левая колонка */}
                <div>
                  <TopKeywordsBlock
                    title={t("archive.details.top.keywords")}
                    keywords={analysisResults.topKeywords}
                    section="topKeywords"
                  />
                </div>

                {/* Правая колонка */}
                <div>
                  <DescriptionBlock
                    title={t("archive.details.description")}
                    description={analysisResults.description}
                    section="description"
                  />
                </div>
              </div>

              {/* Использованные ключевые слова (под двумя блоками) */}
              <div className="mt-6">
                <KeywordsBlock
                  title={t("archive.details.used.keywords")}
                  keywords={analysisResults.usedKeywords}
                  section="usedKeywords"
                />
              </div>
            </>
          )}

          {item.type === "both" && (
            <>
              {/* Двухколоночная сетка для анализа и описания */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Левая колонка */}
                <div className="space-y-6">
                  {/* Результаты анализа */}
                  <ResultsBlock title={t("archive.details.results")} />
                </div>

                {/* Правая колонка */}
                <div className="space-y-6">
                  {/* Использованные ключевые слова (уменьшенный) */}
                  <KeywordsBlock
                    title={t("archive.details.used.keywords")}
                    keywords={analysisResults.usedKeywords}
                    section="usedKeywords"
                  />

                  {/* Ключевые слова ТОП позиций */}
                  <TopKeywordsBlock
                    title={t("archive.details.top.keywords")}
                    keywords={analysisResults.topKeywords}
                    section="topKeywords"
                  />
                </div>
              </div>

              {/* Описание карточки товара (на всю ширину внизу) */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <DescriptionBlock
                  title={t("archive.details.description")}
                  description={analysisResults.description}
                  section="description"
                  fullWidth={true}
                />
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
      <div className="h-full overflow-auto bg-white dark:bg-gray-900">
        <div className="p-6">
          {/* Заголовок с кнопкой закрытия */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={onClose} className="mr-2" aria-label="Back">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-[#1950df] font-medium text-center text-xl">
              {getItemTitle()}
            </h2>
            <div className="w-5"></div>{" "}
            {/* Пустой элемент для центрирования заголовка */}
          </div>

          {/* Верхний блок с информацией о товаре */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-around mb-6 flex items-center">
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full mr-3 overflow-hidden">
              <img
                src={`/placeholder.svg?height=40&width=40&query=product`}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.sku}
              </p>
            </div>
            <div className="flex items-center">
              <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                {getItemStatus(item)}
              </div>
            </div>
          </div>

          {/* Основной контент в зависимости от типа */}
          {item.type === "analysis" && (
            <div className="space-y-6">
              {/* Результаты анализа */}
              <ResultsBlock title={t("archive.details.results")} />

              {/* Использованные нерелевантные слова */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-around overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                  <h3 className="font-medium">
                    {t("archive.details.irrelevant.keywords")}
                  </h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                    <span className="font-medium">
                      {t("archive.details.keywords.column")}
                    </span>
                    <span className="font-medium text-right">
                      {t("archive.details.frequency.column")}
                    </span>
                  </div>
                  {analysisResults.irrelevantKeywords
                    .slice(
                      0,
                      expandedSections["irrelevantKeywords"] ? undefined : 2
                    )
                    .map((keyword, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-2 gap-2 text-sm py-1 border-b border-gray-100 dark:border-gray-700"
                      >
                        <span className="text-red-500">{keyword.word}</span>
                        <span className="text-right">{keyword.frequency}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Упущенные ключевые слова */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-around overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                  <h3 className="font-medium">
                    {t("archive.details.missed.keywords")}
                  </h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                    <span className="font-medium">
                      {t("archive.details.keywords.column")}
                    </span>
                    <span className="font-medium text-right">
                      {t("archive.details.frequency.column")}
                    </span>
                  </div>
                  {analysisResults.missedKeywords
                    .slice(
                      0,
                      expandedSections["missedKeywords"] ? undefined : 2
                    )
                    .map((keyword, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-2 gap-2 text-sm py-1 border-b border-gray-100 dark:border-gray-700"
                      >
                        <span className="text-blue-500">{keyword.word}</span>
                        <span className="text-right">{keyword.frequency}</span>
                      </div>
                    ))}
                </div>
              </div>

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

          {item.type === "description" && (
            <div className="space-y-6">
              {/* Ключевые слова TOP позиций */}
              <TopKeywordsBlock
                title={t("archive.details.top.keywords")}
                keywords={analysisResults.topKeywords}
                section="topKeywords"
              />

              {/* Описание карточки товара */}
              <DescriptionBlock
                title={t("archive.details.description")}
                description={analysisResults.description}
                section="description"
              />

              {/* Использованные ключевые слова */}
              <KeywordsBlock
                title={t("archive.details.used.keywords")}
                keywords={analysisResults.usedKeywords}
                section="usedKeywords"
              />
            </div>
          )}

          {item.type === "both" && (
            <div className="space-y-6">
              {/* Результаты анализа */}
              <ResultsBlock title={t("archive.details.results")} />

              {/* Использованные ключевые слова */}
              <KeywordsBlock
                title={t("archive.details.used.keywords")}
                keywords={analysisResults.usedKeywords}
                section="usedKeywords"
              />

              {/* Ключевые слова ТОП позиций */}
              <TopKeywordsBlock
                title={t("archive.details.top.keywords")}
                keywords={analysisResults.topKeywords}
                section="topKeywords"
              />

              {/* Описание карточки товара */}
              <DescriptionBlock
                title={t("archive.details.description")}
                description={analysisResults.description}
                section="description"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {isMobile ? renderMobileLayout() : renderDesktopLayout()}

      {/* Модальное окно для подтверждения */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg max-w-xs w-full mx-4">
            <div className="text-center space-y-4">
              <h3 className="font-medium">Описание карточки товара</h3>
              <p className="text-sm">
                Описание карточки товара займет примерно 3 минуты
              </p>
              <p className="text-sm">Уведомление придет после завершения</p>
              <p className="text-sm">Уведомление придет после завершения</p>
              <button
                onClick={handleContinue}
                className="bg-gradient-to-r h-[40px] w-36 rounded-[25px] shadow-custom from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white text-white"
              >
                {t("common.next")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Меню шеринга */}
      {shareContent && (
        <ShareMenu
          content={shareContent.content}
          title={shareContent.title}
          onClose={() => setShareContent(null)}
        />
      )}
    </>
  );
}
