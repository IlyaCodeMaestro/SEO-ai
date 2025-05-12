"use client";

import { useState } from "react";
import EmptyPartnerPanel from "./empty-panel";

interface PartnerCardProps {
  title: string;
  gradient: string;
  onNavigate: () => void;
}

function PartnerCard({ title, gradient, onNavigate }: PartnerCardProps) {
  return (
    <div
      className={`${gradient} rounded-[20px] p-6 text-white border shadow-custom mb-4`}
    >
      <p className="text-xl font-medium mb-4">{title}</p>
      <button
        onClick={onNavigate}
        className="bg-white text-black rounded-full px-6 py-2 border border-white text-sm font-light hover:bg-gray-100 transition-colors"
      >
        Перейти
      </button>
    </div>
  );
}

export function PartnerView() {
  const [shareContent, setShareContent] = useState<{
    content: string;
    title: string;
  } | null>(null);

  const handleOpenStandardProgram = () => {
    if (window.openPartnerPanel) {
      window.openPartnerPanel("standard-program");
    }
  };

  const handleOpenPremiumProgram = () => {
    if (window.openPartnerPanel) {
      window.openPartnerPanel("premium-program");
    }
  };
 const handleOpenEmptyPanel = () => {
    if (window.openPartnerPanel) {
      window.openPartnerPanel("empty-panel");
    }
  };
  const handleShare = () => {
    setShareContent({
      content:
        "Присоединяйтесь к партнерской программе SEO-AI и получайте бонусы!",
      title: "Партнерская программа SEO-AI",
    });
  };

  const handleCloseShareMenu = () => {
    setShareContent(null);
  };
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleOpenPanel = () => {
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <div className="h-full flex flex-col p-6 items-center relative overflow-hidden">
      <h1 className="text-lg sm:text-xl font-medium text-blue-600 mb-6 ml-4">
        Реферальная программа
      </h1>

      <PartnerCard
        title="Приглашайте друзей и получайте 30% от их оплаты бонусом"
        gradient="bg-gradient-to-r border from-[#64cada] to-[#4169E1]"
        onNavigate={handleOpenStandardProgram}
      />

      <PartnerCard
        title="Приглашайте 50+ друзей в течении 30 дней и получайте 30% от их оплаты на свой счет"
        gradient="bg-gradient-to-r border from-[#0d52ff] to-[rgba(11,60,187,1)]"
        onNavigate={handleOpenPremiumProgram}
      />

      <div className="mt-12 mb-4 flex justify-center">
        <button
          onClick={handleOpenEmptyPanel}
          className="bg-gradient-to-r h-[60px] w-80 rounded-[25px] shadow-custom from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white text-white text-2xl md:text-xl"
        >
          Поделиться
        </button>
      </div>
    </div>
  );
}
