"use client"

import { Button } from "@/components/ui/button"

interface BonusExchangeConfirmModalProps {
  onConfirm: () => void
  onCancel: () => void
}

export function BonusExchangeConfirmModal({ onConfirm, onCancel }: BonusExchangeConfirmModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 max-w-xs w-full mx-4">
        <p className="text-center font-medium mb-6">Вы желаете обменять бонусы на услуги?</p>

        <div className="space-y-3">
          <Button onClick={onConfirm} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">
            Обменять
          </Button>

          <Button onClick={onCancel} className="w-full bg-gray-400 hover:bg-gray-500 text-white rounded-full">
            Отмена
          </Button>
        </div>
      </div>
    </div>
  )
}
