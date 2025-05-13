"use client"

import { Info, Maximize2 } from "lucide-react"

interface TopKeywordsProps {
  keywords: { name: string; sku: string }[]
  section: string
  isExpanded: boolean
  onToggle: (section: string) => void
  isMobile: boolean
}

export function TopKeywords({ keywords, section, isExpanded, onToggle, isMobile }: TopKeywordsProps) {
  if (isMobile) {
    return (
      <div className="bg-white rounded-xl shadow-around overflow-hidden">
        <div className="p-4">
          <h3 className="font-medium text-sm mb-3">Ключевые слова ТОП карточек</h3>
          <div className="space-y-3">
            {keywords.slice(0, isExpanded ? undefined : 1).map((keyword, index) => (
              <div key={index} className="flex items-start">
                <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3 overflow-hidden flex-shrink-0">
                  <img
                    src={`/placeholder.svg?height=40&width=40&query=product`}
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-tight">{keyword.name}</p>
                  <p className="text-xs text-blue-600 mt-1">{keyword.sku}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center pb-2">
          <button className="text-gray-400" onClick={() => onToggle(section)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 10L4 6H12L8 10Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-around overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h3 className="font-medium">Ключевые слова ТОП карточек</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToggle(section)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Maximize2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {keywords.slice(0, isExpanded ? undefined : 1).map((keyword, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 flex items-start">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full mr-3 overflow-hidden flex-shrink-0">
                <img
                  src={`/placeholder.svg?height=32&width=32&query=product`}
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{keyword.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SKU: {keyword.sku}</p>
              </div>
              <button className="ml-2 flex-shrink-0">
                <Info className="h-4 w-4 text-blue-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
