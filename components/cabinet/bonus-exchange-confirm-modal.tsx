"use client";

import { Button } from "@/components/ui/button";

interface BonusExchangeConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function BonusExchangeConfirmModal({
  onConfirm,
  onCancel,
}: BonusExchangeConfirmModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 max-w-xs w-full mx-4">
        <p className="text-center font-medium mb-6">
          Вы желаете обменять бонусы на услуги?
        </p>

        <div className="space-y-3">
          <div className="flex justify-center">
            <Button
              onClick={onConfirm}
              className="w-32  bg-gradient-to-r shadow-md from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white  text-white rounded-full"
            >
              Обменять
            </Button>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={onCancel}
              className="w-32 bg-gray-400 hover:bg-gray-500 shadow-md text-white rounded-full "
            >
              Отмена
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
