import { Modal } from "react-native";
import { ModalContent, ModalTitle, ModalButton, ModalButtonText, GameOverModalContainer } from "./styled";

export const GameOverModal: React.FC<GameOverModalProps> = ({ gameOver, onRestart, onMenu }) => {
	return (
		<Modal visible={gameOver} transparent={true} animationType="fade">
			<GameOverModalContainer>
				<ModalContent>
					<ModalTitle>Game Over</ModalTitle>

					<ModalButton onPress={onRestart}>
						<ModalButtonText>Restart</ModalButtonText>
					</ModalButton>

					<ModalButton onPress={onMenu}>
						<ModalButtonText>Menu</ModalButtonText>
					</ModalButton>
				</ModalContent>
			</GameOverModalContainer>
		</Modal>
	);
};
