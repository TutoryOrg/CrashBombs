import type { IUser } from "@src/utils/constants";
import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { supabase } from "src/utils/supabase";

export function useProfile(props: { user_id: string }) {
	const { user_id } = props;
	const [user, setUser] = useState<IUser | null>(null);
	const [loading, setLoading] = useState(false);

	const fetchProfile = useCallback(async () => {
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

	useEffect(() => {
		fetchProfile();
	}, [fetchProfile]);

	return { user, loading, fetchProfile };
}
