import { Alert } from "react-native";
import { supabase } from "src/utils/supabase";
import { useState, useCallback, useEffect } from "react";

export function useSafeMessage() {
	const [isSafe, setIsSafe] = useState<boolean>(true);
	const [loading, setLoading] = useState(false);

	const fetchSafeMessage = useCallback(async () => {
		try {
			setLoading(true);
			const { data, error, status } = await supabase.from("endDate").select("safe_message");

			if (error && status !== 406) {
				throw error;
			}

            console.log({ data, error, status });

			if (data) {
				const { safe_message } = data[0];
				setIsSafe(safe_message);
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
		fetchSafeMessage();
	}, []);

	return { isSafe, loading, fetchSafeMessage };
}