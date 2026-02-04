import { useState } from "react";

const Devices = () => Array.from({ length: 11 }, (_, i) => {
  const temp = Math.floor(Math.random() * 100);
  return {
    id: `device-${i + 1}`,
    name: `기기 ${i + 1}`,
    temperature: temp,
    warning: temp > 70, // 70도 넘으면 경고
  };
});

export default function useDevices() {
  const [devices, setDevices] = useState(Devices);

  const warningDevice = devices.find(device => device.warning);

  const addDevice = (name: string) => {
		const temp = Math.floor(Math.random() * 100);
    const newDevice = {
      id: `device-${Date.now()}`,
      name,
      temperature: temp,
      warning: temp > 70, 
    };
    setDevices(prev => [...prev, newDevice]);
  };

  const checkWarning = (id: string) => {
    setDevices(prev => prev.map(device => 
      device.id === id ? { ...device, warning: false } : device
    ));
  };

  return { 
    devices, 
    warningDevice,
    addDevice, 
    checkWarning 
  };
}