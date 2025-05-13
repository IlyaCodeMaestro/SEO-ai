"use client";

import { ArrowLeft } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";
import { ShareMenuWithoutCopy } from "../shared/share-menu-without-copy";

interface PartnerStandartPanelProps {
  onClose: () => void;
}

export default function PartnerStandardPanel({
  onClose,
}: PartnerStandartPanelProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [shareContent, setShareContent] = useState<{
    content: string;
    title: string;
  } | null>(null);

  const handleShare = () => {
    setShareContent({
      content: "Присоединяйтесь к реферальной программе и получайте бонусы!",
      title: "Реферальная программа",
    });
  };

  const handleCloseShareMenu = () => {
    setShareContent(null);
  };

  return (
    <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 bg-white relative">
        {isMobile ? (
          <>
            <button onClick={onClose} className="absolute left-4">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-medium text-blue-600 text-center w-full">
              Реферальная программа
            </h1>
          </>
        ) : (
          <button onClick={onClose} className="text-gray-600 absolute right-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Blue banner */}
      <div className="from-[#0d52ff] to-[rgba(11,60,187,1)] bg-gradient-to-r text-white p-6 rounded-[30px] mx-4 mb-4 text-center">
        <p className="text-xl font-medium leading-tight">
          Приглашайте 50+ друзей в течении подключенного тарифа (30 дней) и
          получайте 30% от их оплаты на свой счет
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 rounded-[30px] mx-4 p-6 shadow-md border">
        <h2 className="text-xl font-medium mb-6">
          5 простых шагов на встречу выгоде
        </h2>

        <div className="space-y-8 relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-[32px] bottom-[32px] w-0.5 bg-gray-200"></div>

          {/* Step 1 */}
          <div className="flex">
            <div className="flex-shrink-0 mr-4 z-10">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Подключите тариф</h3>
              <p className="text-gray-700">
                Выберите и подключите один из тарифов: Селлер, Менеджер или
                Премиум
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex">
            <div className="flex-shrink-0 mr-4 z-10">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Приглашайте друзей</h3>
              <p className="text-gray-700">
                Делитесь ссылкой SEO-AI в социальных сетях
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex">
            <div className="flex-shrink-0 mr-4 z-10">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">
                Друзья регистрируются по приглашению
              </h3>
              <p className="text-gray-700">
                Когда кто-либо регистрируется по Вашей ссылке, то они
                зачисляются как Ваши "друзья"
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex">
            <div className="flex-shrink-0 mr-4 z-10">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                4
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">
                30% от оплаты друзей поступят Вам на бонусы
              </h3>
              <p className="text-gray-700">
                При подключении тарифа Вашими друзьями, 30% от их оплаты
                поступают Вам на бонусы
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex">
            <div className="flex-shrink-0 mr-4 z-10">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                5
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">
                Переведите бонусы в реальные деньги
              </h3>
              <p className="text-gray-700">
                Когда приглашенных друзей 50+ в течении подключенного тарифа (30
                дней), привяжите банковскую карту и переведите
              </p>
            </div>
          </div>
        </div>

        {/* Share button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleShare}
            className="bg-gradient-to-r h-[60px] w-80 rounded-[25px] shadow-custom from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white text-white text-2xl md:text-xl"
          >
            Поделиться
          </button>
        </div>
      </div>

      {/* ShareMenu with overlay */}
      {shareContent && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <ShareMenuWithoutCopy
            content={shareContent.content}
            title={shareContent.title}
            onClose={handleCloseShareMenu}
          />
        </div>
      )}
    </div>
  );
}
