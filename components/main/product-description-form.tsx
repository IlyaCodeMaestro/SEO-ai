"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useLanguage } from "../provider/language-provider";

interface ProductDescriptionFormProps {
  onClose: () => void;
  onSubmit: (data: { sku: string; competitorSku: string }) => void;
}

export function ProductDescriptionForm({
  onClose,
  onSubmit,
}: ProductDescriptionFormProps) {
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

  // Добавляем переводы для формы описания товара
  const translations = {
    ru: {
      "description.title": "Описание карточки товара",
      "description.enter.sku": "Введите SKU вашего товара",
      "description.no.card":
        "Если у поставщика нет карточки, введите SKU похожего товара",
      "description.sku": "SKU (описываемый товар)",
      "description.enter.competitor":
        "Введите SKU конкурента с высоким рейтингом",
      "description.competitor": "SKU (топовый конкурент)",
      "description.note":
        "Чтобы получить больше данных о вашем товаре необходимо ввести SKU аналога конкурента. Опционально.",
      "description.continue": "Продолжить",
      "description.required": "Это поле обязательно к заполнению",
    },
    kz: {
      "description.title": "Тауар карточкасының сипаттамасы",
      "description.enter.sku": "Тауарыңыздың SKU енгізіңіз",
      "description.no.card":
        "Егер жеткізушіде карточка болмаса, ұқсас тауардың SKU енгізіңіз",
      "description.sku": "SKU (сипатталатын тауар)",
      "description.enter.competitor":
        "Жоғары рейтингі бар бәсекелестің SKU енгізіңіз",
      "description.competitor": "SKU (үздік бәсекелес)",
      "description.note":
        "Тауарыңыз туралы көбірек деректер алу үшін бәсекелестің аналогының SKU енгізу қажет. Қосымша.",
      "description.continue": "Жалғастыру",
      "description.required": "Бұл өріс міндетті түрде толтырылуы керек",
    },
    en: {
      "description.title": "Product Card Description",
      "description.enter.sku": "Enter your product SKU",
      "description.no.card":
        "If the supplier doesn't have a card, enter the SKU of a similar product",
      "description.sku": "SKU (described product)",
      "description.enter.competitor": "Enter competitor SKU with high rating",
      "description.competitor": "SKU (top competitor)",
      "description.note":
        "To get more data about your product, you need to enter a competitor's analog SKU. Optional.",
      "description.continue": "Continue",
      "description.required": "This field is required",
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
          <div className="bg-blue-500 text-white py-3 px-6 rounded-full">
            <h2 className="text-lg font-medium">
              {translate("description.title")}
            </h2>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              {translate("description.enter.sku")}
            </p>
            <p className="text-xs text-gray-500">
              {translate("description.no.card")}
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
                  {translate("description.required")}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              {translate("description.enter.competitor")}
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
                  {translate("description.required")}
                </p>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {translate("description.note")}
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[rgba(38,99,255,1)] to-[rgba(11,60,187,1)] hover:opacity-90 text-white rounded-full"
          >
            {translate("description.continue")}
          </Button>
        </form>
      </div>
    </div>
  );
}
