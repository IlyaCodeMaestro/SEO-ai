"use client";

import { useLanguage } from "../provider/language-provider";
import { Bell } from "lucide-react";

export function NotificationsView() {
  const { t } = useLanguage();

  return (
    <div className="h-full flex flex-col">
      {/* Заголовок по центру без кнопки назад */}
      <div className="p-4 flex items-center justify-center">
        <h2 className="text-lg font-medium">Уведомления</h2>
      </div>

      {/* Серый блок с контентом */}
      <div className="flex-1 mx-4 mb-4 bg-[#F6F6F6] rounded-[24px] shadow-sm">
        {/* Пустое состояние с иконкой колокольчика */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 h-full">
          <Bell className="h-16 w-16 text-gray-800 mb-4" strokeWidth={1.5} />
          <p className="text-center font-medium text-gray-900">
            Список уведомлений пуст
          </p>
        </div>
      </div>
    </div>
  );
}
