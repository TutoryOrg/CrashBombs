import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { useAppState } from "@hooks/useAppState";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "@src/themes";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

export default function App() {
	const store = useAppState();
	const isDarkMode = useColorScheme() === "dark";

	return (
		<Provider store={store}>
			<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
				<StatusBar style={isDarkMode ? "light" : "dark"} />
			</ThemeProvider>
		</Provider>
	);
}
