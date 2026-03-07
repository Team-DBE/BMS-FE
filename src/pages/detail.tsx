import React from "react";
import styled from "@emotion/styled";
import { Sidebar } from "../components/sidebar/sidebar.tsx";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

function Detail() {
  const { id } = useParams<{ id: string }>();
  const chartBodyRef = React.useRef<HTMLDivElement | null>(null);
  const displayId = id?.split("-").pop();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    elements: {
      line: {
        tension: 0.45,
        borderWidth: 3,
        borderColor: "#E6E8EA",
      },
      point: {
        radius: 0,
      },
    },
    scales: {
      x: {
        grid: {
          color: "#393939", // 더 연하게
          drawBorder: false,
        },
        ticks: {
          color: "#8B9096",
          font: { size: 14 },
        },
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          display: false,
          stepSize: 25,
          color: "#8B9096",
          font: { size: 14 },
        },
        grid: {
          color: "#393939",
          drawBorder: false,
        },
      },
    },
  };

  const yAxisLabels = [100, 75, 50, 25, 0];

  const data = {
    labels: [
      "11:57",
      "11:58",
      "11:59",
      "12:00",
      "12:01",
      "12:02",
      "12:03",
      "12:04",
      "12:05",
      "12:06",
      "11:57",
      "11:58",
      "11:59",
      "12:00",
      "12:01",
      "12:02",
      "12:03",
      "12:04",
      "12:05",
      "12:06",
    ],
    datasets: [
      {
        data: [
          6, 15, 12, 28, 30, 45, 60, 55, 70, 80, 6, 15, 12, 28, 30, 45, 60, 55,
          70, 80,
        ],
        fill: false,
      },
    ],
  };

  const chartWidth = data.labels.length * 130;

  React.useEffect(() => {
    if (chartBodyRef.current) {
      chartBodyRef.current.scrollLeft = chartBodyRef.current.scrollWidth;
    }
  }, []);

  return (
    <DetailContainer>
      <Sidebar />
      <MainContent>
        <ChartContainer>
          <Title>기기 {displayId}</Title>
          <ChartBody ref={chartBodyRef}>
            <YAxisContainer>
              {yAxisLabels.map((label) => (
                <YAxisLabel key={label}>{label}</YAxisLabel>
              ))}
            </YAxisContainer>
            <ChartWrapper style={{ width: `${chartWidth}px` }}>
              <Line data={data} options={options} />
            </ChartWrapper>
          </ChartBody>
        </ChartContainer>
      </MainContent>
    </DetailContainer>
  );
}

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.div`
  height: 100%;
  margin-left: 432px;
  padding: 100px 40px 40px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChartContainer = styled.div`
  display: flex;
  width: 1280px;
  height: 800px;
  background: rgba(24, 30, 36, 0.9);
  border: 2px solid #6f787d;
  border-radius: 16px;
  padding: 60px 60px 40px 60px;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.02),
    0 10px 40px rgba(0, 0, 0, 0.4);
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h2`
  top: 24px;
  left: 40px;
  color: #e6e8ea;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 45px;
`;

const ChartBody = styled.div`
  display: flex;
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
`;

const YAxisContainer = styled.div`
  width: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px 16px 24px 0;
  box-sizing: border-box;
  position: sticky;
  left: 0;
  z-index: 2;
  background: rgba(24, 30, 36, 0.9);
`;

const YAxisLabel = styled.div`
  color: #8b9096;
  font-size: 14px;
`;

const ChartWrapper = styled.div`
  position: relative;
  flex: 0 0 auto;
  height: 100%;
`;

export default Detail;
