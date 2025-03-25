import styled from "styled-components/native";
import { GameEngine } from "react-native-game-engine";
import { useEffect, useState } from "react";
import entities from "./entities";
import Physics from "./entities/physics";

const GameBackground = styled.View`
	flex: 1;
	background-color: $(props) => props.theme.bgColor;
`;

export const Game = (props: { onClickMenu: () => void }) => {
	const [running, setRunning] = useState(true);
	const { onClickMenu } = props;

	useEffect(() => {
		setRunning(true);
	}, []);

	return (
		<GameBackground>
			<GameEngine
				systems={[Physics]}
				running={running}
				entities={entities()}
				style={{ display: "flex", top: 0, left: 0, right: 0, bottom: 0 }}
			/>
		</GameBackground>
	);
};
