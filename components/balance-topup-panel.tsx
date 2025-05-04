"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMediaQuery } from "@/hooks/use-media-query"

interface BalanceTopupPanelProps {
  onClose: () => void
}

export function BalanceTopupPanel({ onClose }: BalanceTopupPanelProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [amount, setAmount] = useState(1000)
  const [topupAmount, setTopupAmount] = useState(50)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    let formattedValue = ""

    for (let i = 0; i < value.length && i < 16; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += " "
      }
      formattedValue += value[i]
    }

    setCardNumber(formattedValue)
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    let formattedValue = ""

    if (value.length > 0) {
      formattedValue = value.substring(0, Math.min(2, value.length))
      if (value.length > 2) {
        formattedValue += "/" + value.substring(2, Math.min(4, value.length))
      }
    }

    setExpiryDate(formattedValue)
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    setCvv(value.substring(0, 3))
  }

  const handleTopupAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value.replace(/\D/g, ""), 10) || 0
    setTopupAmount(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (cardNumber && expiryDate && cvv) {
      setIsProcessing(true)

      // Simulate processing delay
      setTimeout(() => {
        setAmount(amount + topupAmount)
        setIsProcessing(false)
        setIsComplete(true)

        // Close panel after showing success message
        setTimeout(() => {
          onClose()
        }, 2000)
      }, 1500)
    }
  }

  return (
    // Убедимся, что отступы в верхней части компонента минимальны
    // Изменим класс flex-col на flex-col justify-start, чтобы контент начинался сверху
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
        {/* Баланс */}
        <div className="bg-blue-600 rounded-xl p-4 mb-6 text-white text-center">
          <div className="flex justify-between items-center">
            <span className="text-sm">Баланс</span>
            <span className="text-xl font-bold">{amount.toLocaleString()} тг.</span>
          </div>
        </div>

        {isComplete ? (
          <div className="bg-green-50 rounded-xl p-6 shadow-sm text-center">
            <p className="text-green-600 font-medium mb-2">Пополнение выполнено успешно!</p>
            <p className="text-sm text-gray-600">Ваш баланс пополнен на {topupAmount.toLocaleString()} тг.</p>
          </div>
        ) : (
          /* Форма пополнения */
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="topupAmount" className="block text-sm font-medium text-gray-700">
                  Сумма пополнения
                </label>
                <Input
                  id="topupAmount"
                  value={topupAmount}
                  onChange={handleTopupAmountChange}
                  className="rounded-full border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                  Номер карты
                </label>
                <Input
                  id="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="XXXX XXXX XXXX XXXX"
                  className="rounded-full border-gray-300"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                    Срок действия
                  </label>
                  <Input
                    id="expiryDate"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder="XX/XX"
                    className="rounded-full border-gray-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                    CVV
                  </label>
                  <Input
                    id="cvv"
                    value={cvv}
                    onChange={handleCvvChange}
                    placeholder="XXX"
                    className="rounded-full border-gray-300"
                    required
                  />
                </div>
              </div>

              {/* Информация о платеже */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">К оплате</span>
                  <span className="font-medium">{topupAmount.toLocaleString()} тг.</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Комиссия платформы</span>
                  <span className="font-medium">0 тг.</span>
                </div>
                <div className="flex justify-between text-sm font-medium pt-1">
                  <span className="text-gray-800">Итого к оплате</span>
                  <span>{topupAmount.toLocaleString()} тг.</span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full mt-4"
                disabled={isProcessing}
              >
                {isProcessing ? "Обработка..." : "Пополнить"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
