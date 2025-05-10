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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-xs mx-auto">
        <div className="text-center mb-6">
          <p className="text-lg">
            {t("tariff.switch.confirm")} «{tariffName}»?
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            className="bg-[#4361EE] hover:bg-[#3651DE] text-white rounded-full py-3"
            onClick={onConfirm}
          >
            {t("tariff.connect")}
          </Button>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 rounded-full py-3"
            onClick={onCancel}
          >
            {t("tariff.cancel")}
          </Button>
        </div>
      </div>
    </div>
  );
}
