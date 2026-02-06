import styled from "@emotion/styled";
import warningIcon from "../../assets/ModalWarning.svg";

interface WarningModalProps {
	deviceName?: string;
	deviceTemp?: number;
	checkWarning?: () => void;
}


export default function WarningModal({ deviceName, deviceTemp, checkWarning }: WarningModalProps) {
	return (
		<Overlay>
			<ModalContainer onClick={(e)=>e.stopPropagation()}>
				<WarningDescriptionContainer>
					<WarningIcon src={warningIcon} alt="Warning Icon" />
					<Description>
						<h1>Warning</h1>
						<p>현재 {deviceName}의 온도가 {deviceTemp}∘C 이상입니다
							기기의 상태를 확인 해주세요</p>
					</Description>
				</WarningDescriptionContainer>
				<CheckButton onClick={checkWarning}>바로 확인하기</CheckButton>
			</ModalContainer>
		</Overlay>
	)
}

const Overlay = styled.div`
	position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  
  background-color:#00000066;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  z-index: 1000;
`;

const ModalContainer = styled.div`
	z-index: 50;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
	width: 400px;
	height: 400px;
	left: calc(50% - 400px/2);
	top: calc(50% - 400px/2);

	background: #222527;
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 12px;
`;

const WarningDescriptionContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0px;
	gap: 16px;

	position: absolute;
	width: 343px;
	height: 192px;
	left: 29px;
	top: 44px;
`;

// Warning Icon
const WarningIcon = styled.img`
	width: 56px;
	height: 56px;
`;

// 설명
const Description = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0px;
	gap: 12px;

	width: 343px;
	height: 120px;
	h1 {
		width: 343px;
		height: 44px;

		font-family: 'Pretendard';
		font-style: normal;
		font-weight: 500;
		font-size: 36px;
		line-height: 44px;
		text-align: center;
		letter-spacing: -0.025em;

		color: #FFFFFF;
	}
	p {
		width: 343px;
		height: 64px;

		font-family: 'Pretendard';
		font-style: normal;
		font-weight: 500;
		font-size: 24px;
		line-height: 32px;
		text-align: center;
		letter-spacing: -0.025em;

		color: #FFFFFF;
	}
`;

// 확인 버튼 
const CheckButton = styled.button`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 8px 24px;
	gap: 10px;

	position: absolute;
	width: 144px;
	height: 42px;
	left: calc(50% - 144px/2 + 0.5px);
	top: 314px;

	background: #393939;
	border-radius: 6px;
	cursor: pointer;

	font-family: 'Pretendard';
	font-style: normal;
	font-weight: 500;
	font-size: 18px;
	line-height: 26px;
	letter-spacing: -0.025em;

	color: #FFFFFF;
`;