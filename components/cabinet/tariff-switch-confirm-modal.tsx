"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "../provider/language-provider";

interface TariffSwitchConfirmModalProps {
  tariffName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function TariffSwitchConfirmModal({
  tariffName,
  onConfirm,
  onCancel,
}: TariffSwitchConfirmModalProps) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 max-w-xs w-full mx-4">
        <p className="text-center font-medium mb-6">
          {t("tariff.confirm.switch")} "{tariffName}"?
        </p>

        <div className="space-y-3">
          <Button
            onClick={onConfirm}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full"
          >
            {t("tariff.confirm")}
          </Button>

          <Button
            onClick={onCancel}
            className="w-full bg-gray-400 hover:bg-gray-500 text-white rounded-full"
          >
            {t("tariff.cancel")}
          </Button>
        </div>
      </div>
    </div>
  );
}
