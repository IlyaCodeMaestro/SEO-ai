"use client";

import { useState } from "react";
import { X, ChevronUp, ChevronDown, ArrowLeft } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface FeedbackFaqPanelProps {
  onClose: () => void;
}

export function FeedbackFaqPanel({ onClose }: FeedbackFaqPanelProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "Почему важно избегать нерелевантных слов в описании товара?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    },
    
    {
      question: "Что делать, если код для регистрации не пришел на почту?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    },
    {
      question: "Для кого подходит программа SEO-AI?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    },
    {
      question: "Как можно внести оплату из России и Беларуси?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    },
    {
      question: "Как SEO-оптимизация карточки товара влияет на продажи?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    },
    {
      question: "Как SEO-оптимизация карточки товара влияет на продажи?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    },
  ];

  const toggleFaqItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Заголовок */}
      <div className="flex items-center justify-between p-4 relative">
        {isMobile ? (
          <>
            <button
              onClick={onClose}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            >
              <ArrowLeft size={24} className="text-gray-400" />
            </button>
            <h2 className="text-lg font-medium mx-auto text-center text-blue-600 pl-6">
              Отзыв
            </h2>
            <div className="w-6" />
          </>
        ) : (
          <>
            <div className="w-8" />
            <button onClick={onClose} className="p-1 mr-2">
              <X size={24} className="text-gray-400" />
            </button>
          </>
        )}
      </div>

      {/* Контент */}
      <div className="w-full flex justify-center px-4 pb-6 overflow-y-auto">
        <div className="w-full max-w-[560px]">
          {/* Подзаголовок */}
          <div className="py-4 flex justify-center">
            <div className="bg-gradient-to-r from-[#0d52ff] to-[rgba(11,60,187,1)] text-white rounded-full py-3 px-6 text-center font-medium w-full">
              Часто задаваемые вопросы
            </div>
          </div>

          {/* Содержимое */}
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-[#f9f9f9] border shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleFaqItem(index)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left"
                >
                  <span className="text-base text-[#1e1e1e] font-medium">
                    {item.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp size={20} className="text-[#4C6FFF]" />
                  ) : (
                    <ChevronDown size={20} className="text-[#4C6FFF]" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-5 pb-4 text-sm text-gray-600">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
