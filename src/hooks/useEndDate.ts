import { Alert } from "react-native";
import { supabase } from "src/utils/supabase";
import { useState, useCallback, useEffect } from "react";

export function useEndDate() {
	const [countDown, setCountDown] = useState<string>();
	const [loading, setLoading] = useState(false);

	const fetchEndDate = useCallback(async () => {
		try {
			setLoading(true);
			const { data, error, status } = await supabase.from("endDate").select("*");

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				const { end_date } = data[0];
				setCountDown(end_date);
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
		fetchEndDate();
	}, []);

	return { countDown, loading, fetchEndDate };
}
