"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "../provider/language-provider";

interface ProductAnalysisFormProps {
  onClose: () => void;
  onSubmit: (data: { sku: string; competitorSku: string }) => void;
}

export function ProductAnalysisForm({
  onClose,
  onSubmit,
}: ProductAnalysisFormProps) {
  const { t, language } = useLanguage();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sku: "",
      competitorSku: "",
    },
  });

  // Добавляем переводы для формы анализа товара
  const translations = {
    ru: {
      "analysis.title": "Анализ карточки товара",
      "analysis.enter.sku": "Введите SKU вашего товара",
      "analysis.sku": "SKU (анализируемый товар)",
      "analysis.enter.competitor": "Введите SKU конкурента с высоким рейтингом",
      "analysis.competitor": "SKU (топовый конкурент)",
      "analysis.note":
        "Чтобы получить больше данных о вашем товаре необходимо ввести SKU аналога конкурента. Опционально.",
      "analysis.continue": "Продолжить",
      "analysis.required": "Это поле обязательно к заполнению",
    },
    kz: {
      "analysis.title": "Тауар карточкасын талдау",
      "analysis.enter.sku": "Тауарыңыздың SKU енгізіңіз",
      "analysis.sku": "SKU (талданатын тауар)",
      "analysis.enter.competitor":
        "Жоғары рейтингі бар бәсекелестің SKU енгізіңіз",
      "analysis.competitor": "SKU (үздік бәсекелес)",
      "analysis.note":
        "Тауарыңыз туралы көбірек деректер алу үшін бәсекелестің аналогының SKU енгізу қажет. Қосымша.",
      "analysis.continue": "Жалғастыру",
      "analysis.required": "Бұл өріс міндетті түрде толтырылуы керек",
    },
    en: {
      "analysis.title": "Product Card Analysis",
      "analysis.enter.sku": "Enter your product SKU",
      "analysis.sku": "SKU (analyzed product)",
      "analysis.enter.competitor": "Enter competitor SKU with high rating",
      "analysis.competitor": "SKU (top competitor)",
      "analysis.note":
        "To get more data about your product, you need to enter a competitor's analog SKU. Optional.",
      "analysis.continue": "Continue",
      "analysis.required": "This field is required",
    },
  };

  // Функция для получения перевода
  const translate = (key: string) => {
    return translations[language][key] || key;
  };

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div className="h-full p-6 relative">
      {/* Кнопка закрытия (X) в правом верхнем углу - только для десктопа */}
      {!isMobile && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      {/* Кнопка назад для мобильной версии */}
      {isMobile && (
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      )}

      <div className="max-w-md mx-auto pt-10">
        {/* Заголовок с кнопкой назад */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-400 text-white py-3 px-6 rounded-full">
            <h2 className="text-lg font-medium">
              {translate("analysis.title")}
            </h2>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              {translate("analysis.enter.sku")}
            </p>
            <div>
              <Input
                id="sku"
                className={`mt-1 bg-gray-50 dark:bg-gray-700 ${
                  errors.sku ? "border-red-500" : ""
                }`}
                placeholder="SKU12345"
                {...register("sku", { required: true })}
              />
              {errors.sku && (
                <p className="text-red-500 text-xs mt-1">
                  {translate("analysis.required")}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              {translate("analysis.enter.competitor")}
            </p>
            <div>
              <Input
                id="competitorSku"
                className={`mt-1 bg-gray-50 dark:bg-gray-700 ${
                  errors.competitorSku ? "border-red-500" : ""
                }`}
                placeholder="SKU67890"
                {...register("competitorSku", { required: false })}
              />
              {errors.competitorSku && (
                <p className="text-red-500 text-xs mt-1">
                  {translate("analysis.required")}
                </p>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {translate("analysis.note")}
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-400 hover:bg-blue-500 text-white rounded-full"
          >
            {translate("analysis.continue")}
          </Button>
        </form>
      </div>
    </div>
  );
}
