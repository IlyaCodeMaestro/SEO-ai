"use client"

import { Button } from "@/components/ui/button"

interface BonusTransferConfirmModalProps {
  onConfirm: () => void
  onCancel: () => void
}

export function BonusTransferConfirmModal({ onConfirm, onCancel }: BonusTransferConfirmModalProps) {
  return (
    <div className="absolute pb-32 inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
      <div className="bg-white rounded-xl p-6 max-w-xs w-full mx-4">
        <p className="text-center font-medium mb-6">Вы желаете перевести бонусы на карту?</p>

        <div className="flex flex-col items-center gap-2">
          <Button
              onClick={onConfirm}
              className="w-32  bg-gradient-to-r shadow-md from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white  text-white rounded-full"
            >
            Перевести
            </Button>

          <Button onClick={onCancel} className="w-32 bg-gray-400 hover:bg-gray-500 text-white rounded-full">
            Отмена
          </Button>
        </div>
      </div>
    </div>
  )
}
