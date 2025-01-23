import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect, useCallback } from "react";

export function useFontsAndLayout() {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	useEffect(() => {
		const loadFonts = async () => {
			await Promise.all([
				Font.loadAsync({
					komi: require("../../assets/fonts/komi.ttf"),
					obelix: require("../../assets/fonts/ObelixPro-cyr.ttf"),
				}),
			]);

			setFontsLoaded(true);
		};

		loadFonts();
	}, []);

	return {
		fontsLoaded,
		onLayoutRootView,
	};
}
