import { Button, Text, View } from "react-native";

export const Game = (props: { onClickMenu: () => void }) => {
	const { onClickMenu } = props;

	return (
		<View style={{ margin: 80 }}>
			<Text>Game</Text>
			<Button title={"Go to Home"} onPress={() => onClickMenu()} />
		</View>
	);
};
