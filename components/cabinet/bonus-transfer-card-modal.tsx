"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface BonusTransferCardModalProps {
  onSubmit: () => void;
  onClose: () => void;
}

export function BonusTransferCardModal({
  onSubmit,
  onClose,
}: BonusTransferCardModalProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    let formattedValue = "";

    for (let i = 0; i < value.length && i < 16; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += " ";
      }
      formattedValue += value[i];
    }

    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    let formattedValue = "";

    if (value.length > 0) {
      formattedValue = value.substring(0, Math.min(2, value.length));
      if (value.length > 2) {
        formattedValue += "/" + value.substring(2, Math.min(4, value.length));
      }
    }

    setExpiryDate(formattedValue);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCvv(value.substring(0, 3));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="absolute pb-48 inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
      <div className="bg-white rounded-xl p-6 max-w-xs w-full mx-4 relative">
        {/* Добавляем кнопку закрытия (крестик) в правом верхнем углу */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Удаляем секцию с бонусами */}

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Номер карты
            </label>
            <Input
              id="cardNumber"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="XXXX XXXX XXXX XXXX"
              className="rounded-full border-gray-300"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="expiryDate"
                className="block text-sm font-medium text-gray-700"
              >
                Срок действия
              </label>
              <Input
                id="expiryDate"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                placeholder="XX/XX"
                className="rounded-full border-gray-300"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-gray-700"
              >
                CVV
              </label>
              <Input
                id="cvv"
                value={cvv}
                onChange={handleCvvChange}
                placeholder="XXX"
                className="rounded-full border-gray-300"
                required
              />
            </div>
          </div>

          {/* Информация о платеже */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">К оплате</span>
              <span className="font-medium">$50</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Комиссия платформы</span>
              <span className="font-medium">$4</span>
            </div>
            <div className="flex justify-between text-sm font-medium pt-1">
              <span className="text-gray-800">Итого к оплате</span>
              <span>$54</span>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-36  bg-gradient-to-r shadow-md from-[#0d52ff] to-[rgba(11,60,187,1)] border border-white  text-white rounded-full mt-4"
            >
              Добавить карту
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
