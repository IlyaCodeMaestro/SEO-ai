"use client"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ConfirmationModal({ isOpen, onClose, onConfirm }: ConfirmationModalProps) {
  if (!isOpen) return null

  return (
    <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4 rounded-3xl">
      {/* Затемнение — клик по нему закрывает окно */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Сам pop-up */}
      <div
        className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg w-full max-w-xs animate-in slide-in-from-bottom z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center space-y-4">
          <h3 className="font-medium">Описание карточки товара</h3>
          <p className="text-sm">Описание карточки товара займет примерно 3 минуты</p>
          <p className="text-sm">Уведомление придет после завершения</p>
          <div className="flex justify-center mt-4">
            <button
              onClick={onConfirm}
              className="bg-gradient-to-r h-[40px] w-36 rounded-[25px] shadow-custom from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white text-white"
            >
              Далее
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
