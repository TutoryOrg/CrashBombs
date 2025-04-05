import { Modal, View } from "react-native";
import { ModalContent, ModalTitle, ModalButton, ModalButtonText, GameOverModalContainer, ModalButtonOp } from "./styled";

interface GameOverModalProps {
	gameOver: boolean;
	onRestart: () => void;
	onResume: () => void;
	onMenu: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({ gameOver, onRestart, onResume, onMenu }) => {
	return (
		<Modal visible={gameOver} transparent={true} animationType="fade">
			<GameOverModalContainer>
				<ModalContent>
					<ModalTitle>Game Over</ModalTitle>

					<View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
						<ModalButtonOp onPress={onRestart}>
							<ModalButtonText>Restart</ModalButtonText>
						</ModalButtonOp>
						<ModalButtonOp onPress={onResume}>
							<ModalButtonText>Resume</ModalButtonText>
						</ModalButtonOp>
					</View>

					<ModalButton onPress={onMenu}>
						<ModalButtonText>Menu</ModalButtonText>
					</ModalButton>
				</ModalContent>
			</GameOverModalContainer>
		</Modal>
	);
};
