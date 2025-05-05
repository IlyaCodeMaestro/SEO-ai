"use client";

import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { TariffSwitchConfirmModal } from "./tariff-switch-confirm-modal";
import { useTariff, tariffs } from "../provider/tariff-provider";
import { useLanguage } from "../provider/language-provider";

interface TariffPanelProps {
  onClose: () => void;
}

export function TariffPanel({ onClose }: TariffPanelProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const {
    currentTariff,
    setCurrentTariff,
    getTariffById,
    analysisRemaining,
    descriptionRemaining,
    nextPaymentDate,
  } = useTariff();
  const [expandedTariff, setExpandedTariff] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tariffToSwitch, setTariffToSwitch] = useState<string | null>(null);
  const { t } = useLanguage();

  // Текущий тариф
  const currentTariffData = getTariffById(currentTariff);

  // Обработчик клика по тарифу (только для мобильной версии)
  const handleTariffClick = (tariffId: string) => {
    if (expandedTariff === tariffId) {
      setExpandedTariff(null);
    } else {
      setExpandedTariff(tariffId);
    }
  };

  // Обработчик нажатия на кнопку "Перейти"
  const handleSwitchClick = (tariffId: string) => {
    setTariffToSwitch(tariffId);
    setShowConfirmModal(true);
  };

  // Обработчик подтверждения переключения тарифа
  const handleConfirmSwitch = () => {
    if (tariffToSwitch) {
      setCurrentTariff(tariffToSwitch as any);
    }
    setShowConfirmModal(false);
    setTariffToSwitch(null);
  };

  // Обработчик отмены переключения тарифа
  const handleCancelSwitch = () => {
    setShowConfirmModal(false);
    setTariffToSwitch(null);
  };

  // Если показываем модальное окно подтверждения
  if (showConfirmModal && tariffToSwitch) {
    const targetTariff = tariffs.find((t) => t.id === tariffToSwitch);
    return (
      <TariffSwitchConfirmModal
        tariffName={targetTariff?.name || ""}
        onConfirm={handleConfirmSwitch}
        onCancel={handleCancelSwitch}
      />
    );
  }

  // Мобильная версия (с возможностью раскрытия информации о тарифе)
  if (isMobile) {
    return (
      <div className="h-full flex flex-col justify-start bg-white">
        {/* Заголовок с кнопкой закрытия */}
        <div className="flex items-center justify-between p-4">
          <button onClick={onClose} className="p-1" aria-label="Back">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1 text-center">
            <h2 className="text-lg font-medium">{t("cabinet.title")}</h2>
          </div>
          <div className="w-5"></div>{" "}
          {/* Пустой элемент для сбалансированного выравнивания */}
        </div>

        <div className="flex-1 p-0 pt-0 max-w-md mx-auto w-full">
          {/* Текущий тариф */}
          <div className="mb-6 px-4">
            <div className="flex justify-between items-start mb-1">
              <span className="text-gray-600">{t("tariff.my")}</span>
              <span className="font-bold text-lg">
                «{currentTariffData?.name}»
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                {t("tariff.next.payment")} {nextPaymentDate}
              </p>
              <p>
                {t("tariff.analysis.remaining")} {analysisRemaining}{" "}
                {t("tariff.pieces")}.
              </p>
              <p>
                {t("tariff.description.remaining")} {descriptionRemaining}{" "}
                {t("tariff.pieces")}.
              </p>
            </div>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full mt-4"
              onClick={() => handleSwitchClick(currentTariff)}
            >
              {t("tariff.reconnect")}
            </Button>
          </div>

          {/* Список тарифов */}
          <div className="space-y-4 px-4">
            {/* Селлер */}
            <div
              className={`rounded-xl overflow-hidden transition-all duration-300 bg-gradient-to-r from-[rgba(38,203,255,1)] to-[rgba(0,131,172,1)] ${
                expandedTariff === "seller" ? "shadow-lg" : "shadow-sm"
              }`}
              onClick={() => handleTariffClick("seller")}
            >
              {expandedTariff === "seller" ? (
                // Развернутый вид тарифа
                <div className="text-white p-6">
                  <h3 className="text-2xl font-bold mb-2">«Селлер»</h3>
                  <div className="mb-4">
                    <p className="mb-1">
                      {t("tariff.monthly.fee")}{" "}
                      <span className="font-bold">8000 тенге.</span>
                    </p>
                    <p className="mb-1">
                      {t("tariff.analysis.count")}{" "}
                      <span className="font-bold">5 {t("tariff.pieces")}.</span>
                    </p>
                    <p className="mb-1">
                      {t("tariff.description.count")}{" "}
                      <span className="font-bold">5 {t("tariff.pieces")}.</span>
                    </p>
                  </div>

                  <div className="text-sm mb-6">
                    <p className="mb-1">
                      При своевременной оплате абонентская плата при переходе на
                      более высокий тариф не теряется.
                    </p>
                    <p className="mb-1">
                      При переходе на тариф "Менеджер" или "Премиум" бонусы
                      сохраняются.
                    </p>
                    <p className="mb-1">
                      При переходе на тариф "Селлер" 50% бонусов сохраняется.
                    </p>
                    <p className="mb-1">
                      Абонентская плата безвозвратно не возвращается.
                    </p>
                  </div>

                  {currentTariff !== "seller" && (
                    <Button
                      className="bg-white text-black hover:bg-gray-100 rounded-full px-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSwitchClick("seller");
                      }}
                    >
                      Перейти
                    </Button>
                  )}
                </div>
              ) : (
                // Свернутый вид тарифа
                <div className="text-white p-5">
                  <h3 className="text-2xl font-bold">«Селлер»</h3>
                </div>
              )}
            </div>

            {/* Менеджер */}
            <div
              className={`rounded-xl overflow-hidden transition-all duration-300 bg-gradient-to-r from-[rgba(0,131,172,0.71)] to-[rgba(52,96,209,1)] ${
                expandedTariff === "manager" ? "shadow-lg" : "shadow-sm"
              }`}
              onClick={() => handleTariffClick("manager")}
            >
              {expandedTariff === "manager" ? (
                // Развернутый вид тарифа
                <div className="text-white p-6">
                  <h3 className="text-2xl font-bold mb-2">«Менеджер»</h3>
                  <div className="mb-4">
                    <p className="mb-1">
                      {t("tariff.monthly.fee")}{" "}
                      <span className="font-bold">20000 тенге.</span>
                    </p>
                    <p className="mb-1">
                      {t("tariff.analysis.count")}{" "}
                      <span className="font-bold">
                        20 {t("tariff.pieces")}.
                      </span>
                    </p>
                    <p className="mb-1">
                      {t("tariff.description.count")}{" "}
                      <span className="font-bold">
                        20 {t("tariff.pieces")}.
                      </span>
                    </p>
                  </div>

                  <div className="text-sm mb-6">
                    <p className="mb-1">
                      При своевременной оплате абонентская плата при переходе на
                      более высокий тариф не теряется.
                    </p>
                    <p className="mb-1">
                      При переходе на тариф "Премиум" бонусы сохраняются.
                    </p>
                    <p className="mb-1">
                      При переходе на тариф "Селлер" или "Менеджер" 50% бонусов
                      сохраняется.
                    </p>
                    <p className="mb-1">
                      Абонентская плата безвозвратно не возвращается.
                    </p>
                  </div>

                  {currentTariff !== "manager" && (
                    <Button
                      className="bg-white text-black hover:bg-gray-100 rounded-full px-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSwitchClick("manager");
                      }}
                    >
                      Перейти
                    </Button>
                  )}
                </div>
              ) : (
                // Свернутый вид тарифа
                <div className="text-white p-5">
                  <h3 className="text-2xl font-bold">«Менеджер»</h3>
                </div>
              )}
            </div>

            {/* Премиум */}
            <div
              className={`rounded-xl overflow-hidden transition-all duration-300 bg-gradient-to-r from-[rgba(38,99,255,1)] to-[rgba(11,60,187,1)] ${
                expandedTariff === "premium" ? "shadow-lg" : "shadow-sm"
              }`}
              onClick={() => handleTariffClick("premium")}
            >
              {expandedTariff === "premium" ? (
                // Развернутый вид тарифа
                <div className="text-white p-6">
                  <h3 className="text-2xl font-bold mb-2">«Премиум»</h3>
                  <div className="mb-4">
                    <p className="mb-1">
                      {t("tariff.monthly.fee")}{" "}
                      <span className="font-bold">50000 тенге.</span>
                    </p>
                    <p className="mb-1">
                      {t("tariff.analysis.count")}{" "}
                      <span className="font-bold">
                        40 {t("tariff.pieces")}.
                      </span>
                    </p>
                    <p className="mb-1">
                      {t("tariff.description.count")}{" "}
                      <span className="font-bold">
                        60 {t("tariff.pieces")}.
                      </span>
                    </p>
                  </div>

                  <div className="text-sm mb-6">
                    <p className="mb-1">
                      При своевременной оплате абонентская плата при переходе на
                      более высокий тариф не теряется.
                    </p>
                    <p className="mb-1">
                      При переходе на тариф "Селлер" или "Менеджер" бонусы не
                      сохраняются.
                    </p>
                    <p className="mb-1">
                      Абонентская плата безвозвратно не возвращается.
                    </p>
                  </div>

                  {currentTariff !== "premium" && (
                    <Button
                      className="bg-white text-black hover:bg-gray-100 rounded-full px-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSwitchClick("premium");
                      }}
                    >
                      Перейти
                    </Button>
                  )}
                </div>
              ) : (
                // Свернутый вид тарифа
                <div className="text-white p-5">
                  <h3 className="text-2xl font-bold">«Премиум»</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Десктопная версия (новый дизайн согласно скриншоту)
  return (
    <div className="h-full flex flex-col justify-start bg-white p-4">
      {/* Заголовок с кнопкой закрытия */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 text-center">
          <div className="bg-[#4361EE] text-white py-2 px-4 rounded-full inline-block">
            <h2 className="text-lg font-medium">Тариф</h2>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 absolute right-4 top-4"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full">
        {/* Текущий тариф */}
        <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow-sm">
          <div className="mb-1">
            <span className="text-gray-600">Мой тариф</span>
            <span className="font-bold text-lg ml-2">
              «{currentTariffData?.name}»
            </span>
          </div>
          <div className="text-sm text-gray-600">
            <p>Срок действия списания: 10 ноября</p>
            <p>Остаток анализа карточки товара: 40 штук.</p>
            <p>Остаток описания карточки товара: 25 штук.</p>
          </div>
        </div>

        {/* Список тарифов */}
        <div className="space-y-4">
          {/* Селлер */}
          <div className="rounded-xl overflow-hidden bg-gradient-to-r from-[rgba(38,203,255,1)] to-[rgba(0,131,172,1)] shadow-sm">
            <div className="p-4 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">«Селлер»</h3>
                  <p className="text-sm">
                    Ежемесячная абонентская плата 8000 тенге.
                  </p>
                  <p className="text-sm">Анализ карточки товара 5 штук.</p>
                  <p className="text-sm">Описание карточки товара 5 штук.</p>
                </div>
                <div className="text-xs max-w-[40%]">
                  <p>
                    При своевременной оплате абонентская плата при переходе на
                    более высокий тариф не теряется.
                  </p>
                  <p>
                    При переходе на тариф "Менеджер" или "Премиум" бонусы
                    сохраняются.
                  </p>
                  <p>При переходе на тариф "Селлер" 50% бонусов сохраняется.</p>
                  <p>Абонентская плата безвозвратно не возвращается.</p>
                </div>
              </div>
              <div className="mt-2 text-right">
                <button
                  className="bg-[rgba(70,122,255,1)] text-white px-4 py-1 rounded-full text-sm"
                  onClick={() => handleSwitchClick("seller")}
                >
                  Перейти
                </button>
              </div>
            </div>
          </div>

          {/* Менеджер */}
          <div className="rounded-xl overflow-hidden bg-gradient-to-r from-[rgba(0,131,172,0.71)] to-[rgba(52,96,209,1)] shadow-sm">
            <div className="p-4 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">«Менеджер»</h3>
                  <p className="text-sm">
                    Ежемесячная абонентская плата 20000 тенге.
                  </p>
                  <p className="text-sm">Анализ карточки товара 20 штук.</p>
                  <p className="text-sm">Описание карточки товара 20 штук.</p>
                </div>
                <div className="text-xs max-w-[40%]">
                  <p>
                    При своевременной оплате абонентская плата при переходе на
                    более высокий тариф не теряется.
                  </p>
                  <p>При переходе на тариф "Премиум" бонусы сохраняются.</p>
                  <p>
                    При переходе на тариф "Селлер" или "Менеджер" 50% бонусов
                    сохраняется.
                  </p>
                  <p>Абонентская плата безвозвратно не возвращается.</p>
                </div>
              </div>
              <div className="mt-2 text-right">
                <button
                  className="bg-[rgba(70,122,255,1)] text-white px-4 py-1 rounded-full text-sm"
                  onClick={() => handleSwitchClick("manager")}
                >
                  Перейти
                </button>
              </div>
            </div>
          </div>

          {/* Премиум */}
          <div className="rounded-xl overflow-hidden bg-gradient-to-r from-[rgba(38,99,255,1)] to-[rgba(11,60,187,1)] shadow-sm">
            <div className="p-4 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">«Премиум»</h3>
                  <p className="text-sm">
                    Ежемесячная абонентская плата 50000 тенге.
                  </p>
                  <p className="text-sm">Анализ карточки товара 40 штук.</p>
                  <p className="text-sm">Описание карточки товара 60 штук.</p>
                </div>
                <div className="text-xs max-w-[40%]">
                  <p>
                    При своевременной оплате абонентская плата при переходе на
                    более высокий тариф не теряется.
                  </p>
                  <p>
                    При переходе на тариф "Селлер" или "Менеджер" бонусы не
                    сохраняются.
                  </p>
                  <p>Абонентская плата безвозвратно не возвращается.</p>
                </div>
              </div>
              <div className="mt-2 text-right">
                <button
                  className="bg-[rgba(70,122,255,1)] text-white px-4 py-1 rounded-full text-sm"
                  onClick={() => handleSwitchClick("premium")}
                >
                  Переподключить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
