"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Info, X } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

// Типы для транзакций
interface Transaction {
  id: number;
  source: string;
  amount: number;
  time: string;
}

interface TransactionGroup {
  date: string;
  items: Transaction[];
}

interface BalanceHistoryPanelProps {
  onClose: () => void;
}

export function BonusStatementPanel({ onClose }: BalanceHistoryPanelProps) {
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
          items: [{ id: 1, source: "дддд", amount: 30, time: "19:32" }],
        },
        {
          date: "07 мая 2024",
          items: [
            { id: 2, source: "Admin", amount: 1001, time: "23:58" },
            { id: 3, source: "Admin", amount: 999, time: "23:57" },
          ],
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="h-full flex flex-col bg-white px-4 max-w-2xl mx-auto">
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
          Выписка по бонусам
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
              <p className="text-xl font-bold">Выписка по бонусам пуста</p>
            </div>
          )}

          {!loading &&
            transactions &&
            transactions.map((group) => (
              <div key={group.date} className="mb-6 last:mb-0">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {group.date}
                </h3>

                {group.items.map((transaction) => (
                  <div key={transaction.id} className="mb-3 last:mb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">
                          Бонус от {transaction.source}
                        </p>
                        <p className="text-xs text-gray-500">
                          {transaction.time}
                        </p>
                      </div>
                      <span className="font-medium text-green-600">
                        +{transaction.amount} Баллов
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
