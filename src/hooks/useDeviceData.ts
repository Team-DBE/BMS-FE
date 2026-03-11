import { useState, useMemo, useEffect } from "react";
import type { Device } from "../types/device";
import useDeviceStomp from "./useDeviceStomp";

export default function useDeviceData() {
  const severUrl = import.meta.env.VITE_API_BASE_URL;
  const { isConnected, deviceData, subscribeDevice, unsubscribeDevice } = useDeviceStomp(`${severUrl}/ws-stomp`);

  const [devices, setDevices] = useState<Device[]>(() => {
      return JSON.parse(localStorage.getItem("devices") || "[]");
  });
  
  useEffect(() => {
    localStorage.setItem("devices", JSON.stringify(devices));
  }, [devices]);

  useEffect(() => {
    if(!isConnected) return;
    devices.forEach((device) => {
      subscribeDevice(device.id);
      console.log(`소켓 구독 ${device.id}`);
    });
  }, [devices, subscribeDevice, isConnected]);

  const liveDevices = useMemo(() => {
    return devices.map((device) => {
      const data = deviceData[device.id] as { temperature: number; risk: number };
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
    if (devices.some((device) => device.id === id)) {
      alert("이미 등록된 일련번호입니다.");
      return;
    }
    const savedNames = JSON.parse(localStorage.getItem("deviceNames") || "{}");

    const deviceName = savedNames[id] || `기기 ${devices.length + 1}`;

    const newDevice: Device = {
      id: id,
      name: deviceName,
      temperature: 0,
      warning: false,
      hasShownWarning: false,
    };

    setDevices((prev) => [...prev, newDevice]);

    subscribeDevice(id);
    console.log(`소켓 구독 ${id}`);
  };

  const deleteDevice = (id: string) => {
    setDevices((prev) => prev.filter((device) => device.id !== id));
    unsubscribeDevice(id);
    console.log(`소켓 구독 해제 ${id}`);
  };

  const checkWarning = (id: string) => {
    setDevices((prev) => prev.map((device) => (device.id === id ? { ...device, hasShownWarning: true } : device)));
  };

  const updateDeviceName = (id: string, newName: string) => {
    setDevices((prev) => prev.map((device) => (device.id === id ? { ...device, name: newName } : device)));
    localStorage.setItem(
      "deviceNames",
      JSON.stringify({ ...JSON.parse(localStorage.getItem("deviceNames") || "{}"), [id]: newName }),
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
