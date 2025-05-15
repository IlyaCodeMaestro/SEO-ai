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
  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div
        className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto z-50 m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 flex items-center justify-between p-4 border-b">
        
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
