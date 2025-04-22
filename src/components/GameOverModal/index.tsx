import { Modal, View } from "react-native";
import { ModalContent, ModalTitle, ModalButton, ModalButtonText, GameOverModalContainer, ModalButtonOp } from "./styled";

interface GameOverModalProps {
	hits: number;
	gameOver: boolean;
	onMenu: () => void;
	onResume: () => void;
	onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({ hits, gameOver, onRestart, onResume, onMenu }) => {
	return (
		<Modal visible={gameOver} transparent={true} animationType={"slide"}>
			<GameOverModalContainer>
				<ModalContent>
					<ModalTitle>Game Over</ModalTitle>

					<View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
						<ModalButtonOp onPress={onRestart}>
							<ModalButtonText>Restart</ModalButtonText>
						</ModalButtonOp>
						{/* <ModalButtonOp disabled={gameOver && hits >= 3} onPress={onResume}>
							<ModalButtonText>Resume</ModalButtonText>
						</ModalButtonOp> */}
						<ModalButtonOp pink onPress={onMenu}>
							<ModalButtonText>Menu</ModalButtonText>
						</ModalButtonOp>
					</View>
					{/* <ModalButton onPress={onMenu}>
						<ModalButtonText>Menu</ModalButtonText>
					</ModalButton> */}
				</ModalContent>
			</GameOverModalContainer>
		</Modal>
	);
};
