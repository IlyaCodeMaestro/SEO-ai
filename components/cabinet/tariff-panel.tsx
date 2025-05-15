"use client";

import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";

// Define tariff types
interface Tariff {
  id: string;
  name: string;
  monthlyFee: string;
  analysisCount: number;
  descriptionCount: number;
  details: string[];
}

// Tariff data
const tariffs: Tariff[] = [
  {
    id: "trial",
    name: "Пробный",
    monthlyFee: "0",
    analysisCount: 9,
    descriptionCount: 8,
    details: [],
  },
  {
    id: "seller",
    name: "Селлер",
    monthlyFee: "8000",
    analysisCount: 6,
    descriptionCount: 6,
    details: [
      "При переподключении тарифа остатки трафика и бонусы не сохраняются.",
      'При переходе на тариф "Менеджер" 50% бонусов сохраняются.',
      'При переходе на тариф "Премиум" 100% бонусов сохраняются.',
      "Абонентская плата бонусами не оплачивается.",
    ],
  },
  {
    id: "manager",
    name: "Менеджер",
    monthlyFee: "20000",
    analysisCount: 20,
    descriptionCount: 20,
    details: [
      "При своевременной оплате абонентской платы или переподключении тарифа 50% бонусов сохраняются, остатки трафика не сохраняются.",
      'При переходе на тариф "Селлер" бонусы не сохраняются.',
      'При переходе на тариф "Премиум" 100% бонусов сохраняются.',
      "Абонентская плата бонусами не оплачивается.",
    ],
  },
  {
    id: "premium",
    name: "Премиум",
    monthlyFee: "40000",
    analysisCount: 60,
    descriptionCount: 60,
    details: [
      "При своевременной оплате абонентской платы или переподключении 100% бонусов сохраняются, остатки трафика не сохраняются.",
      'При переходе на тариф "Селлер" или "Менеджер" бонусы не сохраняются.',
      "Абонентская плата бонусами не оплачивается.",
    ],
  },
];

// Tariff provider context (simplified for this example)
const useTariff = () => {
  const [currentTariff, setCurrentTariff] = useState<string>("trial");
  const analysisRemaining = 9;
  const descriptionRemaining = 8;
  const nextPaymentDate = "05 июня";

  const getTariffById = (id: string) => {
    return tariffs.find((t) => t.id === id);
  };

  return {
    currentTariff,
    setCurrentTariff,
    getTariffById,
    analysisRemaining,
    descriptionRemaining,
    nextPaymentDate,
  };
};

// Translation function (simplified)
const useLanguage = () => {
  const t = (key: string) => {
    const translations: Record<string, string> = {
      "cabinet.title": "Тарифы",
      "tariff.my": "Мой тариф",
      "tariff.next.payment": "Дата отключения",
      "tariff.analysis.remaining": "Остаток анализа карточки товара",
      "tariff.description.remaining": "Остаток описания карточки товара",
      "tariff.pieces": "штук",
      "tariff.reconnect": "Переподключить",
      "tariff.monthly.fee": "Ежемесячная абонентская плата",
      "tariff.analysis.count": "Анализ карточки товара",
      "tariff.description.count": "Описание карточки товара",
      "tariff.switch.confirm": "Вы желаете перейти на тариф",
      "tariff.connect": "Подключить",
      "tariff.cancel": "Отмена",
    };
    return translations[key] || key;
  };

  return { t };
};

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
  const [autoRenewal, setAutoRenewal] = useState(false);
  const [showAutoRenewalModal, setShowAutoRenewalModal] = useState(false);

  // Current tariff data
  const currentTariffData = getTariffById(currentTariff);

  // Handle tariff click (mobile only)
  const handleTariffClick = (tariffId: string) => {
    if (isMobile) {
      if (expandedTariff === tariffId) {
        setExpandedTariff(null);
      } else {
        setExpandedTariff(tariffId);
      }
    }
  };

  // Handle switch button click
  const handleSwitchClick = (tariffId: string) => {
    setTariffToSwitch(tariffId);
    setShowConfirmModal(true);
  };

  // Handle confirm switch
  const handleConfirmSwitch = () => {
    if (tariffToSwitch) {
      setCurrentTariff(tariffToSwitch);
    }
    setShowConfirmModal(false);
    setTariffToSwitch(null);
  };

  // Handle cancel switch
  const handleCancelSwitch = () => {
    setShowConfirmModal(false);
    setTariffToSwitch(null);
  };

  const handleAutoRenewalToggle = () => {
    if (!autoRenewal) {
      setShowAutoRenewalModal(true);
    } else {
      setAutoRenewal(false);
    }
  };

  const confirmAutoRenewal = () => {
    setAutoRenewal(true);
    setShowAutoRenewalModal(false);
  };

  const cancelAutoRenewal = () => {
    setShowAutoRenewalModal(false);
  };

  // Get gradient class based on tariff ID
  const getTariffGradient = (tariffId: string) => {
    switch (tariffId) {
      case "seller":
        return "bg-gradient-to-r from-[#26CBFF] to-[#0083AC] border border-white ";
      case "manager":
        return "bg-gradient-to-r from-[rgba(0,131,172,0.71)] to-[#3460D1] border border-white";
      case "premium":
        return "bg-gradient-to-r from-[#2663FF] to-[#0B3CBB] border border-white";
      default:
        return "bg-gradient-to-r from-[#26CBFF] to-[#0083AC] border border-white";
    }
  };

  // Mobile view
  if (isMobile) {
    return (
      <div className="h-full flex flex-col justify-start bg-white">
        {/* Header with back button and centered "Личный кабинет" text */}
        <div className="flex items-center justify-between p-4 relative">
          <button
            onClick={onClose}
            className="p-1 absolute left-4"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1 text-center pl-4">
            <div className="text-[#4361EE] font-medium text-xl">
              Личный кабинет
            </div>
          </div>
          <div className="w-5"></div> {/* Empty div for balanced spacing */}
        </div>

        {/* Tariffs title */}
        <div className="text-center mb-4">
          <h2 className="text-lg font-medium">{t("cabinet.title")}</h2>
        </div>

        <div className="flex-1 p-4 pt-0 max-w-md mx-auto w-full">
          {/* Current tariff */}
          <div className="mb-6">
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

            {/* Auto-renewal toggle */}
            <div className="flex items-center justify-between mt-4">
              <span className="text-gray-600">Автосписание</span>
              <div
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                  autoRenewal ? "bg-[#4361EE]" : "bg-gray-300"
                }`}
                onClick={handleAutoRenewalToggle}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                    autoRenewal ? "translate-x-6" : ""
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Tariff list */}
          <div className="space-y-4">
            {tariffs
              .filter((t) => t.id !== "trial")
              .map((tariff) => (
                <div
                  key={tariff.id}
                  className={`rounded-xl overflow-hidden transition-all duration-300 ${getTariffGradient(
                    tariff.id
                  )} ${
                    expandedTariff === tariff.id ? "shadow-lg" : "shadow-sm"
                  }`}
                  onClick={() => handleTariffClick(tariff.id)}
                >
                  {expandedTariff === tariff.id ? (
                    // Expanded view
                    <div className="text-white p-6">
                      <h3 className="text-2xl font-bold mb-2">
                        «{tariff.name}»
                      </h3>
                      <div className="mb-4">
                        <p className="mb-1">
                          {t("tariff.monthly.fee")}{" "}
                          <span className="font-bold">
                            {tariff.monthlyFee} тенге.
                          </span>
                        </p>
                        <p className="mb-1">
                          {t("tariff.analysis.count")}{" "}
                          <span className="font-bold">
                            {tariff.analysisCount} {t("tariff.pieces")}.
                          </span>
                        </p>
                        <p className="mb-1">
                          {t("tariff.description.count")}{" "}
                          <span className="font-bold">
                            {tariff.descriptionCount} {t("tariff.pieces")}.
                          </span>
                        </p>
                      </div>

                      <div className="text-sm mb-6">
                        {tariff.details.map((detail, index) => (
                          <p key={index} className="mb-1">
                            {detail}
                          </p>
                        ))}
                      </div>

                      {currentTariff !== tariff.id && (
                        <Button
                          className="bg-gradient-to-t from-[#0d52ff] to-[rgba(11,60,187,1)] text-white rounded-full px-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSwitchClick(tariff.id);
                          }}
                        >
                          Перейти
                        </Button>
                      )}
                    </div>
                  ) : (
                    // Collapsed view - now showing first 3 lines
                    <div className="text-white p-5">
                      <h3 className="text-2xl font-bold mb-2">
                        «{tariff.name}»
                      </h3>
                      <p className="text-sm">
                        Ежемесячная абонентская плата {tariff.monthlyFee} тенге.
                      </p>
                      <p className="text-sm">
                        Анализ карточки товара {tariff.analysisCount} штук.
                      </p>
                      <p className="text-sm">
                        Описание карточки товара {tariff.descriptionCount} штук.
                      </p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
        {/* Confirmation modal */}
        {showConfirmModal && tariffToSwitch && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-3xl">
            <div className="bg-white p-6 rounded-xl max-w-xs w-full mx-4">
              <div className="text-center mb-6">
                <p className="text-lg">
                  {t("tariff.switch.confirm")} «
                  {getTariffById(tariffToSwitch)?.name}»?
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  className="bg-gradient-to-r from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white text-white rounded-full py-3"
                  onClick={handleConfirmSwitch}
                >
                  {t("tariff.connect")}
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 rounded-full py-3"
                  onClick={handleCancelSwitch}
                >
                  {t("tariff.cancel")}
                </Button>
              </div>
            </div>
          </div>
        )}

        {showAutoRenewalModal && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-3xl">
            <div className="bg-white p-6 rounded-xl max-w-xs w-full mx-4">
              <div className="text-center mb-6">
                <p className="text-lg">
                  Вы желаете включить автопродление тарифа?
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  className="bg-gradient-to-r from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white text-white rounded-full py-3"
                  onClick={confirmAutoRenewal}
                >
                  Подтвердить
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 rounded-full py-3"
                  onClick={cancelAutoRenewal}
                >
                  Отмена
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop view
  return (
    <div className="bg-white w-full">
      <div className="max-w-3xl mx-auto p-6">
        {/* Header - now with black text and no blue background */}
        <div className="flex items-center justify-center relative mb-6">
          <h2 className="text-lg font-medium text-black">Тарифы</h2>
          <button
            onClick={onClose}
            className="absolute right-0 top-0 p-1"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="w-full">
          {/* Current tariff */}
          <div className="mb-6 bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="mb-1">
                  <span className="text-gray-600">Мой тариф</span>
                  <span className="font-bold text-lg ml-2">
                    «{currentTariffData?.name}»
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Дата отключения {nextPaymentDate}</p>
                  <p>
                    Остаток анализа карточки товара: {analysisRemaining} штук.
                  </p>
                  <p>
                    Остаток описания карточки товара: {descriptionRemaining}{" "}
                    штук.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Auto-renewal toggle */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">Автосписание</span>
            <div
              className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                autoRenewal ? "bg-[#4361EE]" : "bg-gray-300"
              }`}
              onClick={handleAutoRenewalToggle}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  autoRenewal ? "translate-x-6" : ""
                }`}
              />
            </div>
          </div>

          {/* Tariff list */}
          <div className="space-y-4">
            {tariffs
              .filter((t) => t.id !== "trial")
              .map((tariff) => (
                <div
                  key={tariff.id}
                  className={`rounded-xl overflow-hidden ${getTariffGradient(
                    tariff.id
                  )} shadow-sm`}
                >
                  <div className="p-4 text-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">
                          «{tariff.name}»
                        </h3>
                        <p className="text-sm">
                          Ежемесячная абонентская плата {tariff.monthlyFee}{" "}
                          тенге.
                        </p>
                        <p className="text-sm">
                          Анализ карточки товара {tariff.analysisCount} штук.
                        </p>
                        <p className="text-sm">
                          Описание карточки товара {tariff.descriptionCount}{" "}
                          штук.
                        </p>
                      </div>
                      <div className="text-sm max-w-[50%]">
                        {tariff.details.map((detail, index) => (
                          <p key={index} className="mb-1">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 text-right">
                      <button
                        className="bg-gradient-to-r from-[#0d52ff] to-[rgba(11,60,187,1)] text-white px-6 py-2  border border-white rounded-full text-sm"
                        onClick={() => handleSwitchClick(tariff.id)}
                      >
                        {currentTariff === tariff.id
                          ? "Переподключить"
                          : "Перейти"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Confirmation modal */}
        {showConfirmModal && tariffToSwitch && (
          <div className="absolute pb-32 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-3xl">
            <div className="bg-white p-6 rounded-xl max-w-xs w-full mx-4">
              <div className="text-center mb-6">
                <p className="text-lg">
                  {t("tariff.switch.confirm")} «
                  {getTariffById(tariffToSwitch)?.name}»?
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  className="bg-gradient-to-r from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white text-white rounded-full py-3"
                  onClick={handleConfirmSwitch}
                >
                  {t("tariff.connect")}
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 rounded-full py-3"
                  onClick={handleCancelSwitch}
                >
                  {t("tariff.cancel")}
                </Button>
              </div>
            </div>
          </div>
        )}

        {showAutoRenewalModal && (
          <div className="absolute pb-32 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-3xl">
            <div className="bg-white p-6 rounded-xl max-w-xs w-full mx-4">
              <div className="text-center mb-6">
                <p className="text-lg">
                  Вы желаете включить автопродление тарифа?
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  className="bg-gradient-to-r from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white text-white rounded-full py-3"
                  onClick={confirmAutoRenewal}
                >
                  Подтвердить
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 rounded-full py-3"
                  onClick={cancelAutoRenewal}
                >
                  Отмена
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
