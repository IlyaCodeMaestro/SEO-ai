"use client";
import { X, ArrowLeft } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "../provider/language-provider";

interface ActiveDevicesPanelProps {
  onClose: () => void;
}

// Моковые данные для активных устройств
const devices = [
  {
    id: 1,
    type: "Windows приложение",
    model: "Desktop PC",
    isCurrent: true,
    lastActive: "01 мая 00:49",
  },
  {
    id: 2,
    type: "Windows приложение",
    model: "Laptop X_Game",
    isCurrent: false,
    lastActive: "30 апреля 23:03",
  },
  {
    id: 3,
    type: "Windows приложение",
    model: "Desktop PC",
    isCurrent: false,
    lastActive: "05 апреля 16:05",
  },
];

export function ActiveDevicesPanel({ onClose }: ActiveDevicesPanelProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { t } = useLanguage();

  return (
    <div className="h-full flex flex-col justify-start bg-white px-4 md:px-0">
      {/* Заголовок с кнопкой закрытия */}
      <div className="flex items-center justify-between mt-3">
        {isMobile ? (
          <>
            <button onClick={onClose} className="p-1" aria-label="Back">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex-1 text-center">
              <h2 className="text-xl font-medium text-blue-600">
                {t("cabinet.title")}
              </h2>
            </div>
            <div className="w-5"></div> {/* Empty div for balanced spacing */}
          </>
        ) : (
          <>
            <div className="flex-1"></div>
            <button onClick={onClose} className="p-1" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      <div className="flex-1 pt-0 max-w-md mx-auto w-full px-2 md:px-0">
        {/* Заголовок */}
        <div className="w-full border border-white bg-blue-600  py-5 rounded-[25px] text-xl font-medium shadow-md p-4 mb-6 text-white text-center">
          <div className="flex justify-center items-center">
            <span className="text-lg font-medium">
              {t("cabinet.active.devices")}
            </span>
          </div>
        </div>

        {/* Список устройств */}
        <div className="space-y-8">
          {devices.map((device) => (
            <div
              key={device.id}
              className="bg-white rounded-xl p-4 shadow-md border"
            >
              <p className="font-medium">{device.type}</p>
              <p className="text-sm text-gray-500">{device.model}</p>
              {device.isCurrent && (
                <p className="text-xs text-blue-600 mt-1">
                  {t("cabinet.current.device")}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1">{device.lastActive}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
