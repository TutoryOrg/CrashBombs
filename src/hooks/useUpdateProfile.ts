import { Alert } from "react-native";
import { supabase } from "src/utils/supabase";
import type { IUser } from "@src/utils/constants";
import { useState, useCallback } from "react";

export function useUpdateProfile() {
	const [user, setUser] = useState<IUser | undefined>();
	const [loading, setLoading] = useState(false);

	const fetchUpdateProfile = useCallback(
		async (props: {
			id: string;
			username: string;
			website: string;
			avatar_url: string;
		}) => {
			const { id, username, website, avatar_url } = props;
			try {
				setLoading(true);
				if (!id) throw new Error("No user on the session!");

				const updates = {
					id,
					username,
					website,
					avatar_url,
					updated_at: new Date(),
				};

				const { data, error } = await supabase.from("profiles").upsert(updates);

				if (error) {
					throw error;
				}
			} catch (error) {
				if (error instanceof Error) {
					Alert.alert(error.message);
				}
			} finally {
				setLoading(false);
			}
		},
		[],
	);

	return { user, loading, fetchUpdateProfile };
}
