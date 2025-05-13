"use client";

import { Copy, Maximize2, Share2 } from "lucide-react";
import React from "react";

interface KeywordsTableProps {
  title: string;
  keywords: { word: string; frequency: string }[];
  section: string;
  isExpanded: boolean;
  onToggle: (section: string) => void;
  onCopy: (content: string, section: string) => void;
  onShare: (
    keywords: { word: string; frequency: string }[],
    title: string
  ) => void;
  copiedSection: string | null;
  textColorClass?: string;
  isMobile: boolean;
}

export function IrrelevantKeywordsTable({
  title,
  keywords,
  section,
  isExpanded,
  onToggle,
  onCopy,
  onShare,
  copiedSection,
  textColorClass = "",
  isMobile,
}: KeywordsTableProps) {
  const getContentForCopy = () => {
    return keywords.map((k) => `${k.word}: ${k.frequency}`).join("\n");
  };

  if (isMobile) {
    return (
      <div className="bg-[#f9f8f8]  rounded-xl shadow-md overflow-hidden">
        <div className="p-4">
          <div className="flex items-center mb-3">
            <h3 className="font-medium text-sm">{title}</h3>
          </div>

          <div className="grid grid-cols-2 gap-x-4 text-sm">
            <div className="font-medium mb-2">Нерелевант. слова</div>
            <div className="font-medium mb-2 text-right">Сумм. частотность</div>

            {keywords
              .slice(0, isExpanded ? undefined : 3)
              .map((keyword, index) => (
                <React.Fragment key={index}>
                  <div
                    className={`text-sm py-2 border-t border-gray-100 ${textColorClass}`}
                  >
                    {keyword.word}
                  </div>
                  <div className="text-sm py-2 border-t border-gray-100 text-right">
                    {keyword.frequency}
                  </div>
                </React.Fragment>
              ))}
          </div>
        </div>
        <div className="flex justify-center pb-2">
          <button className="text-gray-400" onClick={() => onToggle(section)}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 10L4 6H12L8 10Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f8f8]  dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h3 className="font-medium">{title}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onCopy(getContentForCopy(), section)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Copy keywords"
          >
            <Copy
              className={`h-5 w-5 ${
                copiedSection === section ? "text-green-500" : "text-blue-500"
              }`}
            />
          </button>
          <button
            onClick={() => onShare(keywords, title)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Share keywords"
          >
            <Share2 className="h-5 w-5 text-blue-500" />
          </button>
          <button
            onClick={() => onToggle(section)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Maximize2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2 text-sm mb-2">
          <span className="font-medium">Нерелевант. слова</span>
          <span className="font-medium text-right">Сумм. частотность</span>
        </div>
        {keywords.slice(0, isExpanded ? undefined : 2).map((keyword, index) => (
          <div
            key={index}
            className="grid grid-cols-2 gap-2 text-sm py-1 border-b border-gray-100 dark:border-gray-700"
          >
            <span className={`${textColorClass} truncate`}>{keyword.word}</span>
            <span className="text-right">{keyword.frequency}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
