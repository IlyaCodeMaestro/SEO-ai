"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

// Define country data with codes and flags
const countries = [
  { code: "RU", dialCode: "+7", flag: "🇷🇺", name: "Россия" },
  { code: "US", dialCode: "+1", flag: "🇺🇸", name: "США" },
  { code: "GB", dialCode: "+44", flag: "🇬🇧", name: "Великобритания" },
  { code: "DE", dialCode: "+49", flag: "🇩🇪", name: "Германия" },
  { code: "FR", dialCode: "+33", flag: "🇫🇷", name: "Франция" },
  { code: "IT", dialCode: "+39", flag: "🇮🇹", name: "Италия" },
  { code: "ES", dialCode: "+34", flag: "🇪🇸", name: "Испания" },
  { code: "CN", dialCode: "+86", flag: "🇨🇳", name: "Китай" },
  { code: "JP", dialCode: "+81", flag: "🇯🇵", name: "Япония" },
  { code: "KZ", dialCode: "+7", flag: "🇰🇿", name: "Казахстан" },
]

interface PhoneInputProps {
  value: string
  onChange: (value: string, countryCode: string) => void
  required?: boolean
}

export default function PhoneInput({ value, onChange, required = false }: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [isOpen, setIsOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState(value.replace(/^\+\d+\s/, ""))

  const handleCountryChange = (country: (typeof countries)[0]) => {
    setSelectedCountry(country)
    setIsOpen(false)
    onChange(`${country.dialCode} ${phoneNumber}`, country.code)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value.replace(/[^\d]/g, "")
    setPhoneNumber(newPhone)
    onChange(`${selectedCountry.dialCode} ${newPhone}`, selectedCountry.code)
  }

  return (
    <div className="relative flex w-full rounded-full border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
      <div className="relative">
        <button
          type="button"
          className="flex items-center h-12 px-3 text-gray-700 bg-gray-50 rounded-l-full border-r border-gray-200 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="mr-1">{selectedCountry.flag}</span>
          <span className="mr-1">{selectedCountry.dialCode}</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-60 max-h-60 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg">
            {countries.map((country) => (
              <button
                key={country.code}
                type="button"
                className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => handleCountryChange(country)}
              >
                <span className="mr-2">{country.flag}</span>
                <span className="mr-2">{country.dialCode}</span>
                <span>{country.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        placeholder="Номер телефона"
        required={required}
        className="flex-1 h-12 pl-4 pr-12 rounded-r-full focus:outline-none"
      />
      <div className="absolute left-[72px] top-1/2 transform -translate-y-1/2 pointer-events-none">
        {/* This is just a spacer to ensure proper alignment */}
      </div>
    </div>
  )
}
