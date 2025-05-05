"use client";

import { useState, useEffect } from "react";
import { useTheme } from "../provider/theme-provider";
import { useLanguage } from "../provider/language-provider";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useProcessingContext } from "./processing-provider";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("main");
  const { hasNewItems, clearNewItems } = useProcessingContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Слушаем изменения в URL для определения активной вкладки
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (
        hash &&
        [
          "main",
          "archive",
          "notifications",
          "cabinet",
          "partner",
          "feedback",
        ].includes(hash)
      ) {
        setActiveTab(hash);
        if (hash === "archive") {
          clearNewItems();
        }
      }
    };

    // Инициализация при загрузке
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [clearNewItems]);

  // Обновляем URL при изменении вкладки
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    window.location.hash = value;
    if (value === "archive") {
      clearNewItems();
    }
    // Закрываем меню на мобильных устройствах после выбора вкладки
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
  };

  return (
    <div
      className={`w-full bg-[#F6F6F6] ${
        isMobile ? "h-[65px]" : "h-[110px]"
      } relative z-20 border-b border-gray-200 px-4 md:px-8 lg:px-12 xl:px-16`}
    >
      {/* Логотип - разные размеры для мобильной и десктопной версий */}
      <div
        className={`${
          isMobile ? "h-[40px] w-[40px]" : "h-[60px] w-[60px]"
        } absolute ${
          isMobile ? "top-2" : "top-4"
        } left-4 md:top-5 md:left-8 lg:left-12 xl:left-16`}
      >
        <img
          src="/seo-ai-logo.png"
          alt="SEO-AI Logo"
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Мобильное меню */}
      {isMobile ? (
        <div className="absolute top-3 right-4">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] p-0 mt-0 rounded-none"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-end items-center p-4 border-b">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex flex-col p-4 space-y-2">
                  <button
                    className={`text-left py-3 px-4 rounded-md ${
                      activeTab === "main" ? "text-blue-600 bg-blue-50" : ""
                    }`}
                    onClick={() => handleTabChange("main")}
                  >
                    {t("common.main")}
                  </button>
                  <button
                    className={`text-left py-3 px-4 rounded-md relative ${
                      activeTab === "archive" ? "text-blue-600 bg-blue-50" : ""
                    }`}
                    onClick={() => handleTabChange("archive")}
                  >
                    {t("common.archive")}
                    {hasNewItems && activeTab !== "archive" && (
                      <span className="absolute top-3 right-4 bg-blue-600 w-3 h-3 rounded-full"></span>
                    )}
                  </button>
                  <button
                    className={`text-left py-3 px-4 rounded-md ${
                      activeTab === "notifications"
                        ? "text-blue-600 bg-blue-50"
                        : ""
                    }`}
                    onClick={() => handleTabChange("notifications")}
                  >
                    {t("common.notifications")}
                  </button>
                  <button
                    className={`text-left py-3 px-4 rounded-md ${
                      activeTab === "cabinet" ? "text-blue-600 bg-blue-50" : ""
                    }`}
                    onClick={() => handleTabChange("cabinet")}
                  >
                    {t("common.cabinet")}
                  </button>
                  <button
                    className={`text-left py-3 px-4 rounded-md ${
                      activeTab === "partner" ? "text-blue-600 bg-blue-50" : ""
                    }`}
                    onClick={() => handleTabChange("partner")}
                  >
                    {t("common.partner")}
                  </button>
                  <button
                    className={`text-left py-3 px-4 rounded-md ${
                      activeTab === "feedback" ? "text-blue-600 bg-blue-50" : ""
                    }`}
                    onClick={() => handleTabChange("feedback")}
                  >
                    {t("common.feedback")}
                  </button>
                </div>

                <div className="mt-auto p-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Язык:</span>
                    <ToggleGroup
                      type="single"
                      value={language}
                      onValueChange={(value) =>
                        value && setLanguage(value as "kz" | "ru" | "en")
                      }
                      className="border rounded-full p-0.5 bg-gray-200"
                    >
                      <ToggleGroupItem
                        value="kz"
                        aria-label="Казахский"
                        className="text-xs px-1.5 py-0.5 rounded-full data-[state=on]:bg-white h-6 w-8"
                      >
                        Каз
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="ru"
                        aria-label="Русский"
                        className="text-xs px-1.5 py-0.5 rounded-full data-[state=on]:bg-white h-6 w-8"
                      >
                        Рус
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="en"
                        aria-label="Английский"
                        className="text-xs px-1.5 py-0.5 rounded-full data-[state=on]:bg-white h-6 w-8"
                      >
                        Eng
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">Тема:</span>
                    <div className="flex items-center border rounded-full p-0.5 bg-gray-200">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleThemeChange("light")}
                        className={`rounded-full h-6 w-6 ${
                          theme === "dark" ? "opacity-50" : "bg-white"
                        }`}
                      >
                        <Sun className="h-4 w-4" />
                        <span className="sr-only">Light mode</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleThemeChange("dark")}
                        className={`rounded-full h-6 w-6 ${
                          theme === "light" ? "opacity-50" : "bg-gray-800"
                        }`}
                      >
                        <Moon className="h-4 w-4 text-white" />
                        <span className="sr-only">Dark mode</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <>
          {/* Переключатели (языка и темы) - абсолютное позиционирование для десктопа */}
          <div className="absolute top-2 right-[120px] md:right-[140px] lg:right-[160px] xl:right-[180px] flex items-center gap-12 z-30">
            {/* Переключатель языка (уменьшенный) */}
            <ToggleGroup
              type="single"
              value={language}
              onValueChange={(value) =>
                value && setLanguage(value as "kz" | "ru" | "en")
              }
              className="border rounded-full p-0.5 bg-gray-200"
            >
              <ToggleGroupItem
                value="kz"
                aria-label="Казахский"
                className="text-xs px-1.5 py-0.5 rounded-full data-[state=on]:bg-white h-6 w-8"
              >
                Каз
              </ToggleGroupItem>
              <ToggleGroupItem
                value="ru"
                aria-label="Русский"
                className="text-xs px-1.5 py-0.5 rounded-full data-[state=on]:bg-white h-6 w-8"
              >
                Рус
              </ToggleGroupItem>
              <ToggleGroupItem
                value="en"
                aria-label="Английский"
                className="text-xs px-1.5 py-0.5 rounded-full data-[state=on]:bg-white h-6 w-8"
              >
                Eng
              </ToggleGroupItem>
            </ToggleGroup>

            {/* Переключатель темы */}
            <div className="flex items-center border rounded-full p-0.5 bg-gray-200">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleThemeChange("light")}
                className={`rounded-full h-6 w-6 ${
                  theme === "dark" ? "opacity-50" : "bg-white"
                }`}
              >
                <Sun className="h-4 w-4" />
                <span className="sr-only">Light mode</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleThemeChange("dark")}
                className={`rounded-full h-6 w-6 ${
                  theme === "light" ? "opacity-50" : "bg-gray-800"
                }`}
              >
                <Moon className="h-4 w-4 text-white" />
                <span className="sr-only">Dark mode</span>
              </Button>
            </div>
          </div>

          {/* Центр - основные табы, смещенные влево на среднее расстояние - только для десктопа */}
          <div className="hidden md:flex justify-center items-end h-full pl-24 md:pl-[100px] lg:pl-28 xl:pl-[120px]">
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="h-full overflow-x-auto flex items-center"
            >
              <TabsList className="bg-transparent h-auto flex gap-2 md:gap-3 lg:gap-4 mb-0 pb-0">
                <TabsTrigger
                  value="main"
                  className="text-lg font-medium data-[state=active]:text-blue-600 data-[state=active]:bg-transparent border-none shadow-none whitespace-nowrap h-10 mb-0"
                >
                  {t("common.main")}
                </TabsTrigger>
                <TabsTrigger
                  value="archive"
                  className="text-lg font-medium data-[state=active]:text-blue-600 data-[state=active]:bg-transparent border-none shadow-none relative whitespace-nowrap h-10 mb-0"
                >
                  {t("common.archive")}
                  {hasNewItems && activeTab !== "archive" && (
                    <span className="absolute -top-1 right-1 bg-blue-600 w-3 h-3 rounded-full"></span>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="text-lg font-medium data-[state=active]:text-blue-600 data-[state=active]:bg-transparent border-none shadow-none whitespace-nowrap h-10 mb-0"
                >
                  {t("common.notifications")}
                </TabsTrigger>
                <TabsTrigger
                  value="cabinet"
                  className="text-lg font-medium data-[state=active]:text-blue-600 data-[state=active]:bg-transparent border-none shadow-none whitespace-nowrap h-10 mb-0"
                >
                  {t("common.cabinet")}
                </TabsTrigger>
                <TabsTrigger
                  value="partner"
                  className="text-lg font-medium data-[state=active]:text-blue-600 data-[state=active]:bg-transparent border-none shadow-none whitespace-nowrap h-10 mb-0"
                >
                  {t("common.partner")}
                </TabsTrigger>
                <TabsTrigger
                  value="feedback"
                  className="text-lg font-medium data-[state=active]:text-blue-600 data-[state=active]:bg-transparent border-none shadow-none whitespace-nowrap h-10 mb-0"
                >
                  {t("common.feedback")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
}
