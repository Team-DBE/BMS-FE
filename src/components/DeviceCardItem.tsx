import styled from "@emotion/styled";
import { useState, useRef, useEffect } from "react";
import dot from "../assets/dot.svg";
import device from "../assets/device.svg";
import warningIcon from "../assets/warning.svg";
import DeviceDetail from "./DeviceDetail";
import useDeviceDetail from "../hooks/useDeviceDetail";

interface DeviceCardProps {
  deviceName: string;
  temperature: number;
  warning: boolean;
  isDeleteMode: boolean;
  isSelected: boolean;
  onSelect: () => void;
  id: string;
  updateDeviceName: (id: string, newName: string) => void;
}

export default function DeviceCardItem({
  deviceName,
  temperature,
  warning,
  isDeleteMode,
  isSelected,
  onSelect,
  id,
  updateDeviceName
}: DeviceCardProps) {
  const { isDetailVisible, toggleDetailVisibility } = useDeviceDetail();
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const enterHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const newName = (e.target as HTMLInputElement).value;
      if (newName.trim().length > 8) {
        alert("별명은 최대 8자까지 가능합니다.")
        return;
      }
      updateDeviceName(id, newName);
      setIsEditing(false);
    }
  };

  return (
    <Container>
      <DeviceDetail isVisible={isDetailVisible} onClose={toggleDetailVisibility} setIsEditing={setIsEditing} />
      <CardContainer>
        {isDeleteMode ? (
          <label onClick={onSelect}>
            <DeleteCheckbox isSelected={isSelected} />
          </label>
        ) : (
          warning && <WarningIcon src={warningIcon} alt="warning" />
        )}
        <DotImage onClick={toggleDetailVisibility} className="menu-trigger">{isDeleteMode ? null : <img src={dot} alt="dot" />}</DotImage>
        <DeviceContainer className="device">
          <DeviceImage>
            <img src={device} alt="device" />
          </DeviceImage>
          <p>{isEditing ? (<EditNameInput ref={inputRef} type="text" defaultValue={deviceName} onKeyDown={enterHandle} onBlur={() => setIsEditing(false)} />) : (deviceName)}</p>
        </DeviceContainer>
        <TemperatureContainer className="temp">
          <p>{temperature}°C</p>
        </TemperatureContainer>
      </CardContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 240px;
  height: 286px;
`;

// 온도 컨테이너
const TemperatureContainer = styled.div`
  p {
    color: #fdf3f3;
    font-family: "Pretendard";
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.025em;
    transition: 0.3s;
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
  transition: 0.3s;
`;

// 기기 카드 컨테이너
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
  transition: 0.3s;

  :hover {
    transform: translateY(-15px);
    background: #454c53;

    .temp {
      background: #72787f;
    }
    .temp {
      p {
        font-family: "Pretendard";
        font-style: normal;
        font-weight: 600;
        font-size: 26px;
      }
    }
    .device {
      p {
        width: 204px;
        height: 32px;

        font-family: "Pretendard";
        font-style: normal;
        font-weight: 600;
        font-size: 26px;
        color: #fdf3f3;
      }
    }
  }
`;

// 기기 컨테이너
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
    transition: 0.3s;
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

// 점 이미지
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

// 기기 이미지
const DeviceImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
`;

// 경고 아이콘
const WarningIcon = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 32px;
  height: 32px;

  background: #e06c60;
  border-radius: 8px;
`;

// 삭제 채크박스
const DeleteCheckbox = styled.div<{ isSelected: boolean }>`
  position: absolute;
  width: 32px;
  height: 32px;
  left: 14px;
  top: 14px;

  background: ${(props) => (props.isSelected ? "#ffffff" : "#393939")};
  border: 1px solid #ffffff;
  border-radius: 8px;
  cursor: pointer;

  z-index: 10;
`;

// 별명 수정
const EditNameInput = styled.input`
  width: 150px;
  height: 30px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  color: #fdf3f3;

  background: none;
  border: none;
`;