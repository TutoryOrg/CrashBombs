import { Menu } from "@src/navigation/Menu";
import { Provider } from "react-redux";
import { darkTheme } from "@src/themes";
import { StatusBar } from "expo-status-bar";
import { useAppState } from "@hooks/useAppState";
import { ThemeProvider } from "styled-components/native";
import { useColorScheme } from "react-native";
import { useFontsAndLayout } from "@src/hooks/useFontAndLayout";

export default function App() {
	const store = useAppState();
	const { fontsLoaded } = useFontsAndLayout();

	if (!fontsLoaded) return null;

	return (
		<Provider store={store}>
			<ThemeProvider theme={darkTheme}>
				<Menu />
				<StatusBar style={"light"} />
			</ThemeProvider>
		</Provider>
	);
}
