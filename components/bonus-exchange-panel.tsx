"use client"

import { useState } from "react"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BonusExchangeConfirmModal } from "./bonus-exchange-confirm-modal"
import { BonusTransferConfirmModal } from "./bonus-transfer-confirm-modal"
import { BonusTransferCardModal } from "./bonus-transfer-card-modal"
import { useMediaQuery } from "@/hooks/use-media-query"

interface BonusExchangePanelProps {
  onClose: () => void
}

export function BonusExchangePanel({ onClose }: BonusExchangePanelProps) {
  const [selectedOption, setSelectedOption] = useState<string>("analysis")
  const [showExchangeConfirm, setShowExchangeConfirm] = useState(false)
  const [showTransferCard, setShowTransferCard] = useState(false)
  const [showTransferConfirm, setShowTransferConfirm] = useState(false)
  const [cardAdded, setCardAdded] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleOptionChange = (option: string) => {
    setSelectedOption(option)
  }

  const handleExchangeClick = () => {
    setShowExchangeConfirm(true)
  }

  const handleExchangeConfirm = () => {
    setShowExchangeConfirm(false)
    // Здесь будет логика обмена бонусов
  }

  const handleExchangeCancel = () => {
    setShowExchangeConfirm(false)
  }

  const handleAddCard = () => {
    setShowTransferCard(true)
  }

  const handleCardSubmit = () => {
    setShowTransferCard(false)
    setCardAdded(true)
  }

  const handleTransferClick = () => {
    setShowTransferConfirm(true)
  }

  const handleTransferConfirm = () => {
    setShowTransferConfirm(false)
    // Здесь будет логика перевода бонусов
    onClose()
  }

  const handleTransferCancel = () => {
    setShowTransferConfirm(false)
  }

  // Если показываем модальное окно подтверждения обмена
  if (showExchangeConfirm) {
    return <BonusExchangeConfirmModal onConfirm={handleExchangeConfirm} onCancel={handleExchangeCancel} />
  }

  // Если показываем модальное окно добавления карты
  if (showTransferCard) {
    return <BonusTransferCardModal onSubmit={handleCardSubmit} onClose={() => setShowTransferCard(false)} />
  }

  // Если показываем модальное окно подтверждения перевода
  if (showTransferConfirm) {
    return <BonusTransferConfirmModal onConfirm={handleTransferConfirm} onCancel={handleTransferCancel} />
  }

  return (
    <div className="h-full flex flex-col justify-start bg-white">
      {/* Заголовок с кнопкой закрытия - без подчеркивания */}
      <div className="flex items-center justify-between p-4">
        {isMobile && (
          <div className="flex-1 text-center">
            <h2 className="text-lg font-medium">Личный кабинет</h2>
          </div>
        )}
        <button onClick={onClose} className={`p-1 ${isMobile ? "" : "ml-auto"}`} aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 p-0 pt-0 max-w-md mx-auto w-full">
        {/* Баланс бонусов */}
        <div className="bg-blue-600 rounded-xl p-4 mb-6 text-white text-center">
          <div className="flex justify-between items-center">
            <span className="text-sm">Бонусы</span>
            <span className="text-xl font-bold">500 баллов</span>
          </div>
        </div>

        {/* Опции обмена бонусов */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm mb-4">
          <div className="space-y-3">
            <div className="flex items-start">
              <div
                className={`w-4 h-4 mt-0.5 mr-2 rounded-sm ${selectedOption === "analysis" ? "bg-blue-600" : "bg-gray-200"}`}
                onClick={() => handleOptionChange("analysis")}
              ></div>
              <span>Обменять все на анализ карточки</span>
            </div>
            <div className="flex items-start">
              <div
                className={`w-4 h-4 mt-0.5 mr-2 rounded-sm ${selectedOption === "description" ? "bg-blue-600" : "bg-gray-200"}`}
                onClick={() => handleOptionChange("description")}
              ></div>
              <span>Обменять все на описание карточки</span>
            </div>
            <div className="flex items-start">
              <div
                className={`w-4 h-4 mt-0.5 mr-2 rounded-sm ${selectedOption === "both" ? "bg-blue-600" : "bg-gray-200"}`}
                onClick={() => handleOptionChange("both")}
              ></div>
              <span>Обменять все на анализ и описание карточки 50/50</span>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>Анализ карточки равен 200 тг.</p>
            <p>Описание карточки равен 800 тг.</p>
          </div>

          <Button
            onClick={handleExchangeClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full mt-4"
          >
            Обменять
          </Button>
        </div>

        {/* Перевод бонусов */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
          <p className="text-center font-medium mb-1">Вы можете перевести 5000 баллов</p>
          <p className="text-center text-sm text-gray-500 mb-4">У Вас пока недостаточно приглашенных друзей</p>

          {!cardAdded ? (
            <div className="flex items-center justify-center text-blue-600 cursor-pointer mb-4" onClick={handleAddCard}>
              <Plus className="h-4 w-4 mr-1" />
              <span>Добавить банковскую карту</span>
            </div>
          ) : (
            <>
              <p className="text-center text-sm text-gray-500 mb-4">Банковская карта добавлена</p>
              <p className="text-center text-sm text-gray-500 mb-4">1 балл равен 1 тенге</p>
            </>
          )}

          <Button
            onClick={handleTransferClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full"
            disabled={!cardAdded}
          >
            Перевести
          </Button>
        </div>
      </div>
    </div>
  )
}
