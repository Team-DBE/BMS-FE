import { useState, useMemo, useEffect } from "react";
import type { Device } from "../types/device";
import useDeviceStomp from "./useDeviceStomp";

export default function useDeviceData(sessionId?: string) {
  const severUrl = import.meta.env.VITE_API_BASE_URL;
  const { isConnected, deviceData, subscribeDevice, unsubscribeDevice } =
    useDeviceStomp(`${severUrl}/ws-stomp`);

  // 현재 경로의 세션 아이디(예: /section-1 -> sessionId: "1") 기준으로 저장 키 생성
  // sessionId가 없으면 "default" 세션으로 취급
  const effectiveSessionId = sessionId ?? "default";
  const deviceIdsStorageKey = `deviceIds_${effectiveSessionId}`;
  const deviceNamesStorageKey = `deviceNames_${effectiveSessionId}`;

  const [devices, setDevices] = useState<Device[]>([]);

  // 세션이 바뀌면 해당 세션에 등록된 디바이스 ID만 불러와서 상태 구성
  useEffect(() => {
    const storedIds: string[] = JSON.parse(
      localStorage.getItem(deviceIdsStorageKey) || "[]",
    );
    const savedNames: Record<string, string> = JSON.parse(
      localStorage.getItem(deviceNamesStorageKey) || "{}",
    );

    const initialDevices: Device[] = storedIds.map((id, index) => ({
      id,
      name: savedNames[id] || `기기 ${index + 1}`,
      temperature: 0,
      warning: false,
      hasShownWarning: false,
    }));

    setDevices(initialDevices);
  }, [deviceIdsStorageKey, deviceNamesStorageKey]);

  useEffect(() => {
    if (!isConnected) return;
    devices.forEach((device) => {
      subscribeDevice(device.id);
      console.log(`소켓 구독 ${device.id}`);
    });
  }, [devices, subscribeDevice, isConnected]);

  const liveDevices = useMemo(() => {
    return devices.map((device) => {
      const data = deviceData[device.id] as {
        temperature: number;
        risk: number;
      };
      const currentTemp = data ? data.temperature : 0;

      return {
        ...device,
        temperature: currentTemp,
        warning: data?.risk >= 75,
        showModal: data?.risk >= 75 && !device.hasShownWarning,
      };
    });
  }, [deviceData, devices]);

  const warningDevice = liveDevices.find((device) => device.warning);

  const addDevice = (id: string) => {
    const savedNames: Record<string, string> = JSON.parse(
      localStorage.getItem(deviceNamesStorageKey) || "{}",
    );

    setDevices((prev) => {
      if (prev.some((device) => device.id === id)) {
        return prev;
      }

      const deviceName = savedNames[id] || `기기 ${prev.length + 1}`;

      const newDevice: Device = {
        id: id,
        name: deviceName,
        temperature: 0,
        warning: false,
        hasShownWarning: false,
      };

      const newDevices = [...prev, newDevice];
      const newIds = newDevices.map((device) => device.id);
      localStorage.setItem(deviceIdsStorageKey, JSON.stringify(newIds));

      return newDevices;
    });
  };

  const deleteDevice = (id: string) => {
    setDevices((prev) => {
      const filtered = prev.filter((device) => device.id !== id);
      const ids = filtered.map((device) => device.id);
      localStorage.setItem(deviceIdsStorageKey, JSON.stringify(ids));
      return filtered;
    });
    unsubscribeDevice(id);
    console.log(`소켓 구독 해제 ${id}`);
  };

  const checkWarning = (id: string) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === id ? { ...device, hasShownWarning: true } : device,
      ),
    );
  };

  const updateDeviceName = (id: string, newName: string) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === id ? { ...device, name: newName } : device,
      ),
    );
    localStorage.setItem(
      deviceNamesStorageKey,
      JSON.stringify({
        ...JSON.parse(localStorage.getItem(deviceNamesStorageKey) || "{}"),
        [id]: newName,
      }),
    );
  };

  const warningDevices = useMemo(() => {
    const warningDevices = liveDevices.filter((device) => device.warning);
    const normalDevices = liveDevices.filter((device) => !device.warning);
    return [...warningDevices, ...normalDevices];
  }, [liveDevices]);

  return {
    devices: liveDevices,
    warningDevice,
    addDevice,
    checkWarning,
    deleteDevice,
    updateDeviceName,
    warningDevices,
  };
}
