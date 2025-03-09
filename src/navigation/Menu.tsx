import { Screens } from "@src/utils/constants";
import { supabase } from "@src/utils/supabase";
import { Game, Home } from "@src/screens";
import { useProfile } from "@src/hooks/useProfile";
import type { Session } from "@supabase/supabase-js";
import { SafeAreaView } from "react-native";
import { useEffect, useState } from "react";

export const Menu = () => {
	const [screen, setScreen] = useState<Screens>(Screens.HOME);
	const [session, setSession] = useState<Session | null>(null);

	const { user, loading, fetchProfile } = useProfile();

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});
		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	useEffect(() => {
		if (session) fetchProfile(session?.user.id);
	}, [session]);

	setTimeout(() => {
		if (screen === Screens.GAME) setScreen(Screens.HOME);
	}, 1000);

	return (
		<SafeAreaView>
			{screen === Screens.HOME && <Home user={user} setSession={setSession} onHandleClickPlay={() => setScreen(Screens.GAME)} />}
			{screen === Screens.GAME && <Game />}
		</SafeAreaView>
	);
};
