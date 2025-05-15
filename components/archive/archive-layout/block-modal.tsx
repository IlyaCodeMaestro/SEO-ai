"use client";

import type React from "react";

import { X } from "lucide-react";
import { useEffect } from "react";

interface ArchiveItemDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export function ArchiveItemDetailsModal({
  isOpen,
  onClose,
  children,
  title,
}: ArchiveItemDetailsModalProps) {
  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center rounded-3xl">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div
        className="bg-white dark:bg-gray-900 rounded-3xl w-[90%] max-w-3xl h-[80%] flex flex-col z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="top-0 bg-white dark:bg-gray-900 z-10 border-b p-4 relative flex items-center justify-center rounded-3xl">
          <h2 className="text-lg font-medium absolute left-1/2 transform -translate-x-1/2">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="ml-auto p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
