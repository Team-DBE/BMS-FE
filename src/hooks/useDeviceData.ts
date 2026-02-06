import { useState } from "react";
import { AddDevice } from "../utils/deviceDataUtils";

const Devices = () => Array.from({ length: 5 }, (_, i) => {
  const temp = Math.floor(Math.random() * 100);
  return {
    id: `device-${i + 1}`,
    name: `기기 ${i + 1}`,
    temperature: temp,
    warning: temp > 70, // 70도 넘으면 경고
  };
});

export default function useDeviceData() {
  const [devices, setDevices] = useState(Devices);

  const warningDevice = devices.find(device => device.warning);

  const addDevice = (name: string) => {
    const newDevice = AddDevice(name); 
    setDevices(prev => [...prev, newDevice]);
  };

  const deleteDevice = (id: string) => {
    setDevices(prev => prev.filter(device => device.id !== id));
  }

  const checkWarning = (id: string) => {
    setDevices(prev => prev.map(device => 
      device.id === id ? { ...device, warning: false } : device
    ));
  };

  const updateDeviceName = (id: string, newName: string) => {
    setDevices(prev => prev.map(device => 
      device.id === id ? { ...device, name: newName } : device
    ));
  };

  return { 
    devices, 
    warningDevice,
    addDevice, 
    checkWarning,
    deleteDevice,
    updateDeviceName
  };
}