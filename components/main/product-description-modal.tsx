"use client";
import { Button } from "@/components/ui/button";

interface ProductDescriptionModalProps {
  onClose: () => void;
  onBack: () => void;
  onContinue: () => void;
}

export function ProductDescriptionModal({
  onClose,
  onBack,
  onContinue,
}: ProductDescriptionModalProps) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg max-w-xs w-full mx-4 z-50">
      <div className="text-center space-y-4">
        <h3 className="font-medium">Описание карточки товара</h3>
        <p className="text-sm">
          Описание карточки товара займет примерно 2 минуты
        </p>
        <p className="text-sm">Уведомление придет после завершения</p>
        <p className="text-sm">Перенесено на страницу 'В обработке'</p>
        <div className="mt-4">
          <Button
            onClick={onContinue}
            className="bg-gradient-to-r h-[30px] w-32 rounded-[25px] shadow-custom from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white  text-white r"
          >
            Далее
          </Button>
        </div>
      </div>
    </div>
  );
}
