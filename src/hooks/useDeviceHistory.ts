import { useQuery } from "@tanstack/react-query";
import { fetchDeviceHistory } from "../apis/deviceHistory";
import type { DeviceHistoryPoint } from "../types/deviceHistory";

export default function useDeviceHistory(serialNumber?: string) {
  const enabled = Boolean(serialNumber);

  return useQuery<DeviceHistoryPoint[], Error>({
    queryKey: ["deviceHistory", serialNumber],
    enabled,
    queryFn: () => {
      if (!serialNumber) return Promise.resolve([]);
      return fetchDeviceHistory(serialNumber);
    },
  });
}
