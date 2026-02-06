import { useState } from "react";
import { getAll, toggleItem } from "../utils/deleteModeUtils";

export default function useDeleteMode() {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleDeleteMode = (allIds: string[]) => {
    if (!isDeleteMode) {
      setIsDeleteMode((prev) => !prev);
      setSelectedItems([]);
    } else {
      setSelectedItems(getAll(selectedItems, allIds));
    }
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems((prev) => {
      return toggleItem(prev, id);
    });
  };

  return {
    isDeleteMode,
    setIsDeleteMode,
    selectedItems,
    setSelectedItems,
    toggleDeleteMode,
    toggleItemSelection,
  };
}
