"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ProductAnalysisFormProps {
  onClose: () => void;
  onSubmit: (data: { sku: string; competitorSku: string }) => void;
}

export function ProductAnalysisForm({
  onClose,
  onSubmit,
}: ProductAnalysisFormProps) {
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

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div className="h-full relative">
      {/* Кнопка закрытия (X) в правом верхнем углу - только для десктопа */}
      {!isMobile && (
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Мобильная версия */}
      {isMobile && (
        <div className="flex flex-col">
          {/* Верхняя панель с кнопкой назад и заголовком */}
          <div className="flex items-center p-4">
            <button onClick={onClose} className="p-1" aria-label="Back">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex-1 text-center mr-5">
              <h1 className="text-blue-500 font-medium text-xl">Главная</h1>
            </div>
          </div>

          {/* Подзаголовок с отступом */}
          <div className="text-center mb-8 mt-6">
            <h2 className="text-black font-medium text-xl">Анализ карточки товара</h2>
          </div>

          {/* Форма */}
          <div className="px-4">
            <form className="space-y-6" onSubmit={handleSubmit(onFormSubmit)}>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 text-center">
                  Введите SKU вашего товара
                </p>
                <div>
                  <Input
                    id="sku"
                    className={`mt-1 bg-gray-100 rounded-full h-[45px] text-center max-w-[320px] mx-auto ${
                      errors.sku ? "border-red-500" : ""
                    }`}
                    placeholder="SKU (анализируемый товар)"
                    autoFocus
                    {...register("sku", { required: true })}
                  />
                  {errors.sku && (
                    <p className="text-red-500 text-xs mt-1 text-center">
                      Это поле обязательно к заполнению
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500 text-center">
                  Введите SKU конкурента с высоким рейтингом
                </p>
                <div>
                  <Input
                    id="competitorSku"
                    className={`mt-1 bg-gray-100 rounded-full h-[45px] text-center max-w-[320px] mx-auto ${
                      errors.competitorSku ? "border-red-500" : ""
                    }`}
                    placeholder="SKU (топовый конкурент)"
                    {...register("competitorSku", { required: false })}
                  />
                  {errors.competitorSku && (
                    <p className="text-red-500 text-xs mt-1 text-center">
                      Это поле обязательно к заполнению
                    </p>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center px-4">
                  <br />
                  Чтобы получить больше данных о вашем товаре,
                  <br />
                  необходимо ввести SKU аналога конкурента с заполненными
                  <br />
                  Характеристиками и Описанием.
                  <br />
                  Правильно подобранный аналог поможет сделать качественный
                  анализ вашей карточки
                </p>
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#64cada] to-[#4169E1] text-white rounded-full h-[45px] border border-white shadow-custom inline-block px-8"
                >
                  Продолжить
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Десктопная версия */}
      {!isMobile && (
        <div className="max-w-md mx-auto pt-4 p-6">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <h2 className="text-black font-medium text-xl">
              Анализ карточки товара
            </h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="space-y-2">
              <p className="text-sm text-gray-500 text-center">
                Введите SKU вашего товара
              </p>
              <div>
                <Input
                  id="sku"
                  className={`mt-1 bg-gray-100 rounded-full h-[45px] text-center max-w-[320px] mx-auto ${
                    errors.sku ? "border-red-500" : ""
                  }`}
                  placeholder="SKU (анализируемый товар)"
                  autoFocus
                  {...register("sku", { required: true })}
                />
                {errors.sku && (
                  <p className="text-red-500 text-xs mt-1 text-center">
                    Это поле обязательно к заполнению
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-500 text-center">
                Введите SKU конкурента с высоким рейтингом
              </p>
              <div>
                <Input
                  id="competitorSku"
                  className={`mt-1 bg-gray-100 rounded-full h-[45px] text-center max-w-[320px] mx-auto ${
                    errors.competitorSku ? "border-red-500" : ""
                  }`}
                  placeholder="SKU (топовый конкурент)"
                  {...register("competitorSku", { required: false })}
                />
                {errors.competitorSku && (
                  <p className="text-red-500 text-xs mt-1 text-center">
                    Это поле обязательно к заполнению
                  </p>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center px-4">
                <br />
                Чтобы получить больше данных о вашем товаре,
                <br />
                необходимо ввести SKU аналога конкурента с заполненными
                <br />
                Характеристиками и Описанием.
                <br />
                Правильно подобранный аналог поможет сделать качественный анализ
                вашей карточки
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#64cada] to-[#4169E1] text-white rounded-full h-[45px] border border-white shadow-custom inline-block px-8"
              >
                Продолжить
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
