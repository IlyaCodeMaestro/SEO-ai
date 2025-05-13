"use client"

import { ArrowLeft, X } from "lucide-react"

interface ArchiveHeaderProps {
  onClose: () => void
  isMobile: boolean
}

export function ArchiveHeader({ onClose, isMobile }: ArchiveHeaderProps) {
  if (isMobile) {
    return (
      <div className="flex flex-col mb-4">
        <div className="flex items-center">
          <button onClick={onClose} className="mr-3" aria-label="Back">
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </button>
          <h2 className="text-blue-600 font-medium text-base">Архив</h2>
        </div>
        <h3 className="text-gray-700 font-medium text-base mt-2">Описание карточки товара</h3>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="w-5"></div> {/* Пустой элемент для центрирования */}
      <div className="w-5"></div> {/* Пустой элемент вместо заголовка */}
      <button onClick={onClose} className="p-2" aria-label="Close">
        <X className="h-5 w-5" />
      </button>
    </div>
  )
}
