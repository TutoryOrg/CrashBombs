import { Screens } from "@src/utils/constants";
import { supabase } from "@src/utils/supabase";
import { Game, Home } from "@src/screens";
import { SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

export const Menu = () => {
	const [screen, setScreen] = useState<Screens>(Screens.HOME);

	setTimeout(() => {
		if (screen === Screens.GAME) {
			setScreen(Screens.HOME);
		}
	}, 1000);

	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});
		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	console.log({ session });
	const user = session?.user;
	console.log({ user });

	return (
		<SafeAreaView>
			{screen === Screens.HOME && <Home onHandleClickPlay={() => setScreen(Screens.GAME)} />}
			{screen === Screens.GAME && <Game />}
		</SafeAreaView>
	);
};
