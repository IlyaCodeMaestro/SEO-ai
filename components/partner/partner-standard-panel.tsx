"use client"

import { X, ArrowLeft } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface PartnerStandardPanelProps {
  onClose: () => void
}

export function PartnerStandardPanel({ onClose }: PartnerStandardPanelProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")

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
    <div className="h-full flex flex-col">
      {/* Заголовок */}
      <div
        className={`relative bg-gradient-to-r from-blue-300 to-blue-500 text-white p-6 ${isMobile ? "" : "rounded-t-[25px]"}`}
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-white p-1">
          {isMobile ? <ArrowLeft size={24} /> : <X size={24} />}
        </button>
        <h2 className="text-center text-xl font-medium mt-2">
          Приглашайте друзей и получайте 30% от их оплаты бонусом
        </h2>
      </div>

      {/* Содержимое */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h3 className="text-lg font-medium mb-6">5 простых шагов на встречу выгоде</h3>

        <div className="space-y-6">
          {/* Шаг 1 */}
          <div className="flex">
            <div className="flex-shrink-0 mr-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                1
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-1">Подключите тариф</h4>
              <p className="text-gray-600 text-sm">
                Выберите и подключите один из тарифов: Селлер, Менеджер или Премиум
              </p>
            </div>
          </div>

          {/* Шаг 2 */}
          <div className="flex">
            <div className="flex-shrink-0 mr-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                2
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-1">Приглашайте друзей</h4>
              <p className="text-gray-600 text-sm">Делитесь ссылкой SEO-AI в социальных сетях</p>
            </div>
          </div>

          {/* Шаг 3 */}
          <div className="flex">
            <div className="flex-shrink-0 mr-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                3
              </div>
              <div className="h-full w-0.5 bg-gray-200 mx-auto mt-1"></div>
            </div>
            <div>
              <h4 className="font-bold mb-1">Друзья регистрируются по приглашению</h4>
              <p className="text-gray-600 text-sm">
                Когда кто-либо регистрируется по Вашей ссылке, то они зачисляются как Ваши "друзья"
              </p>
            </div>
          </div>

          {/* Шаг 4 */}
          <div className="flex">
            <div className="flex-shrink-0 mr-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                4
              </div>
              <div className="h-full w-0.5 bg-gray-200 mx-auto mt-1"></div>
            </div>
            <div>
              <h4 className="font-bold mb-1">30% от оплаты друзей поступят Вам на бонусы</h4>
              <p className="text-gray-600 text-sm">
                При подключении тарифа Вашими друзьями, 30% от их оплаты поступают Вам на бонусы
              </p>
            </div>
          </div>

          {/* Шаг 5 */}
          <div className="flex">
            <div className="flex-shrink-0 mr-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                5
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-1">Обменяйте бонусы на услуги</h4>
              <p className="text-gray-600 text-sm">
                В любое время вы можете обменять бонусы на анализ или описание карточки
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Кнопка поделиться */}
      <div className="p-6">
        <button
          onClick={handleShare}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-[20px] py-4 font-medium transition-colors"
        >
          Поделиться
        </button>
      </div>
    </div>
  )
}
