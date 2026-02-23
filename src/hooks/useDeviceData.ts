import { useState, useMemo } from "react";
import type { Device } from "../types/device";

export default function useDeviceData() {
  const [devices, setDevices] = useState<Device[]>(() => {
    const savedNames = JSON.parse(localStorage.getItem("deviceNames") || "{}");
    // if (savedNames) {
    //   return JSON.parse(savedNames);
    // }
    // return [];

    // 더미데이터 생성
    return Array.from({ length: 5 }, (_, i) => {
      const id = `device-${i + 1}`;
      const temp = Math.floor(Math.random() * 100);
      return {
        id,
        name: savedNames[id] || `기기 ${i + 1}`,
        temperature: temp,
        warning: temp > 70, // 70도 넘으면 경고
      };
    });
  });

  const warningDevice = devices.find((device) => device.warning);

  const addDevice = (name: string) => {
    const temp = Math.floor(Math.random() * 100);
    const newDevice: Device = {
      id: `device-${Date.now()}`,
      name,
      temperature: temp,
      warning: temp > 70,
    };

    setDevices((prev) => [...prev, newDevice]);
  };

  const deleteDevice = (id: string) => {
    setDevices((prev) => prev.filter((device) => device.id !== id));
  };

  const checkWarning = (id: string) => {
    setDevices((prev) => prev.map((device) => (device.id === id ? { ...device, warning: false } : device)));
  };

  const updateDeviceName = (id: string, newName: string) => {
    setDevices((prev) => prev.map((device) => (device.id === id ? { ...device, name: newName } : device)));
    localStorage.setItem(
      "deviceNames",
      JSON.stringify({ ...JSON.parse(localStorage.getItem("deviceNames") || "{}"), [id]: newName }),
    );
  };

  const warningDevices = useMemo(() => {
    const warningDevices = devices.filter((device) => device.temperature > 70);
    const normalDevices = devices.filter((device) => device.temperature <= 70);
    return [...warningDevices, ...normalDevices];
  }, [devices]);

  return {
    devices,
    warningDevice,
    addDevice,
    checkWarning,
    deleteDevice,
    updateDeviceName,
    warningDevices,
  };
}
