import { Button, View } from "react-native";
import styled from "styled-components/native";

const GameBackground = styled.View`
	flex: 1;
	background-color: $(props) => props.theme.bgColor;
`;

export const Game = (props: { onClickMenu: () => void }) => {
	const { onClickMenu } = props;
	return (
		<GameBackground>
			<View style={{ padding: 20 }}>
				<Button title={"Go to Home"} onPress={() => onClickMenu()} />
			</View>
		</GameBackground>
	);
};
