import { Screens } from "@src/utils/constants";
import { supabase } from "@src/utils/supabase";
import { Game, Home } from "@src/screens";
import { useProfile } from "@src/hooks/useProfile";
import { useEndDate } from "@src/hooks/useEndDate";
import { useTopUsers } from "@src/hooks/useTopUsers";
import type { Session } from "@supabase/supabase-js";
import { KeyboardAvoidingView } from "react-native";
import { type SetStateAction, useEffect, useState } from "react";
import styled from "styled-components/native";

function startCountdown_2(targetDate: string, callback: (countdown: string) => void) {
	if (targetDate === undefined) return;

	const target = new Date(targetDate).getTime(); // Convert targetDate to UTC timestamp

	const interval = setInterval(() => {
		const now = new Date().getTime(); // Current time in UTC
		const diff = target - now;

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
	}, 500); // Update every 10 milliseconds for better precision
}

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

const SafeContainer = styled.SafeAreaView`
	flex: 1;
	background-color: ${(props) => props.theme.bgColor};
`;

export const Menu = () => {
	const [count, setCount] = useState<string>();
	const [screen, setScreen] = useState<Screens>(Screens.HOME);
	const [session, setSession] = useState<Session | null>(null);

	const { user, loading, fetchProfile } = useProfile();
	const { countDown, loading: loadingEndDate } = useEndDate();
	const { topUsers, loading: loadingTopUsers } = useTopUsers();

	if (countDown) {
		startCountdown_2(countDown, (time: SetStateAction<string | undefined>) => {
			setCount(time); // Updates every second with more precision
		});
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
		if (session) fetchProfile(session?.user.id);
	}, [session]);

	return (
		<SafeContainer>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior={"height"}>
				{screen === Screens.HOME && (
					<Home
						user={user}
						topUsers={topUsers}
						countDown={count || "..."}
						setSession={setSession}
						onHandleClickPlay={() => setScreen(Screens.GAME)}
					/>
				)}
				{screen === Screens.GAME && <Game onClickMenu={() => setScreen(Screens.HOME)} />}
			</KeyboardAvoidingView>
		</SafeContainer>
	);
};
