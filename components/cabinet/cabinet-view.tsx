"use client";

import type React from "react";

import { useLanguage } from "../provider/language-provider";
import { ChevronRight, Sun, Moon } from "lucide-react";
import { useTheme } from "../provider/theme-provider";
import { useTariff } from "../provider/tariff-provider";

interface CabinetViewProps {
  onOpenPanel?: (panel: string, data?: any) => void;
}

function isMobileDevice() {
  if (typeof window !== "undefined") {
    return window.innerWidth < 768; // Common breakpoint for mobile devices
  }
  return false;
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

  const scrollToTop = () => {
    if (!isMobileDevice()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleButtonClick =
    (callback?: Function, ...args: any[]) =>
    (e: React.MouseEvent) => {
      if (callback) {
        callback(...args);
      }
      scrollToTop();
    };

  return (
    <div className="h-full flex flex-col">
      {/* Заголовок по центру без кнопки назад */}
      <div className="p-4 flex items-center justify-center">
        <h2 className="text-xl text-[#1950DF] font-medium">
          {t("cabinet.title")}
        </h2>
      </div>

      {/* Серый блок с контентом */}
      <div className="flex-1 mx-4 mb-4 rounded-[24px] ">
        {/* Информация о пользователе */}
        <div className="px-4 pb-6 ">
          <div className="text-center mb-1">
            <h3 className="text-lg font-medium">Ерлан</h3>
            <p className="text-sm text-gray-500">+77700000000</p>
            <p className="text-sm text-gray-500">dalnovidec@gmail.com</p>
            <br />
          </div>

          {/* Баланс */}
          <div className=" bg-gradient-to-r from-[#0d52ff] to-[rgba(11,60,187,1)] rounded-[25px] h-[70px] px-6 py-3 mb-4 text-white flex flex-col shadow-md border justify-between">
            <div className="flex justify-between items-start">
              <span className="font-medium text-base pt-[10px]">
                {t("cabinet.balance")}
              </span>
              <span className="font-medium text-base">32000 ₸</span>
            </div>
            <div className="flex justify-end">
              <button
                className="text-xs font-light text-white underline"
                onClick={handleButtonClick(
                  () => onOpenPanel && onOpenPanel("balance-topup")
                )}
              >
                {t("cabinet.topup")}
              </button>
            </div>
          </div>

          {/* Выписка по балансу */}
          <div className="bg-white rounded-[25px] p-6 mb-4 border shadow-md h-[70px]">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={handleButtonClick(
                () => onOpenPanel && onOpenPanel("balance-history")
              )}
            >
              <span>{t("cabinet.balance.statement")}</span>
              <ChevronRight className="h-6 w-6 text-black" />
            </div>
          </div>

          {/* Бонусы */}
          <div className="bg-white rounded-[25px] h-[70px] px-6 pt-4 pb-2 mb-4 shadow-md flex flex-col border justify-between ">
            <div className="flex justify-between items-start">
              <span className=" text-base pt-2 text-[#020817]">
                {t("cabinet.bonuses")}
              </span>
              <span className=" text-base text-[#020817]">500 баллов</span>
            </div>
            <div className="flex justify-end">
              <button
                className="text-xs font-light text-black underline"
                onClick={handleButtonClick(
                  () => onOpenPanel && onOpenPanel("bonus-exchange")
                )}
              >
                {t("cabinet.exchange")}
              </button>
            </div>
          </div>

          {/* Выписка по бонусам */}
          <div className="bg-white rounded-[25px] p-6 mb-4 shadow-md h-[70px] border">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={handleButtonClick(
                () => onOpenPanel && onOpenPanel("bonus-statement")
              )}
            >
              <span>Выписка по бонусам</span>
              <ChevronRight className="h-6 w-6 text-black" />
            </div>
          </div>

          {/* Выписка по рефералам */}
          <div className="bg-white rounded-[25px] p-6 mb-4 shadow-md border h-[70px]">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={handleButtonClick(
                () => onOpenPanel && onOpenPanel("referral-statement")
              )}
            >
              <span>Выписка по рефералам</span>
              <ChevronRight className="h-6 w-6 text-black" />
            </div>
          </div>

          {/* Тариф */}
          <div className="bg-white rounded-[25px] h-[70px] px-6 pt-4  mb-4 shadow-md flex flex-col justify-between border">
            <div
              className="flex justify-between items-center cursor-pointer "
              onClick={handleButtonClick(
                () => onOpenPanel && onOpenPanel("tariff")
              )}
            >
              <span className="pb-[10px]">{t("cabinet.tariff")}</span>
              <div className="flex flex-col items-end gap-2">
                <span className="text-gray-800">
                  «{getTranslatedTariffName()}»
                </span>
                <button
                  className="text-xs font-light text-black underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleButtonClick(
                      () => onOpenPanel && onOpenPanel("tariff")
                    )(e);
                  }}
                >
                  {"сменить"}
                </button>
              </div>
            </div>
          </div>

          {/* Язык - обновленный стиль */}
          <div className="relative mb-4">
            <div className="bg-white rounded-[25px] h-[70px] p-4 shadow-md flex justify-between items-center border">
              <span className="text-base ml-2">{t("cabinet.language")}</span>
              <div className="bg-gray-100 rounded-[25px] p-1 flex">
                <button
                  className={`px-3 py-2 rounded-[20px] text-sm transition-all ${
                    language === "kz"
                      ? "bg-white text-blue-600 font-medium shadow-md"
                      : "text-gray-500"
                  }`}
                  onClick={handleButtonClick(() => setLanguage("kz"))}
                >
                  Каз.
                </button>
                <button
                  className={`px-3 py-2 rounded-[20px] text-sm transition-all ${
                    language === "ru"
                      ? "bg-white text-blue-600 font-medium shadow-md"
                      : "text-gray-500"
                  }`}
                  onClick={handleButtonClick(() => setLanguage("ru"))}
                >
                  Рус.
                </button>
                <button
                  className={`px-3 py-2 rounded-[20px] text-sm transition-all ${
                    language === "en"
                      ? "bg-white text-blue-600 font-medium shadow-md"
                      : "text-gray-500"
                  }`}
                  onClick={handleButtonClick(() => setLanguage("en"))}
                >
                  Eng.
                </button>
              </div>
            </div>
            {/* Shadow effect */}
            <div className="absolute inset-0 rounded-[40px] shadow-md -z-10"></div>
          </div>

          {/* Тема - обновленный стиль */}
          <div className="relative mb-4">
            <div className="bg-white rounded-[25px] h-[70px] p-4 shadow-md flex justify-between items-center border">
              <span className="text-base ml-2">{t("cabinet.theme")}</span>
              <div className="bg-gray-100 rounded-[25px] p-1 flex">
                <button
                  className={`px-3 py-2 rounded-[20px] flex items-center transition-all ${
                    theme === "light"
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-gray-500"
                  }`}
                  onClick={handleButtonClick(() => setTheme("light"))}
                >
                  <Sun className="h-4 w-4 mr-1" />
                  <span className="text-sm">{t("cabinet.theme.light")}</span>
                </button>
                <button
                  className={`px-3 py-2 rounded-[20px] flex items-center transition-all ${
                    theme === "dark"
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-gray-500"
                  }`}
                  onClick={handleButtonClick(() => setTheme("dark"))}
                >
                  <Moon className="h-4 w-4 mr-1" />
                  <span className="text-sm">{t("cabinet.theme.dark")}</span>
                </button>
              </div>
            </div>
            {/* Shadow effect */}
            <div className="absolute inset-0 rounded-[40px] shadow-md -z-10"></div>
          </div>

          {/* Активные устройства */}
          <div className="bg-white rounded-[25px] h-[70px] p-6 mb-4 shadow-md border">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={handleButtonClick(
                () => onOpenPanel && onOpenPanel("active-devices")
              )}
            >
              <span>{t("cabinet.active.devices")}</span>
              <ChevronRight className="h-6 w-6 text-black" />
            </div>
          </div>

          {/* Удалить аккаунт */}
          <div className="bg-white rounded-[25px] h-[70px] p-6 mb-4 shadow-md border">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={handleButtonClick(
                () => onOpenPanel && onOpenPanel("delete-account")
              )}
            >
              <span className="text-red-500">
                {t("cabinet.delete.account")}
              </span>
              <ChevronRight className="h-6 w-6 text-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
