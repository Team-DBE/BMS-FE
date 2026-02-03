import styled from "@emotion/styled";
import trahscan from "../assets/trashcan.svg";

interface DeviceDeleteButtonProps {
  onClick: () => void;
  isDeleteMode: boolean;
}

export default function DeviceDeleteButton({ onClick, isDeleteMode }: DeviceDeleteButtonProps) {
  return (
    <ButtonContainer onClick={onClick} isDeleteMode={isDeleteMode}>
      {isDeleteMode ? null : <img src={trahscan} alt="Trashcan" />}
      <p>{isDeleteMode ? "전체선택" : "기기삭제"}</p>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div<{ isDeleteMode: boolean }>`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 10px 16px;
	gap: 10px;

	width: ${(props) => (props.isDeleteMode ? "93px" : "127px")};
	height: 46px;

	background: #454C53;
	border-radius: 8px;

	cursor: pointer;
  p {
    width: 75px;
    height: 26px;

    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: -0.025em;

    color: #ffffff;
  }
`;
