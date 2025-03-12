import { Screens } from "@src/utils/constants";
import { supabase } from "@src/utils/supabase";
import { Game, Home } from "@src/screens";
import { useProfile } from "@src/hooks/useProfile";
import { useEndDate } from "@src/hooks/useEndDate";
import { useTopUsers } from "@src/hooks/useTopUsers";
import type { Session } from "@supabase/supabase-js";
import { SafeAreaView } from "react-native";
import { useEffect, useState } from "react";

function startCountdown(targetDate: string, callback: { (countdown: any): void; (arg0: string): void }) {
	if (targetDate === undefined) return;
	const interval = setInterval(() => {
		const target = new Date(targetDate);
		const now = new Date();
		const diff = target.getTime() - now.getTime();
		if (diff <= 0) {
			clearInterval(interval);
			callback("00:00:00");
			return;
		}
		const hours = Math.floor(diff / (1000 * 60 * 60));
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((diff % (1000 * 60)) / 1000);
		const countdown = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
		callback(countdown);
	}, 1000);
}

export const Menu = () => {
	const [screen, setScreen] = useState<Screens>(Screens.HOME);
	const [session, setSession] = useState<Session | null>(null);

	const { user, loading, fetchProfile } = useProfile();
	const { countDown, loading: loadingEndDate } = useEndDate();
	const { topUsers, loading: loadingTopUsers } = useTopUsers();

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
		if (screen === Screens.GAME) {
			setScreen(Screens.HOME);
		}
	}, 1000);

	const [count, setCount] = useState<string>();
	startCountdown(countDown, (cd) => {
		setCount(cd);
	});

	return (
		<SafeAreaView>
			{screen === Screens.HOME && (
				<Home
					user={user}
					topUsers={topUsers}
					countDown={count || "00:00:00"}
					setSession={setSession}
					onHandleClickPlay={() => setScreen(Screens.GAME)}
				/>
			)}
			{screen === Screens.GAME && <Game />}
		</SafeAreaView>
	);
};
