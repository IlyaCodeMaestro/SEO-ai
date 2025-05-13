"use client";

import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "../provider/language-provider";
import { useRouter } from "next/navigation";

interface DeleteAccountPanelProps {
  onClose: () => void;
}

export function DeleteAccountPanel({ onClose }: DeleteAccountPanelProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { t } = useLanguage();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const router = useRouter();

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    // Здесь будет логика удаления аккаунта
    // После удаления перенаправляем на главную страницу
    router.push("/");
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="h-full flex flex-col justify-start bg-white dark:bg-[rgba(0,0,0,0.25)] px-4 md:px-0">
      {/* Модалка с затемнённым фоном */}
      {showConfirmModal && (
        <div className="absolute pb-64 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 max-w-xs w-full mx-4 dark:bg-[rgba(0,0,0,0.25)]">
            <p className="text-center font-medium mb-6">
              {t("cabinet.confirm.delete")}
            </p>

            <div className="space-y-3">
              <div className="flex justify-center">
                <Button
                  onClick={handleConfirmDelete}
                  className="w-36 bg-gradient-to-r from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white text-white rounded-full"
                >
                  {t("cabinet.delete")}
                </Button>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleCancelDelete}
                  className="w-36 bg-gray-400 hover:bg-gray-500 text-white rounded-full"
                >
                  {t("cabinet.cancel")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Основной контент */}
      <div className="flex-1 pt-0 max-w-md mx-auto w-full px-2 md:px-0">
        {/* Заголовок с крестиком или стрелкой */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center">
            {isMobile ? (
              <button onClick={onClose} className="pt-3" aria-label="Back">
                <ArrowLeft className="h-6 w-6" />
              </button>
            ) : null}
          </div>

          <div className="flex justify-center w-full pt-6">
            <h1 className="text-xl font-medium text-center text-blue-600">
              {t("cabinet.delete.account")}
            </h1>
          </div>

          {!isMobile && (
            <div className="flex items-center">
              <button onClick={onClose} className="p-1" aria-label="Close">
                <X className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>

        {/* Информация об удалении */}
        <div className="bg-white rounded-xl p-6 shadow-custom dark:bg-[rgba(0,0,0,0.25)]">
          <div className="space-y-4 text-center mb-6">
            <p className="text-gray-700 dark:text-white">
              {t("cabinet.delete.personal.data")}
            </p>
            <p className="text-gray-700 dark:text-white">
              {t("cabinet.delete.archive")}
            </p>
            <p className="text-gray-700 dark:text-white">
              {t("cabinet.delete.balance")}
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleDeleteClick}
              className="w-36 bg-gradient-to-r from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white text-white rounded-full"
            >
              {t("cabinet.delete")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
