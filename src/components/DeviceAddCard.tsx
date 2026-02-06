import styled from "@emotion/styled";
import plusIcon from "../assets/+.svg";

interface DeviceAddCardProps {
	onClick: () => void;
}

export default function DeviceAddCard({ onClick }: DeviceAddCardProps) {
	return (
		<AddCardContainer onClick={onClick}>
			<img src={plusIcon} alt="Add Device" />
		</AddCardContainer>
	);
}

const AddCardContainer = styled.button`
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