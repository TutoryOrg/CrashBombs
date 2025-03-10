import { Alert } from "react-native";
import { supabase } from "src/utils/supabase";
import type { ITopUser } from "@src/utils/constants";
import { useState, useCallback, useEffect } from "react";

export function useTopUsers() {
	const [topUsers, setTopUsers] = useState<ITopUser[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchTopUsers = useCallback(async () => {
		try {
			setLoading(true);
			const { data, error, status } = await supabase
				.from("profiles")
				.select("username, bestscore, ranking")
				.order("bestscore", { ascending: false }) // Change 'id' to the column you want to order by
				.limit(5);

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setTopUsers(data);
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
		fetchTopUsers();
	}, []);

	return { topUsers, loading, fetchTopUsers };
}
