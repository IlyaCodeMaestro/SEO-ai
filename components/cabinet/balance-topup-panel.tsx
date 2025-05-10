"use client";

import { useState } from "react";
import { ArrowLeft,  X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMediaQuery } from "@/hooks/use-media-query";

interface BalanceTopupPanelProps {
  onClose: () => void;
}

export function BalanceTopupPanel({ onClose }: BalanceTopupPanelProps) {
  const [amount, setAmount] = useState("");
  const [paymentSystem, setPaymentSystem] = useState("AIRBA pay");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleTopup = () => {
    // This is a placeholder function that doesn't do anything yet
    console.log("Top up button clicked");
  };

  return (
    <div className="h-full flex flex-col bg-white px-4 py-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
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

      {/* Main content */}
      <div className="flex flex-col gap-6 w-full md:max-w-md md:mx-auto">
        {/* Top up balance button */}
        <button className="w-full border border-white bg-blue-600 text-white py-5 rounded-[25px] text-xl font-medium shadow-md">
          Пополнить баланс
        </button>

        {/* Payment system section */}
        <div className="space-y-2">
          <label className="text-xl font-medium">Платежная система</label>
          <div className="relative">
            <Select value={paymentSystem} onValueChange={setPaymentSystem}>
              <SelectTrigger className="w-full border border-gray-300 rounded-[25px] py-8 px-6 text-left flex justify-between items-center">
                <SelectValue placeholder="AIRBA pay" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AIRBA pay">AIRBA pay</SelectItem>
                <SelectItem value="Kaspi">Kaspi</SelectItem>
                <SelectItem value="Halyk Bank">Halyk Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Amount section */}
        <div className="space-y-2">
          <label className="text-xl font-medium">Сумма пополнения</label>
          <div className="relative border border-gray-300 rounded-[25px] py-2 px-6 flex items-center">
            <div className="mr-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32" rx="4" fill="#4285F4" />
                <rect
                  x="10"
                  y="10"
                  width="16"
                  height="12"
                  rx="2"
                  fill="white"
                  fillOpacity="0.9"
                />
                <rect
                  x="6"
                  y="8"
                  width="12"
                  height="16"
                  rx="2"
                  fill="#4285F4"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <Input
              placeholder="1000₸"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-lg"
            />
          </div>
        </div>

        {/* Top up button */}
        <div className="flex justify-center mt-6 ">
          <Button
            onClick={handleTopup}
            className="bg-blue-600 hover:bg-blue-700 border border-white text-white rounded-[25px] py-6 px-12 text-lg font-medium w-44 h-12 shadow-custom"
          >
            Пополнить
          </Button>
        </div>
      </div>
    </div>
  );
}
