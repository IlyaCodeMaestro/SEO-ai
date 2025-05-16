"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import {
  useGetProcessListQuery,
  useGetArchiveQuery,
} from "@/store/services/main";

// Определяем тип элемента истории обработки
export type ProcessingHistoryItem = {
  id: string;
  sku: string;
  competitorSku: string;
  type: "analysis" | "description";
  status: "processing" | "completed";
  timestamp: number;
  name: string;
  cardId?: number;
  cardData?: any; // Store the complete card data
};

type ProcessingContextType = {
  processingItems: ProcessingHistoryItem[];
  hasNewItems: boolean;
  addProcessingItem: (
    type: "analysis" | "description",
    data: {
      sku: string;
      competitorSku: string;
      cardId?: number;
      cardData?: any;
    }
  ) => void;
  clearNewItems: () => void;
  processedCardIds: number[];
  clearProcessedCardIds: () => void;
};

const ProcessingContext = createContext<ProcessingContextType | undefined>(
  undefined
);

export function ProcessingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [processingItems, setProcessingItems] = useState<
    ProcessingHistoryItem[]
  >([]);
  const [hasNewItems, setHasNewItems] = useState(false);
  const [processedCardIds, setProcessedCardIds] = useState<number[]>([]);

  // Use RTK Query hooks for polling
  const { data: processData, refetch: refetchProcessList } =
    useGetProcessListQuery(undefined, {
      pollingInterval: 5000, // Poll every 5 seconds
    });

  const { data: archiveData, refetch: refetchArchive } = useGetArchiveQuery(1, {
    pollingInterval: 5000, // Poll every 5 seconds
  });

  // Store a ref to the current processing items for use in the polling effect
  const processingItemsRef = useRef(processingItems);
  useEffect(() => {
    processingItemsRef.current = processingItems;
  }, [processingItems]);

  // Clear localStorage on initial load to start with an empty archive
  useEffect(() => {
    localStorage.removeItem("processedCardIds");
    setProcessedCardIds([]);
  }, []);

  // Check if any processing items have been completed based on API status
  useEffect(() => {
    if (!archiveData || processingItems.length === 0) return;

    // Check all card dates in archive
    const currentProcessingItems = [...processingItemsRef.current];
    let updatedProcessingItems = [...currentProcessingItems];
    const newProcessedCardIds = [...processedCardIds];
    let hasChanges = false;

    // Go through each card in the archive
    archiveData.card_dates.forEach((dateGroup) => {
      dateGroup.cards.forEach((card) => {
        // Find matching processing item
        const processingItem = currentProcessingItems.find(
          (item) => item.cardId === card.id
        );

        if (processingItem) {
          // Check if card is completed (status 3 = "завершен успешно")
          if (card.status_id === 3 || card.status === "выполнен") {
            console.log(
              `Card ID ${card.id} has been processed and is now in the archive`
            );

            // Remove from processing items
            updatedProcessingItems = updatedProcessingItems.filter(
              (procItem) => procItem.id !== processingItem.id
            );

            // Add to processed card IDs if not already there
            if (!newProcessedCardIds.includes(card.id)) {
              newProcessedCardIds.push(card.id);
              hasChanges = true;
            }
          }
        }
      });
    });

    // Update state if changes were made
    if (updatedProcessingItems.length !== currentProcessingItems.length) {
      setProcessingItems(updatedProcessingItems);
      setHasNewItems(true);
    }

    if (hasChanges) {
      setProcessedCardIds(newProcessedCardIds);
      localStorage.setItem(
        "processedCardIds",
        JSON.stringify(newProcessedCardIds)
      );
    }
  }, [archiveData, processedCardIds]);

  const addProcessingItem = async (
    type: "analysis" | "description",
    data: {
      sku: string;
      competitorSku: string;
      cardId?: number;
      cardData?: any;
    }
  ) => {
    // Generate a unique ID for this processing item
    const uniqueId = `${Date.now()}-${type}-${data.sku}`;

    // Create a new item with data from API
    const newItem: ProcessingHistoryItem = {
      id: uniqueId,
      sku: data.sku,
      competitorSku: data.competitorSku,
      type,
      status: "processing", // Status 2 = "в обработке"
      timestamp: Date.now(),
      name: data.cardData?.name || "",
      cardId: data.cardId,
      cardData: data.cardData,
    };

    // Add the new item to the processing list
    setProcessingItems((prev) => [...prev, newItem]);

    // Immediately trigger a refetch of the process list and archive
    refetchProcessList();
    refetchArchive();
  };

  const clearNewItems = () => {
    setHasNewItems(false);
  };

  const clearProcessedCardIds = () => {
    setProcessedCardIds([]);
    localStorage.removeItem("processedCardIds");
  };

  return (
    <ProcessingContext.Provider
      value={{
        processingItems,
        hasNewItems,
        addProcessingItem,
        clearNewItems,
        processedCardIds,
        clearProcessedCardIds,
      }}
    >
      {children}
    </ProcessingContext.Provider>
  );
}

export function useProcessingContext() {
  const context = useContext(ProcessingContext);
  if (context === undefined) {
    throw new Error(
      "useProcessingContext must be used within a ProcessingProvider"
    );
  }
  return context;
}
