"use client";

import { useLanguage } from "../provider/language-provider";
import { ChevronRight, Sun, Moon } from "lucide-react";
import { useTheme } from "../provider/theme-provider";
import { useTariff } from "../provider/tariff-provider";

interface CabinetViewProps {
  onOpenPanel?: (panel: string, data?: any) => void;
}

export function CabinetView({ onOpenPanel }: CabinetViewProps) {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { currentTariff, getTariffById } = useTariff();

  // Получаем данные текущего тарифа
  const currentTariffData = getTariffById(currentTariff);

  // Функция для получения переведенного названия тарифа
  const getTranslatedTariffName = () => {
    if (currentTariffData.id === "seller") {
      return language === "ru"
        ? "Селлер"
        : language === "kz"
        ? "Сатушы"
        : "Seller";
    } else if (currentTariffData.id === "manager") {
      return language === "ru"
        ? "Менеджер"
        : language === "kz"
        ? "Менеджер"
        : "Manager";
    } else if (currentTariffData.id === "premium") {
      return language === "ru"
        ? "Премиум"
        : language === "kz"
        ? "Премиум"
        : "Premium";
    }
    return currentTariffData.name;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Заголовок по центру без кнопки назад */}
      <div className="p-4 flex items-center justify-center">
        <h2 className="text-lg font-medium">{t("cabinet.title")}</h2>
      </div>

      {/* Серый блок с контентом */}
      <div className="flex-1 mx-4 mb-4 bg-[#F6F6F6] rounded-[24px] shadow-sm">
        {/* Информация о пользователе */}
        <div className="px-4 pb-6">
          <div className="text-center mb-1">
            <h3 className="text-lg font-medium">Ерлан</h3>
            <p className="text-sm text-gray-500">+77700000000</p>
            <p className="text-sm text-gray-500">dalnovidec@gmail.com</p>
          </div>

          {/* Баланс */}
          <div className="bg-blue-600 rounded-xl p-4 mb-4 text-white">
            <div className="flex justify-between items-center">
              <span className="text-sm">{t("cabinet.balance")}</span>
              <span className="text-xl font-bold">32000 ₸</span>
            </div>
            <div className="flex justify-end mt-1">
              <button
                className="text-xs text-blue-200"
                onClick={() => onOpenPanel && onOpenPanel("balance-topup")}
              >
                {t("cabinet.topup")}
              </button>
            </div>
          </div>

          {/* Выписка по балансу */}
          <div className="bg-white rounded-xl p-4 mb-4 shadow-md">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => onOpenPanel && onOpenPanel("balance-history")}
            >
              <span>{t("cabinet.balance.statement")}</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Бонусы */}
          <div className="bg-white rounded-xl p-4 mb-4 shadow-md">
            <div className="flex justify-between items-center">
              <span>{t("cabinet.bonuses")}</span>
              <div className="flex items-center">
                <span className="mr-2 font-medium">500 баллов</span>
                <button
                  className="text-xs text-blue-600"
                  onClick={() => onOpenPanel && onOpenPanel("bonus-exchange")}
                >
                  {t("cabinet.exchange")}
                </button>
              </div>
            </div>
          </div>

          {/* Выписка по бонусам */}
          <div className="bg-white rounded-xl p-4 mb-4 shadow-md">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => onOpenPanel && onOpenPanel("bonus-statement")}
            >
              <span>{t("cabinet.bonus.statement")}</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Выписка по рефералам */}
          <div className="bg-white rounded-xl p-4 mb-4 shadow-md">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => onOpenPanel && onOpenPanel("referral-statement")}
            >
              <span>{t("cabinet.referral.statement")}</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Тариф */}
          <div className="bg-white rounded-xl p-4 mb-4 shadow-md">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => onOpenPanel && onOpenPanel("tariff")}
            >
              <span>{t("cabinet.tariff")}</span>
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">
                  «{getTranslatedTariffName()}»
                </span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Язык */}
          <div className="bg-white rounded-xl p-4 mb-4 shadow-md">
            <div className="flex justify-between items-center">
              <span>{t("cabinet.language")}</span>
              <div className="flex space-x-2">
                <button
                  className={`text-sm ${
                    language === "kz"
                      ? "text-blue-600 font-medium"
                      : "text-gray-500"
                  }`}
                  onClick={() => setLanguage("kz")}
                >
                  Каз.
                </button>
                <button
                  className={`text-sm ${
                    language === "ru"
                      ? "text-blue-600 font-medium"
                      : "text-gray-500"
                  }`}
                  onClick={() => setLanguage("ru")}
                >
                  Рус.
                </button>
                <button
                  className={`text-sm ${
                    language === "en"
                      ? "text-blue-600 font-medium"
                      : "text-gray-500"
                  }`}
                  onClick={() => setLanguage("en")}
                >
                  Eng.
                </button>
              </div>
            </div>
          </div>

          {/* Тема */}
          <div className="bg-white rounded-xl p-4 mb-4 shadow-md">
            <div className="flex justify-between items-center">
              <span>{t("cabinet.theme")}</span>
              <div className="flex items-center space-x-2">
                <button
                  className={`flex items-center ${
                    theme === "light" ? "text-blue-600" : "text-gray-500"
                  }`}
                  onClick={() => setTheme("light")}
                >
                  <Sun className="h-4 w-4 mr-1" />
                  <span className="text-sm">{t("cabinet.theme.light")}</span>
                </button>
                <button
                  className={`flex items-center ${
                    theme === "dark" ? "text-blue-600" : "text-gray-500"
                  }`}
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="h-4 w-4 mr-1" />
                  <span className="text-sm">{t("cabinet.theme.dark")}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Активные устройства */}
          <div className="bg-white rounded-xl p-4 mb-4 shadow-md">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => onOpenPanel && onOpenPanel("active-devices")}
            >
              <span>{t("cabinet.active.devices")}</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Удалить аккаунт */}
          <div className="bg-white rounded-xl p-4 mb-4 shadow-md">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => onOpenPanel && onOpenPanel("delete-account")}
            >
              <span className="text-red-500">
                {t("cabinet.delete.account")}
              </span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
