import { Client, type StompSubscription } from "@stomp/stompjs";
import { useRef, useState, useEffect, useCallback } from "react";
import SockJS from "sockjs-client";

export default function useDeviceStomp(serverUrl: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [deviceData, setDeviceData] = useState<Record<string, unknown>>({});

  const clientRef = useRef<Client | null>(null);

  const StompSubscriptionRef = useRef<Map<string, StompSubscription>>(new Map());

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(serverUrl),
      reconnectDelay: 5000,
      onConnect: () => {
        setIsConnected(true);
      },
      onDisconnect: () => {
        setIsConnected(false);
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      client.deactivate();
    };
  }, [serverUrl]);

  const subscribeDevice = useCallback((deviceId: string) => {
    if (!clientRef.current) return;
    if (StompSubscriptionRef.current.has(deviceId)) return;

    const topic = `/sub/device/${deviceId}`;
    const subscription = clientRef.current.subscribe(topic, (message) => {
      const receivedData = JSON.parse(message.body);
      // console.log(`${deviceId}:`, receivedData);
      setDeviceData((prevData) => ({
        ...prevData,
        [deviceId]: receivedData,
      }));
    });

    StompSubscriptionRef.current.set(deviceId, subscription);
  }, []);

  const unsubscribeDevice = useCallback((deviceId: string) => {
    const subscription = StompSubscriptionRef.current.get(deviceId);

    if (subscription) {
      subscription.unsubscribe();
      StompSubscriptionRef.current.delete(deviceId);
    }
  }, []);

  return {
    isConnected,
    deviceData,
    subscribeDevice,
    unsubscribeDevice,
  };
}
