import { Screens } from "@src/utils/constants";
import { useState } from "react";
import { Game, Home } from "@src/screens";
import { SafeAreaView } from "react-native";

export const Menu = () => {
	const [screen, setScreen] = useState<Screens>(Screens.HOME);
	return (
		<SafeAreaView>
			{screen === Screens.HOME && <Home />}
			{screen === Screens.GAME && <Game />}
		</SafeAreaView>
	);
};
