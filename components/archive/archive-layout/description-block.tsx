"use client"

import { Copy, Maximize2, Share2 } from "lucide-react"

interface DescriptionBlockProps {
  title: string
  description: string
  section: string
  isExpanded: boolean
  onToggle: (section: string) => void
  onCopy: (content: string, section: string) => void
  onShare: () => void
  copiedSection: string | null
  fullWidth?: boolean
  isMobile: boolean
}

export function DescriptionBlock({
  title,
  description,
  section,
  isExpanded,
  onToggle,
  onCopy,
  onShare,
  copiedSection,
  fullWidth = false,
  isMobile,
}: DescriptionBlockProps) {
  if (isMobile) {
    return (
      <div className="bg-white rounded-xl shadow-around overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-blue-100 rounded mr-2 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 7H12M7 2V12" stroke="#1950DF" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-medium text-sm">{title}</h3>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600" onClick={onShare}>
                <Share2 className="h-4 w-4" />
              </button>
              <button className="text-blue-600" onClick={() => onCopy(description, section)}>
                <Copy className={`h-4 w-4 ${copiedSection === section ? "text-green-500" : ""}`} />
              </button>
            </div>
          </div>

          <p className="text-sm leading-relaxed line-clamp-3">{description}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-around overflow-hidden ${fullWidth ? "col-span-2" : ""}`}
    >
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h3 className="font-medium">{title}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onCopy(description, section)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Copy description"
          >
            <Copy className={`h-5 w-5 ${copiedSection === section ? "text-green-500" : "text-blue-500"}`} />
          </button>
          <button
            onClick={onShare}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Share description"
          >
            <Share2 className="h-5 w-5 text-blue-500" />
          </button>
          <button
            onClick={() => onToggle(section)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Maximize2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className={`text-sm leading-relaxed ${isExpanded ? "" : "line-clamp-3"}`}>{description}</p>
      </div>
    </div>
  )
}
