"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Info, X } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

// Типы для транзакций
interface Transaction {
  id: number;
  type: "payment" | "topup";
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

export function BalanceHistoryPanel({ onClose }: BalanceHistoryPanelProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [transactions, setTransactions] = useState<TransactionGroup[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // Имитация загрузки данных с API
  useEffect(() => {
    // Здесь будет запрос к API
    // Для демонстрации оставим пустым или раскомментируем для показа данных

    // Раскомментируйте эту часть для демонстрации данных
    setTimeout(() => {
      setTransactions([
        {
          date: "17 Июня",
          items: [
            { id: 1, type: "payment", amount: -500, time: "13:55" },
            { id: 2, type: "topup", amount: 1500, time: "13:55" },
          ],
        },
        {
          date: "15 Июня",
          items: [{ id: 3, type: "payment", amount: -1500, time: "13:55" }],
        },
        {
          date: "10 Июня",
          items: [
            { id: 4, type: "payment", amount: -2000, time: "10:30" },
            { id: 5, type: "topup", amount: 3000, time: "09:15" },
          ],
        },
        {
          date: "5 Июня",
          items: [
            { id: 6, type: "payment", amount: -750, time: "14:20" },
            { id: 7, type: "payment", amount: -1200, time: "16:45" },
          ],
        },
      ]);
      setLoading(false);
    }, 1000);

    // Оставляем пустым для демонстрации пустого состояния
    // setLoading(false);
  }, []);

  return (
    <div className="h-full flex flex-col bg-white px-4  max-w-2xl mx-auto">
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
        <button className="w-full border border-white bg-blue-600 text-white py-5 rounded-[25px] text-xl font-medium shadow-md">
          Выписка по балансу
        </button>

        {/* Содержимое выписки - пустое или с транзакциями */}
        <div className="bg-gray-50 rounded-[25px] p-6 border shadow-md min-h-[500px] flex flex-col justify-center">
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
              <p className="text-xl font-bold">Выписка по балансу пуста</p>
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
                          {transaction.type === "payment"
                            ? "Платеж"
                            : "Пополнение"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {transaction.time}
                        </p>
                      </div>
                      <span
                        className={`font-medium ${
                          transaction.amount < 0
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {transaction.amount} тг.
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
