import { Alert } from "react-native";
import { supabase } from "src/utils/supabase";
import type { IUser } from "@src/utils/constants";
import { useState, useCallback } from "react";

export function useProfile() {
	const [user, setUser] = useState<IUser | undefined>();
	const [loading, setLoading] = useState(false);

	const fetchProfile = useCallback(async (user_id: string) => {
		if (user_id === undefined) return;
		try {
			setLoading(true);
			const { data, error, status } = await supabase
				.from("profiles")
				.select("username, ranking, lastscore, bestscore, avatar_url")
				.eq("id", user_id)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setUser({ id: user_id, ...data });
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message);
			}
		} finally {
			setLoading(false);
		}
	}, []);

	return { user, loading, fetchProfile };
}
