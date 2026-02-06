import { useState } from "react";

export default function useDeviceAddMode() {
  const [isAddMode, setIsAddMode] = useState(false);
  const [inputText, setInputText] = useState("");

  const toggleAddMode = () => {
    setIsAddMode((prev) => !prev);
  };

  return {
    isAddMode,
    setIsAddMode,
    toggleAddMode,
    inputText,
    setInputText,
  };
}
