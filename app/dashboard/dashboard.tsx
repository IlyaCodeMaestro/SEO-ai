"use client";

import { useState, useEffect } from "react";
import { MainContent } from "@/components/main/main-content";

import { ArchiveView } from "@/components/archive/archive-view";
import { ArchiveItemDetails } from "@/components/archive/archive-item-details";

import { NotificationsView } from "../../components/notification/notifications-view";
import { CabinetView } from "../../components/cabinet/cabinet-view";
import { PartnerView } from "../../components/partner/partner-view";
import { FeedbackView } from "../../components/feedback/feedback-view";
import { useMediaQuery } from "@/hooks/use-media-query";
import { BalanceTopupPanel } from "../../components/cabinet/balance-topup-panel";
import { BalanceHistoryPanel } from "../../components/cabinet/balance-history-panel";
import { BonusExchangePanel } from "../../components/cabinet/bonus-exchange-panel";
import { BonusStatementPanel } from "../../components/cabinet/bonus-statement-panel";
import { ReferralStatementPanel } from "../../components/cabinet/referral-statement-panel";
import { TariffPanel } from "../../components/cabinet/tariff-panel";
import { ActiveDevicesPanel } from "../../components/cabinet/active-devices-panel";
import { DeleteAccountPanel } from "../../components/cabinet/delete-account-panel";
import { ShareMenu } from "../../components/shared/share-menu";
import { PartnerStandardPanel } from "../../components/partner/partner-standard-panel";
import { PartnerPremiumPanel } from "../../components/partner/partner-premium-panel";
import { FeedbackFaqPanel } from "../../components/feedback/feedback-faq-panel";
import { FeedbackRecommendationsPanel } from "../../components/feedback/feedback-recommendations-panel";
import { FeedbackComplaintPanel } from "../../components/feedback/feedback-complaint-panel";
import { FeedbackOtherPanel } from "../../components/feedback/feedback-other-panel";
import { useProcessingContext } from "@/components/main/processing-provider";
import { ProductAnalysisForm } from "@/components/main/product-analysis-form";
import { ProductAnalysisDetails } from "@/components/main/product-analysis-details";
import { ProductAnalysisModal } from "@/components/main/product-analysis-modal";
import { ProductAnalysisResults } from "@/components/main/product-analysis-results";
import { ProductDescriptionForm } from "@/components/main/product-description-form";
import { ProductDescriptionDetails } from "@/components/main/product-description-details";
import { ProductDescriptionModal } from "@/components/main/product-description-modal";
import { ProcessingView } from "@/components/main/processing-view";

type ActivePanel =
  | null
  | "product-analysis"
  | "product-description"
  | "processing"
  | "archive-item"
  | "balance-topup"
  | "balance-history"
  | "bonus-exchange"
  | "bonus-statement"
  | "referral-statement"
  | "tariff"
  | "active-devices"
  | "delete-account"
  | "standard-program"
  | "premium-program"
  | "faq"
  | "recommendations"
  | "complaint"
  | "other";
type AnalysisStep = "form" | "details" | "modal" | "results";
type DescriptionStep = "form" | "details" | "modal" | "processing";

// Глобальные функции для открытия панелей из других компонентов
declare global {
  interface Window {
    openPartnerPanel?: (panel: string) => void;
    openFeedbackPanel?: (panel: string) => void;
    openShareMenu?: (title: string, content: string) => void;
  }
}

export function Dashboard() {
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [analysisStep, setAnalysisStep] = useState<AnalysisStep>("form");
  const [descriptionStep, setDescriptionStep] =
    useState<DescriptionStep>("form");
  const [productData, setProductData] = useState({
    sku: "",
    competitorSku: "",
  });
  const [selectedArchiveItem, setSelectedArchiveItem] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("main");
  const { processingItems, addProcessingItem } = useProcessingContext();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [shareContent, setShareContent] = useState({ title: "", content: "" });

  // Регистрируем глобальные функции для открытия панелей
  useEffect(() => {
    window.openPartnerPanel = (panel: string) => {
      setActivePanel(panel as ActivePanel);
    };

    window.openFeedbackPanel = (panel: string) => {
      setActivePanel(panel as ActivePanel);
    };

    window.openShareMenu = (title: string, content: string) => {
      setShareContent({ title, content });
      setShareMenuOpen(true);
    };

    return () => {
      window.openPartnerPanel = undefined;
      window.openFeedbackPanel = undefined;
      window.openShareMenu = undefined;
    };
  }, []);

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
        // Сбрасываем активную панель при переключении вкладок, кроме архива
        if (hash !== "archive") {
          setActivePanel(null);
          setSelectedArchiveItem(null);
        }
      }
    };

    // Инициализация при загрузке
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Обновляем URL при изменении вкладки
  useEffect(() => {
    if (activeTab) {
      window.location.hash = activeTab;
    }
  }, [activeTab]);

  const handleOpenPanel = (panel: ActivePanel, data?: any) => {
    setActivePanel(panel);
    if (panel === "product-analysis") {
      setAnalysisStep("form");
    } else if (panel === "product-description") {
      setDescriptionStep("form");
    } else if (panel === "archive-item" && data) {
      setSelectedArchiveItem(data);
    }
  };

  const handleClosePanel = () => {
    setActivePanel(null);
    setAnalysisStep("form");
    setDescriptionStep("form");
    setSelectedArchiveItem(null);
  };

  const handleAnalysisFormSubmit = (data: {
    sku: string;
    competitorSku: string;
  }) => {
    setProductData(data);
    setAnalysisStep("details");
  };

  const handleDescriptionFormSubmit = (data: {
    sku: string;
    competitorSku: string;
  }) => {
    setProductData(data);
    setDescriptionStep("details");
  };

  const handleStartAnalysis = () => {
    setAnalysisStep("modal");
  };

  const handleStartDescription = () => {
    setDescriptionStep("modal");
  };

  const handleAnalysisModalContinue = () => {
    // Добавляем элемент в очередь обработки
    // const { addProcessingItem } = useProcessingContext()
    addProcessingItem("analysis", productData);

    // Переходим на страницу обработки
    setActivePanel("processing");
  };

  const handleDescriptionModalContinue = () => {
    // Добавляем элемент в очередь обработки
    // const { addProcessingItem } = useProcessingContext()
    addProcessingItem("description", productData);

    // Переходим на страницу обработки
    setActivePanel("processing");
  };

  const handleBackToAnalysisDetails = () => {
    setAnalysisStep("details");
  };

  const handleBackToDescriptionDetails = () => {
    setDescriptionStep("details");
  };

  const handleBackToAnalysisForm = () => {
    setAnalysisStep("form");
  };

  const handleBackToDescriptionForm = () => {
    setDescriptionStep("form");
  };

  const handleOpenProcessing = () => {
    setActivePanel("processing");
  };

  const handleSelectArchiveItem = (item: any) => {
    setSelectedArchiveItem(item);
    setActivePanel("archive-item");
  };

  const handleCloseShareMenu = () => {
    setShareMenuOpen(false);
  };

  // Определяем, нужен ли серый фон для правого блока
  const isModalActive = false; // Убираем серый фон

  // Определяем, является ли активная панель отзывом
  const isFeedbackPanel =
    activePanel === "faq" ||
    activePanel === "recommendations" ||
    activePanel === "complaint" ||
    activePanel === "other";

  // Рендерим содержимое левого блока в зависимости от активной вкладки
  const renderLeftContent = () => {
    switch (activeTab) {
      case "main":
        return (
          <MainContent
            onOpenPanel={handleOpenPanel}
            onOpenProcessing={handleOpenProcessing}
          />
        );
      case "archive":
        return <ArchiveView onSelectItem={handleSelectArchiveItem} />;
      case "notifications":
        return <NotificationsView />;
      case "cabinet":
        return <CabinetView onOpenPanel={handleOpenPanel} />;
      case "partner":
        return <PartnerView />;
      case "feedback":
        return <FeedbackView />;
      default:
        return (
          <div className="flex flex-col h-full justify-center items-center p-4">
            <h2 className="text-blue-600 font-medium mb-4">{activeTab}</h2>
            <p className="text-gray-500">Содержимое для вкладки {activeTab}</p>
          </div>
        );
    }
  };

  // Рендерим содержимое правого блока в зависимости от активной панели
  const renderRightContent = () => {
    if (activeTab === "main") {
      if (activePanel === "product-analysis") {
        if (analysisStep === "form") {
          return (
            <ProductAnalysisForm
              onClose={handleClosePanel}
              onSubmit={handleAnalysisFormSubmit}
            />
          );
        } else if (analysisStep === "details") {
          return (
            <ProductAnalysisDetails
              onClose={handleClosePanel}
              onBack={handleBackToAnalysisForm}
              onStartAnalysis={handleStartAnalysis}
              productData={productData}
            />
          );
        } else if (analysisStep === "modal") {
          return (
            <ProductAnalysisModal
              onClose={handleClosePanel}
              onBack={handleBackToAnalysisDetails}
              onContinue={handleAnalysisModalContinue}
            />
          );
        } else if (analysisStep === "results") {
          return (
            <ProductAnalysisResults
              onClose={handleClosePanel}
              onBack={handleBackToAnalysisDetails}
              productData={productData}
            />
          );
        }
      } else if (activePanel === "product-description") {
        if (descriptionStep === "form") {
          return (
            <ProductDescriptionForm
              onClose={handleClosePanel}
              onSubmit={handleDescriptionFormSubmit}
            />
          );
        } else if (descriptionStep === "details") {
          return (
            <ProductDescriptionDetails
              onClose={handleClosePanel}
              onBack={handleBackToDescriptionForm}
              onStartDescription={handleStartDescription}
              productData={productData}
            />
          );
        } else if (descriptionStep === "modal") {
          return (
            <ProductDescriptionModal
              onClose={handleClosePanel}
              onBack={handleBackToDescriptionDetails}
              onContinue={handleDescriptionModalContinue}
            />
          );
        }
      } else if (activePanel === "processing") {
        return <ProcessingView onClose={handleClosePanel} />;
      }
    } else if (
      activeTab === "archive" &&
      activePanel === "archive-item" &&
      selectedArchiveItem
    ) {
      return (
        <ArchiveItemDetails
          onClose={handleClosePanel}
          item={selectedArchiveItem}
        />
      );
    } else if (activeTab === "cabinet") {
      if (activePanel === "balance-topup") {
        return <BalanceTopupPanel onClose={handleClosePanel} />;
      } else if (activePanel === "balance-history") {
        return <BalanceHistoryPanel onClose={handleClosePanel} />;
      } else if (activePanel === "bonus-exchange") {
        return <BonusExchangePanel onClose={handleClosePanel} />;
      } else if (activePanel === "bonus-statement") {
        return <BonusStatementPanel onClose={handleClosePanel} />;
      } else if (activePanel === "bonus-statement") {
        return <BonusStatementPanel onClose={handleClosePanel} />;
      } else if (activePanel === "referral-statement") {
        return <ReferralStatementPanel onClose={handleClosePanel} />;
      } else if (activePanel === "tariff") {
        return <TariffPanel onClose={handleClosePanel} />;
      } else if (activePanel === "active-devices") {
        return <ActiveDevicesPanel onClose={handleClosePanel} />;
      } else if (activePanel === "delete-account") {
        return <DeleteAccountPanel onClose={handleClosePanel} />;
      }
    } else if (activeTab === "partner") {
      if (activePanel === "standard-program") {
        return <PartnerStandardPanel onClose={handleClosePanel} />;
      } else if (activePanel === "premium-program") {
        return <PartnerPremiumPanel onClose={handleClosePanel} />;
      }
    } else if (activeTab === "feedback") {
      if (activePanel === "faq") {
        return <FeedbackFaqPanel onClose={handleClosePanel} />;
      } else if (activePanel === "recommendations") {
        return <FeedbackRecommendationsPanel onClose={handleClosePanel} />;
      } else if (activePanel === "complaint") {
        return <FeedbackComplaintPanel onClose={handleClosePanel} />;
      } else if (activePanel === "other") {
        return <FeedbackOtherPanel onClose={handleClosePanel} />;
      }
    }

    return null;
  };

  // Для мобильной версии
  if (isMobile) {
    // Если есть активная панель, показываем только её
    if (activePanel) {
      return (
        <div className="flex flex-1 justify-center w-full min-h-[calc(100vh-65px)]">
          <div className="w-full bg-white rounded-none">
            {renderRightContent()}
          </div>
          {shareMenuOpen && (
            <ShareMenu
              title={shareContent.title}
              content={shareContent.content}
              onClose={handleCloseShareMenu}
            />
          )}
        </div>
      );
    }

    // Иначе показываем только левый блок
    return (
      <div className="flex flex-1 justify-center w-full min-h-[calc(100vh-65px)] ">
        <div className="w-full bg-[#F6F6F6] rounded-none ">
          {renderLeftContent()}
        </div>
        {shareMenuOpen && (
          <ShareMenu
            title={shareContent.title}
            content={shareContent.content}
            onClose={handleCloseShareMenu}
          />
        )}
      </div>
    );
  }

  // Для десктопной версии - оригинальный макет с общим скроллом
  return (
    <div className="flex flex-1 w-full max-w-[1380px] mx-auto px-2 md:px-4 lg:px-6 xl:px-8 min-h-[calc(100vh-110px)] h-full">
      {/* Левая панель - всегда видима */}

      <div className="w-[450px] bg-[#f9f8f8] rounded-[25px] mt-[30px] z-10 shadow-around">
        {renderLeftContent()}
      </div>
      {/* Правая панель - по умолчанию пустая */}
      <div className="flex-1 max-w-[1000px] relative ml-6 md:ml-8 lg:ml-10 xl:ml-12">
        <div
          className={`w-full bg-white rounded-[25px] mt-[30px] ${
            isFeedbackPanel ? "max-w-[1100px]" : ""
          }`}
        >
          {renderRightContent()}
        </div>
      </div>

      {shareMenuOpen && (
        <ShareMenu
          title={shareContent.title}
          content={shareContent.content}
          onClose={handleCloseShareMenu}
        />
      )}
    </div>
  );
}
