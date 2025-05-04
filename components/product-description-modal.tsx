"use client"
import { Button } from "@/components/ui/button"

interface ProductDescriptionModalProps {
  onClose: () => void
  onBack: () => void
  onContinue: () => void
}

export function ProductDescriptionModal({ onClose, onBack, onContinue }: ProductDescriptionModalProps) {
  return (
    <div className="h-full relative flex items-center justify-center bg-white">
      {/* Модальное окно */}
      <div className="bg-white rounded-3xl p-6 shadow-lg max-w-xs w-full mx-4 z-10">
        <div className="text-center space-y-4">
          <h3 className="font-medium">Описание карточки товара</h3>
          <p className="text-sm">Описание карточки товара займет примерно 5 минут</p>
          <p className="text-sm">Уведомление придет после завершения</p>
          <p className="text-sm">Перенесено на страницу 'В обработке'</p>
          <div className="mt-4">
            <Button
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-[rgba(38,99,255,1)] to-[rgba(11,60,187,1)] hover:opacity-90 text-white rounded-full"
            >
              Далее
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
