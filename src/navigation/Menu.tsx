import { Screens } from "@src/utils/constants";
import { useState } from "react";
import { Game, Home } from "@src/screens";
import { SafeAreaView } from "react-native";

export const Menu = () => {
	const [screen, setScreen] = useState<Screens>(Screens.HOME);

	setTimeout(() => {
		if (screen === Screens.GAME) {
			setScreen(Screens.HOME);
		}
	}, 1000);

	return (
		<SafeAreaView>
			{screen === Screens.HOME && <Home onHandleClickPlay={() => setScreen(Screens.GAME)} />}
			{screen === Screens.GAME && <Game />}
		</SafeAreaView>
	);
};
