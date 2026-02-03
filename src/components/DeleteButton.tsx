import styled from "@emotion/styled";
import trahscan from "../assets/trashcan.svg";

interface DeleteButtonProps {
	onClick: () => void;
}

export default function DeleteButton({ onClick }: DeleteButtonProps) {
	return (
		<ButtonContainer onClick={onClick}>
			<TrashcanImage src={trahscan} alt="Trashcan" />
			<p>삭제</p>
		</ButtonContainer>
	);
}

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 14px 60px;
	gap: 8px;

	position: fixed;
	width: 201px;
	height: 60px;
	left: 1075px;
	bottom: 48px;

	background: #E74C3C;
	box-shadow: 0px 8px 20px rgba(231, 76, 60, 0.18);
	border-radius: 12px;
	cursor: pointer;
	p {
		width: 41px;
		height: 32px;

		font-family: 'Pretendard';
		font-style: normal;
		font-weight: 500;
		font-size: 24px;
		line-height: 32px;
		text-align: center;
		letter-spacing: -0.025em;

		color: #FDF3F3;
	}
`;

const TrashcanImage = styled.img`
	width: 32px;
	height: 32px;
`;