import type { DeviceHistoryPoint } from "../types/deviceHistory";

export const fetchDeviceHistory = async (
  serialNumber: string,
): Promise<DeviceHistoryPoint[]> => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(
    `${baseUrl}/histories/all/${encodeURIComponent(serialNumber)}`,
  );

  if (!response.ok) {
    throw new Error(String(response.status));
  }

  const data: DeviceHistoryPoint[] = await response.json();
  return Array.isArray(data) ? data : [];
};
