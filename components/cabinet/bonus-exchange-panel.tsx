"use client";

import { useState } from "react";
import { X, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BonusExchangeConfirmModal } from "./bonus-exchange-confirm-modal";
import { BonusTransferConfirmModal } from "./bonus-transfer-confirm-modal";
import { BonusTransferCardModal } from "./bonus-transfer-card-modal";
import { useMediaQuery } from "@/hooks/use-media-query";

interface BonusExchangePanelProps {
  onClose: () => void;
}

export function BonusExchangePanel({ onClose }: BonusExchangePanelProps) {
  const [selectedOption, setSelectedOption] = useState<string>("analysis");
  const [showExchangeConfirm, setShowExchangeConfirm] = useState(false);
  const [showTransferCard, setShowTransferCard] = useState(false);
  const [showTransferConfirm, setShowTransferConfirm] = useState(false);
  const [cardAdded, setCardAdded] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleExchangeClick = () => {
    setShowExchangeConfirm(true);
  };

  const handleExchangeConfirm = () => {
    setShowExchangeConfirm(false);
    // Здесь будет логика обмена бонусов
  };

  const handleExchangeCancel = () => {
    setShowExchangeConfirm(false);
  };

  const handleAddCard = () => {
    setShowTransferCard(true);
  };

  const handleCardSubmit = () => {
    setShowTransferCard(false);
    setCardAdded(true);
  };

  const handleTransferClick = () => {
    setShowTransferConfirm(true);
  };

  const handleTransferConfirm = () => {
    setShowTransferConfirm(false);
    // Здесь будет логика перевода бонусов
    onClose();
  };

  const handleTransferCancel = () => {
    setShowTransferConfirm(false);
  };

  return (
    <div className="h-full flex flex-col justify-start bg-white px-4 md:px-0">
      {/* Заголовок с кнопкой закрытия */}
      <div className="flex items-center justify-between mt-3">
        {isMobile ? (
          <>
            <button onClick={onClose} className="p-1" aria-label="Back">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex-1 text-center">
              <h2 className="text-xl font-medium text-blue-600">
                Личный кабинет
              </h2>
            </div>
            <div className="w-5"></div> {/* Empty div for balanced spacing */}
          </>
        ) : (
          <>
            <div className="flex-1"></div>
            <button onClick={onClose} className="p-1" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      <div className="flex-1 pt-0 max-w-md mx-auto w-full px-2 md:px-0">
        {/* Баланс бонусов */}
        <div className="w-full border border-white bg-blue-600 py-5 rounded-[25px] text-xl font-medium shadow-md p-4 mb-6 text-white text-center">
          <div className="flex justify-between items-center">
            <span className="text-lg">Бонусы</span>
            <span className="text-xl font-bold">500 баллов</span>
          </div>
        </div>

        {/* Опции обмена бонусов */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-md mb-4 border">
          <div className="space-y-3">
            <div className="flex items-start">
              <div
                className={`w-4 h-4 mt-0.5 mr-2 rounded-sm ${
                  selectedOption === "analysis" ? "bg-blue-600" : "bg-gray-200"
                }`}
                onClick={() => handleOptionChange("analysis")}
              ></div>
              <span>Обменять все на анализ карточки</span>
            </div>
            <div className="flex items-start">
              <div
                className={`w-4 h-4 mt-0.5 mr-2 rounded-sm ${
                  selectedOption === "description"
                    ? "bg-blue-600"
                    : "bg-gray-200"
                }`}
                onClick={() => handleOptionChange("description")}
              ></div>
              <span>Обменять все на описание карточки</span>
            </div>
            <div className="flex items-start">
              <div
                className={`w-4 h-4 mt-0.5 mr-2 rounded-sm ${
                  selectedOption === "both" ? "bg-blue-600" : "bg-gray-200"
                }`}
                onClick={() => handleOptionChange("both")}
              ></div>
              <span>Обменять все на анализ и описание карточки</span>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>Анализ карточки равен 200 тг.</p>
            <p>Описание карточки равен 800 тг.</p>
          </div>
          <div className="flex justify-center">
            {" "}
            <Button
              onClick={handleExchangeClick}
              className="w-32 bg-gradient-to-r shadow-md from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white text-white rounded-full mt-4"
            >
              Обменять
            </Button>
          </div>
        </div>

        {/* Перевод бонусов */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-md border">
          <p className="text-center font-medium mb-1">
            Вы можете перевести 5000 баллов
          </p>
          <p className="text-center text-sm text-gray-500 mb-4">
            У Вас пока недостаточно приглашенных друзей
          </p>

          {!cardAdded ? (
            <div
              className="flex items-center justify-center text-blue-600 cursor-pointer mb-4"
              onClick={handleAddCard}
            >
              <Plus className="h-4 w-4 mr-1" />
              <span>Добавить банковскую карту</span>
            </div>
          ) : (
            <>
              <p className="text-center text-sm text-gray-500 mb-4">
                Банковская карта добавлена
              </p>
              <p className="text-center text-sm text-gray-500 mb-4">
                1 балл равен 1 тенге
              </p>
            </>
          )}

          <div className="flex justify-center">
            {" "}
            <Button
              onClick={handleTransferClick}
              className="w-32 bg-gradient-to-r shadow-md from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white text-white rounded-full mt-4"
            >
              Обменять
            </Button>
          </div>
        </div>
      </div>

      {/* Модальные окна */}
      {showExchangeConfirm && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center pb-56">
          <div
            className="absolute inset-0"
            onClick={handleExchangeCancel}
          ></div>
          <div
            className="bg-white rounded-xl p-6 max-w-xs w-full mx-4 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <BonusExchangeConfirmModal
              onConfirm={handleExchangeConfirm}
              onCancel={handleExchangeCancel}
            />
          </div>
        </div>
      )}

      {showTransferCard && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0"
            onClick={() => setShowTransferCard(false)}
          ></div>
          <div
            className="bg-white rounded-xl p-6 max-w-xs w-full mx-4 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <BonusTransferCardModal
              onSubmit={handleCardSubmit}
              onClose={() => setShowTransferCard(false)}
            />
          </div>
        </div>
      )}

      {showTransferConfirm && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0"
            onClick={handleTransferCancel}
          ></div>
          <div
            className="bg-white rounded-xl p-6 max-w-xs w-full mx-4 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <BonusTransferConfirmModal
              onConfirm={handleTransferConfirm}
              onCancel={handleTransferCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}
