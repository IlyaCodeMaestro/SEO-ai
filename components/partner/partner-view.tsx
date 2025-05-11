"use client";


interface PartnerCardProps {
  title: string;
  gradient: string;
  onNavigate: () => void;
}

function PartnerCard({ title, gradient, onNavigate }: PartnerCardProps) {
  return (
    <div className={`${gradient} rounded-[20px] p-6 text-white border shadow-custom mb-4`}>
      <p className="text-xl font-medium mb-4 ">{title}</p>
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

  const handleOpenStandardProgram = () => {
    // Открываем стандартную программу и передаем информацию в Dashboard
    if (window.openPartnerPanel) {
      window.openPartnerPanel("standard-program");
    }
  };

  const handleOpenPremiumProgram = () => {
    // Открываем премиум программу и передаем информацию в Dashboard
    if (window.openPartnerPanel) {
      window.openPartnerPanel("premium-program");
    }
  };

  const handleShare = () => {
    // Открываем модальное окно для шеринга
    if (window.openShareMenu) {
      window.openShareMenu(
        "Партнерская программа SEO-AI",
        "Присоединяйтесь к партнерской программе SEO-AI и получайте бонусы!"
      );
    }
  };
  return (
    <div className="h-full flex flex-col p-6">
      <h1 className="text-xl font-medium text-blue-600 mb-6 ml-16">
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

      <div className="mt-auto flex justify-center">
        <button
          onClick={handleShare}
          className="bg-gradient-to-r h-[60px] w-80 rounded-[25px] shadow-custom from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white text-white  text-2xl md:text-xl"
        >
          Поделиться
        </button>
      </div>
    </div>
  );
}
