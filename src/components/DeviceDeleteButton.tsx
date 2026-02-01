import styled from "@emotion/styled";
import trahscan from "../assets/trashcan.svg";

export default function DeviceDeleteButton() {
  return (
    <ButtonContainer>
      <img src={trahscan} alt="Trashcan" />
      <p>기기삭제</p>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 10px 16px;
	gap: 10px;

	width: 127px;
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
