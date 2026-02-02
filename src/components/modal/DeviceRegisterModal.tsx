import styled from "@emotion/styled";

export default function DeviceRegisterModal() {
	return (
		<ModalContainer>
			<Title>일련번호</Title>
			<InputContainer />
		</ModalContainer>
	)
}

const ModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 53px 28px;
	gap: 27px;

	position: relative;
	width: 400px;
	height: 257px;
	left: calc(50% - 400px/2 + 581px);
	top: calc(50% - 257px/2 + 260.5px);

	background: #222527;
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 12px;
`;

const Title = styled.h1`
	width: 344px;
	height: 44px;
	flex: none;
	order: 0;
	align-self: stretch;
	flex-grow: 0;

	position: absolute;
	width: 122px;
	height: 44px;
	left: calc(50% - 122px/2);
	top: 0px;

	font-family: 'Pretendard';
	font-style: normal;
	font-weight: 500;
	font-size: 36px;
	line-height: 44px;
	text-align: center;
	letter-spacing: -0.025em;

	color: #FFFFFF;
`;

const InputContainer = styled.div`
	width: 344px;
	height: 80px;

	background: #393939;
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 6px;
`;