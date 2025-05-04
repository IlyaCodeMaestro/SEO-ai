"use client"

import { useState } from "react"
import { useLanguage } from "./language-provider"

interface PartnerCardProps {
  title: string
  gradient: string
  onNavigate: () => void
}

function PartnerCard({ title, gradient, onNavigate }: PartnerCardProps) {
  return (
    <div className={`${gradient} rounded-[20px] p-6 text-white shadow-lg mb-4`}>
      <p className="text-xl font-medium mb-4">{title}</p>
      <button
        onClick={onNavigate}
        className="bg-white text-blue-600 rounded-full px-6 py-2 font-medium text-sm hover:bg-gray-100 transition-colors"
      >
        Перейти
      </button>
    </div>
  )
}

export function PartnerView() {
  const { t } = useLanguage()
  const [activePanel, setActivePanel] = useState<string | null>(null)

  const handleOpenStandardProgram = () => {
    // Открываем стандартную программу и передаем информацию в Dashboard
    if (window.openPartnerPanel) {
      window.openPartnerPanel("standard-program")
    }
  }

  const handleOpenPremiumProgram = () => {
    // Открываем премиум программу и передаем информацию в Dashboard
    if (window.openPartnerPanel) {
      window.openPartnerPanel("premium-program")
    }
  }

  const handleShare = () => {
    // Открываем модальное окно для шеринга
    if (window.openShareMenu) {
      window.openShareMenu(
        "Партнерская программа SEO-AI",
        "Присоединяйтесь к партнерской программе SEO-AI и получайте бонусы!",
      )
    }
  }

  return (
    <div className="h-full flex flex-col p-6">
      <PartnerCard
        title="Приглашайте друзей и получайте 30% от их оплаты бонусом"
        gradient="bg-gradient-to-r from-[rgba(38,203,255,1)] to-[rgba(0,131,172,1)]"
        onNavigate={handleOpenStandardProgram}
      />

      <PartnerCard
        title="Приглашайте 50+ друзей в течении 30 дней и получайте 30% от их оплаты на свой счет"
        gradient="bg-gradient-to-r from-[rgba(0,131,172,0.71)] to-[rgba(52,96,209,1)]"
        onNavigate={handleOpenPremiumProgram}
      />

      <div className="mt-auto">
        <button
          onClick={handleShare}
          className="w-full bg-gradient-to-r from-[rgba(38,99,255,1)] to-[rgba(11,60,187,1)] hover:opacity-90 text-white rounded-[20px] py-4 font-medium transition-colors"
        >
          Поделиться
        </button>
      </div>
    </div>
  )
}
