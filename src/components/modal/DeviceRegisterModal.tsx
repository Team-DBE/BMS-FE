import styled from "@emotion/styled";

interface DeviceRegisterModalProps {
  onClose?: () => void;
  addDevice?: (id: string) => void;
  devices: number;
}

export default function DeviceRegisterModal({ onClose, addDevice, devices }: DeviceRegisterModalProps) {
  const handleAddDevice = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && addDevice) {
      addDevice?.(`기기 ${devices + 1}`);
      if (onClose) onClose();
    }
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>기기등록</Title>
        <InputContainer type="text" placeholder="기기의 일련번호를 입력해주세요" onKeyDown={handleAddDevice} />
      </ModalContainer>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: #00000066;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 53px 28px;
  gap: 27px;

  position: relative;
  width: 400px;
  height: 257px;

  background: #222527;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
`;

const Title = styled.h1`
  width: 344px;
  height: 44px;

  position: absolute;
  width: 122px;
  height: 44px;
  left: calc(50% - 122px / 2);
  top: 53px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 44px;
  text-align: center;
  letter-spacing: -0.025em;

  color: #ffffff;
`;

const InputContainer = styled.input`
  padding: 22px 50px;

  position: absolute;
  bottom: 53px;
  width: 344px;
  height: 80px;

  background: #393939;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 36px;
  letter-spacing: -0.025em;

  color: #ffffff;

  ::placeholder {
    position: absolute;
    width: 245px;
    height: 36px;
    left: calc(50% - 245px / 2 + 0.5px);
    top: 26px;

    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 36px;
    letter-spacing: -0.025em;

    color: #ababab;
  }
`;
