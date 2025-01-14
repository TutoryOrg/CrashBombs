import { StatusBar } from "expo-status-bar";
import { lightTheme } from "@src/themes";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
	const theme = lightTheme;

	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 60 }}>Hello Reddit!</Text>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
