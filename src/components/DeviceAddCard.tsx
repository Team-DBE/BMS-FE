import styled from "@emotion/styled";
import plus from "../assets/+.svg";

export default function DeviceAddCard() {
	return (
		<AddCardContainer>
			<img src={plus} alt="Add Device" />
		</AddCardContainer>
	);
}

const AddCardContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;

	width: 244px;
	height: 286px;

	background: #222527;
	border: 2px solid #6F787D;
	border-radius: 12px;

	cursor: pointer;
`;