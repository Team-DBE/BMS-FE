import { useState } from "react";

export default function useDeviceDetail() {
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const toggleDetailVisibility = () => {
    setIsDetailVisible((prev) => !prev);
  };

  return {
    isDetailVisible,
    setIsDetailVisible,
    toggleDetailVisibility,
  };
}
