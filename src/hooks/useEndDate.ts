import { Alert } from "react-native";
import { supabase } from "src/utils/supabase";
import { useState, useCallback, useEffect } from "react";

function getCountdown(targetDate: string) {
	// Parse the target date string into a Date object
	const target = new Date(targetDate);
	const now = new Date();

	// Calculate the difference in milliseconds
	const diff = target.getTime() - now.getTime();

	// If the target date is in the past, return "00:00:00"
	if (diff <= 0) return "00:00:00";

	// Convert milliseconds to hours, minutes, and seconds
	const hours = Math.floor(diff / (1000 * 60 * 60));
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((diff % (1000 * 60)) / 1000);

	// Format the result as "HH:MM:SS"
	return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

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
				setCountDown(getCountdown(end_date));
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
