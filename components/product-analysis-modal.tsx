"use client"
import { Button } from "@/components/ui/button"

interface ProductAnalysisModalProps {
  onClose: () => void
  onBack: () => void
  onContinue: () => void
}

export function ProductAnalysisModal({ onClose, onBack, onContinue }: ProductAnalysisModalProps) {
  return (
    <div className="h-full relative flex items-center justify-center bg-white">
      {/* Модальное окно */}
      <div className="bg-white rounded-3xl p-6 shadow-lg max-w-xs w-full mx-4 z-10">
        <div className="text-center space-y-4">
          <h3 className="font-medium">Анализ карточки товара</h3>
          <p className="text-sm">Анализ карточки товара займет примерно 5 минут</p>
          <p className="text-sm">Уведомление придет после завершения</p>
          <p className="text-sm">Перенесено на страницу 'В обработке'</p>
          <div className="mt-4">
            <Button onClick={onContinue} className="w-full bg-blue-400 hover:bg-blue-500 text-white rounded-full">
              Далее
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
