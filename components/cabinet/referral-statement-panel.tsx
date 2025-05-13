"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Info, X } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

// Update the interface to include phone numbers and referral status
interface Transaction {
  id: number;
  source: string;
  phone: string;
  isActive: boolean;
  time?: string;
}

interface TransactionGroup {
  date: string;
  items: Transaction[];
}

interface BalanceHistoryPanelProps {
  onClose: () => void;
}

// Update the component to match the screenshot
export function ReferralStatementPanel({ onClose }: BalanceHistoryPanelProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [transactions, setTransactions] = useState<TransactionGroup[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTransactions([
        {
          date: "18 сентября 2024",
          items: [
            { id: 1, source: "дддд", phone: "+7*********4", isActive: true },
            { id: 2, source: "гггг", phone: "+7*********3", isActive: false },
          ],
        },
        {
          date: "11 сентября 2024",
          items: [
            { id: 3, source: "аааа", phone: "+7*********7", isActive: false },
          ],
        },
        {
          date: "03 сентября 2024",
          items: [
            { id: 4, source: "бум", phone: "+7*********0", isActive: false },
          ],
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="h-full flex flex-col bg-white px-4 py-6 max-w-2xl mx-auto">
      {/* Заголовок с кнопкой закрытия */}
      <div className="flex items-center mb-3">
        {isMobile ? (
          <>
            <button onClick={onClose} className="p-1" aria-label="Back">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-medium text-center flex-1 pr-4 text-blue-600">
              Личный кабинет
            </h1>
          </>
        ) : (
          <div className="w-full flex justify-end">
            <button onClick={onClose} className="p-1" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Основное содержимое */}
      <div className="flex flex-col gap-6 w-full md:max-w-md md:mx-auto">
        {/* Заголовок выписки */}
        <button className="w-full border border-white bg-[#4169e1] text-white py-5 rounded-[25px] text-xl font-medium shadow-md">
          Выписка по рефералам
        </button>

        {/* Содержимое выписки - пустое или с транзакциями */}
        <div className="bg-gray-50 rounded-[25px] p-6 border shadow-sm min-h-[500px] flex flex-col">
          {loading && (
            <div className="flex items-center justify-center h-full">
              <p>Загрузка...</p>
            </div>
          )}

          {!loading && !transactions && (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="bg-gray-500 rounded-full p-3 mb-4">
                <Info className="h-6 w-6 text-white" />
              </div>
              <p className="text-xl font-bold">Выписка по рефералам пуста</p>
            </div>
          )}

          {!loading &&
            transactions &&
            transactions.map((group, groupIndex) => (
              <div key={group.date} className="mb-6 last:mb-0">
                <h3 className="text-base font-medium text-gray-700 mb-4">
                  {group.date}
                </h3>

                {group.items.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="mb-5 last:mb-0 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <p
                        className={
                          transaction.isActive ? "font-bold" : "font-normal"
                        }
                      >
                        {transaction.source}
                      </p>
                    </div>
                    <span className="text-gray-500">{transaction.phone}</span>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
