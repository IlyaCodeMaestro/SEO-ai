"use client";

import { ChevronDown, ChevronUp, Maximize2, Star } from "lucide-react";

interface ResultsBlockProps {
  title: string;
  rating: number;
  isMobile: boolean;
  isExpanded?: boolean;
  onToggle?: (section: string) => void;
  section?: string;
  onMaximize?: (title: string) => void;
  fullHeight?: boolean;
}

export function ResultsBlock({
  title,
  rating,
  isMobile,
  isExpanded = false,
  onToggle = () => {},
  section = "results",
  onMaximize,
  fullHeight = false,
}: ResultsBlockProps) {
  // Function to get color based on rating
  const getRatingColor = (rating: number) => {
    if (rating < 2.5) return "text-red-500";
    if (rating < 3.5) return "text-yellow-500";
    return "text-green-500";
  };

  const ratingColor = getRatingColor(rating);

  if (isMobile) {
    return (
      <div className="bg-[#f9f8f8] rounded-xl shadow-md overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-center w-full mb-3">
            <h3 className="font-medium text-sm text-center">{title}</h3>
          </div>
          <div className="flex items-center mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= 3
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 font-medium text-sm">{rating}</span>
          </div>
          <div className="space-y-2">
            {/* Always show first 3 items */}
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">Видимость:</span>
              <span className="font-medium text-sm">60 %</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">
                Присутствие ключевых слов:
              </span>
              <span className="font-medium text-sm">70 %</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">
                Упущено ключевых слов:
              </span>
              <span className="font-medium text-sm">10</span>
            </div>

            {/* Show these items only when expanded */}
            {isExpanded && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">Упущено охвата:</span>
                  <span className="font-medium text-sm">45 678 900</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    Наличие нерелевантных слов:
                  </span>
                  <span className="font-medium text-sm">13</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Add chevron icons for expand/collapse */}
        <div className="flex justify-center pb-2">
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => onToggle(section)}
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-[#f9f8f8] dark:bg-gray-800 rounded-[20px] shadow-md overflow-hidden ${
        fullHeight ? "h-full" : !isExpanded ? "h-[220px]" : ""
      }`}
    >
      <div className="flex items-center justify-center p-4 border-b dark:border-gray-700 relative">
        <h3 className="font-medium text-center">{title}</h3>

        {/* Add maximize icon in top right corner */}
        {!fullHeight && (
          <div className="absolute top-4 right-4">
            <button
              onClick={() =>
                onMaximize ? onMaximize(title) : onToggle(section)
              }
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Maximize"
            >
              <Maximize2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        )}
      </div>

      <div className="p-4 overflow-auto">
        {fullHeight ? (
          <div className="flex items-center justify-center h-full">
            <div className={`text-6xl font-bold ${ratingColor}`}>
              {rating.toFixed(1)}
            </div>
          </div>
        ) : (
          <>
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
              <span className="ml-2 font-medium">{rating}</span>
            </div>
            <div className="space-y-3">
              {/* Always show first 3 items */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  Видимость:
                </span>
                <span className="font-medium text-sm">60 %</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  Присутствие ключевых слов:
                </span>
                <span className="font-medium text-sm">70 %</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  Упущено ключевых слов:
                </span>
                <span className="font-medium text-sm">10</span>
              </div>

              {/* Show these items only when expanded */}
              {isExpanded && (
                <>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      Упущенный охват:
                    </span>
                    <span className="font-medium text-sm">45 678 900</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      Наличие нерелевантных слов:
                    </span>
                    <span className="font-medium text-sm">13</span>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
