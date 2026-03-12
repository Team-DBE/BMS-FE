import type { DeviceHistoryPoint } from "../types/deviceHistory";

const padZero = (value: number) => value.toString().padStart(2, "0");

export const mapHistoryToChartData = (history: DeviceHistoryPoint[]) => {
  const labels: string[] = [];
  const riskData: number[] = [];
  const temperatureData: number[] = [];

  history.forEach((point) => {
    const date = new Date(point.time);
    const label = `${padZero(date.getHours())}:${padZero(date.getMinutes())}`;

    labels.push(label);
    riskData.push(point.risk);
    temperatureData.push(point.temperature);
  });

  return { labels, riskData, temperatureData };
};
