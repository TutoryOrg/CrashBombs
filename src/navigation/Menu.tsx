import { supabase } from "@src/utils/supabase";
import { Game, Home } from "@src/screens";
import { Alert, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { type IUser, Screens } from "@src/utils/constants";

export const Menu = () => {
	const [screen, setScreen] = useState<Screens>(Screens.HOME);

	setTimeout(() => {
		if (screen === Screens.GAME) {
			setScreen(Screens.HOME);
		}
	}, 1000);

	const [user, setUser] = useState<IUser | undefined>();
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);

	async function getProfile() {
		try {
			setLoading(true);
			if (!session?.user) throw new Error("No user on the session!");

			const { data, error, status } = await supabase
				.from("profiles")
				.select(`username, ranking, lastscore, bestscore`)
				.eq("id", session?.user.id)
				.single();
			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				console.log({ data });
				const { username, ranking, lastscore, bestscore } = data;
				setUser({ id: session?.user.id, username: username, ranking, lastScore: lastscore, bestScore: bestscore });
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message);
			}
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});
		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	useEffect(() => {
		if (session) getProfile();
	}, [session]);

	return (
		<SafeAreaView>
			{screen === Screens.HOME && <Home user={user} onHandleClickPlay={() => setScreen(Screens.GAME)} />}
			{screen === Screens.GAME && <Game />}
		</SafeAreaView>
	);
};
