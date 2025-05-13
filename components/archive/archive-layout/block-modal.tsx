"use client"

import type React from "react"

import { X } from "lucide-react"
import { useEffect, useRef } from "react"

interface BlockModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  parentRef: React.RefObject<HTMLDivElement>
}

export function BlockModal({ isOpen, onClose, title, children, parentRef }: BlockModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Предотвращаем прокрутку основного контента
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen || !parentRef.current) return null

  // Получаем размеры и позицию родительского блока
  const parentRect = parentRef.current.getBoundingClientRect()

  return (
    <div
      className="fixed z-50"
      style={{
        top: `${parentRect.top}px`,
        left: `${parentRect.left}px`,
        width: `${parentRect.width}px`,
        height: `${parentRect.height}px`,
      }}
    >
      {/* Затемнение только для этого блока */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Модальное окно */}
      <div
        ref={modalRef}
        className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl overflow-auto p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Заголовок и кнопка закрытия */}
        <div className="flex items-center justify-between mb-4 sticky top-0 bg-white dark:bg-gray-800 z-10 py-2">
          <h3 className="font-medium">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Содержимое модального окна */}
        <div>{children}</div>
      </div>
    </div>
  )
}
