import { supabase } from "../utils/supabase";
import { useProfile } from "@src/hooks/useProfile";
import type { Session } from "@supabase/supabase-js";
import { Button, Input } from "@rneui/themed";
import { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";

export default function Account({ session }: { session: Session }) {
	const [username, setUsername] = useState("");
	const [website, setWebsite] = useState("");
	const [avatarUrl, setAvatarUrl] = useState("");
	const [loading, setLoading] = useState<boolean>(false);

	const { user, loading: proLoading, fetchProfile } = useProfile();

	useEffect(() => {
		if (session) fetchProfile(session?.user.id);
	}, [session]);

	async function updateProfile({
		username,
		website,
		avatar_url,
	}: {
		username: string;
		website: string;
		avatar_url: string;
	}) {
		try {
			setLoading(true);
			if (!session?.user) throw new Error("No user on the session!");

			const updates = {
				id: session?.user.id,
				username,
				website,
				avatar_url,
				updated_at: new Date(),
			};

			const { error } = await supabase.from("profiles").upsert(updates);

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
	}

	return (
		<View style={styles.container}>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Input label="Email" value={session?.user?.email} disabled />
			</View>
			<View style={styles.verticallySpaced}>
				<Input label="Username" value={username || ""} onChangeText={(text) => setUsername(text)} />
			</View>
			<View style={styles.verticallySpaced}>
				<Input label="Website" value={website || ""} onChangeText={(text) => setWebsite(text)} />
			</View>

			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button
					title={loading ? "Loading ..." : "Update"}
					onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
					disabled={loading}
				/>
			</View>

			<View style={styles.verticallySpaced}>
				<Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		padding: 12,
	},
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: "stretch",
	},
	mt20: {
		marginTop: 20,
	},
});
