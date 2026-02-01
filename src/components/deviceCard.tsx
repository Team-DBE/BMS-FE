import styled from "@emotion/styled";
import dot from "../assets/dot.svg";
import device from "../assets/device.svg";

interface DeviceCardProps {
  deviceName: string,
  temperature: number;
}

export default function DeviceCard({ deviceName, temperature }: DeviceCardProps) {
  return (
    <CardContainer>
      <DotImage>
        <img src={dot} alt="dot" />
      </DotImage>
      <DeviceContainer>
        <DeviceImage>
          <img src={device} alt="device" />
        </DeviceImage>
        <p>{deviceName}</p>
      </DeviceContainer>
      <TemperatureContainer>
        <p>{temperature}°C</p>
      </TemperatureContainer>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 240px;
  height: 286px;

  background: #26282b;
  border: 1px solid #ffffff1a;
  border-radius: 12px;
`;

const TemperatureContainer = styled.div`
  p {
    color: #fdf3f3;
    font-family: "Pretendard";
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.025em;
  }
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 76px;
  gap: 10px;

  position: absolute;
  width: 200px;
  height: 64px;
  left: 20px;
  top: 202px;

  background: #454c53;
  border-radius: 12px;
`;

const DeviceContainer = styled.div`
  p {
    width: 204px;
    height: 32px;

    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.025em;

    color: #ffffff;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  position: relative;
  top: 20px;
  width: 200px;
  height: 162px;
`;

const DotImage = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  z-index: 10;
`;

const DeviceImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
`;
