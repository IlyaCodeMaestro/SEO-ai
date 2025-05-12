"use client"

import { Button } from "@/components/ui/button"

interface BonusExchangeConfirmModalProps {
  onConfirm: () => void
  onCancel: () => void
}

export function BonusExchangeConfirmModal({ onConfirm, onCancel }: BonusExchangeConfirmModalProps) {
  return (
    <>
      <p className="text-center font-medium mb-6">Вы желаете обменять бонусы на услуги?</p>

      <div className="space-y-3">
        <div className="flex justify-center">
          <Button
            onClick={onConfirm}
            className="w-32 bg-gradient-to-r shadow-md from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white text-white rounded-full"
          >
            Обменять
          </Button>
        </div>

        <div className="flex justify-center">
          <Button onClick={onCancel} className="w-32 bg-gray-400 hover:bg-gray-500 shadow-md text-white rounded-full">
            Отмена
          </Button>
        </div>
      </div>
    </>
  )
}
