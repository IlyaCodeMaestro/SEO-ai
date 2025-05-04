"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useLanguage } from "./language-provider"
import { useRouter } from "next/navigation"

interface DeleteAccountPanelProps {
  onClose: () => void
}

export function DeleteAccountPanel({ onClose }: DeleteAccountPanelProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { t } = useLanguage()
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const router = useRouter()

  const handleDeleteClick = () => {
    setShowConfirmModal(true)
  }

  const handleConfirmDelete = () => {
    // Здесь будет логика удаления аккаунта
    // После удаления перенаправляем на главную страницу
    router.push("/")
  }

  const handleCancelDelete = () => {
    setShowConfirmModal(false)
  }

  // Если показываем модальное окно подтверждения
  if (showConfirmModal) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-xl p-6 max-w-xs w-full mx-4 dark:bg-[rgba(0,0,0,0.25)]">
          <p className="text-center font-medium mb-6">{t("cabinet.confirm.delete")}</p>

          <div className="space-y-3">
            <Button
              onClick={handleConfirmDelete}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full"
            >
              {t("cabinet.delete")}
            </Button>

            <Button
              onClick={handleCancelDelete}
              className="w-full bg-gray-400 hover:bg-gray-500 text-white rounded-full"
            >
              {t("cabinet.cancel")}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col justify-start bg-white dark:bg-[rgba(0,0,0,0.25)]">
      {/* Заголовок с кнопкой закрытия */}
      <div className="flex items-center justify-between p-4">
        {isMobile && (
          <div className="flex-1 text-center">
            <h2 className="text-lg font-medium">{t("cabinet.title")}</h2>
          </div>
        )}
        <button onClick={onClose} className={`p-1 ${isMobile ? "" : "ml-auto"}`} aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 p-0 pt-0 max-w-md mx-auto w-full">
        {/* Заголовок */}
        <div className="bg-blue-600 rounded-xl p-4 mb-6 text-white text-center">
          <div className="flex justify-center items-center">
            <span className="text-lg font-medium">{t("cabinet.delete.account")}</span>
          </div>
        </div>

        {/* Информация об удалении */}
        <div className="bg-white rounded-xl p-6 shadow-sm dark:bg-[rgba(0,0,0,0.25)]">
          <div className="space-y-4 text-center mb-6">
            <p className="text-gray-700 dark:text-white">{t("cabinet.delete.personal.data")}</p>
            <p className="text-gray-700 dark:text-white">{t("cabinet.delete.archive")}</p>
            <p className="text-gray-700 dark:text-white">{t("cabinet.delete.balance")}</p>
          </div>

          <Button onClick={handleDeleteClick} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">
            {t("cabinet.delete")}
          </Button>
        </div>
      </div>
    </div>
  )
}
