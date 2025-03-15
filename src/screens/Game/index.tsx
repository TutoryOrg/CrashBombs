import { Canvas } from "@react-three/fiber/native";
import { Button, View } from "react-native";
import styled from "styled-components/native";
// import { Box } from "@react-three/drei";
const GameBackground = styled.View`
	flex: 1;
	background-color: $(props) => props.theme.bgColor;
`;

export const Game = (props: { onClickMenu: () => void }) => {
	const { onClickMenu } = props;
	return (
		<GameBackground>
			<Canvas events={null} camera={{ position: [-2, 2.5, 5], fov: 30 }}>
				<mesh>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial color={"hotpink"} />
				</mesh>
			</Canvas>
			<View style={{ padding: 20 }}>
				<Button title={"Go to Home"} onPress={() => onClickMenu()} />
			</View>
		</GameBackground>
	);
};
